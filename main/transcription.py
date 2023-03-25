import subprocess
import json
import os
import sys


op_path= "transcripts"
def main(op_path):
    if os.path.isdir(op_path):
        print("Output folder already present")
    else:
        os.mkdir(op_path)
        print("Output folder created") 
main(op_path)    

directory = 'audio_chunks'
# n = number of chunks
n = 0
for filename in os.listdir(directory):
    n+=1
  
for i in range(1,n+1):
    output = subprocess.check_output("curl -k -X 'POST'   'https://asr.iiit.ac.in/ssmtapi//'    -H 'accept: application/json'    -H 'Content-Type: multipart/form-data'    -F   'uploaded_file=@audio_chunks/'chunk"+str("{:04d}".format(i))+".wav';type=audio/x-wav'    -F 'lang=eng' ", shell=True)
    dict = json.loads(output.decode('utf-8'))
    list = dict["transcript"] #list of dictionaries
    j = 0
    script = ""
    while(j<len(list)):
        script += list[j]["transcript"] + " "
        j+=1
    with open("transcripts/transcript"+str("{:04d}".format(i))+".txt", "w") as file:
        file.write(script)


