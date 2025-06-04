// TransactionsTab.jsx
import React, { useState } from 'react';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import CategoryFilter from '@/components/CategoryFilter';

function TransactionsTab({ transactions, categories, onAddTransaction, onDeleteTransaction, onUpdateTransaction }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTransactions = transactions.filter(t => {
    const cat = t.category || t.category_id;
    return selectedCategory === 'all' || cat === selectedCategory;
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-bold text-white">Gerenciar Transações</h2>
        <TransactionForm
          categories={categories}
          onAddTransaction={onAddTransaction}
        />
      </div>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <TransactionList
        transactions={filteredTransactions}
        categories={categories}
        onDelete={onDeleteTransaction}
        onUpdate={onUpdateTransaction}
      />
    </>
  );
}

export default TransactionsTab;
