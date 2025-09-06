export const truncateText = (text: string, length: number) => {
  return text.length > length ? `${text.slice(0, length - 1).trim()}...` : text;
};
