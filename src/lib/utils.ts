import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Since we are not using Tailwind, we can just use clsx, but keeping the signature compatible is nice.
// Actually, if we are not using tailwind, twMerge might not be needed, but it handles conflicts well if we ever did.
// For now, let's just use a simple joiner since we are doing Vanilla CSS mostly.

export function cn(...inputs: (string | undefined | null | false)[]) {
    return inputs.filter(Boolean).join(" ");
}
