export const firstLetterToUppercase = string => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

export const arrayToUpperCase = array => {
  const finalarray = [];
  array.forEach(string => finalarray.push(firstLetterToUppercase(string)));
  return finalarray.join(', ');
};

export const monthToString = monthInNumber => {
  const number = parseInt(monthInNumber, 10);
  switch (number) {
    case 1:
      return 'January, 2019';
    case 2:
      return 'February, 2019';
    case 3:
      return 'March, 2019';
    case 4:
      return 'April, 2019';
    case 5:
      return 'May, 2019';
    case 6:
      return 'June, 2019';
    case 7:
      return 'July, 2019';
    case 8:
      return 'August, 2019';
    case 9:
      return 'September, 2019';
    case 10:
      return 'October, 2019';
    case 11:
      return 'November, 2019';
    case 12:
      return 'December, 2019';
    default:
      return number;
  }
};

export const weekToString = weekNumber => {
  const number = parseInt(weekNumber, 10);
  switch (number) {
    case 30:
      return 'This week';
    case 31:
      return 'July 29	- August 4';
    case 32:
      return 'August 5 - August 11';
    case 33:
      return 'August 12 -	August 18';
    case 34:
      return 'August 19 -	August 25';
    case 35:
      return 'August 26 -	September 1';
    case 36:
      return 'September 2 -	September 8';
    case 37:
      return 'September 9 -	September 15';
    case 38:
      return 'September 16 -	September 22';
    case 39:
      return 'September 23 -	September 29';
    case 40:
      return 'September 30 -	October 6';
    case 41:
      return 'October 7 -	October 13';
    case 42:
      return 'October 14 -	October 20';
    case 43:
      return 'October 21 -	October 27';
    case 44:
      return 'October 28 -	November 3';
    case 45:
      return 'November 4 - November 10';
    case 46:
      return 'November 11 -	November 17';
    case 47:
      return 'November 18 -	November 24';
    case 48:
      return 'November 25 -	December 1';
    case 49:
      return 'December 2 -	December 8';
    case 50:
      return 'December 9 -	December 15';
    case 51:
      return 'December 16 -	December 22';
    case 52:
      return 'December 23 -	December 29';
    default:
      return number;
  }
};
