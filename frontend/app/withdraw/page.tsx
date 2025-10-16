'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

const PAYMENT_METHODS = [
  { id: 'bank-transfer', name: 'Bank Transfer', icon: '🏦', min: 50, max: 100000 },
  { id: 'crypto', name: 'Cryptocurrency', icon: '₿', min: 20, max: 50000 },
  { id: 'e-wallet', name: 'E-Wallet', icon: '💰', min: 10, max: 5000 },
];

export default function WithdrawPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuth();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].id);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const withdrawAmount = parseFloat(amount);
    const method = PAYMENT_METHODS.find((m) => m.id === selectedMethod);

    if (!method) return;

    if (!user) {
      setError('User information not found');
      return;
    }

    if (user.kycStatus !== 'verified') {
      setError('KYC verification is required for withdrawals. Please complete your verification first.');
      return;
    }

    if (withdrawAmount < method.min) {
      setError(`Minimum withdrawal for ${method.name} is $${method.min}`);
      return;
    }

    if (withdrawAmount > method.max) {
      setError(`Maximum withdrawal for ${method.name} is $${method.max}`);
      return;
    }

    if (withdrawAmount > user.balance) {
      setError('Insufficient balance');
      return;
    }

    if (!token) {
      setError('You must be logged in to make a withdrawal');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.transactions.withdraw(token, {
        amount: withdrawAmount,
        paymentMethod: method.name,
      });

      if (response.newBalance !== undefined) {
        setSuccess(`Withdrawal request submitted! Your new balance is $${response.newBalance.toFixed(2)}`);
        setAmount('');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setError(response.message || 'Withdrawal failed');
      }
    } catch {
      setError('An error occurred during withdrawal');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  const selectedPaymentMethod = PAYMENT_METHODS.find((m) => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-yellow-400 hover:text-yellow-300 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Withdraw Funds</h1>
          <p className="text-gray-300">Cash out your winnings securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Withdrawal Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-8">
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-lg mb-6">
                  {success}
                </div>
              )}

              {/* KYC Warning */}
              {user.kycStatus !== 'verified' && (
                <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-200 px-4 py-3 rounded-lg mb-6">
                  <p className="font-semibold mb-1">⚠️ KYC Verification Required</p>
                  <p className="text-sm">
                    You need to complete KYC verification before you can withdraw funds. Please contact support.
                  </p>
                </div>
              )}

              <form onSubmit={handleWithdraw} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Select Withdrawal Method
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedMethod === method.id
                            ? 'border-yellow-400 bg-yellow-400/10'
                            : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                        }`}
                      >
                        <div className="text-3xl mb-2">{method.icon}</div>
                        <div className="text-white font-medium text-sm">{method.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                    Withdrawal Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                      $
                    </span>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      min={selectedPaymentMethod?.min}
                      max={Math.min(user.balance, selectedPaymentMethod?.max || user.balance)}
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-xl placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                  {selectedPaymentMethod && (
                    <p className="mt-2 text-sm text-gray-400">
                      Min: ${selectedPaymentMethod.min} | Max: ${Math.min(user.balance, selectedPaymentMethod.max).toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quick Select
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[100, 250, 500, 1000].map((quickAmount) => (
                      <button
                        key={quickAmount}
                        type="button"
                        onClick={() => setAmount(Math.min(quickAmount, user.balance).toString())}
                        disabled={user.balance < quickAmount}
                        className="py-2 px-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white hover:border-yellow-400 hover:bg-yellow-400/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ${quickAmount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || user.kycStatus !== 'verified'}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold text-lg rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Processing...' : `Withdraw $${amount || '0.00'}`}
                </button>
              </form>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Available Balance */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white">
              <div className="text-sm opacity-90 mb-1">Available Balance</div>
              <div className="text-3xl font-bold">${user.balance.toFixed(2)}</div>
            </div>

            {/* KYC Status */}
            <div className={`bg-gradient-to-br ${user.kycStatus === 'verified' ? 'from-green-500 to-green-700' : 'from-yellow-500 to-yellow-700'} rounded-xl p-6 text-white`}>
              <div className="text-sm opacity-90 mb-1">KYC Status</div>
              <div className="text-2xl font-bold capitalize">{user.kycStatus}</div>
              {user.kycStatus !== 'verified' && (
                <p className="text-sm mt-2 opacity-90">Verification required for withdrawals</p>
              )}
            </div>

            {/* Withdrawal Info */}
            <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Withdrawal Information</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Processing time: 1-5 business days</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>KYC verification required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Secure and encrypted</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>24/7 support available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
