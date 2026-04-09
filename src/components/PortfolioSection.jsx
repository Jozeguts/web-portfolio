import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/integrations/firebase/queries";
import { Github, ExternalLink, Folder } from "lucide-react";

const defaultProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce application with payment processing",
    image_url: null,
    tech_stack: ["React", "Node.js", "PostgreSQL"],
    project_url: "https://example.com",
    github_url: "https://github.com",
    category: "Web Development",
    is_featured: true,
    is_active: true,
    display_order: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "2",
    title: "Health Tracker App",
    description: "Mobile app for tracking health metrics and fitness goals",
    image_url: null,
    tech_stack: ["Kotlin", "Jetpack Compose", "Firebase"],
    project_url: null,
    github_url: "https://github.com",
    category: "Android Development",
    is_featured: true,
    is_active: true,
    display_order: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "3",
    title: "Enterprise Network Setup",
    description: "Designed and implemented enterprise network infrastructure",
    image_url: null,
    tech_stack: ["Cisco", "Mikrotik", "VLAN", "VPN"],
    project_url: null,
    github_url: null,
    category: "Networking",
    is_featured: false,
    is_active: true,
    display_order: 3,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default function PortfolioSection() {
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  const displayProjects =
    projects && projects.length > 0 ? projects : defaultProjects;

  return (
    <section id="portfolio" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary mb-2 block">
            // featured work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A selection of projects that showcase my expertise and experience
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className="group p-6 rounded-xl bg-card border border-border hover:glow-border transition-all duration-300 card-elevated"
            >
              {/* Header with icons */}
              <div className="flex items-start justify-between mb-4">
                <Folder className="w-10 h-10 text-primary" />
                <div className="flex gap-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      <Github className="w-5 h-5 text-primary" />
                    </a>
                  )}
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-primary" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <span className="text-xs font-mono text-primary/70 block mb-2">
                {project.category}
              </span>
              <h3 className="font-mono text-lg font-semibold mb-3 text-foreground">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {(project.tech_stack || []).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-mono bg-muted rounded-md text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
