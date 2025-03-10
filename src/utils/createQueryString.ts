

export const createQueryString = (
  object: Record<string, string | undefined | null>
) => {
  let string = ""; // Change `const` to `let` to allow modification

  for (const key in object) {
    const value = object[key];
    if (typeof value === "string" && value.trim() !== "") {
      string += string === "" ? `${key}=${value}` : `&${key}=${value}`;
    }
  }

  return string; // Returns the correct query string
};

