// import { useState } from 'react'
import "./App.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "./components/ui/sonner";
import Navigation from "./Navigation";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster richColors position="top-center" />
      <Navigation/>
    </ThemeProvider>
  );
}

export default App;
