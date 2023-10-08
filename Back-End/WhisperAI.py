import ffmpeg
import openai
import magic 
from documentfunction import *

openai.api_key = 

def is_mp4(filepath):
    mime = magic.Magic(mime=True)
    mime_type = mime.from_file(filepath)
    return mime_type == 'video/mp4'

def get_video_duration(video_path):
    try:
        probe = ffmpeg.probe(video_path)
        duration = float(probe['format']['duration'])
        return duration
    except ffmpeg.Error as e:
        print(f"Error occurred while retrieving video duration: {e}")
        return -1

def compress_video(input_video, output_video):

    duration = get_video_duration(input_video)
    
    if duration == -1:
        print("Error. Could not acquire video duration")
        return False

    if duration <= 480:  # Video is less than or equal to 8 minutes
        print("Video duration is less than 8 minutes. No compression needed.")
        return True

    try:
        ffmpeg.input(input_video).output(output_video, c='libx264', preset='slow', crf=18).run()
        return True
    except ffmpeg.Error as e:
        print(f"Error occurred during video compression: {e}")
        return False
    
def extract_audio_from_video(video_path, audio_output_path):
    #if not is_mp4(video_path):
        #print("Not MP4 file")
        #exit(1)
    try:
        ffmpeg.input(video_path).output(audio_output_path).run()
        print(f"Audio extracted successfully to: {audio_output_path}")
        return True
    except ffmpeg.Error as e:
        print(f"Error occurred during audio extraction: {e}")
        return False

def transcribe_audio_with_whisper(audio_path, openai_api_key):
    openai_api_key = openai.api_key
    
    with open(audio_path, "rb") as f:
        response = openai.Audio.transcribe("whisper-1", f)
    
    #transcript = response.get("data").get("text")
        summary = summarize_with_gpt3(response)
        return summary

def process_video_for_transcription(video_path):
    # Step 1: Check if video is mp4
    if not is_mp4(video_path):
        return {"error": "The provided file is not an MP4 video."}
    
    # Step 2: Compress video if needed
    compressed_video_path = "compressed_video.mp4"
    if not compress_video(video_path, compressed_video_path):
        return {"error": "Failed to compress the video."}
    
    # Step 3: Extract audio from compressed video
    audio_output_path = "extracted_audio.wav"
    if not extract_audio_from_video(compressed_video_path, audio_output_path):
        return {"error": "Failed to extract audio from the video."}
    
    # Step 4: Transcribe audio
    transcript = transcribe_audio_with_whisper(audio_output_path)
    if not transcript:
        return {"error": "Failed to transcribe the audio."}
    
    return {"transcription": transcript}

if __name__ == "__main__":

    #TESTING PURPOSES. Not needed for end. Switch statements will be applied to handle cases.
    video_path = input("Enter the path to the video file: ")
    audio_output_path = "extracted_audio.wav"
    openai_api_key = openai.api_key  # Replace with your OpenAI API key

    if extract_audio_from_video(video_path, audio_output_path):
        transcript = transcribe_audio_with_whisper(audio_output_path, openai_api_key)
        print("Transcription:\n", transcript)
