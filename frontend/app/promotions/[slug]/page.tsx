'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Promotion } from '@/types';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

export default function PromotionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const slug = params.slug as string;
        const data = await api.promotions.getBySlug(slug);
        
        if (data._id) {
          setPromotion(data);
        } else {
          setError('Promotion not found');
        }
      } catch {
        setError('Failed to load promotion details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotion();
  }, [params.slug]);

  const handleClaimPromotion = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    // In a real app, this would activate the promotion for the user
    alert(`Promotion "${promotion?.title}" claimed successfully!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading promotion...</div>
      </div>
    );
  }

  if (error || !promotion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error || 'Promotion not found'}</p>
          <Link href="/promotions" className="text-yellow-400 hover:text-yellow-300">
            ← Back to Promotions
          </Link>
        </div>
      </div>
    );
  }

  const isEligible = !user || promotion.eligibleVipLevels.length === 0 || 
    (user && promotion.eligibleVipLevels.includes(user.vipLevel));

  const typeIcons: Record<string, string> = {
    'welcome-bonus': '🎉',
    'reload-bonus': '💰',
    'free-spins': '🎰',
    'cashback': '💵',
    'vip-bonus': '👑',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-yellow-400 hover:text-yellow-300">
            Home
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <Link href="/promotions" className="text-yellow-400 hover:text-yellow-300">
            Promotions
          </Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-300">{promotion.title}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-2xl overflow-hidden mb-8">
          {/* Promotion Banner */}
          <div className="relative h-64 bg-gradient-to-br from-purple-600 to-pink-600">
            <Image
              src={promotion.image}
              alt={promotion.title}
              fill
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">{typeIcons[promotion.type] || '🎁'}</div>
                <h1 className="text-5xl font-bold text-white mb-2">{promotion.title}</h1>
                <p className="text-xl text-gray-200">{promotion.description}</p>
              </div>
            </div>
          </div>

          {/* Promotion Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Bonus Amount */}
              {promotion.bonusPercentage && (
                <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 border border-green-500/30 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    {promotion.bonusPercentage}%
                  </div>
                  <div className="text-gray-300">Bonus Percentage</div>
                  {promotion.maxBonus && (
                    <div className="text-sm text-gray-400 mt-1">Up to ${promotion.maxBonus}</div>
                  )}
                </div>
              )}

              {/* Free Spins */}
              {promotion.freeSpins && (
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 border border-purple-500/30 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    {promotion.freeSpins}
                  </div>
                  <div className="text-gray-300">Free Spins</div>
                </div>
              )}

              {/* Wagering */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 border border-yellow-500/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  {promotion.wageringRequirement}x
                </div>
                <div className="text-gray-300">Wagering Requirement</div>
              </div>
            </div>

            {/* Eligibility and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-700/30 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-4">Eligibility</h3>
                <div className="space-y-3">
                  {promotion.minDeposit && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Min Deposit:</span>
                      <span className="text-white font-semibold">${promotion.minDeposit}</span>
                    </div>
                  )}
                  {promotion.eligibleVipLevels.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">VIP Levels:</span>
                      <span className="text-white font-semibold capitalize">
                        {promotion.eligibleVipLevels.join(', ')}
                      </span>
                    </div>
                  )}
                  {promotion.promoCode && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Promo Code:</span>
                      <span className="text-yellow-400 font-bold">{promotion.promoCode}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      isEligible ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {isEligible ? '✓ You are eligible' : '✗ Not eligible'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-4">Validity Period</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Valid From:</span>
                    <span className="text-white font-semibold">
                      {new Date(promotion.validFrom).toLocaleDateString()}
                    </span>
                  </div>
                  {promotion.validUntil && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Valid Until:</span>
                      <span className="text-white font-semibold">
                        {new Date(promotion.validUntil).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      promotion.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {promotion.isActive ? '✓ Active' : '✗ Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Claim Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={handleClaimPromotion}
                disabled={!promotion.isActive || !isEligible}
                className="px-12 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold text-xl rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {!isAuthenticated ? 'Login to Claim' : 'Claim Promotion 🎁'}
              </button>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-700/30 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Terms & Conditions</h3>
              <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                {promotion.terms}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">Important Information</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span>Promotion can only be claimed once per account</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span>Wagering requirements must be met before withdrawal</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span>Cassanova reserves the right to modify or cancel promotions at any time</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span>Please gamble responsibly. 18+ only.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
