import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

export function TransactionForm({ categories, onAddTransaction }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: categories.length > 0 ? categories[0].id : '' 
  });
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description || (formData.type === 'expense' && !formData.category)) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      await onAddTransaction({
        ...formData,
        amount: parseFloat(formData.amount)
      });

      toast({
        title: "Sucesso!",
        description: `${formData.type === 'income' ? 'Receita' : 'Despesa'} adicionada com sucesso.`
      });

      setFormData({
        type: 'expense',
        amount: '',
        description: '',
        category: categories.length > 0 ? categories[0].id : ''
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao Adicionar Transação",
        description: error.message || "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="income-gradient text-white border-0 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Nova Transação
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="glass-effect border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">Adicionar Transação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type" className="text-white">Tipo</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => {
                  setFormData(prev => ({ 
                    ...prev, 
                    type: value,
                    category: value === 'income' ? '' : (categories.length > 0 ? categories[0].id : '')
                  }));
                }}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Receita</SelectItem>
                  <SelectItem value="expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount" className="text-white">Valor</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-white">Descrição</Label>
            <Input
              id="description"
              placeholder="Descrição da transação"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>

          {formData.type === 'expense' && (
            <div>
              <Label htmlFor="category" className="text-white">Categoria</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                disabled={categories.length === 0}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder={categories.length > 0 ? "Selecione uma categoria" : "Nenhuma categoria disponível"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      <span className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        {category.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button type="submit" className="w-full income-gradient text-white border-0">
            Adicionar Transação
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}