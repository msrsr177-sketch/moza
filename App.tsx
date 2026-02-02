
import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { Product } from './types';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "عباءة الكتان الفاخرة",
    description: "تصميم عصري يجمع بين التقاليد والحداثة، مصنوعة من أجود أنواع الكتان الطبيعي بلمسات يدوية حصرية.",
    price: "١,٢٥٠ ر.س",
    imageUrl: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800",
    category: "إصدار محدود"
  },
  {
    id: 2,
    name: "عطر العود الأندلسي",
    description: "مزيج ساحر من العود النادر والورد الطائفي، يمنحك حضوراً ملكياً لا ينسى في كل مناسبة.",
    price: "٨٩٠ ر.س",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    category: "الأكثر مبيعاً"
  }
];

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    if (Capacitor.isNativePlatform()) {
      const initializeNotifications = async () => {
        try {
          let permStatus = await PushNotifications.checkPermissions();
          if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
          }
          if (permStatus.receive === 'granted') {
            await PushNotifications.register();
          }
        } catch (error) {
          console.error('Push notification setup failed:', error);
        }
      };

      initializeNotifications();

      const listeners = [
        PushNotifications.addListener('registration', (token) => {
          console.log('Push token:', token.value);
        }),
        PushNotifications.addListener('registrationError', (error) => {
          console.error('Registration error:', error);
        }),
        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('Notification received:', notification);
        })
      ];

      return () => {
        listeners.forEach(l => l.then(h => h.remove()));
      };
    }
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-[#fcfbf7] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* شعار البوتيك */}
      <header className="pt-20 pb-12 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-7xl md:text-9xl font-black text-stone-900 tracking-tighter mb-4 select-none leading-none">
            موزة
          </h1>
          <div className="w-16 h-[1px] bg-amber-700/40 mb-6"></div>
          <p className="text-stone-400 uppercase tracking-[0.5em] text-[10px] md:text-xs font-light">
            Digital Exclusive Experience
          </p>
        </div>
      </header>

      {/* عرض المنتجات - شبكة منتظمة */}
      <main className="flex-grow flex items-center justify-center px-6 pb-24">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="transform transition-all duration-700 delay-300 translate-y-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* التذييل */}
      <footer className="py-12 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-8 text-stone-400 text-[10px] tracking-widest uppercase">
          <p>© ٢٠٢٥ موزة • المفهوم الرقمي الحصري</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-amber-800 transition-colors">الخصوصية</a>
            <a href="#" className="hover:text-amber-800 transition-colors">العضوية</a>
            <a href="#" className="hover:text-amber-800 transition-colors">اتصل بنا</a>
          </div>
        </div>
      </footer>
      
      {/* طبقات خلفية فنية */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#f5f1e6] rounded-full blur-[150px] opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-stone-200 rounded-full blur-[120px] opacity-30"></div>
      </div>
    </div>
  );
};

export default App;
