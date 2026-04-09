import { useQuery } from "@tanstack/react-query";
import { fetchSkills } from "@/integrations/firebase/queries";

const defaultSkills = [
  {
    id: "1",
    name: "React/Next.js",
    category: "Web Development",
    proficiency: 90,
    display_order: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "2",
    name: "TypeScript",
    category: "Web Development",
    proficiency: 88,
    display_order: 2,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "3",
    name: "Node.js",
    category: "Web Development",
    proficiency: 85,
    display_order: 3,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "4",
    name: "HTML/CSS/Tailwind",
    category: "Web Development",
    proficiency: 95,
    display_order: 4,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "5",
    name: "Kotlin/Java",
    category: "Android Development",
    proficiency: 82,
    display_order: 5,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "6",
    name: "Jetpack Compose",
    category: "Android Development",
    proficiency: 78,
    display_order: 6,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "7",
    name: "Android SDK",
    category: "Android Development",
    proficiency: 85,
    display_order: 7,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default function SkillsSection() {
  const { data: skills } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  const displaySkills = skills && skills.length > 0 ? skills : defaultSkills;

  // Group skills by category
  const grouped = displaySkills.reduce(
    (acc, skill) => {
      const cat = skill.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {}
  );

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary mb-2 block">
            // skills & expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            Technical <span className="text-gradient">Proficiencies</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Years of experience across multiple technologies and domains
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <div
              key={category}
              className="p-6 rounded-xl bg-card border border-border card-elevated"
            >
              <h3 className="font-mono text-lg font-semibold mb-6 text-primary">
                {category}
              </h3>
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
