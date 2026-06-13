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
        <main className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm border" aria-label="Daily Check-in Form">
            <h2 className="text-2xl font-bold text-gray-800 mb-6" id="checkin-title">Daily Wellness Check-in</h2>
            
            <section className="space-y-6" aria-labelledby="checkin-title">
                <div>
                    <label htmlFor="stress-slider" className="block text-sm font-medium text-gray-700 mb-2">Stress Level (1-10): {stress}</label>
                    <input id="stress-slider" type="range" min="1" max="10" value={stress} onChange={e => setStress(Number(e.target.value))} className="w-full accent-primary" aria-valuemin={1} aria-valuemax={10} aria-valuenow={stress} />
                </div>
                
                <div>
                    <label htmlFor="sleep-slider" className="block text-sm font-medium text-gray-700 mb-2">Sleep Quality (1-10): {sleep}</label>
                    <input id="sleep-slider" type="range" min="1" max="10" value={sleep} onChange={e => setSleep(Number(e.target.value))} className="w-full accent-secondary" aria-valuemin={1} aria-valuemax={10} aria-valuenow={sleep} />
                </div>
                
                <div>
                    <label htmlFor="burnout-slider" className="block text-sm font-medium text-gray-700 mb-2">Study Burnout (1-10): {burnout}</label>
                    <input id="burnout-slider" type="range" min="1" max="10" value={burnout} onChange={e => setBurnout(Number(e.target.value))} className="w-full accent-red-400" aria-valuemin={1} aria-valuemax={10} aria-valuenow={burnout} />
                </div>

                <div>
                    <label htmlFor="journal-entry" className="block text-sm font-medium text-gray-700 mb-2">Journal Entry (Optional)</label>
                    <textarea 
                        id="journal-entry"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none" 
                        rows={4} 
                        placeholder="What's on your mind today?"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        aria-label="Optional journal entry text area"
                    ></textarea>
                </div>

                <button onClick={submitCheckin} aria-label="Save Check-in" className="w-full py-3 bg-primary text-white rounded-md font-medium hover:bg-teal-500 transition">
                    Save Check-in
                </button>
            </section>
        </main>
    );
}
