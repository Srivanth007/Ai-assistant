export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center animate-fade-in">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">Srivanth's</span> AI Assistant
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          Your personal AI assistant powered by smart integrations.
        </p>
        <div className="flex flex-col space-y-4">
          <a href="/api/authorize/google">
            <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl font-semibold shadow transition duration-200">
              Sign in with Google
            </button>
          </a>
          <a href="/chat">
            <button className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg rounded-xl font-semibold shadow transition duration-200">
              Skip Sign In
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
