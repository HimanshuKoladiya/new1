"use client";
import { useState, useEffect, useRef } from 'react';

export default function ChatPage() {
    const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
    const [input, setInput] = useState('');
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Assume session_id is 1 for demo purposes
        ws.current = new WebSocket('ws://localhost:8000/api/v1/chat/ws/1');
        ws.current.onmessage = (event) => {
            setMessages(prev => [...prev, { role: 'model', content: event.data }]);
        };
        return () => ws.current?.close();
    }, []);

    const sendMessage = () => {
        if (!input.trim() || !ws.current) return;
        setMessages(prev => [...prev, { role: 'user', content: input }]);
        ws.current.send(input);
        setInput('');
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col h-[70vh] border rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="p-4 bg-primary text-white font-semibold">Zenith Safe Space Chat</div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                {messages.map((m, i) => (
                    <div key={i} className={`p-3 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-teal-100 self-end text-teal-900' : 'bg-gray-100 self-start text-gray-800'}`}>
                        {m.content}
                    </div>
                ))}
            </div>
            <div className="p-4 border-t flex gap-2">
                <input 
                    type="text" 
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How are you feeling today?" 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-teal-500 transition">Send</button>
            </div>
        </div>
    );
}
