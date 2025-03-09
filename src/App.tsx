import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SubscriptionPage from './pages/SubscriptionPage'
import GalleryPage from './pages/GalleryPage'
import PaymentSuccess from './components/PaymentSuccess'
import PaymentError from './components/PaymentError'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inscricao" element={<SubscriptionPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-error" element={<PaymentError />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App