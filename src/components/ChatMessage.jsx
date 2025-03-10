import ChatBotIcon from "./ChatBotIcon";

function ChatMessage({ chat }) {
    return (
        <div className={`message flex gap-3 ${chat.role === "model" ? "items-start" : "items-end"} flex-col`}>
            {chat.role === "model" && (  
                <div className="flex items-center justify-center w-8 h-8">
                    <ChatBotIcon /> 
                </div>
            )}
            <p className={`message-text px-4 py-3 max-w-[75%] text-[15px] 
                ${chat.role === "model" 
                    ? "bg-[#f1f1f1] text-black rounded-s-xl rounded-tr-xl rounded-br-sm"  
                    : "bg-[#6d4fc2] text-white rounded-e-xl rounded-tl-xl rounded-bl-sm"
                }`}>
                {chat.text}
            </p>
        </div>
    );
}

export default ChatMessage;
