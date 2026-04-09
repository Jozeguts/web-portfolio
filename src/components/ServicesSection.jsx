import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/integrations/firebase/queries";
import {
  Code,
  Smartphone,
  Zap,
  Palette,
  Database,
  Cloud,
} from "lucide-react";

const iconMap = {
  "Web Development": <Code className="w-8 h-8" />,
  "Mobile Development": <Smartphone className="w-8 h-8" />,
  "Performance Optimization": <Zap className="w-8 h-8" />,
  "UI/UX Design": <Palette className="w-8 h-8" />,
  "Database Design": <Database className="w-8 h-8" />,
  "Cloud Deployment": <Cloud className="w-8 h-8" />,
};

export default function ServicesSection() {
  const defaultServices = [
    {
      id: "1",
      title: "Web Development",
      description:
        "Building scalable, responsive web applications using modern React and TypeScript. From concept to deployment.",
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "2",
      title: "API Development",
      description:
        "RESTful and GraphQL APIs with Node.js, Express, and database design. Secure, efficient, and well-documented.",
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "3",
      title: "Database Design",
      description:
        "Schema design, optimization, and management. PostgreSQL, MongoDB, and Firebase expertise.",
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  const { data: services = defaultServices, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const servicesWithIcons = services.map((service) => ({
    ...service,
    icon: iconMap[service.title] || <Code className="w-8 h-8" />,
  }));

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-br from-background to-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions tailored to bring your ideas to life with
            cutting-edge technology and best practices.
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesWithIcons.map((service) => (
            <div
              key={service.id}
              className="group p-8 rounded-lg border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
