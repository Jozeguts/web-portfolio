import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X, Star } from "lucide-react";
import {
  fetchTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/integrations/firebase/queries";
import { toast } from "sonner";

export default function TestimonialsTab() {
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    client_name: "",
    client_title: "",
    client_company: "",
    content: "",
    rating: 5,
    is_active: true,
    display_order: 1,
  });

  const { data: testimonials = [], refetch } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  const createMutation = useMutation({
    mutationFn: (data) => createTestimonial(data),
    onSuccess: () => {
      setIsAdding(false);
      setFormData({
        client_name: "",
        client_title: "",
        client_company: "",
        content: "",
        rating: 5,
        is_active: true,
        display_order: 1,
      });
      refetch();
      toast.success("Testimonial created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create testimonial: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTestimonial(id, data),
    onSuccess: () => {
      setEditId(null);
      setFormData({
        client_name: "",
        client_title: "",
        client_company: "",
        content: "",
        rating: 5,
        is_active: true,
        display_order: 1,
      });
      refetch();
      toast.success("Testimonial updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update testimonial: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTestimonial(id),
    onSuccess: () => {
      refetch();
      toast.success("Testimonial deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete testimonial: " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client_name.trim() || !formData.content.trim()) {
      toast.error("Please fill in required fields");
      return;
    }

    if (editId) {
      updateMutation.mutate({ id: editId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (testimonial) => {
    setEditId(testimonial.id);
    setFormData({
      client_name: testimonial.client_name,
      client_title: testimonial.client_title,
      client_company: testimonial.client_company,
      content: testimonial.content,
      rating: testimonial.rating,
      is_active: testimonial.is_active,
      display_order: testimonial.display_order,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditId(null);
    setFormData({
      client_name: "",
      client_title: "",
      client_company: "",
      content: "",
      rating: 5,
      is_active: true,
      display_order: 1,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Testimonials</h2>
        {!isAdding && !editId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        )}
      </div>

      {(isAdding || editId) && (
        <form onSubmit={handleSubmit} className="p-4 border border-border rounded-lg bg-card space-y-4">
          <input
            type="text"
            placeholder="Client name"
            value={formData.client_name}
            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Client title (e.g., CEO, Product Manager)"
            value={formData.client_title}
            onChange={(e) => setFormData({ ...formData, client_title: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Client company"
            value={formData.client_company}
            onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Testimonial content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows="4"
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div>
            <label className="text-sm font-medium">Rating: {formData.rating}/5</label>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`p-2 rounded transition-colors ${
                    star <= formData.rating
                      ? "text-yellow-500 bg-yellow-500/10"
                      : "text-muted-foreground hover:text-yellow-500"
                  }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
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
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm italic text-muted-foreground mb-3">"{testimonial.content}"</p>
                <p className="font-bold">{testimonial.client_name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.client_title} at {testimonial.client_company}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Order: {testimonial.display_order} • {testimonial.is_active ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="p-2 rounded hover:bg-primary/10 text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteMutation.mutate(testimonial.id)}
                  className="p-2 rounded hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
