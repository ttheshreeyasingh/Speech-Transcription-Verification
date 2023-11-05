import os
import shutil

def rename_files(folder_path, new_name_prefix, ext):
    files = os.listdir(folder_path)
    files.sort()
    for i, file_name in enumerate(files, start=1):
        file_path = os.path.join(folder_path, file_name)

        new_file_name = f"{new_name_prefix}{i:04d}.{ext}"
        print(f"Renaming {file_name} to {new_file_name}")

        os.rename(file_path, os.path.join(folder_path, new_file_name))

def copy_folder(source_folder, destination_folder):
    shutil.copytree(source_folder, destination_folder)

folders = [{
    "folder_path": "transcripts",
    "ext": "txt",
    "new_name_prefix": "transcript"
}, {
    "folder_path": "audio_chunks",
    "ext": "wav",
    "new_name_prefix": "chunk"
}]
destination_path = "../frontend/speech-transcription-app/public/Original data/"
for folder in folders:
    folder_path = folder["folder_path"]
    ext = folder["ext"]
    new_name_prefix = folder["new_name_prefix"]
    # Check if the destination folder exists before proceeding
    if not os.path.exists(os.path.join(destination_path, folder_path)):
        rename_files(folder_path, new_name_prefix, ext)
        copy_folder(folder_path, os.path.join(destination_path, folder_path))
    else:
        print(f"Folder '{folder_path}' already exists in destination. Skipping...")
