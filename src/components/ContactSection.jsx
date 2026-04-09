import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitContactRequest } from "@/integrations/firebase/queries";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service_interest: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { mutate: submitForm, isPending } = useMutation({
    mutationFn: submitContactRequest,
    onSuccess: () => {
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          service_interest: "",
        });
        setSubmitted(false);
      }, 3000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }
    submitForm(formData);
  };

  const serviceInterests = [
    "Web Development",
    "Android Development",
    "Networking",
    "Systems Administration",
    "Other",
  ];

  return (
    <section id="contact" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary mb-2 block">
            // get in touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? Let's talk about how I can help
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact Info - 2 columns */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Email */}
              <div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:josephoguti02@gmail.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      josephoguti02@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      Phone
                    </p>
                    <div className="space-y-1">
                      <a
                        href="tel:+256703181192"
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        +256 703 181 192
                      </a>
                      <a
                        href="tel:+256761932793"
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        +256 761 932 793
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      Location
                    </p>
                    <p className="text-sm text-muted-foreground">Uganda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - 3 columns */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="p-6 rounded-xl border border-border bg-card text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for reaching out. I'll respond within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 rounded-xl border border-border bg-card card-elevated space-y-4"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    maxLength={100}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    maxLength={255}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    maxLength={20}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+256..."
                  />
                </div>

                {/* Service Interest */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Service Interest
                  </label>
                  <select
                    value={formData.service_interest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_interest: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a service</option>
                    {serviceInterests.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    maxLength={200}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    maxLength={2000}
                    required
                    rows={5}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell me more..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
