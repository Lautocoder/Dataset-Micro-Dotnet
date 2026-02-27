import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <div className="relative isolate overflow-hidden">
        {/* Background that adapts to light/dark */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.22),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute -left-24 top-20 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl dark:bg-sky-500/20" />
        <div className="pointer-events-none absolute -right-24 bottom-20 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl dark:bg-emerald-500/20" />

        <div className="relative mx-auto flex min-h-full max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
          {/* Card to avoid "big dark block" in light mode */}
          <div className="w-full max-w-3xl rounded-2xl border bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12 dark:bg-slate-950/50">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300">
              Erreur 404
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Page introuvable
            </h1>

            <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              Cette page n&apos;existe pas ou a été déplacée. Revenez à
              l&apos;accueil ou poursuivez vers les projets pour continuer.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/"
                className="rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Retour à l&apos;accueil
              </Link>

              <Link
                to="/projects"
                className="rounded-full border border-border bg-background/40 px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Voir les projets
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>
                Service disponible — vérifiez l&apos;URL ou vos permissions.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
