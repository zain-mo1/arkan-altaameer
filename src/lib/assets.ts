/** URL of a file in /public, honouring Vite's `base` (absolute "/" in production, relative "./" in static previews). */
export const publicUrl = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '');
