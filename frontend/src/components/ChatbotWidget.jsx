import React, { useState, useEffect, useRef } from "react";
import { X, MessageCircle } from "lucide-react";
import "./ChatbotWidget.css";

/* ------------------ Predefined Questions ------------------ */
const PREDEFINED_QUESTIONS = [
  "Who is Haseeb Manzoor?",
  "What is Haseeb Manzoor's education?",
  "What skills does Haseeb Manzoor have?",
  "Where does Haseeb Manzoor currently live?",
  "What projects has Haseeb Manzoor worked on?"
];

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I am your AI assistant. Ask me anything about Haseeb Manzoor." }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Audio recording
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [recording, setRecording] = useState(false);

  /* ------------------ Auto Scroll ------------------ */
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* ------------------ Handle Enter Key ------------------ */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ------------------ Send Message ------------------ */
  const sendMessage = async (text) => {
    const message = (text ?? input).trim();
    if (!message) return;

    setMessages((prev) => [...prev, { from: "user", text: message }]);
    setInput("");
    setLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let botMessage = "";
      let buffer = "";

      // Add empty bot message for streaming
      setMessages((prev) => [...prev, { from: "bot", text: "" }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith("data:")) continue;

          try {
            const data = JSON.parse(trimmedLine.replace(/^data:\s*/, ""));
            if (data.token) {
              botMessage += data.token;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { from: "bot", text: botMessage };
                return newMessages;
              });
            }
          } catch (err) {
            console.error("Failed to parse SSE data:", trimmedLine, err);
          }
        }
      }

      if (!botMessage) {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            from: "bot",
            text: "Sorry, I didn't receive a response. Please try again."
          };
          return newMessages;
        });
      }
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
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
      console.error("Microphone error:", err);
      alert("Microphone access denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };

  /* ------------------ SEND AUDIO - FULLY FIXED ------------------ */
  const sendAudio = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("file", audioBlob, "voice.webm");

    setLoading(true);
    abortControllerRef.current = new AbortController();

    let transcriptionText = "";
    let botMessage = "";
    let buffer = "";
    let botMessageIndexRef = null;
    let botMessageCreated = false; // Track if we've created the bot message

    try {
      const response = await fetch("http://localhost:8000/chat/audio", {
        method: "POST",
        body: formData,
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith("data:")) continue;

          try {
            const data = JSON.parse(trimmedLine.replace(/^data:\s*/, ""));

            // Handle transcription
            if (data.type === "transcription") {
              transcriptionText = data.text;

              // Add user message with transcription
              setMessages((prev) => {
                const newMessages = [...prev, { from: "user", text: transcriptionText }];
                // Store the index where bot message will be added
                botMessageIndexRef = newMessages.length;
                return newMessages;
              });
            }

            // Handle bot tokens
            else if (data.type === "token") {
              // Create empty bot message on first token if not already created
              if (!botMessageCreated) {
                setMessages((prev) => {
                  // If we haven't set the index yet (no transcription), set it now
                  if (botMessageIndexRef === null) {
                    botMessageIndexRef = prev.length;
                  }
                  return [...prev, { from: "bot", text: "" }];
                });
                botMessageCreated = true;
              }

              botMessage += data.token;

              // Update bot message at the stored index
              setMessages((prev) => {
                const newMessages = [...prev];
                if (botMessageIndexRef !== null && botMessageIndexRef < newMessages.length) {
                  newMessages[botMessageIndexRef] = { from: "bot", text: botMessage };
                }
                return newMessages;
              });
            }

            // Handle errors
            else if (data.type === "error") {
              setMessages((prev) => [...prev, { from: "bot", text: `Error: ${data.message}` }]);
            }
          } catch (err) {
            console.error("Failed to parse audio SSE data:", err);
          }
        }
      }

      // Handle empty response
      if (!transcriptionText && !botMessage) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Audio processing failed. Please try again." }
        ]);
      }
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Audio error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Audio processing failed. Please try again." }
      ]);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  /* ------------------ Cleanup ------------------ */
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      if (recording && mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [recording]);

  /* ------------------ Render ------------------ */
  return (
    <>
      {/* Floating chat icon */}
      <div className="chatbot-icon" onClick={() => setOpen(!open)} title="Chat with AI">
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </div>

      {/* Chat container */}
      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">AI Chatbot</div>

          <div className="chatbot-messages">
            {/* Quick Questions */}
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

            {/* Messages */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${msg.from === "user" ? "user" : "bot"}`}
              >
                {msg.text || (msg.from === "bot" ? <span className="typing-indicator">●●●</span> : "")}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message or use mic..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading || recording}
            />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()}>
              Send
            </button>
            <button
              onClick={recording ? stopRecording : startRecording}
              disabled={loading}
              title={recording ? "Stop recording" : "Start recording"}
              style={{ backgroundColor: recording ? "#ef4444" : undefined }}
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