import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/integrations/firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Terminal, LogOut, Eye } from "lucide-react";
import DashboardTab from "@/components/admin/DashboardTab";
import ServicesTab from "@/components/admin/ServicesTab";
import SkillsTab from "@/components/admin/SkillsTab";
import ProjectsTab from "@/components/admin/ProjectsTab";
import TestimonialsTab from "@/components/admin/TestimonialsTab";
import ContactsTab from "@/components/admin/ContactsTab";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/admin/login");
        return;
      }

      // Check admin claims
      const idTokenResult = await currentUser.getIdTokenResult();
      if (!idTokenResult.claims.admin) {
        await signOut(auth);
        navigate("/admin/login");
        return;
      }

      setUser(currentUser);
      setIsAdmin(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono font-bold">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-primary">admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 flex gap-2 overflow-x-auto">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "services", label: "Services" },
            { id: "skills", label: "Skills" },
            { id: "projects", label: "Projects" },
            { id: "testimonials", label: "Testimonials" },
            { id: "contacts", label: "Contacts" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "services" && <ServicesTab />}
        {activeTab === "skills" && <SkillsTab />}
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "testimonials" && <TestimonialsTab />}
        {activeTab === "contacts" && <ContactsTab />}
      </div>
    </div>
  );
}
