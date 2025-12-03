import { useNavigate } from "react-router-dom";

export default function ModeSelector() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 my-4 justify-center">
      <button
        onClick={() => navigate("/chat?mode=support")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Support
      </button>

      <button
        onClick={() => navigate("/chat?mode=study")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Study
      </button>

      <button
        onClick={() => navigate("/chat?mode=stress")}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Stress-Lite
      </button>
    </div>
  );
}
