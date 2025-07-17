import React, { useState, useRef, useEffect } from 'react';

const N8N_API_ENDPOINT = 'https://your-n8n-endpoint.com/webhook/chatbot'; // Đổi endpoint thành thật

// Cấu trúc tin nhắn có thêm timestamp
interface Message {
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
}

const Chatbot: React.FC = () => {
    // Trạng thái hiện/ẩn chatbot
    const [open, setOpen] = useState(false);

    // Danh sách tin nhắn ban đầu với tin nhắn chào từ bot
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'bot',
            text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
            timestamp: new Date().toLocaleTimeString()
        }
    ]);

    // Trạng thái input người dùng
    const [input, setInput] = useState('');

    // Trạng thái bot đang trả lời
    const [loading, setLoading] = useState(false);

    // Tham chiếu đến phần tử cuối để auto scroll
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll xuống cuối khi có tin nhắn mới hoặc khi mở chat
    useEffect(() => {
        if (open && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open]);

    // Hàm gửi tin nhắn
    const sendMessage = async () => {
        if (!input.trim()) return;

        const now = new Date().toLocaleTimeString(); // Lấy giờ hiện tại

        // Thêm tin nhắn của user
        const userMsg: Message = { sender: 'user', text: input, timestamp: now };
        setMessages((msgs) => [...msgs, userMsg]);

        setInput('');
        setLoading(true);

        try {
            // Gửi đến n8n webhook
            const res = await fetch(N8N_API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            const data = await res.json();

            // Phản hồi từ bot
            const botReply: Message = {
                sender: 'bot',
                text: data.reply || 'Xin lỗi, tôi chưa hiểu ý bạn.',
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages((msgs) => [...msgs, botReply]);
        } catch (e) {
            // Lỗi trong quá trình gọi API
            setMessages((msgs) => [
                ...msgs,
                {
                    sender: 'bot',
                    text: 'Có lỗi xảy ra, vui lòng thử lại sau.',
                    timestamp: new Date().toLocaleTimeString()
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Gửi khi bấm phím Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
            {open ? (
                <div className="w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col border border-gray-200 animate-fade-in">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-primary-600 to-primary-400 rounded-t-xl">
                        <span className="font-semibold text-white">Hỗ trợ khách hàng</span>
                        <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200 text-xl">×</button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-2 bg-gray-50" style={{ scrollbarWidth: 'thin' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                                <div className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${msg.sender === 'user' ? 'bg-primary-600 text-white' : 'bg-white border'}`}>
                                    <div>{msg.text}</div>
                                    <div className="text-[10px] text-gray-500 text-right mt-1">{msg.timestamp}</div>
                                </div>
                            </div>
                        ))}

                        {/* Hiển thị khi đang trả lời */}
                        {loading && (
                            <div className="flex justify-start mb-2">
                                <div className="px-3 py-2 rounded-lg bg-white border max-w-[75%] text-sm italic text-gray-500">
                                    Bot đang trả lời...
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t bg-white flex items-center gap-2">
                        <input
                            type="text"
                            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Nhập tin nhắn..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                            disabled={loading || !input.trim()}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl animate-bounce"
                    aria-label="Mở chatbot hỗ trợ"
                >
                    💬
                </button>
            )}
        </div>
    );
};

export default Chatbot;
