import { useQuery } from "@tanstack/react-query";
import { Briefcase, Code, Users, Mail, TrendingUp } from "lucide-react";
import {
  fetchServices,
  fetchSkills,
  fetchProjects,
  fetchContactRequests,
} from "@/integrations/firebase/queries";

export default function DashboardTab() {
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const { data: skills = [] } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const { data: contacts = [] } = useQuery({
    queryKey: ["contact_requests"],
    queryFn: fetchContactRequests,
  });

  const unreadContacts = contacts.filter(c => !c.is_read).length;
  const featuredProjects = projects.filter(p => p.is_featured).length;
  const skillsByCategory = {};
  skills.forEach(skill => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = 0;
    }
    skillsByCategory[skill.category]++;
  });

  const stats = [
    {
      title: "Services",
      value: services.length,
      icon: Briefcase,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Skills",
      value: skills.length,
      icon: Code,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Projects",
      value: projects.length,
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Contact Messages",
      value: contacts.length,
      icon: Mail,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      badge: unreadContacts > 0 ? unreadContacts : null,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">Portfolio management statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              {stat.badge !== null && (
                <div className="mt-4 inline-block px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded">
                  {stat.badge} new
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Skills by Category */}
      <div className="p-6 border border-border rounded-lg bg-card">
        <h3 className="text-lg font-bold mb-4">Skills by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.entries(skillsByCategory).map(([category, count]) => (
            <div key={category} className="p-3 border border-border rounded-lg bg-background">
              <p className="text-sm text-muted-foreground">{category}</p>
              <p className="text-2xl font-bold mt-1">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="p-6 border border-border rounded-lg bg-card">
        <h3 className="text-lg font-bold mb-4">Featured Projects</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {featuredProjects} out of {projects.length} projects marked as featured
        </p>
        <div className="w-full bg-background rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${(featuredProjects / Math.max(projects.length, 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="p-6 border border-border rounded-lg bg-card">
        <h3 className="text-lg font-bold mb-4">Recent Contact Messages</h3>
        {contacts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No contact messages yet</p>
        ) : (
          <div className="space-y-2">
            {contacts.slice(0, 5).map((contact) => (
              <div key={contact.id} className="p-3 bg-background rounded flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.subject || contact.email}</p>
                </div>
                {!contact.is_read && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-6 border border-border rounded-lg bg-card">
        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border rounded-lg text-center text-sm font-medium hover:border-primary/50 transition-colors"
          >
            View Portfolio ↗
          </a>
          <a
            href="https://console.firebase.google.com/project/joseph-oguti/firestore"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border rounded-lg text-center text-sm font-medium hover:border-primary/50 transition-colors"
          >
            Firebase Console ↗
          </a>
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border rounded-lg text-center text-sm font-medium hover:border-primary/50 transition-colors"
          >
            View Resume ↗
          </a>
        </div>
      </div>
    </div>
  );
}
