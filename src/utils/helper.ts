export const determineCardEdgeClasses = (
  index: number,
  totalCards: number,
  totalColumns: number = 1,
  screenClass: string = '',
  edgeClassWithSize: string = 'rounded',
): string => {
  if (screenClass.trim() !== '' && !screenClass.endsWith(':')) {
    screenClass = `${screenClass}:`;
  }

  const splittedEdgeClass = edgeClassWithSize.split('-');
  const edgeClass = splittedEdgeClass[0];
  const edgeSize = splittedEdgeClass.length > 1 ? `-${splittedEdgeClass[1]}` : '';

  const isFirst = index === 0;
  const isLast = index === totalCards - 1;
  const isOneRowOnly = totalCards <= totalColumns;

  const lastRowStartIndex = totalCards % totalColumns === 0
    ? totalCards - totalColumns
    : totalCards - (totalCards % totalColumns);
  const isCardInFirstRow = index < totalColumns;
  const isCardInLastRow = index >= lastRowStartIndex;

  /* console.log(`Index: ${index}, Total Cards: ${totalCards}, Total Columns: ${totalColumns},
    Is First: ${isFirst}, Is Last: ${isLast}, Is One Row Only: ${isOneRowOnly},
    Last Row Start Index: ${lastRowStartIndex}, Is Card In First Row: ${isCardInFirstRow},
    Is Card In Last Row: ${isCardInLastRow}`); */

  if (isFirst) {
    return isOneRowOnly
      ? `${screenClass}${edgeClass}-tl${edgeSize} ${screenClass}${edgeClass}-bl${edgeSize}`
      : totalColumns === 1
        ? `${screenClass}${edgeClass}-t${edgeSize}`
        : `${screenClass}${edgeClass}-tl${edgeSize}`;
  }

  if (!isOneRowOnly && isCardInFirstRow && index === totalColumns - 1) {
    return `${screenClass}${edgeClass}-tr${edgeSize}`;
  }

  if (isCardInLastRow && index === lastRowStartIndex) {
    return (index % totalColumns) + 1 === 1
      ? `${screenClass}${edgeClass}-bl${edgeSize} ${screenClass}${edgeClass}-br${edgeSize}`
      : `${screenClass}${edgeClass}-br${edgeSize}`;
  }

  if (isLast) {
    return isOneRowOnly
      ? `${screenClass}${edgeClass}-tr${edgeSize} ${screenClass}${edgeClass}-br${edgeSize}`
      : totalColumns === 1
        ? `${screenClass}${edgeClass}-b${edgeSize}`
        : `${screenClass}${edgeClass}-br${edgeSize}`;
  }

  if (totalCards % index !== 0 && index === (totalCards - (totalCards % totalColumns)) - 1) {
    return `${screenClass}${edgeClass}-br${edgeSize}`;
  }

  return '';
};

const CATEGORY_NAME = new Map<string[], string>([
  [['pwn'], 'Binary Exploitation'],
  [['rev', 'reverse'], 'Reverse Engineering'],
  [['web'], 'Web Exploitation'],
  [['crypto'], 'Cryptography'],
  [['forensic'], 'Forensics'],
  [['misc'], 'Miscellaneous'],
]);

export const normalizeCategoryName = (category: string): string => {
  const lowerCategory = category.toLowerCase();
  for (const [keys, name] of CATEGORY_NAME.entries()) {
    if (keys.includes(lowerCategory)) {
      return name;
    }
  }

  return category.charAt(0).toUpperCase() + category.slice(1);
};
