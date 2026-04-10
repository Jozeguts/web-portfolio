import { Briefcase, GraduationCap } from "lucide-react";

export default function ExperienceSection() {
  const education = [
    {
      degree: "Bachelor of Engineering in Electronics and Computer Engineering",
      school: "Soroti University",
      year: "2022 – 2025",
      type: "education",
    },
    {
      degree: "Uganda Advanced Certificate of Education (U.A.C.E)",
      school: "Kololo Senior Secondary School",
      year: "2019 – 2021",
      type: "education",
    },
    {
      degree: "Uganda Certificate of Education (U.C.E)",
      school: "Kololo Senior Secondary School",
      year: "2015 – 2018",
      type: "education",
    },
  ];

  const experience = [
    {
      role: "Networking and Web Development Intern",
      company: "Stratcom Communications and Computer Solutions",
      period: "June 2024 – August 2024",
      achievements: [
        "Developed web applications using modern frameworks",
        "Configured and maintained network infrastructure",
        "Implemented security protocols and best practices",
      ],
      type: "work",
    },
    {
      role: "Computer Laboratory Instructor",
      company: "Kololo Senior Secondary School",
      period: "June 2022 – August 2022",
      achievements: [
        "Taught computer science fundamentals",
        "Maintained lab equipment and systems",
        "Assisted students with technical troubleshooting",
      ],
      type: "work",
    },
  ];

  const leadership = [
    {
      position: "Minister of Internal and Foreign Affairs",
      organization: "Soroti University Students' Guild 2024/25",
    },
    {
      position: "G.R.C. Representative for School of Engineering and Technology",
      organization: "Soroti University Students' Guild 2024/25",
    },
    {
      position: "Co-Founder & Secretary for Finance",
      organization: "Soroti University Engineering Society (2023 – 2025)",
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-2">
            Experience & <span className="text-primary">Education</span>
          </h2>
          <p className="text-muted-foreground">Journey through my professional and academic background</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap className="text-primary" size={24} />
              <h3 className="text-2xl font-bold font-mono">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{edu.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Briefcase className="text-primary" size={24} />
              <h3 className="text-2xl font-bold font-mono">Work Experience</h3>
            </div>
            <div className="space-y-4">
              {experience.map((job, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{job.role}</h4>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{job.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="text-xs text-muted-foreground">{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership & Activities */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold font-mono mb-6">Leadership & Activities</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {leadership.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors">
                <p className="font-semibold text-foreground text-sm mb-2">{item.position}</p>
                <p className="text-xs text-muted-foreground">{item.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
