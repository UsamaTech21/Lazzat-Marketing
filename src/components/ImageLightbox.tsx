"use client";

import { useEffect, useCallback } from "react";

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

export function ImageLightbox({ src, alt, onClose }: Props) {
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onKey]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-3 top-3 z-[101] rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow sm:right-5 sm:top-5"
        onClick={onClose}
        aria-label="Close preview"
      >
        Close ✕
      </button>
      <div
        className="relative max-h-[min(92vh,900px)] w-full max-w-5xl overflow-auto rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-auto w-full object-contain" />
        <p className="border-t border-slate-200 px-4 py-3 text-[13px] text-slate-600">{alt}</p>
      </div>
    </div>
  );
}
