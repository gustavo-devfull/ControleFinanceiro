// OverviewTab.jsx
import React, { useState } from 'react';
import { ExpenseChart } from '@/components/ExpenseChart';
import { TransactionList } from '@/components/TransactionList';
import CategoryFilter from '@/components/CategoryFilter';

function OverviewTab({ transactions, categories, expensesByCategory }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTransactions = transactions.filter(t => {
    const cat = t.category || t.category_id;
    return selectedCategory === 'all' || cat === selectedCategory;
  });

  return (
    <>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart data={expensesByCategory} />
        <TransactionList
          transactions={filteredTransactions}
          categories={categories}
        />
      </div>
    </>
  );
}

export default OverviewTab;
