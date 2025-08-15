import './App.css'
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-6">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6 text-center">
        <h1 className="text-3xl font-bold text-info mb-4">URL Shortener</h1>
        <p className="text-base-content mb-6">
          Welcome to our <span className="font-bold">URL Shortener</span> tool.
          Easily convert long and messy links into short, shareable ones.
          Perfect for social media, messaging, and quick sharing.
        </p>

        <div className="divider">Get Started</div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="btn btn-info w-32"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="btn btn-outline btn-info w-32"
          >
            Register
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-base-content/70">
        Shorten links in seconds. Simple • Fast • Reliable.
      </p>
    </div>
  );
}

export default App
