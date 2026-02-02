
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 rounded-2xl border border-stone-100 flex flex-col h-full">
      <div className="aspect-[4/5] overflow-hidden relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
        <div className="absolute top-4 right-4">
          <span className="bg-stone-900/80 backdrop-blur-md text-stone-100 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow text-center">
        <h3 className="text-2xl font-light text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-grow">
          {product.description}
        </p>
        <div className="mt-auto">
          <div className="text-xl font-medium text-stone-900 mb-6">
            {product.price}
          </div>
          <button className="w-full bg-stone-900 text-white py-4 rounded-xl hover:bg-amber-800 transition-colors duration-300 text-sm tracking-wide font-medium flex items-center justify-center gap-2 group/btn">
            <span>تسوق الآن</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-4 h-4 transform transition-transform group-hover/btn:-translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
