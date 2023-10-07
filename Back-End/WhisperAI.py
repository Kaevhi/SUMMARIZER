import ffmpeg
import openai
import magic 

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
    if not is_mp4(video_path):
        print("Not MP4 file")
        exit(1)
    try:
        ffmpeg.input(video_path).output(audio_output_path).run()
        print(f"Audio extracted successfully to: {audio_output_path}")
        return True
    except ffmpeg.Error as e:
        print(f"Error occurred during audio extraction: {e}")
        return False

def transcribe_audio_with_whisper(audio_path, openai_api_key):
    openai.api_key = openai_api_key
    
    with open(audio_path, "rb") as f:
        response = openai.WhisperASR.recognize(file=f)
    
    transcript = response.get("data").get("text")
    return transcript

if __name__ == "__main__":

    #TESTING PURPOSES. Not needed for end. Switch statements will be applied to handle cases.
    video_path = input("Enter the path to the video file: ")
    audio_output_path = "extracted_audio.wav"
    openai_api_key = "YOUR_OPENAI_API_KEY"  # Replace with your OpenAI API key

    if extract_audio_from_video(video_path, audio_output_path):
        transcript = transcribe_audio_with_whisper(audio_output_path, openai_api_key)
        print("Transcription:\n", transcript)
