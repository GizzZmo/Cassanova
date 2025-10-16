'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Transaction } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, isAuthenticated, logout } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchTransactions = async () => {
      if (token) {
        try {
          const data = await api.transactions.getAll(token);
          setTransactions(data);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTransactions();
  }, [isAuthenticated, token, router]);

  if (!user || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const vipLevelColors = {
    bronze: 'from-orange-600 to-orange-800',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-purple-400 to-purple-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user.firstName || user.username}! 🎰
          </h1>
          <p className="text-gray-300">Manage your account and check your gaming activity</p>
        </div>

        {/* Account Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-100">Balance</span>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-3xl font-bold">${user.balance.toFixed(2)}</div>
          </div>

          {/* Bonus Balance Card */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-yellow-100">Bonus Balance</span>
              <span className="text-2xl">🎁</span>
            </div>
            <div className="text-3xl font-bold">${user.bonusBalance.toFixed(2)}</div>
          </div>

          {/* VIP Level Card */}
          <div className={`bg-gradient-to-br ${vipLevelColors[user.vipLevel]} rounded-xl p-6 text-white`}>
            <div className="flex items-center justify-between mb-2">
              <span className="opacity-90">VIP Level</span>
              <span className="text-2xl">👑</span>
            </div>
            <div className="text-3xl font-bold capitalize">{user.vipLevel}</div>
          </div>

          {/* KYC Status Card */}
          <div className={`bg-gradient-to-br ${user.kycStatus === 'verified' ? 'from-blue-500 to-blue-700' : 'from-gray-500 to-gray-700'} rounded-xl p-6 text-white`}>
            <div className="flex items-center justify-between mb-2">
              <span className="opacity-90">KYC Status</span>
              <span className="text-2xl">
                {user.kycStatus === 'verified' ? '✅' : user.kycStatus === 'pending' ? '⏳' : '❌'}
              </span>
            </div>
            <div className="text-2xl font-bold capitalize">{user.kycStatus}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/deposit"
            className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 hover:border-yellow-400 transition-all transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Deposit</h3>
                <p className="text-gray-400 text-sm">Add funds to your account</p>
              </div>
            </div>
          </Link>

          <Link
            href="/withdraw"
            className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 hover:border-yellow-400 transition-all transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💸</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Withdraw</h3>
                <p className="text-gray-400 text-sm">Cash out your winnings</p>
              </div>
            </div>
          </Link>

          <Link
            href="/promotions"
            className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 hover:border-yellow-400 transition-all transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Promotions</h3>
                <p className="text-gray-400 text-sm">View available bonuses</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all"
            >
              Logout
            </button>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No transactions yet</p>
              <Link href="/deposit" className="text-yellow-400 hover:text-yellow-300 mt-2 inline-block">
                Make your first deposit →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300">Type</th>
                    <th className="text-left py-3 px-4 text-gray-300">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 text-gray-300">Date</th>
                    <th className="text-left py-3 px-4 text-gray-300">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 10).map((transaction) => (
                    <tr key={transaction._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-3 px-4">
                        <span className={`capitalize font-medium ${
                          transaction.type === 'deposit' ? 'text-green-400' :
                          transaction.type === 'withdrawal' ? 'text-blue-400' :
                          transaction.type === 'win' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white font-semibold">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                          transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                          transaction.status === 'failed' ? 'bg-red-500/20 text-red-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {transaction.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
