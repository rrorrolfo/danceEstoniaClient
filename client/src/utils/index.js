/* eslint-disable no-useless-escape */
export const firstLetterToUppercase = string => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

export const arrayToUpperCase = array => {
  const finalarray = [];
  array.forEach(string => finalarray.push(firstLetterToUppercase(string)));
  return finalarray.join(', ');
};

export const getTodayISODate = () => {
  const dateRegex = number => {
    const evaluation = /^[0-9]{2}/i.test(number);
    return !evaluation ? `0${number}` : number;
  };
  const today = new Date();
  const month = dateRegex(today.getMonth() + 1);
  const day = dateRegex(today.getDate());
  const date = `${today.getFullYear()}-${month}-${day}`;
  return date;
};

/**
 * @param {string} url - name attribute value of the input that will be targeted to be performed the correspondant validation upon.
 * @param {func} callback - Function to be called after the url provided is assesed. Normally a funciton to display an invalid feedback
 * @param {func} callback2 - Function to be called after the url provided is assesed, this is used to display a valid feedback.
 */
export const linkUrlSanitizer = (url, callback, callback2 = null) => {
  callback(false);
  let finalURL = url;
  // check for "http://"" or "https://""
  const hasProtocol = /^http[s]?:[\/]{2}/i.test(url);
  if (!hasProtocol) {
    finalURL = `http://${url}`;
  }

  // check for url starting with "www."
  const hasWWW = /^http[s]?:[\/]{2}[w]{3}\./i.test(finalURL);
  if (!hasWWW) {
    const urlBeginning = finalURL.indexOf('//');
    finalURL = `${finalURL.slice(0, urlBeginning + 2)}www.${finalURL.slice(
      urlBeginning + 2,
      finalURL.length
    )}`;
  }

  // check for a domain
  const hasDomain = /^http[s]?:[\/]{2}[w]{3}\.\w+\.[a-z]+/i.test(finalURL);
  if (!hasDomain) {
    return callback(true);
  }

  if (callback2) {
    callback2(true);
  }
  return finalURL;
};

export const monthToString = (monthInNumber, year = 2019) => {
  const number = parseInt(monthInNumber, 10);
  switch (number) {
    case 1:
      return `January ${year}`;
    case 2:
      return `February ${year}`;
    case 3:
      return `March ${year}`;
    case 4:
      return `April ${year}`;
    case 5:
      return `May ${year}`;
    case 6:
      return `June ${year}`;
    case 7:
      return `July ${year}`;
    case 8:
      return `August ${year}`;
    case 9:
      return `September ${year}`;
    case 10:
      return `October ${year}`;
    case 11:
      return `November ${year}`;
    case 12:
      return `December ${year}`;
    default:
      return number;
  }
};

export const numberToDay = number => {
  switch (number) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return number;
  }
};

export const isoStringToDate = string => {
  const dateString = new Date(string);
  const weekDay = numberToDay(dateString.getDay());
  const monthAndYear = monthToString(dateString.getMonth() + 1);
  return `${weekDay} ${dateString.getDate()} ${monthAndYear}`;
};

export const weekToString = weekNumber => {
  const number = parseInt(weekNumber, 10);
  switch (number) {
    case 32:
      return 'August 12 -	August 18';
    case 33:
      return 'August 19 -	August 25';
    case 34:
      return 'August 26 -	September 1';
    case 35:
      return 'September 2 -	September 8';
    case 36:
      return 'September 9 -	September 15';
    case 37:
      return 'September 16 -	September 22';
    case 38:
      return 'September 23 -	September 29';
    case 39:
      return 'September 30 -	October 6';
    case 40:
      return 'October 7 -	October 13';
    case 41:
      return 'October 14 -	October 20';
    case 42:
      return 'October 21 -	October 27';
    case 43:
      return 'October 28 -	November 3';
    case 44:
      return 'November 4 - November 10';
    case 45:
      return 'November 11 -	November 17';
    case 46:
      return 'November 18 -	November 24';
    case 47:
      return 'November 25 -	December 1';
    case 48:
      return 'December 2 -	December 8';
    case 49:
      return 'December 9 -	December 15';
    case 50:
      return 'December 16 -	December 22';
    case 51:
      return 'December 23 -	December 29';
    case 52:
      return 'December 30 - December 31';
    default:
      return number;
  }
};
