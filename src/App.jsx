import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RestaurantListingPage from './pages/RestaurantListingPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/restaurants" element={<RestaurantListingPage />} />
              <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={
                <div className="min-h-[60vh] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">😅</div>
                    <h1 className="text-3xl font-bold text-neutral-800 mb-2">Page Not Found</h1>
                    <p className="text-neutral-600 mb-6">The page you're looking for doesn't exist.</p>
                    <a href="/" className="text-primary hover:text-primary-dark font-medium">
                      Go Home
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
