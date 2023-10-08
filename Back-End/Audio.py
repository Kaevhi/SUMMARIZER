import openai
from WhisperAI import *
from documentfunction import *

openai.api_key = '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'
def transcribe_audio_with_whisper(audio_path):
    openai_api_key = openai.api_key
    
    with open(audio_path, "rb") as f:
        response = openai.Audio.transcribe("whisper-1", f)
    
    #transcript = response.get("data").get("text")
        summary = summarize_with_gpt3(response)
        return summary

if __name__ == '__main__':
    audio_path = input("Enter the path to your audio file: ")
    transcript = transcribe_audio_with_whisper(audio_path)
    print("Transcription:\n", transcript)
