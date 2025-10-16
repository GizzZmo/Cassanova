import Link from 'next/link';
import Image from 'next/image';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">Cassanova Pages Demo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Login */}
          <Link href="/login" className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6 hover:border-yellow-400 transition-all">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-bold text-white mb-2">Login Page</h3>
            <p className="text-gray-400">User authentication with email and password</p>
          </Link>

          {/* Register */}
          <Link href="/register" className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6 hover:border-yellow-400 transition-all">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-white mb-2">Register Page</h3>
            <p className="text-gray-400">New user registration form</p>
          </Link>

          {/* Dashboard */}
          <Link href="/dashboard" className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6 hover:border-yellow-400 transition-all">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Dashboard</h3>
            <p className="text-gray-400">User account dashboard (requires login)</p>
          </Link>

          {/* Deposit */}
          <Link href="/deposit" className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6 hover:border-yellow-400 transition-all">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold text-white mb-2">Deposit Page</h3>
            <p className="text-gray-400">Add funds to account (requires login)</p>
          </Link>

          {/* Withdraw */}
          <Link href="/withdraw" className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6 hover:border-yellow-400 transition-all">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="text-xl font-bold text-white mb-2">Withdraw Page</h3>
            <p className="text-gray-400">Cash out winnings (requires login)</p>
          </Link>

          {/* Game Detail */}
          <Link href="/games/mega-fortune" className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6 hover:border-yellow-400 transition-all">
            <div className="text-4xl mb-4">🎰</div>
            <h3 className="text-xl font-bold text-white mb-2">Game Detail Page</h3>
            <p className="text-gray-400">Individual game details and play options</p>
          </Link>

          {/* Promotion Detail */}
          <Link href="/promotions/welcome-bonus" className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6 hover:border-yellow-400 transition-all">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">Promotion Detail Page</h3>
            <p className="text-gray-400">Promotion details and terms</p>
          </Link>
        </div>

        <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Screenshots</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Login Page</h3>
              <div className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden">
                <Image 
                  src="https://github.com/user-attachments/assets/b18cf39e-ddd7-4d6d-a51a-5b80c34bd94d" 
                  alt="Login Page"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Register Page</h3>
              <div className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden">
                <Image 
                  src="https://github.com/user-attachments/assets/4d1f300d-577f-4630-a4ae-7c597f95db3c" 
                  alt="Register Page"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-yellow-400 hover:text-yellow-300 text-lg">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
