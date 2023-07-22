import subprocess
import json
import os
import sys

# Check if the correct number of command-line arguments is passed
if len(sys.argv) != 3:
    print("Usage: python transcription.py <input_file_name> <output_path>")
    sys.exit(1)

input_file_name = os.path.splitext(sys.argv[1])[0]
audio_chunks_directory = f"./frontend/speech-transcription-app/public/Original data/{input_file_name}/audio_chunks"
transcripts_directory = f"./frontend/speech-transcription-app/public/Original data/{input_file_name}/transcripts"

def main(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
        print("Output folder created")
    else:
        print("Output folder already present")

main(transcripts_directory)

# Count the number of audio chunks
n = sum(1 for _ in os.listdir(audio_chunks_directory))

print("Number of chunks:", n)

for i in range(1, n + 1):
    chunk_path = os.path.join(audio_chunks_directory, f"chunk{str(i).zfill(4)}.wav")
    output = subprocess.check_output(
        f"curl -k -X 'POST' 'https://asr.iiit.ac.in/ssmtapi//' "
        f"-H 'accept: application/json' "
        f"-H 'Content-Type: multipart/form-data' "
        f"-F 'uploaded_file=@{chunk_path};type=audio/x-wav' "
        f"-F 'lang=eng'", shell=True
    )
    result_dict = json.loads(output.decode('utf-8'))
    transcript_list = result_dict["transcript"]  # list of dictionaries
    script = " ".join(item["transcript"] for item in transcript_list)
    transcript_path = os.path.join(transcripts_directory, f"transcript{str(i).zfill(4)}.txt")
    with open(transcript_path, "w") as file:
        file.write(script)

print("Transcripts generated")
