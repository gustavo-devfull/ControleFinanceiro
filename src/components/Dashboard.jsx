
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard({ totalIncome, totalExpenses, balance, monthlyBudget, goals }) {
  const budgetUsed = monthlyBudget > 0 ? (totalExpenses / monthlyBudget) * 100 : 0;
  const activeGoals = goals.filter(goal => goal.currentAmount < goal.targetAmount);
  const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount);

  const stats = [
    {
      title: 'Receitas',
      value: totalIncome,
      icon: TrendingUp,
      gradient: 'income-gradient',
      textColor: 'text-green-400'
    },
    {
      title: 'Despesas',
      value: totalExpenses,
      icon: TrendingDown,
      gradient: 'expense-gradient',
      textColor: 'text-red-400'
    },
    {
      title: 'Saldo',
      value: balance,
      icon: Wallet,
      gradient: balance >= 0 ? 'income-gradient' : 'expense-gradient',
      textColor: balance >= 0 ? 'text-green-400' : 'text-red-400'
    },
    {
      title: 'Metas Ativas',
      value: activeGoals.length,
      icon: Target,
      gradient: 'savings-gradient',
      textColor: 'text-blue-400',
      isCount: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="glass-effect border-white/20 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-white/80 text-sm font-medium flex items-center gap-2">
                <stat.icon className="w-4 h-4" />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">
                {stat.isCount ? (
                  stat.value
                ) : (
                  `R$ ${Math.abs(stat.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                )}
              </div>
              {stat.title === 'Despesas' && monthlyBudget > 0 && (
                <div className="text-xs text-white/60">
                  {budgetUsed.toFixed(1)}% do orçamento usado
                </div>
              )}
              {stat.title === 'Metas Ativas' && completedGoals.length > 0 && (
                <div className="text-xs text-green-400">
                  {completedGoals.length} meta{completedGoals.length !== 1 ? 's' : ''} concluída{completedGoals.length !== 1 ? 's' : ''}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
