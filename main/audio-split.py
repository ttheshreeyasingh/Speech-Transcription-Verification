import os
import collections
import contextlib
import wave
import webrtcvad
import sys


def read_wave(path):
    with contextlib.closing(wave.open(path, 'rb')) as wf:
        num_channels = wf.getnchannels()
        assert num_channels in (1, 2)  # Allowing 1 or 2 channels
        sample_width = wf.getsampwidth()
        assert sample_width == 2
        sample_rate = wf.getframerate()
        pcm_data = wf.readframes(wf.getnframes())
        return pcm_data, sample_rate, num_channels

def write_wave(path, audio, sample_rate):
    with contextlib.closing(wave.open(path, 'wb')) as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(audio)
        frames = wf.getnframes()
        return frames / float(sample_rate)

class Frame(object):
    def __init__(self, bytes, timestamp, duration):
        self.bytes = bytes
        self.timestamp = timestamp
        self.duration = duration

def frame_generator(frame_duration_ms, audio, sample_rate):
    n = int(sample_rate * (frame_duration_ms / 1000.0) * 2)
    offset = 0
    timestamp = 0.0
    duration = (float(n) / sample_rate) / 2.0
    while offset + n < len(audio):
        yield Frame(audio[offset:offset + n], timestamp, duration)
        timestamp += duration
        offset += n

def vad_collector(sample_rate, frame_duration_ms, padding_duration_ms, vad, frames):
    num_padding_frames = int(padding_duration_ms / frame_duration_ms)
    ring_buffer = collections.deque(maxlen=num_padding_frames)
    triggered = False
    voiced_frames = []
    for frame in frames:
        is_speech = vad.is_speech(frame.bytes, sample_rate)
        if not triggered:
            ring_buffer.append((frame, is_speech))
            num_voiced = len([f for f, speech in ring_buffer if speech])
            if num_voiced > 0.9 * ring_buffer.maxlen:
                triggered = True
                for f, s in ring_buffer:
                    voiced_frames.append(f)
                ring_buffer.clear()
        else:
            voiced_frames.append(frame)
            ring_buffer.append((frame, is_speech))
            num_unvoiced = len([f for f, speech in ring_buffer if not speech])
            if num_unvoiced > 0.9 * ring_buffer.maxlen:
                triggered = False
                yield b''.join([f.bytes for f in voiced_frames])
                ring_buffer.clear()
                voiced_frames = []
    if triggered:
        pass
    if voiced_frames:
        yield b''.join([f.bytes for f in voiced_frames])

def folder(path):
    if not os.path.exists(path):
        os.makedirs(path)
        print("Output folder created")
    else:
        print("Output folder already present")

def main():
    # Check if the correct number of command-line arguments is passed
    if len(sys.argv) != 3:
        print("Usage: python audio_split.py <input_file_name> <output_path>")
        sys.exit(1)

    file_name = sys.argv[1]
    op_path = sys.argv[2]

    if not os.path.exists(op_path):
        os.makedirs(op_path)
        print("Output folder created")
    else:
        print("Output folder already present")

    audio, sample_rate, _ = read_wave(file_name)
    vad = webrtcvad.Vad(2)
    frames = frame_generator(30, audio, sample_rate)
    segments = vad_collector(sample_rate, 30, 300, vad, frames)

    file_name_without_extension = os.path.splitext(os.path.basename(file_name))[0]
    audio_folder_path = os.path.join(op_path, file_name_without_extension, "audio_chunks")
    folder(audio_folder_path)

    for i, segment in enumerate(segments):
        path = os.path.join(audio_folder_path, f'chunk{str(i+1).zfill(4)}.wav')
        print(f'Writing {path}')
        write_wave(path, segment, sample_rate)

if __name__ == "__main__":
    main()
