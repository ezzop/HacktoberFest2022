import torch
from glob import glob
from flask import Flask,render_template,request
import pafy
import os
import re

# To check if its a valid youtube link
YOUTUBE_REGEX="^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"

app = Flask(__name__, template_folder="templates")

@app.route("/", methods=[ "GET", "POST" ])
def run():
    transcript, youtube_link, audio_path = "", "", "./audios/out/out.wav"

    if request.method == "POST":
        youtube_link = request.form.get("youtube_link")

        video = youtube_parser(youtube_link)

        # Create transcript using speech-to-text
        transcript = speech2text(audio_path) if os.path.exists(audio_path) else ""

        return render_template("index.html", transcript=transcript, youtube_link=youtube_link, video=video)

    # When user haven't submitted yet
    if request.method == "GET":
        # Create transcript if output file exists
        transcript = speech2text(audio_path) if os.path.exists(audio_path) else ""
        return render_template("index.html", transcript=transcript, youtube_link=youtube_link)

def youtube_parser(url):   
    # Remove in.m4a if it exists 
    os.system("rm -f ./audios/in/in.m4a")

    video = pafy.new(url)
    
    bestaudio = video.getbestaudio()
    bestaudio.download("./audios/in/in.m4a")

    # Convert m4a file to wav file using ffmpeg
    os.system("ffmpeg -i ./audios/in/in.m4a ./audios/out/out.wav -y")
    os.system("rm -f ./audios/in/in.m4a")

    return video


# https://pytorch.org/hub/snakers4_silero-models_stt/
def speech2text(input_file):
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")  # gpu also works, but our models are fast enough for CPU

    model, decoder, utils = torch.hub.load(repo_or_dir='snakers4/silero-models',
                                        model='silero_stt',
                                        language='en', # also available 'de', 'es'
                                        device=device)
    (read_batch, split_into_batches,
    read_audio, prepare_model_input) = utils  # see function signature for details

    test_files = glob(input_file)
    batches = split_into_batches(test_files, batch_size=10)
    input = prepare_model_input(read_batch(batches[0]),
                                device=device)
                                
    print("\n\n===== Speech2Text Started ... =====\n\n")

    output = model(input)
    res = ""
    for example in output:
        res += decoder(example.cpu())

    print("Output: \n\n" + res + "\n\n")
    print("Aborting.. \n\n===== Speech2Text Done =====\n\n")

    return res


if __name__ == "__main__":
    app.run()