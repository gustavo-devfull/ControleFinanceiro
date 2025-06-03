
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TransactionList({ transactions, categories, onDelete }) {
  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || { name: 'Outros', icon: '📦' };
  };

  return (
    <Card className="chart-container border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          📋 Transações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {transactions.length > 0 ? (
              transactions.slice(0, 10).map((transaction) => {
                const category = getCategoryInfo(transaction.category);
                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-3 rounded-lg glass-effect border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {transaction.type === 'income' ? (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : (
                          <span className="text-sm">{category.icon}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <p className="text-white/60 text-sm">
                          {transaction.type === 'expense' && category.name}
                          {transaction.type === 'income' && 'Receita'}
                          {' • '}
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                        {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(transaction.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-8 text-white/60">
                <p>Nenhuma transação registrada</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
