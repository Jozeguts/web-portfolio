import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/integrations/firebase/client";
import { Terminal, Lock } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get custom claims to check if admin
      const idTokenResult = await user.getIdTokenResult();
      if (idTokenResult.claims.admin) {
        navigate("/admin");
      } else {
        await auth.signOut();
        setError("You don't have admin privileges.");
      }
    } catch (err) {
      const errorCode = err.code;
      if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
        setError("Invalid email or password");
      } else if (errorCode === "auth/too-many-requests") {
        setError("Too many failed login attempts. Try again later.");
      } else {
        setError(err.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check admin claims
      const idTokenResult = await user.getIdTokenResult();
      if (idTokenResult.claims.admin) {
        navigate("/admin");
      } else {
        await auth.signOut();
        setError("You don't have admin privileges.");
      }
    } catch (err) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Terminal className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold font-mono">
              <span className="text-primary">joseph</span>
              <span className="text-foreground">.dev</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold font-mono text-foreground mb-2">
            Admin Access
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your portfolio content
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="p-6 rounded-xl bg-card border border-border card-elevated space-y-4"
        >
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-4 px-4 py-2 rounded-lg border border-border bg-background text-foreground font-medium hover:bg-card transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Sign In with Google"}
        </button>

        {/* Back Link */}
        <a
          href="/"
          className="block text-center mt-6 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to portfolio
        </a>
      </div>
    </div>
  );
}
