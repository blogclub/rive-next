const mapping: any = {
  "0": "a",
  "1": "b",
  "2": "c",
  "3": "d",
  "4": "e",
  "5": "f",
  "6": "g",
  "7": "h",
  "8": "i",
  "9": "j",
};

export function encrypt({ data }: any) {
  // Encrypt the data by mapping each digit
  return data
    .toString()
    .split("")
    .map((digit: any) => mapping[digit] || digit)
    .join("");
}

export function decrypt({ data }: any) {
  // Define the reverse mapping to decrypt data
  const reverseMapping: any = {};
  for (const key in mapping) {
    reverseMapping[mapping[key]] = key;
  }

  // Decrypt the data by mapping back each character
  return data
    .split("")
    .map((char: any) => reverseMapping[char] || char)
    .join("");
}
