import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./SplashScreen";
import Todo from "./components/todo";

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <SplashScreen />}</AnimatePresence>
      {!loading && <Todo/>}
    </>
  );
}

export default App;