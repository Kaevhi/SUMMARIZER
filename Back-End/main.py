import os
from flask import Flask, request, jsonify
from WhisperAI import *

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp3', 'wav', 'flac', 'mp4'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_audio_and_transcribe():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        if file.filename.endswith('.mp4'):
            #Executes video transcription process
            if not is_mp4(filepath):
                return jsonify({"error": "Invalid MP4 file"}), 400

            compressed_video_path = os.path.join(UPLOAD_FOLDER, "compressed_" + file.filename)
            audio_output_path = os.path.join(UPLOAD_FOLDER, "extracted_" + os.path.splitext(file.filename)[0] + ".wav")

            compress_video(filepath, compressed_video_path)
            extract_audio_from_video(compressed_video_path, audio_output_path)
            
            transcript = transcribe_audio_with_whisper(audio_output_path, openai_api_key="YOUR_OPENAI_API_KEY")
            #run transcript through API for summary


            #<------------------------------------->#


            return jsonify({"transcript": transcript}), 200

        elif file.filename.endswith(('mp3', 'wav', 'flac')):
            #Executes audio transcription process directly
            transcript = transcribe_audio_with_whisper(filepath, openai_api_key="YOUR_OPENAI_API_KEY")
            return jsonify({"transcript": transcript}), 200

        else:
            return jsonify({"error": "Invalid file format"}), 400

    return jsonify({"error": "File upload failed"}), 500
