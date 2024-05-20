import React, { useState } from "react";
import "./Chatbot.css"; // Create and import a CSS file for styling
import serverUrl from "../serverURL";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import Navbar from "../Components/Navbar";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  //   const [sessionID, setId] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const newUuid = uuid();

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(serverUrl + "/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input, session_id: newUuid }),
      });

      const data = await response.json();
      console.log(data);
      const botMessage = { sender: "bot", text: data.output };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar heading="My Trips" />
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="chat-message bot">
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
