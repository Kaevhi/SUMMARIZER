from youtube_transcript_api import YouTubeTranscriptApi
import json
video_id = 'YOUR_VIDEO_ID'
video_url = input("Enter full video URL from YouTube: ")

# Extract video ID from URL
if "https://www.youtube.com/watch?v=" in video_url:
    video_id = video_url.split("https://www.youtube.com/watch?v=")[1].split("&")[0]  # Extracting ID, ignoring other URL parameters
else:
    print("Invalid video URL. Please enter a valid video URL from YouTube.")
    exit()

output_file = "transcript.json"

try:
    transcripts, not_found = YouTubeTranscriptApi.get_transcripts([video_id], continue_after_error=True)
    if video_id in transcripts:
        with open(output_file, "w", encoding="utf-8") as json_file:
            json.dump(transcripts[video_id], json_file, ensure_ascii=False, indent=4)
        print("Success")
    else:
        print("Transcript cannot be created from video.")
except Exception as e:
    print(f"An error occurred: {e}")