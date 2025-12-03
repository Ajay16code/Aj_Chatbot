export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-600 text-white py-2 rounded mt-3 hover:bg-blue-700"
    >
      {text}
    </button>
  );
}
