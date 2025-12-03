import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
      navigate("/");
    } catch {
      alert("Failed to register");
    }
  };

  return (
    <div className="w-96 bg-white p-8 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />

      <Button text="Register" onClick={register} />

      <p
        className="mt-4 text-blue-600 text-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        Back to login
      </p>
    </div>
  );
}
