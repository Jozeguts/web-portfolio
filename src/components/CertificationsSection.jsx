import { Award } from "lucide-react";

export default function CertificationsSection() {
  const certifications = [
    "Ethical Hacking",
    "Network Defense",
    "Cyber Security",
    "Data Analytics",
    "Generative Artificial Intelligence",
    "Python Programming",
    "Digital Awareness",
    "Discovering Entrepreneurship",
    "Design Thinking",
    "Internship Certification - Web, Network & Systems",
  ];

  return (
    <section id="certifications" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-4">
          <Award className="text-primary" size={28} />
          <h2 className="text-4xl md:text-5xl font-bold font-mono">
            Certifications & <span className="text-primary">Courses</span>
          </h2>
        </div>
        <p className="text-muted-foreground mb-12">Professional development and specialized training</p>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all hover:shadow-lg"
            >
              <p className="text-sm font-medium text-foreground">🎓 {cert}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
