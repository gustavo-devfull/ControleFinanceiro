import { useState } from 'react';
import { useBudget } from '@/hooks/useBudget';
import {
  Plus, Save, X, Edit2, Trash2,
  Palette, Type, Smile, Hash
} from 'lucide-react';

export default function CategoryManager() {
  const { data, addCategory, updateCategory, deleteCategory } = useBudget();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ id: '', name: '', color: '', icon: '' });

  const startEdit = (category) => {
    setEditingId(category.id);
    setForm({ ...category });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    if (!form.id || !form.name) return alert('ID e nome são obrigatórios!');
    try {
      await addCategory(form);
      setForm({ id: '', name: '', color: '', icon: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateCategory(editingId, form);
      setEditingId(null);
      setForm({ id: '', name: '', color: '', icon: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir essa categoria?')) {
      try {
        await deleteCategory(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-neutral-900 rounded-xl shadow-lg mt-8 text-white">
      <h2 className="text-2xl font-bold mb-6">Gerenciar Categorias</h2>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Hash className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="id"
            placeholder="ID"
            className="bg-neutral-800 text-white border border-neutral-700 p-2 w-full rounded"
            value={form.id}
            onChange={handleChange}
            disabled={editingId !== null}
          />
        </div>
        <div className="flex items-center gap-2">
          <Type className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="name"
            placeholder="Nome"
            className="bg-neutral-800 text-white border border-neutral-700 p-2 w-full rounded"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <Palette className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="color"
            placeholder="Cor (hex)"
            className="bg-neutral-800 text-white border border-neutral-700 p-2 w-full rounded"
            value={form.color}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <Smile className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="icon"
            placeholder="Ícone (emoji)"
            className="bg-neutral-800 text-white border border-neutral-700 p-2 w-full rounded"
            value={form.icon}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-6">
        {editingId ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center mr-2"
          >
            <Save className="w-4 h-4 mr-1" /> Salvar
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded inline-flex items-center mr-2"
          >
            <Plus className="w-4 h-4 mr-1" /> Adicionar
          </button>
        )}
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ id: '', name: '', color: '', icon: '' });
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded inline-flex items-center"
          >
            <X className="w-4 h-4 mr-1" /> Cancelar
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {data.categories.map((cat) => (
          <li
            key={cat.id}
            className="flex items-center justify-between bg-neutral-800 p-3 rounded shadow-sm"
          >
            <span className="flex items-center gap-3">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full text-xl"
                style={{ backgroundColor: cat.color }}
              >
                {cat.icon}
              </div>
              <span className="text-white font-medium">
                {cat.name} <span className="text-gray-400 text-sm">({cat.id})</span>
              </span>
            </span>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(cat)}
                className="text-blue-400 hover:text-blue-600 inline-flex items-center"
              >
                <Edit2 className="w-4 h-4 mr-1" /> Editar
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="text-red-400 hover:text-red-600 inline-flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
