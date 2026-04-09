export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-7xl font-bold font-mono text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold font-mono text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
