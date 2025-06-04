// components/tabs/SettingsTab.jsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import CategoryManager from '@/components/CategoryManager';

export default function SettingsTab({
  categories,
  newMonthlyBudget,
  setNewMonthlyBudget,
  handleSetBudget,
  setIsCategoryModalOpen
}) {
  return (
    <div className="glass-effect rounded-lg p-6 border border-white/20 space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Configurações</h2>

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
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-2 p-3 rounded-lg glass-effect border border-white/10"
              style={{ borderLeft: `4px solid ${category.color}` }}
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
  );
}