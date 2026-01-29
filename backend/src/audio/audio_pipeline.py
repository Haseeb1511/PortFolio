from pydub import AudioSegment
from openai import OpenAI
from dotenv import load_dotenv  
load_dotenv()

client = OpenAI()

class AudioToText:
    def transcribe(self, audio_path: str) -> str:
        try:
            # Convert webm to wav if needed
            if audio_path.endswith(".webm"):
                wav_path = audio_path.replace(".webm", ".wav")
                AudioSegment.from_file(audio_path, format="webm").export(wav_path, format="wav")   
                audio_path = wav_path

            with open(audio_path, "rb") as audio:
                transcript = client.audio.transcriptions.create(
                model="gpt-4o-transcribe",
                file=audio,
                language="en",
                temperature=0,
                prompt="Transcribe the following audio in English."
            ) #type:ignore
            return transcript.text
        except Exception as e:
            print("Transcription error:", e)
            return "[Transcription failed]"




# sounddevice records audio from server microphone
# Your FastAPI server (Docker / EC2) has no mic
# Browser users must record audio client-side


# React (Browser)
# Record audio using Web Audio API / MediaRecorder
# Send audio file (wav / webm) to FastAPI

# ⬇️
# FastAPI (Backend)
# Receive audio file
# Transcribe (Whisper / OpenAI / local)
# Send transcription into your existing RAG graph
# Get answer text
# Convert answer → TTS
# Return:
# transcription
# answer text
# TTS audio URL / bytes

# ⬆️
# React
# Play audio response
# Show text response