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

const CATEGORY_LOOKUP = new Map<string, string>([
  ['pwn', 'Binary Exploitation'],
  ['binex', 'Binary Exploitation'],
  ['rev', 'Reverse Engineering'],
  ['reverse', 'Reverse Engineering'],
  ['web', 'Web Exploitation'],
  ['webex', 'Web Exploitation'],
  ['cry', 'Cryptography'],
  ['crypto', 'Cryptography'],
  ['forensic', 'Forensics'],
  ['misc', 'Miscellaneous'],
]);

export const normalizeCategoryName = (category: string): string => {
  const lower = category.toLowerCase();

  for (const [key, name] of CATEGORY_LOOKUP) {
    if (lower.includes(key)) {
      return name;
    }
  }

  return category.charAt(0).toUpperCase() + category.slice(1);
};

const backgroundColors: string[] = [
  "bg-flexoki-light-ui dark:bg-flexoki-dark-ui",
  "text-flexoki-dark-tx dark:text-flexoki-light-tx bg-flexoki-light-re dark:bg-flexoki-dark-re",
  "text-flexoki-dark-tx dark:text-flexoki-light-tx bg-flexoki-light-or dark:bg-flexoki-dark-or",
  "text-flexoki-dark-tx dark:text-flexoki-light-tx bg-flexoki-light-ye dark:bg-flexoki-dark-ye",
  "text-flexoki-dark-tx dark:text-flexoki-light-tx bg-flexoki-light-gr dark:bg-flexoki-dark-gr",
  "text-flexoki-dark-tx dark:text-flexoki-light-tx bg-flexoki-light-cy dark:bg-flexoki-dark-cy",
  "text-flexoki-dark-tx dark:text-flexoki-light-tx bg-flexoki-light-bl dark:bg-flexoki-dark-bl",
  "text-flexoki-dark-tx dark:text-flexoki-light-tx bg-flexoki-light-pu dark:bg-flexoki-dark-pu",
  "text-flexoki-dark-tx dark:text-flexoki-light-tx bg-flexoki-light-ma dark:bg-flexoki-dark-ma",
];

export const getBackgroundColorByKey = (key: string) => {
  const hash = Array.from(key).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % backgroundColors.length;
  return backgroundColors[index];
};

const categoryBackgroundColors: { [key: string]: string } = {
  crypto: backgroundColors[3]!,
  web: backgroundColors[6]!,
  pwn: backgroundColors[1]!,
  bin: backgroundColors[1]!,
  rev: backgroundColors[7]!,
  forensics: backgroundColors[4]!,
  misc: backgroundColors[2]!,
};

export const getBackgroundColorByCategory = (category: string) => {
  const categoryLowerCased = category.toLowerCase();
  const matchedKey = Object.keys(categoryBackgroundColors).find((key) =>
    categoryLowerCased.includes(key),
  );

  return matchedKey ? categoryBackgroundColors[matchedKey] : backgroundColors[2];
};

const categoryIconMap: { [key: string]: string } = {
  crypto: "lucide:lock",
  web: "lucide:globe",
  pwn: "lucide:skull",
  bin: "lucide:skull",
  rev: "lucide:eye",
  forensics: "lucide:search",
  misc: "lucide:apple",
};

export const getIconByCategory = (category: string) => {
  const categoryLowerCased = category?.toLowerCase() || "";
  const matchedKey = Object.keys(categoryIconMap).find((key) => categoryLowerCased.includes(key));

  return matchedKey ? categoryIconMap[matchedKey] : "lucide:tag";
};

const difficultyBackgroundColors: { [key: string]: string } = {
  easy: backgroundColors[4]!,
  medium: backgroundColors[3]!,
  hard: backgroundColors[1]!,
  insane: backgroundColors[7]!,
};

export const getDifficultyColor = (difficulty: string) => {
  return difficultyBackgroundColors[difficulty.toLowerCase()] || backgroundColors[2];
};

const difficultyIcons: { [key: string]: string } = {
  easy: "lucide:leaf",
  medium: "lucide:zap",
  hard: "lucide:flame",
  insane: "lucide:skull",
};

export const getDifficultyIcon = (difficulty: string) => {
  return difficultyIcons[difficulty.toLowerCase()] || "lucide:circle";
};

const osIcons: { [key: string]: string } = {
  linux: "lucide:terminal",
  windows: "lucide:monitor",
  none: "lucide:cloud",
};

export const getOSIcon = (os: string) => {
  return osIcons[os.toLowerCase()] || "lucide:circle";
};

const platformIcons: { [key: string]: string } = {
  tryhackme: "lucide:shield",
  hackthebox: "lucide:box",
  picoctf: "lucide:graduation-cap",
};

export const getPlatformIcon = (platform: string) => {
  return platformIcons[platform.toLowerCase()] || "lucide:globe";
};
