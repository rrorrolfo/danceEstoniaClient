export const firstLetterToUppercase = string => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

export const arrayToUpperCase = array => {
  const finalarray = [];
  array.forEach(string => finalarray.push(firstLetterToUppercase(string)));
  return finalarray.join(', ');
};
