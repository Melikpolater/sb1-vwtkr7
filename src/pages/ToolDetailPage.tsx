import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, ExternalLink, Bookmark, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { UserReview } from '../types';

export default function ToolDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  // Mock data - replace with Firebase fetch
  const tool = {
    id,
    name: 'ChatGPT',
    description: 'Gelişmiş dil modeli tabanlı sohbet ve içerik üretme aracı',
    category: 'Metin Üretme',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    websiteUrl: 'https://chat.openai.com',
    tags: ['Metin Üretme', 'Sohbet', 'AI'],
  };

  const reviews: UserReview[] = [
    {
      id: '1',
      userId: '1',
      toolId: id!,
      rating: 5,
      comment: 'Harika bir araç, günlük işlerimi çok kolaylaştırıyor.',
      createdAt: new Date(),
      userName: 'Ahmet Yılmaz',
    },
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement review submission
  };

  return (
    <>
      <Helmet>
        <title>{tool.name} - AkılTek</title>
        <meta name="description" content={tool.description} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <img
            src={tool.imageUrl}
            alt={tool.name}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                <Bookmark className="h-5 w-5" />
                <span>Kaydet</span>
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">{tool.rating}</span>
              </div>
              <span className="text-gray-600">{tool.category}</span>
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Siteyi Ziyaret Et</span>
              </a>
            </div>

            <p className="text-gray-600 mb-6">{tool.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Değerlendirmeler
              </h2>

              {user ? (
                <form onSubmit={handleReviewSubmit} className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`${
                            rating >= star
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Bu araç hakkında düşüncelerinizi paylaşın..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={4}
                  />

                  <button
                    type="submit"
                    className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Değerlendir
                  </button>
                </form>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg mb-8">
                  <p className="text-gray-600">
                    Değerlendirme yapmak için lütfen giriş yapın.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {review.userName}
                        </span>
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}