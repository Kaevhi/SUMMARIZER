from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)

@app.route('/transcribe', methods=['POST'])
def transcribe():
    video_url = request.json['video_url']

    if "https://www.youtube.com/watch?v=" in video_url:
        video_id = video_url.split("https://www.youtube.com/watch?v=")[1].split("&")[0]
    else:
        return jsonify({"error": "Invalid video URL."}), 400

    try:
        transcripts, not_found = YouTubeTranscriptApi.get_transcripts([video_id], continue_after_error=True)
        if video_id in transcripts:
            return jsonify(transcripts[video_id])
        else:
            return jsonify({"error": "Transcript cannot be created from video."}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
