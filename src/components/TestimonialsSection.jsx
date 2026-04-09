import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "@/integrations/firebase/queries";
import { Star, Quote } from "lucide-react";

const defaultTestimonials = [
  {
    id: "1",
    client_name: "Sarah M.",
    client_title: "CEO",
    client_company: "TechStart Uganda",
    content:
      "Joseph delivered an exceptional solution that transformed our business processes. Highly recommended!",
    rating: 5,
    is_active: true,
    display_order: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "2",
    client_name: "David K.",
    client_title: "IT Manager",
    client_company: "Kampala Corp",
    content:
      "Professional, detail-oriented, and responsive. Joseph went above and beyond our expectations.",
    rating: 5,
    is_active: true,
    display_order: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "3",
    client_name: "Grace N.",
    client_title: "Founder",
    client_company: "AfriHealth",
    content:
      "The best developer we've worked with. Joseph's expertise and communication are outstanding.",
    rating: 5,
    is_active: true,
    display_order: 3,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default function TestimonialsSection() {
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  const displayTestimonials =
    testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary mb-2 block">
            // feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            What clients and partners have to say about working with me
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative p-6 rounded-xl bg-card border border-border card-elevated"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.client_name}
                </p>
                {testimonial.client_title && (
                  <p className="text-xs text-muted-foreground">
                    {testimonial.client_title}
                    {testimonial.client_company && ` at ${testimonial.client_company}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
