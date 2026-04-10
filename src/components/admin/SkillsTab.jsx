import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import {
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/integrations/firebase/queries";
import { toast } from "sonner";

export default function SkillsTab() {
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    proficiency: 80,
    display_order: 1,
    is_active: true,
  });

  const { data: skills = [], refetch } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

  const categories = [...new Set(skills.map(s => s.category))];

  const createMutation = useMutation({
    mutationFn: (data) => createSkill(data),
    onSuccess: () => {
      setIsAdding(false);
      setFormData({ name: "", category: "Frontend", proficiency: 80, display_order: 1, is_active: true });
      refetch();
      toast.success("Skill created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create skill: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateSkill(id, data),
    onSuccess: () => {
      setEditId(null);
      setFormData({ name: "", category: "Frontend", proficiency: 80, display_order: 1, is_active: true });
      refetch();
      toast.success("Skill updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update skill: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteSkill(id),
    onSuccess: () => {
      refetch();
      toast.success("Skill deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete skill: " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editId) {
      updateMutation.mutate({ id: editId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (skill) => {
    setEditId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      display_order: skill.display_order,
      is_active: skill.is_active,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditId(null);
    setFormData({ name: "", category: "Frontend", proficiency: 80, display_order: 1, is_active: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Skills</h2>
        {!isAdding && !editId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        )}
      </div>

      {(isAdding || editId) && (
        <form onSubmit={handleSubmit} className="p-4 border border-border rounded-lg bg-card space-y-4">
          <input
            type="text"
            placeholder="Skill name (e.g., React, Python)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
            <option value="Tools">Tools</option>
          </select>
          <div>
            <label className="text-sm font-medium">Proficiency: {formData.proficiency}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.proficiency}
              onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
              className="w-full mt-2"
            />
          </div>
          <input
            type="number"
            placeholder="Display order"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm">Active</span>
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {editId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 border border-border rounded-lg bg-card flex items-center justify-between hover:border-primary/50 transition-colors">
            <div className="flex-1">
              <h3 className="font-bold">{skill.name}</h3>
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <span>{skill.category}</span>
                <span>{skill.proficiency}% proficiency</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Order: {skill.display_order} • {skill.is_active ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(skill)}
                className="p-2 rounded hover:bg-primary/10 text-primary transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteMutation.mutate(skill.id)}
                className="p-2 rounded hover:bg-destructive/10 text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
