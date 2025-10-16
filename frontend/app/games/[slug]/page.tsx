'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/types';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [game, setGame] = useState<Game | null>(null);
  const [similarGames, setSimilarGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const slug = params.slug as string;
        
        const gameData = await api.games.getBySlug(slug);
        
        if (gameData._id) {
          setGame(gameData);
          
          const allGames = await api.games.getAll({ category: gameData.category });
          const similar = allGames.filter((g: Game) => g._id !== gameData._id).slice(0, 4);
          setSimilarGames(similar);
        } else {
          setError('Game not found');
        }
      } catch {
        setError('Failed to load game details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameData();
  }, [params.slug]);

  const handlePlayGame = (mode: 'real' | 'demo') => {
    if (mode === 'real' && !isAuthenticated) {
      router.push('/login');
      return;
    }
    // In a real app, this would launch the game
    alert(`Launching ${game?.title} in ${mode} mode!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading game...</div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error || 'Game not found'}</p>
          <Link href="/" className="text-yellow-400 hover:text-yellow-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const volatilityColors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-yellow-400 hover:text-yellow-300">
            Home
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <Link href="/games" className="text-yellow-400 hover:text-yellow-300">
            Games
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-300">{game.title}</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Image and Play Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl overflow-hidden">
              {/* Game Image */}
              <div className="relative aspect-video bg-gray-700">
                <Image
                  src={game.thumbnail}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
                {game.hasJackpot && game.jackpotAmount && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-bold">
                    💰 ${game.jackpotAmount.toLocaleString()}
                  </div>
                )}
                {game.isNew && (
                  <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    NEW
                  </div>
                )}
              </div>

              {/* Game Info */}
              <div className="p-8">
                <h1 className="text-4xl font-bold text-white mb-4">{game.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Provider:</span>
                    <span className="text-yellow-400 font-semibold">{game.provider}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white font-semibold capitalize">
                      {game.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{game.description}</p>

                {/* Play Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handlePlayGame('real')}
                    className="flex-1 min-w-[200px] py-4 px-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold text-lg rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105"
                  >
                    Play Now 🎰
                  </button>
                  {game.demoAvailable && (
                    <button
                      onClick={() => handlePlayGame('demo')}
                      className="flex-1 min-w-[200px] py-4 px-6 bg-gray-700 text-white font-bold text-lg rounded-lg hover:bg-gray-600 transition-all"
                    >
                      Try Demo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Similar Games */}
            {similarGames.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-6">Similar Games</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {similarGames.map((similarGame) => (
                    <Link
                      key={similarGame._id}
                      href={`/games/${similarGame.slug}`}
                      className="group bg-gray-800/50 rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-400 transition-all"
                    >
                      <div className="relative aspect-square bg-gray-700">
                        <Image
                          src={similarGame.thumbnail}
                          alt={similarGame.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-white font-semibold text-sm truncate">
                          {similarGame.title}
                        </h3>
                        <p className="text-gray-400 text-xs">{similarGame.provider}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Game Details Sidebar */}
          <div className="space-y-6">
            {/* Game Stats */}
            <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Game Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">RTP</span>
                  <span className="text-white font-semibold">{game.rtp}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Volatility</span>
                  <span className={`font-semibold capitalize ${volatilityColors[game.volatility]}`}>
                    {game.volatility}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Min Bet</span>
                  <span className="text-white font-semibold">${game.minBet}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Max Bet</span>
                  <span className="text-white font-semibold">${game.maxBet}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            {game.features.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {game.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Info */}
            <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Why Play This Game?</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Certified fair gaming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Mobile friendly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Fast payouts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Instant play - no download</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
