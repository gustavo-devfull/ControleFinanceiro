// components/tabs/GoalsTab.jsx
import React from 'react';
import { GoalForm } from '@/components/GoalForm';
import { GoalCard } from '@/components/GoalCard';
import { Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GoalsTab({ goals, onAddGoal, onUpdateGoal, onDeleteGoal }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-bold text-white">Metas de Economia</h2>
        <GoalForm onAddGoal={onAddGoal} />
      </div>

      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={onUpdateGoal}
              onDelete={onDeleteGoal}
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
    </div>
  );
}
