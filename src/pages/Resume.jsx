export default function Resume() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-mono mb-2 text-primary">
            Joseph Oguti
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>📍 Kampala, Uganda</span>
            <span>📱 +256 703 181 192</span>
            <span>📱 +256 761 932 793</span>
            <span>✉️ josephoguti02@gmail.com</span>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="mb-8 p-6 rounded-lg bg-card border border-border">
          <h2 className="text-2xl font-bold font-mono mb-3 text-primary">
            // Professional Summary
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Full-stack software engineer and systems architect with expertise in web development, 
            Android applications, networking infrastructure, and systems administration. Passionate 
            about leveraging technology to solve complex problems and drive innovation.
          </p>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold font-mono mb-4 text-primary">
            // Education
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">
                  Bachelor of Engineering in Electronics and Computer Engineering
                </h3>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                  2022 – 2025
                </span>
              </div>
              <p className="text-muted-foreground">Soroti University</p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">
                  Uganda Advanced Certificate of Education (U.A.C.E)
                </h3>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                  2019 – 2021
                </span>
              </div>
              <p className="text-muted-foreground">Kololo Senior Secondary School</p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">
                  Uganda Certificate of Education (U.C.E)
                </h3>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                  2015 – 2018
                </span>
              </div>
              <p className="text-muted-foreground">Kololo Senior Secondary School</p>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold font-mono mb-4 text-primary">
            // Work Experience
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">
                    Networking and Web Development Intern
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Stratcom Communications and Computer Solutions
                  </p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                  June 2024 – August 2024
                </span>
              </div>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>Developed web applications using modern frameworks</li>
                <li>Configured and maintained network infrastructure</li>
                <li>Implemented security protocols and best practices</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">
                    Computer Laboratory Instructor
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Kololo Senior Secondary School
                  </p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                  June 2022 – August 2022
                </span>
              </div>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>Taught computer science fundamentals</li>
                <li>Maintained lab equipment and systems</li>
                <li>Assisted students with technical troubleshooting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills and Abilities */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold font-mono mb-4 text-primary">
            // Skills & Abilities
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold mb-3 text-foreground">Core Competencies</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>✓ Website Design & Development</li>
                <li>✓ Mobile App Development</li>
                <li>✓ Web App Development</li>
                <li>✓ Data Analysis</li>
                <li>✓ Network Engineering (CISCO)</li>
                <li>✓ Systems Administration</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold mb-3 text-foreground">Tools & Technologies</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>✓ React.JS, Node.js, .NET Framework (C#)</li>
                <li>✓ Android Studio, Kotlin, Java</li>
                <li>✓ Firebase, SQL, MySQL</li>
                <li>✓ CISCO Networking Tools</li>
                <li>✓ Arduino, IoT Systems</li>
                <li>✓ Microsoft Office Suite</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold font-mono mb-4 text-primary">
            // Certifications & Courses
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Ethical Hacking",
              "Network Defense",
              "Cyber Security",
              "Data Analytics",
              "Generative Artificial Intelligence",
              "Python Programming",
              "Digital Awareness",
              "Discovering Entrepreneurship",
              "Design Thinking",
              "Internship Certification - Web, Network & Systems"
            ].map((cert, i) => (
              <div key={i} className="p-3 rounded bg-muted/50 border border-border/50">
                <p className="text-sm text-foreground font-medium">🎓 {cert}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership & Activities */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold font-mono mb-4 text-primary">
            // Leadership & Activities
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="font-semibold text-foreground mb-1">
                Minister of Internal and Foreign Affairs
              </p>
              <p className="text-sm text-muted-foreground">
                Soroti University Students' Guild 2024/25
              </p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="font-semibold text-foreground mb-1">
                G.R.C. Representative for School of Engineering and Technology
              </p>
              <p className="text-sm text-muted-foreground">
                Soroti University Students' Guild 2024/25
              </p>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <p className="font-semibold text-foreground mb-1">
                Co-Founder & Secretary for Finance
              </p>
              <p className="text-sm text-muted-foreground">
                Soroti University Engineering Society (2023 – 2025)
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-12 p-6 rounded-lg bg-primary/10 border border-primary/20 text-center">
          <p className="text-muted-foreground mb-4">
            Interested in collaborating? Let's connect!
          </p>
          <a
            href="/#contact"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
