function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Welcome to Our App
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            This is a test to see if Tailwind CSS is working correctly.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
