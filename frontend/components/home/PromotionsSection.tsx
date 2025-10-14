import Link from 'next/link';

export default function PromotionsSection() {
  const promotions = [
    {
      id: 1,
      title: 'Weekly Cashback',
      description: 'Get up to 20% cashback on your losses every week',
      icon: '💵',
      color: 'from-green-500 to-emerald-600',
    },
    {
      id: 2,
      title: 'Friday Free Spins',
      description: '50 Free Spins every Friday on selected games',
      icon: '🎡',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      id: 3,
      title: 'Reload Bonus',
      description: '100% match up to $200 on your next deposit',
      icon: '🎁',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Hot Promotions</h2>
          <p className="text-lg text-gray-300">Exclusive offers and bonuses for our players</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border-2 border-gray-700 hover:border-yellow-400 transition-all transform hover:scale-105 cursor-pointer shadow-xl"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${promo.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                {promo.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{promo.title}</h3>
              <p className="text-gray-400 mb-6">{promo.description}</p>
              <Link
                href={`/promotions/${promo.id}`}
                className="inline-block text-yellow-400 hover:text-yellow-300 font-bold transition-colors"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/promotions"
            className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View All Promotions
          </Link>
        </div>
      </div>
    </section>
  );
}
