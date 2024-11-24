import { GiftForm } from '@/components/gift-form';
import { GiftIcon } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-4 dark:bg-red-900 mb-4">
          </div>
          <div className="flex justify-center py-4">
          <Image
            src="/image-3.png"
            alt="Logo"
            width={150}
            height={50}
            priority
          />
        </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Holiday Gift Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find the perfect gift for your loved ones this holiday season
          </p>
        </div>
        <GiftForm />
      </div>
    </main>
  );
}