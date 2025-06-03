
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function GoalCard({ goal, onUpdate, onDelete }) {
  const [addAmount, setAddAmount] = useState('');
  const { toast } = useToast();
  
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;
  const deadline = new Date(goal.deadline);
  const isOverdue = deadline < new Date();
  
  const handleAddAmount = () => {
    if (!addAmount || parseFloat(addAmount) <= 0) {
      toast({
        title: "Erro",
        description: "Digite um valor válido.",
        variant: "destructive"
      });
      return;
    }
    
    const newAmount = goal.currentAmount + parseFloat(addAmount);
    onUpdate(goal.id, { currentAmount: newAmount });
    setAddAmount('');
    
    toast({
      title: "Sucesso!",
      description: `R$ ${parseFloat(addAmount).toFixed(2)} adicionado à meta.`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="glass-effect border-white/20 h-full">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-white text-lg">{goal.title}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(goal.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Progresso</span>
              <span className="text-white font-medium">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/70">Atual</p>
              <p className="text-green-400 font-medium">
                R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-white/70">Meta</p>
              <p className="text-blue-400 font-medium">
                R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          
          <div className="text-sm">
            <p className="text-white/70">Faltam</p>
            <p className="text-yellow-400 font-medium">
              R$ {remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="text-sm">
            <p className="text-white/70">Prazo</p>
            <p className={`font-medium ${isOverdue ? 'text-red-400' : 'text-white'}`}>
              {deadline.toLocaleDateString('pt-BR')}
              {isOverdue && ' (Vencido)'}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Input
              type="number"
              step="0.01"
              placeholder="Valor"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-sm"
            />
            <Button
              onClick={handleAddAmount}
              size="sm"
              className="savings-gradient text-white border-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
