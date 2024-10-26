import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Filter, Star } from 'lucide-react';

const CATEGORIES = ['Tümü', 'Görüntü İşleme', 'Metin Üretme', 'Ses İşleme', 'Kod Geliştirme'];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  return (
    <>
      <Helmet>
        <title>AkılTek - AI Araçları Platformu</title>
        <meta name="description" content="En popüler yapay zeka araçlarını keşfedin, değerlendirin ve paylaşın." />
        <meta name="keywords" content="yapay zeka, AI araçları, machine learning, deep learning" />
      </Helmet>

      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Yapay Zeka Araçları Keşfedin
          </h1>
          <p className="text-xl text-gray-600">
            En güncel AI araçlarını keşfedin, değerlendirin ve favori listelerinizi oluşturun
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-100">
            <Filter className="h-5 w-5" />
            <span>Filtrele</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AI Tool cards will be rendered here */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
              alt="AI Tool"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900">ChatGPT</h3>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-gray-600">4.9</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Gelişmiş dil modeli tabanlı sohbet ve içerik üretme aracı
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                Metin Üretme
              </span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                Sohbet
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}