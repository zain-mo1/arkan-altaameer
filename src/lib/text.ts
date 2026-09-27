/**
 * Search normalisation — Arabic-aware: strips diacritics and tatweel, unifies alef / ya / ta marbuta / hamza
 * carriers, converts Arabic-Indic digits, lower-cases Latin.
 */
export function normalizeSearch(value: string) {
  return value
    .normalize('NFKC')
    .replace(/[ً-ٰٟـ]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Every word of the query appears in the text. */
export function matchesQuery(text: string, query: string) {
  const haystack = normalizeSearch(text);
  return normalizeSearch(query)
    .split(' ')
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}
