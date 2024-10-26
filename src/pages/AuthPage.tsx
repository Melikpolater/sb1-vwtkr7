import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      toast.success(isLogin ? 'Giriş başarılı!' : 'Kayıt başarılı!');
      navigate('/');
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'} - AkılTek</title>
        <meta name="description" content="AkılTek platformuna giriş yapın veya yeni hesap oluşturun." />
      </Helmet>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'AkılTek\'e Hoş Geldiniz' : 'Yeni Hesap Oluşturun'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-center w-full text-indigo-600 hover:text-indigo-700"
        >
          {isLogin ? 'Yeni hesap oluştur' : 'Zaten hesabın var mı? Giriş yap'}
        </button>
      </div>
    </>
  );
}