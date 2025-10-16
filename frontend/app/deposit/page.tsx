'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

const PAYMENT_METHODS = [
  { id: 'credit-card', name: 'Credit/Debit Card', icon: '💳', min: 10, max: 10000 },
  { id: 'crypto', name: 'Cryptocurrency', icon: '₿', min: 20, max: 50000 },
  { id: 'bank-transfer', name: 'Bank Transfer', icon: '🏦', min: 50, max: 100000 },
  { id: 'e-wallet', name: 'E-Wallet', icon: '💰', min: 10, max: 5000 },
];

export default function DepositPage() {
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

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const depositAmount = parseFloat(amount);
    const method = PAYMENT_METHODS.find((m) => m.id === selectedMethod);

    if (!method) return;

    if (depositAmount < method.min) {
      setError(`Minimum deposit for ${method.name} is $${method.min}`);
      return;
    }

    if (depositAmount > method.max) {
      setError(`Maximum deposit for ${method.name} is $${method.max}`);
      return;
    }

    if (!token) {
      setError('You must be logged in to make a deposit');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.transactions.deposit(token, {
        amount: depositAmount,
        paymentMethod: method.name,
      });

      if (response.newBalance !== undefined) {
        setSuccess(`Deposit successful! Your new balance is $${response.newBalance.toFixed(2)}`);
        setAmount('');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setError(response.message || 'Deposit failed');
      }
    } catch {
      setError('An error occurred during deposit');
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
          <h1 className="text-4xl font-bold text-white mb-2">Make a Deposit</h1>
          <p className="text-gray-300">Add funds to your account securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deposit Form */}
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

              <form onSubmit={handleDeposit} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
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
                    Deposit Amount
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
                      max={selectedPaymentMethod?.max}
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-xl placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                  {selectedPaymentMethod && (
                    <p className="mt-2 text-sm text-gray-400">
                      Min: ${selectedPaymentMethod.min} | Max: ${selectedPaymentMethod.max.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quick Select
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[25, 50, 100, 500].map((quickAmount) => (
                      <button
                        key={quickAmount}
                        type="button"
                        onClick={() => setAmount(quickAmount.toString())}
                        className="py-2 px-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white hover:border-yellow-400 hover:bg-yellow-400/10 transition-all"
                      >
                        ${quickAmount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold text-lg rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Processing...' : `Deposit $${amount || '0.00'}`}
                </button>
              </form>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Current Balance */}
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white">
              <div className="text-sm opacity-90 mb-1">Current Balance</div>
              <div className="text-3xl font-bold">${user.balance.toFixed(2)}</div>
            </div>

            {/* Deposit Info */}
            <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Deposit Information</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Instant deposits - play immediately</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Secure SSL encryption</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Multiple payment options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>24/7 customer support</span>
                </li>
              </ul>
            </div>

            {/* Responsible Gaming */}
            <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Responsible Gaming</h3>
              <p className="text-sm text-gray-300 mb-4">
                Set deposit limits to stay in control of your spending.
              </p>
              <Link
                href="/dashboard"
                className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
              >
                Manage Limits →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
