// CategoryFilter.jsx
import React from 'react';

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onSelect('all')}
        className={`px-3 py-1 rounded-full text-sm font-medium border ${
          selected === 'all'
            ? 'bg-primary text-white border-primary'
            : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
        }`}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${
            selected === category.id
              ? 'bg-primary text-white border-primary'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
