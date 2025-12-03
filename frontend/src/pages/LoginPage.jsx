// src/pages/LoginPage.jsx
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-slate-900 px-4">
      <LoginForm />
    </div>
  );
}
