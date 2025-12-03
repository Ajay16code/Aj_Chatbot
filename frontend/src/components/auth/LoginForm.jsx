// src/components/auth/LoginForm.jsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill email and password");
      return;
    }
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-200">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">
          AJ Multi Assistant
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Login to access Support, Study & Stress-lite chatbots
        </p>
      </div>

      <div className="space-y-3 mb-4">
        <Input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
      </div>

      <Button
        text={loading ? "Logging in..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="px-3 text-xs uppercase text-slate-400">or</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Google button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 border border-slate-300 rounded-lg py-2.5 hover:bg-slate-50 transition text-sm font-medium text-slate-700"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google"
          className="h-5 w-5"
        />
        <span>Continue with Google</span>
      </button>

      <p className="mt-5 text-sm text-center text-slate-500">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-indigo-600 font-semibold hover:underline"
        >
          Create one
        </button>
      </p>
    </div>
  );
}
