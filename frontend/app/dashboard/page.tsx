export default function DashboardPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Resilience Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-white rounded-lg shadow-sm border border-l-4 border-l-primary">
                    <h3 className="text-gray-500 text-sm font-medium">Average Stress (7 days)</h3>
                    <p className="text-3xl font-bold mt-2">4.2 / 10</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm border border-l-4 border-l-secondary">
                    <h3 className="text-gray-500 text-sm font-medium">Sleep Quality</h3>
                    <p className="text-3xl font-bold mt-2">Good</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm border border-l-4 border-l-red-400">
                    <h3 className="text-gray-500 text-sm font-medium">Burnout Risk</h3>
                    <p className="text-3xl font-bold mt-2 text-green-600">Low</p>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold text-gray-800 mb-4">AI Insights</h3>
                <p className="text-gray-600">Based on your recent logs, your stress peaks on Thursdays. Try implementing a 10-minute mindfulness break before your afternoon study sessions. The Pomodoro technique has been shown to reduce perceived burnout by 20% in high-stakes environments.</p>
            </div>
        </div>
    );
}
