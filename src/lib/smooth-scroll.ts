import type Lenis from 'lenis';
import { createContext, useContext } from 'react';

export const LenisContext = createContext<Lenis | null>(null);

/** The active Lenis instance (null when reduced motion is requested). */
export const useLenis = () => useContext(LenisContext);
