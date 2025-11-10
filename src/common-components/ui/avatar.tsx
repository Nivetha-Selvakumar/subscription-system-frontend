// src/components/ui/avatar.tsx
import React from "react";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number; // px
  alt?: string;
  fallback?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ size = 40, alt = "", src, fallback, className = "", ...rest }) => {
  const s = `${size}px`;
  return (
    <div
      className={`ui-avatar inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-100 ${className}`}
      style={{ width: s, height: s }}
    >
      {src ? (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img src={src as string} alt={alt || "avatar"} style={{ width: s, height: s, objectFit: "cover" }} {...rest} />
      ) : (
        <span className="ui-avatar-fallback text-sm font-semibold text-gray-700">
          {fallback || (alt ? getInitials(alt) : "?")}
        </span>
      )}
    </div>
  );
};

export const AvatarImage = Avatar; // alias

export const AvatarFallback: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// helper
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
