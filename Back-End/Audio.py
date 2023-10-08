import os
import openai

openai.api_key = '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'
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp3', 'wav', 'flac'}

def transcribe_with_whisper(audio_path):
    with open(audio_path, "rb") as f:
        response = openai.WhisperASR.recognize(file=f)
    transcript = response.get("data").get("text")
    return transcript

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def transcribe_files_in_directory():
    transcripts = {}
    
    for filename in os.listdir(UPLOAD_FOLDER):
        if filename.endswith(tuple(ALLOWED_EXTENSIONS)):
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            transcript = transcribe_with_whisper(filepath)
            transcripts[filename] = transcript

    if transcripts:
        for filename, transcript in transcripts.items():
            print(f"{filename}:\n{transcript}\n{'-'*50}\n")
    else:
        print("No valid audio files found in 'uploads' directory.")

if __name__ == '__main__':
    transcribe_files_in_directory()
