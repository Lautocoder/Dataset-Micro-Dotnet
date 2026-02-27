// src/components/common/Loading.tsx

import { TbDatabaseCog } from "react-icons/tb";

export default function Loading({
  title = "Loading...",
  subtitle = "Generating your dataset...",
  fullScreen = false,
}) {
  const Wrapper = ({ children }:{children: React.ReactNode}) =>
    fullScreen ? (
      <div className="min-h-155 w-full flex items-center justify-center px-4">
        {children}
      </div>
    ) : (
      <div className="w-full flex items-center justify-center py-10 px-4">
        {children}
      </div>
    );

  return (
    <Wrapper>
      <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-4">
            {/* Spinner avec icône Database */}
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full border-4 border-muted" />
              <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary/30 border-b-transparent border-l-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <TbDatabaseCog className="h-5 w-5 text-primary" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-lg font-semibold text-foreground">
                {title}
              </p>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full w-1/3 bg-primary animate-[loading_1.5s_ease-in-out_infinite] rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes loading {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(150%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </Wrapper>
  );
}
