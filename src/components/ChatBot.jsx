import ChatBotIcon from "./ChatBotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage"; 
import { useEffect, useRef, useState } from "react";

function ChatBot() {
    const [chatHistory, setChatHistory] = useState([]);
    const chatBotRef = useRef();
    const apiUrl = import.meta.env.VITE_API_URL || "http://default-api-url.com"; 

    const generateBotResponse = async (history) => {
        const updateHistory = (text) => {
            setChatHistory(prev => [
                ...prev.filter(msg => msg.text !== "Thinking..."), 
                { role: "model", text }
            ]);
        };

        history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: history })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");

            const apiResponseText = data.candidates[0].content.parts[0].text
                .replace(/\*\*(.*?)\*\*/g, "$1") 
                .replace(/_(.*?)_/g, "$1")       
                .trim();

            updateHistory(apiResponseText);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (chatBotRef.current) {
            chatBotRef.current.scrollTo({ top: chatBotRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [chatHistory]);

    return (
        <div className="container font-[poppins]">
            <div className="relative w-[420px] bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-[#6d4fc2]">
                    <div className="flex items-center gap-3">
                        <ChatBotIcon />
                        <h2 className="text-white font-bold text-lg">ChatBot</h2>
                    </div>
                </div>

                {/* Chat body */}
                <div ref={chatBotRef} className="h-[460px] overflow-y-auto p-6 flex flex-col gap-5 pb-20">
                    <div className="flex gap-3 items-center">
                        <svg className="h-9 w-9 p-2 fill-white bg-[#6d4fc2] rounded-full" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                            <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z" />
                        </svg>
                        
                        <p className="px-4 py-3 max-w-[75%] text-[15px] bg-[#f6f2ff] rounded-e-lg rounded-tl-lg rounded-bl-sm">
                            Heyy there 👋,<br /> How can I help you today?
                        </p>
                    </div>

                    {/* Render chat history */}
                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat} />
                    ))}
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 w-full pt-4 px-6 pb-5 bg-white">
                    <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
