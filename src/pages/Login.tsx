// src/pages/Login.tsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TrendingUp, LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/Auth";

type FailureRecord = { ts: number }[];

const LOCK_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const STORAGE_KEY = "auth_failures_login";

const now = () => Date.now();

const sanitize = (s: string, maxLen = 254) =>
  s.replace(/[\u0000-\u001F\u007F]+/g, "").trim().slice(0, maxLen);

const getFailureRecord = (): FailureRecord => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FailureRecord;
  } catch {
    return [];
  }
};

const addFailure = () => {
  const rec = getFailureRecord();
  rec.push({ ts: now() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rec));
};

const clearFailures = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const getLockInfo = () => {
  const rec = getFailureRecord();
  // keep only recent entries within LOCK_WINDOW_MS
  const recent = rec.filter(r => now() - r.ts <= LOCK_WINDOW_MS);
  if (recent.length < MAX_ATTEMPTS) return { locked: false, attempts: recent.length, unlockAt: 0 };
  const lastAttemptTs = recent[recent.length - 1].ts;
  const unlockAt = lastAttemptTs + LOCK_DURATION_MS;
  const locked = now() < unlockAt;
  return { locked, attempts: recent.length, unlockAt };
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Keep email controlled (OK). Passwords use refs to avoid long-lived state.
  const [email, setEmail] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [lockInfo, setLockInfo] = useState(getLockInfo());

  useEffect(() => {
    const iv = setInterval(() => setLockInfo(getLockInfo()), 1000 * 5);
    return () => clearInterval(iv);
  }, []);

  // Simple email format check
  const isValidEmail = (e: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors("");

    const { locked, unlockAt } = getLockInfo();
    if (locked) {
      const mins = Math.ceil((unlockAt - now()) / 60000);
      setErrors(`Too many failed attempts — locked for ${mins} minute(s).`);
      return;
    }

    const cleanEmail = sanitize(email, 254);
    const pw = passwordRef.current?.value ?? "";

    if (!cleanEmail || !pw) {
      setErrors("Please fill in all fields");
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setErrors("Invalid email address");
      return;
    }
    if (pw.length < 6) {
      setErrors("Invalid credentials");
      return;
    }

    setIsLoading(true);

    try {
      // Optional: add reCAPTCHA token retrieval here (server should validate).
      // Example (requires grecaptcha loaded and site key): const captchaToken = await grecaptcha.execute(SITE_KEY, { action: 'login' });

      // IMPORTANT: do not log the password or sensitive tokens.
      // Call login with email and password only (useAuth currently expects 2 args).
      await login(cleanEmail, pw);

      clearFailures(); // successful login — clear client-side failure record

      // Server should set secure, httpOnly cookie or return a short lived token.
      navigate("/dashboard");
    } catch (error: any) {
      // Do not expose internal error details to the user. Map known errors.
      console.error("Login error (sanitized):", error?.code ?? error?.message ?? "unknown"); // never log passwords

      addFailure();
      const failureState = getLockInfo();

      switch (error?.code) {
        case "auth/user-not-found":
          setErrors("No account found with this email address");
          break;
        case "auth/wrong-password":
          setErrors("Incorrect email or password");
          break;
        case "auth/invalid-email":
          setErrors("Invalid email address");
          break;
        case "auth/too-many-requests":
          setErrors("Too many failed attempts. Please try again later");
          break;
        default:
          setErrors("Login failed. Please check your credentials and try again");
      }

      // If crossing threshold, show lock message
      if (failureState.locked) {
        const mins = Math.ceil((failureState.unlockAt - now()) / 60000);
        setErrors(prev => `${prev} Locked for ${mins} minute(s).`);
      }
    } finally {
      setIsLoading(false);

      // Overwrite password input to reduce memory lifetime
      if (passwordRef.current) {
        passwordRef.current.value = "";
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <TrendingUp className="h-12 w-12 text-finance-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Log in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link to="/register" className="font-medium text-finance-primary hover:text-finance-primary/90">
                create an account to get started
              </Link>
            </p>
          </div>

          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {errors && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                {/* error text is sanitized plain text */}
                <span className="text-sm text-red-700">{errors}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} autoComplete="on" noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(ev) => setEmail(sanitize(ev.target.value, 254))}
                    className="finance-input"
                    disabled={isLoading}
                    maxLength={254}
                    inputMode="email"
                    aria-label="Email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    ref={passwordRef}
                    autoComplete="current-password"
                    required
                    className="finance-input pr-10"
                    disabled={isLoading}
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 top-1/2 -translate-y-1/2 p-1"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={0}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe((s) => !s)}
                    className="h-4 w-4 text-finance-primary focus:ring-finance-primary border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-finance-primary hover:text-finance-primary/90">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full finance-button-primary flex justify-center" disabled={isLoading || lockInfo.locked}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Logging in...
                    </div>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Log in
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Social login section - disabled until implemented securely server-side */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {/* Disabled placeholders for third-party providers */}
                <div>
                  <button disabled className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <span className="sr-only">Sign in with Facebook</span>
                    {/* icons omitted for brevity */}
                    FB
                  </button>
                </div>
                <div>
                  <button disabled className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <span className="sr-only">Sign in with Twitter</span>
                    TW
                  </button>
                </div>
                <div>
                  <button disabled className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <span className="sr-only">Sign in with Google</span>
                    G
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
