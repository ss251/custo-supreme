"use client"
import { useInView as useFramerInView } from 'framer-motion';
import { RefObject, useRef } from 'react';

export function useInView(options = {}): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(ref, {
    once: true,
    ...options,
  });

  return [ref, isInView];
}