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
