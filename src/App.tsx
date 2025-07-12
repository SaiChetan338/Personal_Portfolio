import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import MatrixBackground from "./components/MatrixBackground";
import { SmoothCursor } from "./components/magicui/smooth-cursor";
import LoadingScreen from "./components/LoadingScreen";
import routes from "tempo-routes";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 3 seconds on initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black cursor-none">
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* Global Matrix Background */}
      <MatrixBackground />

      {/* Global Smooth Cursor */}
      <SmoothCursor color="#00ffff" />

      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </div>
  );
}

export default App;
