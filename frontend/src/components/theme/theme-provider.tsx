import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function getSystemTheme(): "dark" | "light" {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;

    // Si l'utilisateur a déjà choisi un thème, on respecte.
    if (stored === "light" || stored === "dark") return stored;

    // Si pas de choix stocké: "system" uniquement pour INITIALISER
    const initial = defaultTheme === "system" ? getSystemTheme() : defaultTheme;
    localStorage.setItem(storageKey, initial); 
    return initial;
  });

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const sys = getSystemTheme();
      root.classList.add(sys);
      return;
    }

    root.classList.add(theme)
  }, [theme])

  const value: ThemeProviderState = {
    theme,
    setTheme: (nextTheme: Theme) => {
      // si quelqu'un set "system", on le convertit en light/dark et on fige
      const resolved = nextTheme === "system" ? getSystemTheme() : nextTheme;

      localStorage.setItem(storageKey, resolved);
      setThemeState(resolved);
    },
  };
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}