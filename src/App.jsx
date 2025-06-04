// App.jsx
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import { Dashboard } from '@/components/Dashboard';
import { GoalForm } from '@/components/GoalForm';
import { GoalCard } from '@/components/GoalCard';
import { useBudget } from '@/hooks/useBudget';
import { motion } from 'framer-motion';
import { Wallet, BarChart3, Target, Settings, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import CategoryManager from '@/components/CategoryManager';
import OverviewTab from '@/components/tabs/OverviewTab';
import TransactionsTab from '@/components/tabs/TransactionsTab';

function App() {
  const {
    data,
    loading,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    addGoal,
    updateGoal,
    deleteGoal,
    setMonthlyBudget,
    totalIncome,
    totalExpenses,
    balance,
    expensesByCategory
  } = useBudget();

  const { toast } = useToast();
  const [newMonthlyBudget, setNewMonthlyBudget] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    setNewMonthlyBudget(data.monthlyBudget > 0 ? data.monthlyBudget.toString() : '');
  }, [data.monthlyBudget]);

  const handleSetBudget = () => {
    const budgetValue = parseFloat(newMonthlyBudget);
    if (isNaN(budgetValue) || budgetValue < 0) {
      toast({
        title: "Erro",
        description: "Por favor, insira um valor de orçamento válido.",
        variant: "destructive"
      });
      return;
    }
    setMonthlyBudget(budgetValue);
    toast({
      title: "Sucesso!",
      description: "Orçamento mensal atualizado."
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
        <p className="text-white/80 text-xl">Carregando seus dados financeiros...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 pt-8">
            <span className="gradient-bg bg-clip-text text-white p-5 rounded-xl mb-6">
              Controle Financeiro
            </span>
          </h1>
          <p className="text-white/80 m-8 text-lg md:text-xl">
            Gerencie suas finanças com inteligência e estilo
          </p>
        </motion.div>

        <Dashboard
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
          monthlyBudget={data.monthlyBudget}
          goals={data.goals}
        />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 glass-effect border-white/20">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Visão Geral</span>
              <span className="sm:hidden">Geral</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Transações</span>
              <span className="sm:hidden">Trans.</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Metas</span>
              <span className="sm:hidden">Metas</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Config.</span>
              <span className="sm:hidden">Conf.</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab
              transactions={data.transactions}
              categories={data.categories}
              expensesByCategory={expensesByCategory}
            />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionsTab
              transactions={data.transactions}
              categories={data.categories}
              onAddTransaction={addTransaction}
              onDeleteTransaction={deleteTransaction}
              onUpdateTransaction={updateTransaction}
            />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <h2 className="text-2xl font-bold text-white">Metas de Economia</h2>
              <GoalForm onAddGoal={addGoal} />
            </div>
            {data.goals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.goals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onUpdate={updateGoal}
                    onDelete={deleteGoal}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Target className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 text-lg">Nenhuma meta criada ainda</p>
                <p className="text-white/40">Crie sua primeira meta de economia!</p>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="glass-effect rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Configurações</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Orçamento Mensal</h3>
                  <div className="flex items-center gap-4 max-w-sm">
                    <Label htmlFor="monthlyBudget" className="text-white sr-only">Orçamento Mensal</Label>
                    <Input
                      id="monthlyBudget"
                      type="number"
                      placeholder="Ex: 3000"
                      value={newMonthlyBudget}
                      onChange={(e) => setNewMonthlyBudget(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                    <Button onClick={handleSetBudget} className="income-gradient text-white border-0">
                      Salvar
                    </Button>
                  </div>
                  <p className="text-xs text-white/50 mt-1">Defina seu limite de gastos mensal.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Categorias de Despesas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {data.categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center gap-2 p-3 rounded-lg glass-effect border border-white/10"
                        style={{ borderLeft: `4px solid ${category.color}`}}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-white text-sm">{category.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-white/50">Estas são as categorias padrão.</p>
                    <Button
                      variant="outline"
                      className="text-sm border-white/20 text-white hover:bg-white/10"
                      onClick={() => setIsCategoryModalOpen(true)}
                    >
                      Editar Categorias
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Toaster />

      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-auto max-h-[90vh] relative">
            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Editar Categorias</h2>
              <CategoryManager />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
