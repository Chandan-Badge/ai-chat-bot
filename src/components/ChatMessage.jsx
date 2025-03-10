import ChatBotIcon from "./ChatBotIcon";

function ChatMessage({ chat }) {
    return (
        <div className={`message ${chat.role === "model" ? "bot" : "user"}-message flex gap-3 flex-col ${chat.role === "model" ? "items-start" : "items-end"}`}>
            {chat.role === "model" && <ChatBotIcon />}
            <p className="message-text px-4 py-3 max-w-[75%] text-[15px] bg-[#6d4fc2] text-[#fff] rounded-s-xl rounded-tr-xl rounded-br-sm">
                {chat.text}
            </p>
        </div>
    );
}

export default ChatMessage;
