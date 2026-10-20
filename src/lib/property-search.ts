import { properties, type Property, type PropertyCategory } from '@/data/properties';

const ignoredWords = new Set([
  'a', 'an', 'and', 'for', 'in', 'me', 'night', 'per', 'place', 'stay', 'the', 'to', 'with',
]);

const categoryTerms: Record<Exclude<PropertyCategory, 'all'>, readonly string[]> = {
  cabin: ['cabin', 'forest', 'mountain', 'wooded', 'redwood'],
  beach: ['beach', 'coast', 'coastal', 'ocean', 'seaside'],
  city: ['city', 'downtown', 'loft', 'urban'],
  villa: ['villa', 'courtyard', 'luxury', 'pool'],
};

function normalize(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9$\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function maxPriceFrom(query: string) {
  const match = query.match(
    /\b(?:under|below|less than|max(?:imum)?(?: of)?|up to)\s*\$?\s*(\d{2,5})\b/,
  );
  return match ? Number(match[1]) : null;
}

function searchText(property: Property) {
  return normalize([
    property.title,
    property.location,
    property.category,
    ...categoryTerms[property.category],
    ...property.amenities,
    ...property.vibes,
  ].join(' '));
}

export function filterProperties(
  category: PropertyCategory,
  source: readonly Property[] = properties,
) {
  return category === 'all'
    ? [...source]
    : source.filter((property) => property.category === category);
}

export function rankProperties(rawQuery: string, source: readonly Property[] = properties) {
  const query = normalize(rawQuery);
  if (!query) return [...source];

  const maxPrice = maxPriceFrom(query);
  const terms = query
    .replace(/\$?\d+/g, ' ')
    .split(' ')
    .filter((term) => term.length > 2 && !ignoredWords.has(term));

  return source
    .filter((property) => maxPrice === null || property.nightlyPrice <= maxPrice)
    .map((property) => {
      const haystack = searchText(property);
      const title = normalize(property.title);
      const location = normalize(property.location);
      const score = terms.reduce((total, term) => {
        if (!haystack.includes(term)) return total;
        if (title.includes(term)) return total + 4;
        if (location.includes(term)) return total + 3;
        if (property.category === term) return total + 3;
        return total + 1;
      }, 0);

      return { property, score };
    })
    .filter(({ score }) => score > 0 || (terms.length === 0 && maxPrice !== null))
    .sort((a, b) => b.score - a.score || b.property.rating - a.property.rating)
    .map(({ property }) => property);
}

