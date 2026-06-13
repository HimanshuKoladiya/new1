"use client";
import { useState } from 'react';
import { useUserStore } from '@/store/useStore';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setToken = useUserStore(state => state.setToken);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI...";
        setToken(fakeToken);
        window.location.href = "/dashboard";
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md border w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Login to Zenith</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            required
                            className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-teal-500 transition">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
