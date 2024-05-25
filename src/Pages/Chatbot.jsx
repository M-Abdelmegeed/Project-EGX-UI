import React, { useState } from "react";
import "./Chatbot.css"; // Create and import a CSS file for styling
import serverUrl from "../serverURL";
import Navbar from "../Components/Navbar";
import axios from "axios"; // Import axios
import { FiSend } from "react-icons/fi";
import { FaUser, FaRobot } from "react-icons/fa"; // Import icons for user and bot
import parse from "html-react-parser"; // Import html-react-parser
import { v4 as uuid } from "uuid";
import { GiEgyptianSphinx } from "react-icons/gi";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const newUuid = uuid();

  const formatMessage = (text) => {
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold
      .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;") // Tabs
      .replace(/\n/g, "<br>"); // Newlines

    return formattedText;
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${serverUrl}/chatbot`, // Assuming serverUrl is defined and exported from serverURL.js
        {
          message: input,
          session_id: newUuid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);
      const botMessage = { sender: "bot", text: formatMessage(data.output) };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: formatMessage("Sorry, **something** went wrong."),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar heading="Chat" />
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <div className="message-content">{parse(msg.text)}</div>
              <div className="message-icon">
                {msg.sender === "user" ? <FaUser /> : <GiEgyptianSphinx />}
              </div>
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
            <FiSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
