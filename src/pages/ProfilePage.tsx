import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { Settings, Star, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Çıkış yapıldı');
      navigate('/');
    } catch (error) {
      toast.error('Çıkış yapılırken bir hata oluştu');
    }
  };

  // Mock data - replace with Firebase fetch
  const savedTools = [
    {
      id: '1',
      name: 'ChatGPT',
      description: 'Gelişmiş dil modeli tabanlı sohbet ve içerik üretme aracı',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      rating: 4.9,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Profil - AkılTek</title>
        <meta name="description" content="Kullanıcı profili ve kaydedilen araçlar" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.displayName || user?.email}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                <Settings className="h-5 w-5" />
                <span>Ayarlar</span>
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-5 w-5" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Kaydedilen Araçlar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedTools.map((tool) => (
              <div
                key={tool.id}
                className="flex space-x-4 p-4 border rounded-lg hover:border-indigo-500 transition-colors"
              >
                <img
                  src={tool.imageUrl}
                  alt={tool.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-gray-900">{tool.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {tool.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}