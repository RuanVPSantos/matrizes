import { type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  // Simple implementation for class name concatenation
  return inputs
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}