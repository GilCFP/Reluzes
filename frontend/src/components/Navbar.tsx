import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Reluzes
          </Link>
          
          <div className="space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Início
            </Link>
            <Link to="/inscricao" className="text-gray-600 hover:text-blue-600">
              Inscrição
            </Link>
            <Link to="/galeria" className="text-gray-600 hover:text-blue-600">
              Galeria
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}