export default function MessageBubble({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div
      className={`p-3 mb-2 max-w-xs rounded-lg ${
        isUser
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200 text-black mr-auto"
      }`}
    >
      {text}
    </div>
  );
}
