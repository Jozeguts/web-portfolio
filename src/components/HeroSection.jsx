import { ArrowRight, Code, Zap, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import heroPattern from "@/assets/hero-pattern.svg";

export default function HeroSection() {
  return (
    <section 
      className="pt-32 pb-20 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/80"></div>

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary font-mono mb-2">
                &gt; Full Stack Developer
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Build. Create. Innovate.
                </span>
              </h1>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Full-stack developer specializing in React, TypeScript, and cloud technologies. 
              Transforming ideas into scalable, high-performance applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="#contact"
                className="group px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium flex items-center gap-2 transition-all"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#portfolio"
                className="px-6 py-3 rounded-lg border border-border hover:border-primary/50 font-medium transition-colors"
              >
                View My Work
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { label: "Projects", value: "50+" },
                { label: "Clients", value: "30+" },
                { label: "Years", value: "5+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Skill Icons */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {[
              { icon: Code, label: "Clean Code" },
              { icon: Zap, label: "Fast Performance" },
              { icon: GitBranch, label: "Git Workflow" },
            ].map((item, idx) => (
              <div
                key={item.label}
                className={`p-8 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-all group ${
                  idx === 2 ? "col-span-2 w-1/2" : ""
                }`}
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
