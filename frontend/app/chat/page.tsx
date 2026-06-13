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
        <main className="max-w-2xl mx-auto flex flex-col h-[70vh] border rounded-lg bg-white shadow-sm overflow-hidden" aria-label="Chat Application Main Content">
            <header className="p-4 bg-primary text-white font-semibold" id="chat-header">Zenith Safe Space Chat</header>
            <section className="flex-1 p-4 overflow-y-auto flex flex-col gap-3" aria-live="polite" aria-atomic="false" aria-label="Chat message history">
                {messages.map((m, i) => (
                    <article key={i} className={`p-3 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-teal-100 self-end text-teal-900' : 'bg-gray-100 self-start text-gray-800'}`}>
                        {m.content}
                    </article>
                ))}
            </section>
            <footer className="p-4 border-t flex gap-2">
                <label htmlFor="chat-input" className="sr-only">Type your message</label>
                <input 
                    id="chat-input"
                    type="text" 
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How are you feeling today?" 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && sendMessage()}
                    aria-label="Message input field"
                />
                <button onClick={sendMessage} aria-label="Send message" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-teal-500 transition">Send</button>
            </footer>
        </main>
    );
}
