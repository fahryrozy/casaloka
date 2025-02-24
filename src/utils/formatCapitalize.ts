export const formatCapitalize = (str: string): string => {
  const vowels = "AEIOU";

  return str
    .toUpperCase()
    .split(" ")
    .map((word) => {
      if (
        word.length > 1 &&
        !vowels.includes(word.charAt(0)) &&
        !vowels.includes(word.charAt(1))
      ) {
        return word; // Skip capitalization if both the first and second letters are not vowels
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};
