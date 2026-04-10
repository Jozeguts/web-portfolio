import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "@/integrations/firebase/queries";
import { toast } from "sonner";

export default function ServicesTab() {
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    display_order: 1,
    is_active: true,
  });

  const { data: services = [], refetch } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const createMutation = useMutation({
    mutationFn: (data) => createService(data),
    onSuccess: () => {
      setIsAdding(false);
      setFormData({ title: "", description: "", display_order: 1, is_active: true });
      refetch();
      toast.success("Service created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create service: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateService(id, data),
    onSuccess: () => {
      setEditId(null);
      setFormData({ title: "", description: "", display_order: 1, is_active: true });
      refetch();
      toast.success("Service updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update service: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteService(id),
    onSuccess: () => {
      refetch();
      toast.success("Service deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete service: " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editId) {
      updateMutation.mutate({ id: editId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (service) => {
    setEditId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      display_order: service.display_order,
      is_active: service.is_active,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditId(null);
    setFormData({ title: "", description: "", display_order: 1, is_active: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Services</h2>
        {!isAdding && !editId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        )}
      </div>

      {(isAdding || editId) && (
        <form onSubmit={handleSubmit} className="p-4 border border-border rounded-lg bg-card space-y-4">
          <input
            type="text"
            placeholder="Service title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Service description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
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
        {services.map((service) => (
          <div key={service.id} className="p-4 border border-border rounded-lg bg-card flex items-center justify-between hover:border-primary/50 transition-colors">
            <div className="flex-1">
              <h3 className="font-bold">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Order: {service.display_order} • {service.is_active ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(service)}
                className="p-2 rounded hover:bg-primary/10 text-primary transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteMutation.mutate(service.id)}
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
