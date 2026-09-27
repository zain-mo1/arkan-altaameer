export type SectionTone = 'paper' | 'ivory' | 'dark' | 'darker';

export const isDarkTone = (tone: SectionTone) => tone === 'dark' || tone === 'darker';
