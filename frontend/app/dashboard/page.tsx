export default function DashboardPage() {
    return (
        <main className="max-w-4xl mx-auto" aria-label="Resilience Dashboard">
            <h2 className="text-3xl font-bold text-gray-800 mb-8" id="dashboard-title">Your Resilience Dashboard</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" aria-labelledby="dashboard-title">
                <article className="p-6 bg-white rounded-lg shadow-sm border border-l-4 border-l-primary">
                    <h3 className="text-gray-500 text-sm font-medium">Average Stress (7 days)</h3>
                    <p className="text-3xl font-bold mt-2" aria-label="Average stress level 4.2 out of 10">4.2 / 10</p>
                </article>
                <article className="p-6 bg-white rounded-lg shadow-sm border border-l-4 border-l-secondary">
                    <h3 className="text-gray-500 text-sm font-medium">Sleep Quality</h3>
                    <p className="text-3xl font-bold mt-2">Good</p>
                </article>
                <article className="p-6 bg-white rounded-lg shadow-sm border border-l-4 border-l-red-400">
                    <h3 className="text-gray-500 text-sm font-medium">Burnout Risk</h3>
                    <p className="text-3xl font-bold mt-2 text-green-600">Low</p>
                </article>
            </section>
            
            <section className="bg-white p-6 rounded-lg shadow-sm border" aria-labelledby="ai-insights-title">
                <h3 id="ai-insights-title" className="text-xl font-bold text-gray-800 mb-4">AI Insights</h3>
                <p className="text-gray-600">Based on your recent logs, your stress peaks on Thursdays. Try implementing a 10-minute mindfulness break before your afternoon study sessions. The Pomodoro technique has been shown to reduce perceived burnout by 20% in high-stakes environments.</p>
            </section>
        </main>
    );
}
