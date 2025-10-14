export default function WhyChooseUs() {
  const features = [
    {
      icon: '⚡',
      title: 'Fast Payouts',
      description: 'Instant withdrawals processed within 24 hours',
    },
    {
      icon: '🎧',
      title: '24/7 Support',
      description: 'Round-the-clock customer service via live chat',
    },
    {
      icon: '🛡️',
      title: 'Fully Licensed',
      description: 'Regulated and certified by gaming authorities',
    },
    {
      icon: '🎮',
      title: 'Huge Game Selection',
      description: 'Over 1000 slots, table games, and live dealer games',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Cassanova?</h2>
          <p className="text-lg text-gray-600">Join thousands of players who trust us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 hover:border-yellow-400 transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
