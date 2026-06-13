"use client";
import { useState } from 'react';

export default function CheckinPage() {
    const [stress, setStress] = useState(5);
    const [sleep, setSleep] = useState(5);
    const [burnout, setBurnout] = useState(5);
    const [content, setContent] = useState('');

    const submitCheckin = async () => {
        // Mock submission
        alert("Check-in saved securely.");
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Wellness Check-in</h2>
            
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stress Level (1-10): {stress}</label>
                    <input type="range" min="1" max="10" value={stress} onChange={e => setStress(Number(e.target.value))} className="w-full accent-primary" />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Quality (1-10): {sleep}</label>
                    <input type="range" min="1" max="10" value={sleep} onChange={e => setSleep(Number(e.target.value))} className="w-full accent-secondary" />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Study Burnout (1-10): {burnout}</label>
                    <input type="range" min="1" max="10" value={burnout} onChange={e => setBurnout(Number(e.target.value))} className="w-full accent-red-400" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Journal Entry (Optional)</label>
                    <textarea 
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" 
                        rows={4} 
                        placeholder="What's on your mind today?"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    ></textarea>
                </div>

                <button onClick={submitCheckin} className="w-full py-3 bg-primary text-white rounded-md font-medium hover:bg-teal-500 transition">
                    Save Check-in
                </button>
            </div>
        </div>
    );
}
