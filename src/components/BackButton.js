"use client";
import { useRouter } from 'next/navigation';

export default function BackButton({ children, style, className }) {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        ...style
      }}
      className={className}
    >
      {children}
    </button>
  );
}
