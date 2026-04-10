import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadFileToResources,
  deleteFileFromResources,
} from "@/integrations/firebase/queries";
import { toast } from "sonner";

export default function ProjectsTab() {
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Full Stack",
    tech_stack: "",
    image_url: null,
    project_url: "",
    github_url: "",
    is_featured: false,
    is_active: true,
    display_order: 1,
  });

  const { data: projects = [], refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const createMutation = useMutation({
    mutationFn: (data) => createProject(data),
    onSuccess: () => {
      setIsAdding(false);
      resetForm();
      refetch();
      toast.success("Project created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create project: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateProject(id, data),
    onSuccess: () => {
      setEditId(null);
      resetForm();
      refetch();
      toast.success("Project updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update project: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (project) => {
      if (project.image_url) {
        await deleteFileFromResources(project.image_url);
      }
      return deleteProject(project.id);
    },
    onSuccess: () => {
      refetch();
      toast.success("Project deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete project: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Full Stack",
      tech_stack: "",
      image_url: null,
      project_url: "",
      github_url: "",
      is_featured: false,
      is_active: true,
      display_order: 1,
    });
    setImageFile(null);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploadingImage(true);
    try {
      // If editing and there was an old image, delete it first
      if (editId && formData.image_url) {
        await deleteFileFromResources(formData.image_url);
      }
      const url = await uploadFileToResources(imageFile, "projects");
      setFormData({ ...formData, image_url: url });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image: " + error.message);
    } finally {
      setUploadingImage(false);
      setImageFile(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in required fields");
      return;
    }

    const submitData = {
      ...formData,
      tech_stack: formData.tech_stack.split(",").map(t => t.trim()).filter(t => t),
    };

    if (editId) {
      updateMutation.mutate({ id: editId, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (project) => {
    setEditId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      tech_stack: project.tech_stack?.join(", ") || "",
      image_url: project.image_url,
      project_url: project.project_url || "",
      github_url: project.github_url || "",
      is_featured: project.is_featured,
      is_active: project.is_active,
      display_order: project.display_order,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditId(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        {!isAdding && !editId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        )}
      </div>

      {(isAdding || editId) && (
        <form onSubmit={handleSubmit} className="p-4 border border-border rounded-lg bg-card space-y-4">
          <input
            type="text"
            placeholder="Project title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Project description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Mobile">Mobile</option>
          </select>
          <input
            type="text"
            placeholder="Tech stack (comma-separated, e.g., React, Node.js, PostgreSQL)"
            value={formData.tech_stack}
            onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="border border-border rounded-lg p-4 bg-background">
            <label className="text-sm font-medium">Project Image</label>
            {formData.image_url && (
              <div className="mt-2 mb-4">
                <img src={formData.image_url} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-input rounded-lg bg-card"
            />
            {imageFile && (
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={uploadingImage}
                className="mt-2 px-3 py-1 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 disabled:opacity-50"
              >
                {uploadingImage ? "Uploading..." : "Upload Image"}
              </button>
            )}
          </div>

          <input
            type="url"
            placeholder="Project URL (optional)"
            value={formData.project_url}
            onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="url"
            placeholder="GitHub URL (optional)"
            value={formData.github_url}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            placeholder="Display order"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Featured</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Active</span>
            </label>
          </div>
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
        {projects.map((project) => (
          <div key={project.id} className="p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <div className="flex gap-4">
              {project.image_url && (
                <img src={project.image_url} alt={project.title} className="w-24 h-24 object-cover rounded" />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {project.tech_stack?.map((tech, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 rounded hover:bg-primary/10 text-primary transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(project)}
                      className="p-2 rounded hover:bg-destructive/10 text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
