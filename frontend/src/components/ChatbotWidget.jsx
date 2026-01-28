import React, { useState, useEffect, useRef } from "react";
import { X, MessageCircle } from "lucide-react";
import "./ChatbotWidget.css";

/* ------------------ Predefined Questions ------------------ */
const PREDEFINED_QUESTIONS = [
  "Who is Haseeb Manzoor?",
  "What is Haseeb Manzoor’s education?",
  "What skills does Haseeb Manzoor have?",
  "Where does Haseeb Manzoor currently live?",
  "What projects has Haseeb Manzoor worked on?"
];

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  // audip parts
  const mediaRecorderRef = useRef(null);  //1
  const audioChunksRef = useRef([]);//2
  const [recording, setRecording] = useState(false);//3


  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I am your AI assistant. Ask me anything about Haseeb Manzoor."
    }
  ]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  /* ------------------ Auto Scroll ------------------ */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* ------------------ Send Message ------------------ */
  const sendMessage = async (text) => {
    const message = (text ?? input).trim();
    if (!message) return;

    setMessages((prev) => [...prev, { from: "user", text: message }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.answer ?? "No answer returned." }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };




  /* ------------------ AUDIO RECORDING ------------------ */

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = sendAudio;

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      alert("Microphone access denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const sendAudio = async () => {
    const audioBlob = new Blob(audioChunksRef.current, {
      type: "audio/webm",
    });

    const formData = new FormData();
    formData.append("file", audioBlob, "voice.webm");

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat/audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { from: "user", text: data.transcription },
        { from: "bot", text: data.answer ?? "No answer returned." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Audio processing failed." },
      ]);
    } finally {
      setLoading(false);
    }
  };





  return (
    <>
      {/* Floating chat icon */}
      <div
        className="chatbot-icon"
        onClick={() => setOpen(!open)}
        title="Chat with AI"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </div>

      {/* Chatbox */}
      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">AI Chatbot</div>

          <div className="chatbot-messages">
            {/* Predefined Questions (shown only at start) */}
            {messages.length === 1 && (
              <div className="quick-questions">
                {PREDEFINED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    className="quick-question-btn"
                    onClick={() => sendMessage(q)}
                    disabled={loading}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${msg.from === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>


{/* Audio + texxt  */}

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message or use mic..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading || recording}
            />

            <button onClick={() => sendMessage()} disabled={loading}>
              Send
            </button>

            <button
              onClick={recording ? stopRecording : startRecording}
              disabled={loading}
              title="Voice input"
            >
              {recording ? "⏹️" : "🎤"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ChatbotWidget;
