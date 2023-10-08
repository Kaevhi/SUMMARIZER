from flask import Flask, request, jsonify
import os
import openai

openai.api_key = 'REPLACE'

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp3', 'wav', 'flac'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def transcribe_with_whisper(audio_path):
    with open(audio_path, "rb") as f:
        response = openai. WhisperASR.recognize(file=f)
    transcript = response.get("data").get("text")
    return transcript

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods = ['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']

    if file.filename =='':
        return jsonify({"error": "No file selected"}), 400
    

    if file and allowed_file(file.filename):
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        transcript = transcribe_with_whisper(filepath)
        #Pass through chatgpt
        
        return jsonify({"message:" "Success"}), 200
    else:
        return jsonify({"error": "Invalid file type"}), 400
    
if __name__ == '__main__':
    app.run(debug=True)