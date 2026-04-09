export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 font-mono font-bold hover:text-primary transition-colors"
          >
            <span className="text-primary">joseph</span>
            <span className="text-foreground">.dev</span>
          </a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} Joseph Oguti. All rights reserved.
          </p>

          {/* Contact Links */}
          <div className="flex gap-6">
            <a
              href="mailto:josephoguti02@gmail.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              email
            </a>
            <a
              href="tel:+256703181192"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              phone
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
