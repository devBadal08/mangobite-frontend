"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ 
  children, 
  animation = 'fade-up', 
  delay = 0, 
  duration = 800,
  threshold = 0.1 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const currentRef = domRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // In your case, entries is an array of observed elements
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once it's visible, we don't need to observe it anymore if we only want it to animate once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '0px', // no margin
        threshold: threshold, // 10% of the element is visible
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  // Determine starting transform based on animation type
  let transformInit = 'none';
  if (animation === 'fade-up') transformInit = 'translateY(40px)';
  if (animation === 'fade-down') transformInit = 'translateY(-40px)';
  if (animation === 'fade-left') transformInit = 'translateX(40px)';
  if (animation === 'fade-right') transformInit = 'translateX(-40px)';
  if (animation === 'zoom-in') transformInit = 'scale(0.85)';

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : transformInit,
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </div>
  );
}
