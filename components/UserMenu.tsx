"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";

type UserMenuProps = {
  avatarUrl: string | null;
  userName: string;
  email: string | undefined;
  onSignOut: () => void;
};

export default function UserMenu({ avatarUrl, userName, email, onSignOut }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initial = userName?.charAt(0).toUpperCase() || "?";
  const showImage = Boolean(avatarUrl) && !imgError;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="absolute top-6 right-6 z-50">
      {/* Botón del avatar */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-11 w-11 rounded-full border-2 border-line transition hover:border-accent-soft overflow-hidden"
        aria-label="Abrir menú de cuenta"
      >
        {showImage ? (
          <img
            src={avatarUrl!}
            alt="Avatar"
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent-bg text-accent font-semibold">
            {initial}
          </div>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-line bg-surface p-4 shadow-lg animate-[dropdownIn_0.15s_ease-out]">
          <div className="flex items-center gap-3 pb-3 border-b border-line">
            {showImage ? (
              <img
                src={avatarUrl!}
                alt="Avatar"
                className="h-10 w-10 rounded-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-bg text-accent font-semibold">
                {initial}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{userName}</p>
              <p className="truncate text-xs text-ink-muted">{email ?? "Sin correo"}</p>
            </div>
          </div>

          <button
            onClick={onSignOut}
            className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger transition hover:bg-danger/10"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}