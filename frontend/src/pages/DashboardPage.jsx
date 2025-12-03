import Navbar from "../components/layout/Navbar.jsx";

import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Navbar />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "700", color: "white", marginBottom: "10px" }}>Choose Your Assistant</h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)" }}>Pick the perfect bot to help you</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
          <div onClick={() => navigate("/chat?mode=support")} style={{ background: "white", borderRadius: "16px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", cursor: "pointer", transition: "all 0.3s ease", border: "3px solid #FF6B6B" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(255,107,107,0.3)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)"; }}>
            <div style={{ fontSize: "60px", marginBottom: "15px" }}>🆘</div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", marginBottom: "10px" }}>Support Mode</h2>
            <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>Get expert assistance and solutions to your problems</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#FF6B6B", color: "white", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", fontSize: "14px" }}>Start Chat →</div>
          </div>
          <div onClick={() => navigate("/chat?mode=study")} style={{ background: "white", borderRadius: "16px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", cursor: "pointer", transition: "all 0.3s ease", border: "3px solid #4ECDC4" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(78,205,196,0.3)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)"; }}>
            <div style={{ fontSize: "60px", marginBottom: "15px" }}>📚</div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", marginBottom: "10px" }}>Study Mode</h2>
            <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>Learn new concepts and master your subjects with guidance</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#4ECDC4", color: "white", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", fontSize: "14px" }}>Start Chat →</div>
          </div>
          <div onClick={() => navigate("/chat?mode=stress")} style={{ background: "white", borderRadius: "16px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", cursor: "pointer", transition: "all 0.3s ease", border: "3px solid #FFE66D" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(255,230,109,0.3)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)"; }}>
            <div style={{ fontSize: "60px", marginBottom: "15px" }}>😌</div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", marginBottom: "10px" }}>Stress Relief</h2>
            <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>Find peace and calm with guided relaxation techniques</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#FFE66D", color: "#1f2937", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", fontSize: "14px" }}>Start Chat →</div>
          </div>
        </div>
      </div>
    </div>
  );
}
