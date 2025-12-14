// src/pages/Register.tsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TrendingUp, Mail, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/Auth";

type FailureRecord = { ts: number }[];
const STORAGE_KEY = "auth_failures_register";
const LOCK_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

const now = () => Date.now();

const sanitize = (s: string, maxLen = 254) =>
  s.replace(/[\u0000-\u001F\u007F]+/g, "").trim().slice(0, maxLen);

const getFailureRecord = (key = STORAGE_KEY): FailureRecord => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw) as FailureRecord;
  } catch {
    return [];
  }
};
const addFailure = (key = STORAGE_KEY) => {
  const rec = getFailureRecord(key);
  rec.push({ ts: now() });
  localStorage.setItem(key, JSON.stringify(rec));
};
const clearFailures = (key = STORAGE_KEY) => {
  localStorage.removeItem(key);
};
const getLockInfo = (key = STORAGE_KEY) => {
  const rec = getFailureRecord(key);
  const recent = rec.filter(r => now() - r.ts <= LOCK_WINDOW_MS);
  if (recent.length < MAX_ATTEMPTS) return { locked: false, attempts: recent.length, unlockAt: 0 };
  const lastAttemptTs = recent[recent.length - 1].ts;
  const unlockAt = lastAttemptTs + LOCK_DURATION_MS;
  const locked = now() < unlockAt;
  return { locked, attempts: recent.length, unlockAt };
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    experienceLevel: "beginner",
    newsletter: false,
  });

  // use refs for password fields to avoid storing password in state
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmRef = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [lockInfo, setLockInfo] = useState(getLockInfo());

  useEffect(() => {
    const interval = setInterval(() => setLockInfo(getLockInfo()), 5_000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : sanitize(value, 128),
    }));
    if (errors) setErrors("");
  };

  const isValidEmail = (e: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(e);
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.lastName.trim()) return "Last name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!isValidEmail(formData.email)) return "Invalid email address";

    const pw = passwordRef.current?.value ?? "";
    const confirm = confirmRef.current?.value ?? "";

    if (!pw) return "Password is required";
    if (pw.length < 8) return "Password must be at least 8 characters long";
    if (pw !== confirm) return "Passwords do not match";

    const hasLetter = /[a-zA-Z]/.test(pw);
    const hasNumber = /\d/.test(pw);
    const hasSymbol = /[!@#$%^&*(),.?\":{}|<>]/.test(pw);

    if (!hasLetter || !hasNumber || !hasSymbol)
      return "Password must contain letters, numbers, and symbols";

    // Add other checks (disallow common passwords) server-side

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors("");

    const { locked, unlockAt } = getLockInfo();
    if (locked) {
      const mins = Math.ceil((unlockAt - now()) / 60_000);
      setErrors(`Too many registration attempts — locked for ${mins} minute(s).`);
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    setIsLoading(true);
    try {
      // Optional: reCAPTCHA token retrieval here and pass to register call for server side validation

      await register(
        formData.email,
        passwordRef.current?.value ?? "",
        formData.firstName,
        formData.lastName,
        formData.experienceLevel,
        formData.newsletter
      );

      // IMPORTANT: Server should send email verification & create only after verifying captcha & rate limiting
      clearFailures();
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration error (sanitized):", error?.code ?? error?.message ?? "unknown");

      addFailure();
      const failureState = getLockInfo();

      switch (error?.code) {
        case "auth/email-already-in-use":
          setErrors("An account with this email already exists");
          break;
        case "auth/invalid-email":
          setErrors("Invalid email address");
          break;
        case "auth/weak-password":
          setErrors("Password is too weak");
          break;
        default:
          setErrors("Registration failed. Please try again");
      }

      if (failureState.locked) {
        const mins = Math.ceil((failureState.unlockAt - now()) / 60_000);
        setErrors(prev => `${prev} Locked for ${mins} minute(s).`);
      }
    } finally {
      setIsLoading(false);

      // Overwrite password fields
      if (passwordRef.current) passwordRef.current.value = "";
      if (confirmRef.current) confirmRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start">
                  <TrendingUp className="h-12 w-12 text-finance-primary" />
                </div>
                <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-finance-primary hover:text-finance-primary/90">
                    Log in here
                  </Link>
                </p>
              </div>

              {errors && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-red-700">{errors}</span>
                </div>
              )}

              <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                      <input id="firstName" name="firstName" type="text" required value={formData.firstName}
                        onChange={handleInputChange} className="finance-input mt-1" disabled={isLoading} maxLength={64} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                      <input id="lastName" name="lastName" type="text" required value={formData.lastName}
                        onChange={handleInputChange} className="finance-input mt-1" disabled={isLoading} maxLength={64} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input id="email" name="email" type="email" autoComplete="email" required value={formData.email}
                      onChange={handleInputChange} className="finance-input mt-1" disabled={isLoading} maxLength={254} />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <input id="password" name="password" type={showPassword ? "text" : "password"} ref={passwordRef}
                        autoComplete="new-password" required className="finance-input mt-1 pr-10" disabled={isLoading} />
                      <button type="button" className="absolute right-2 top-3 p-1" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm password</label>
                    <input id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} ref={confirmRef}
                      autoComplete="new-password" required className="finance-input mt-1 pr-10" disabled={isLoading} />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Your experience level</label>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: "beginner", label: "Beginner", desc: "New to financial concepts" },
                      { value: "intermediate", label: "Intermediate", desc: "Familiar with basics, looking for more" },
                      { value: "advanced", label: "Advanced", desc: "Experienced, seeking specific knowledge" },
                    ].map((level) => (
                      <div key={level.value}>
                        <input type="radio" id={level.value} name="experienceLevel" value={level.value}
                          checked={formData.experienceLevel === level.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                          className="sr-only" disabled={isLoading} />
                        <label htmlFor={level.value} className={`block p-3 border rounded-md text-sm font-medium cursor-pointer transition-colors ${formData.experienceLevel === level.value ? 'border-finance-primary bg-finance-primary/5' : 'border-gray-300 hover:border-finance-primary'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-finance-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <span className="flex items-center justify-between">
                            <span>{level.label}</span>
                            {formData.experienceLevel === level.value && <CheckCircle className="h-5 w-5 text-finance-primary" />}
                          </span>
                          <span className="block text-xs text-gray-500 mt-1">{level.desc}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <input id="newsletter" name="newsletter" type="checkbox" checked={formData.newsletter}
                    onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))} className="h-4 w-4 text-finance-primary focus:ring-finance-primary border-gray-300 rounded" disabled={isLoading} />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">Subscribe to our newsletter for financial tips and updates</label>
                </div>

                <div>
                  <Button type="submit" className="w-full finance-button-primary" disabled={isLoading || lockInfo.locked}>
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Creating account...
                      </div>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Create account
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-finance-primary to-finance-secondary rounded-xl overflow-hidden shadow-xl h-full flex items-center justify-center">
                <div className="p-10 text-white max-w-md">
                  <h3 className="text-2xl font-bold mb-4">Join our growing community</h3>
                  <div className="space-y-4">
                    <div className="flex items-start"><CheckCircle className="h-6 w-6 text-white mr-2 flex-shrink-0" /><p>Access exclusive educational content tailored to your experience level</p></div>
                    <div className="flex items-start"><CheckCircle className="h-6 w-6 text-white mr-2 flex-shrink-0" /><p>Interact with our community forum and get answers to your financial questions</p></div>
                    <div className="flex items-start"><CheckCircle className="h-6 w-6 text-white mr-2 flex-shrink-0" /><p>Receive personalized investment suggestions based on your goals</p></div>
                    <div className="flex items-start"><CheckCircle className="h-6 w-6 text-white mr-2 flex-shrink-0" /><p>Track your progress and grow your financial knowledge</p></div>
                  </div>

                  <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-finance-primary/80 text-white flex items-center justify-center text-xs font-bold">
                            {["JD", "AK", "ZM"][i - 1]}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Join 10,000+ members</p>
                        <p className="text-white/80">Growing every day</p>
                      </div>
                    </div>
                  </div>
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

export default Register;
