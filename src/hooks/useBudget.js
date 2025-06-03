import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

const defaultCategories = [
  { id: 'food', name: 'Alimentação', color: '#ff6b6b', icon: '🍽️' },
  { id: 'transport', name: 'Transporte', color: '#4ecdc4', icon: '🚗' },
  { id: 'entertainment', name: 'Entretenimento', color: '#45b7d1', icon: '🎬' },
  { id: 'shopping', name: 'Compras', color: '#f9ca24', icon: '🛍️' },
  { id: 'health', name: 'Saúde', color: '#6c5ce7', icon: '🏥' },
  { id: 'education', name: 'Educação', color: '#a29bfe', icon: '📚' },
  { id: 'bills', name: 'Contas', color: '#fd79a8', icon: '📄' },
  { id: 'other', name: 'Outros', color: '#636e72', icon: '📦' },
  { id: 'farmacia', name: 'Farmácia', color: '#a29bfe', icon: '🏥' },
  { id: 'gas', name: 'Gasolina', color: '#fd79a8', icon: '📄' },
  { id: 'vest', name: 'Vestuário', color: '#636e72', icon: '📦' }
];

export function useBudget() {
  const [data, setData] = useState({
    transactions: [],
    categories: defaultCategories,
    goals: [],
    monthlyBudget: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*');
      if (categoriesError) throw categoriesError;

      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });
      if (transactionsError) throw transactionsError;

      const { data: goalsData, error: goalsError } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });
      if (goalsError) throw goalsError;
      
      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .select('monthly_budget')
        .eq('id', 1)
        .single();
      if (settingsError && settingsError.code !== 'PGRST116') { 
        throw settingsError;
      }

      setData({
        transactions: transactionsData.map(t => ({...t, category: t.category_id })),
        categories: categoriesData.length > 0 ? categoriesData : defaultCategories,
        goals: goalsData,
        monthlyBudget: settingsData?.monthly_budget || 0
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addTransaction = async (transaction) => {
    const transactionPayload = {
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      date: new Date().toISOString(),
      category_id: transaction.type === 'expense' ? transaction.category : null 
    };

    const { data: insertedTransaction, error } = await supabase
      .from('transactions')
      .insert([transactionPayload])
      .select()
      .single();

    if (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
    setData(prev => ({
      ...prev,
      transactions: [{...insertedTransaction, category: insertedTransaction.category_id}, ...prev.transactions]
    }));
    return insertedTransaction;
  };

  const deleteTransaction = async (id) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
    setData(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id)
    }));
  };

  const addGoal = async (goal) => {
    const newGoal = {
      ...goal,
      createdAt: new Date().toISOString()
    };
    
    const { data: insertedGoal, error } = await supabase
      .from('goals')
      .insert([newGoal])
      .select()
      .single();

    if (error) {
      console.error('Error adding goal:', error);
      throw error;
    }
    setData(prev => ({
      ...prev,
      goals: [insertedGoal, ...prev.goals]
    }));
    return insertedGoal;
  };

  const updateGoal = async (id, updates) => {
    const { data: updatedGoal, error } = await supabase
      .from('goals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(goal => 
        goal.id === id ? updatedGoal : goal
      )
    }));
    return updatedGoal;
  };

  const deleteGoal = async (id) => {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
    setData(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== id)
    }));
  };

  const setMonthlyBudget = async (budget) => {
    const { error } = await supabase
      .from('settings')
      .update({ monthly_budget: budget })
      .eq('id', 1);
      
    if (error) {
        const { error: insertError } = await supabase
            .from('settings')
            .insert({ id: 1, monthly_budget: budget });
        if (insertError) {
            console.error('Error setting monthly budget (update and insert):', insertError);
            throw insertError;
        }
    }
    setData(prev => ({
      ...prev,
      monthlyBudget: budget
    }));
  };

  const addCategory = async (category) => {
    const { data: newCategory, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single();

    if (error) {
      console.error('Erro ao adicionar categoria:', error);
      throw error;
    }

    setData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));

    return newCategory;
  };

  const updateCategory = async (id, updates) => {
    const { data: updatedCategory, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar categoria:', error);
      throw error;
    }

    setData(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === id ? updatedCategory : c
      )
    }));

    return updatedCategory;
  };

  const deleteCategory = async (id) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar categoria:', error);
      throw error;
    }

    setData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== id)
    }));
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthTransactions = data.transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const expensesByCategory = data.categories.map(category => {
    const categoryExpenses = currentMonthTransactions
      .filter(t => t.type === 'expense' && t.category === category.id)
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      ...category,
      amount: categoryExpenses,
      percentage: totalExpenses > 0 ? (categoryExpenses / totalExpenses) * 100 : 0
    };
  }).filter(cat => cat.amount > 0);

  return {
    data,
    loading,
    addTransaction,
    deleteTransaction,
    addGoal,
    updateGoal,
    deleteGoal,
    setMonthlyBudget,
    addCategory,
    updateCategory,
    deleteCategory,
    totalIncome,
    totalExpenses,
    balance,
    expensesByCategory,
    currentMonthTransactions,
    fetchData
  };
}
