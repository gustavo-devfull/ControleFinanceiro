
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

export function GoalForm({ onAddGoal }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.targetAmount || !formData.deadline) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    onAddGoal({
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount)
    });

    toast({
      title: "Sucesso!",
      description: "Meta de economia criada com sucesso."
    });

    setFormData({
      title: '',
      targetAmount: '',
      currentAmount: '0',
      deadline: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="savings-gradient text-white border-0 shadow-lg">
            <Target className="w-4 h-4 mr-2" />
            Nova Meta
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="glass-effect border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">Criar Meta de Economia</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-white">Título da Meta</Label>
            <Input
              id="title"
              placeholder="Ex: Viagem para Europa"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="targetAmount" className="text-white">Valor Objetivo</Label>
              <Input
                id="targetAmount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.targetAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAmount: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <div>
              <Label htmlFor="currentAmount" className="text-white">Valor Atual</Label>
              <Input
                id="currentAmount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.currentAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, currentAmount: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="deadline" className="text-white">Data Limite</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <Button type="submit" className="w-full savings-gradient text-white border-0">
            Criar Meta
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
