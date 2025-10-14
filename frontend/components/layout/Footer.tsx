import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/games" className="hover:text-yellow-400 transition-colors">Games</Link></li>
              <li><Link href="/live-casino" className="hover:text-yellow-400 transition-colors">Live Casino</Link></li>
              <li><Link href="/promotions" className="hover:text-yellow-400 transition-colors">Promotions</Link></li>
              <li><Link href="/vip" className="hover:text-yellow-400 transition-colors">VIP Program</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-bold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-yellow-400 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-yellow-400 transition-colors">About Us</Link></li>
              <li><Link href="/banking" className="hover:text-yellow-400 transition-colors">Banking</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-yellow-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/responsible-gaming" className="hover:text-yellow-400 transition-colors">Responsible Gaming</Link></li>
              <li><Link href="/licensing" className="hover:text-yellow-400 transition-colors">Licensing Info</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">24/7 Support</h3>
            <p className="mb-4">Get help anytime, anywhere</p>
            <Link
              href="/support"
              className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold hover:from-yellow-500 hover:to-yellow-700 transition-all"
            >
              Live Chat
            </Link>
          </div>
        </div>

        {/* Payment Methods & License */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm mb-2">Accepted Payment Methods:</p>
              <div className="flex space-x-4 text-2xl">
                <span>💳</span>
                <span>💰</span>
                <span>🏦</span>
                <span>₿</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm mb-2">🛡️ Fully Licensed & Regulated</p>
              <p className="text-xs text-gray-500">© 2025 Cassanova. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Responsible Gaming Notice */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>🔞 18+ Only. Gambling can be addictive. Please play responsibly.</p>
        </div>
      </div>
    </footer>
  );
}
