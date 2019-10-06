/* eslint-disable camelcase */
/* eslint-disable no-useless-escape */
export const firstLetterToUppercase = string => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

export const arrayToUpperCase = array => {
  const finalarray = [];
  array.forEach(string => finalarray.push(firstLetterToUppercase(string)));
  return finalarray.join(', ');
};

const dateRegex = number => {
  const evaluation = /^[0-9]{2}/i.test(number);
  return !evaluation ? `0${number}` : number;
};

export const dateToISODate = string => {
  const date = new Date(string);
  const month = dateRegex(date.getMonth() + 1);
  const day = dateRegex(date.getDate());
  const finalDate = `${date.getFullYear()}-${month}-${day}`;
  return finalDate;
};

export const getTodayISODate = () => {
  const today = new Date();
  const month = dateRegex(today.getMonth() + 1);
  const day = dateRegex(today.getDate());
  const date = `${today.getFullYear()}-${month}-${day}`;
  return date;
};

/**
 * Summary. Checks if a string value has no characters.
 * @param {string} string String that will be assesed.
 * @return {bool} false: The value has no characters, true: the value has characters
 */
export const isFieldEmpty = string => {
  const isEmpty = /\w+/i.test(string);
  return !isEmpty;
};

/**
 * @param {string} url - name attribute value of the input that will be targeted to be performed the correspondant validation upon.
 * @param {func} callback - Function to be called after the url provided is assesed. Normally a funciton to display an invalid feedback
 * @param {func} callback2 - Function to be called after the url provided is assesed, this is used to display a valid feedback.
 */
export const linkUrlSanitizer = (url, callback, callback2 = null) => {
  let finalURL = url;

  if (finalURL === '') {
    return callback(false);
  }

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

  callback(false);
  return finalURL;
};

const numberToMonth__Eng = number => {
  switch (number) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
    default:
      return number;
  }
};

const numberToMonth__Est = number => {
  switch (number) {
    case 1:
      return 'Jaanuar';
    case 2:
      return 'Veebruar';
    case 3:
      return 'Märts';
    case 4:
      return 'Aprill';
    case 5:
      return 'Mai';
    case 6:
      return 'Juuni';
    case 7:
      return 'Juuli';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'Oktoober';
    case 11:
      return 'November';
    case 12:
      return 'Detsember';
    default:
      return number;
  }
};

export const monthToString = (monthInNumber, year, lang) => {
  const number = parseInt(monthInNumber, 10);
  let month;

  if (lang === 'eng') {
    month = numberToMonth__Eng(number, year);
    return `${month} ${year}`;
  }

  month = numberToMonth__Est(number, year);
  return `${month} ${year}`;
};

/**
 * @param {number} number - Number equivalent to a day of the week.
 * @param {string.oneOf(["eng", "est"])} lang - Selected language.
 * @returns {string} Day of the week.
 */
const numberToDay = (number, lang) => {
  if (lang === 'eng') {
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
  }

  switch (number) {
    case 0:
      return 'Pühapäev';
    case 1:
      return 'Esmaspäev';
    case 2:
      return 'Teisipäev';
    case 3:
      return 'Kolmapäev';
    case 4:
      return 'Neljapäev';
    case 5:
      return 'Reede';
    case 6:
      return 'Laupäev';
    default:
      return number;
  }
};

/**
 * @param {string} string - Date string in iso format.
 * @param {string.oneOf(["eng", "est"])} lang - Selected language.
 * @returns {string} Date in the format day in string/day in number / month / year
 */
export const isoStringToDate = (string, lang) => {
  const dateString = new Date(string);
  const weekDay = numberToDay(dateString.getDay(), lang);
  const monthAndYear = monthToString(
    dateString.getMonth() + 1,
    dateString.getFullYear(),
    lang
  );
  return `${weekDay} ${dateString.getDate()} ${monthAndYear}`;
};

export const weekToString = weekNumber => {
  const number = parseInt(weekNumber, 10);
  switch (number) {
    case 36:
      return 'September 8 -	September 14';
    case 37:
      return 'September 15 -	September 21';
    case 38:
      return 'September 22 -	September 28';
    case 39:
      return 'September 29 -	October 5';
    case 40:
      return 'October 6 -	October 12';
    case 41:
      return 'October 13 -	October 19';
    case 42:
      return 'October 20 -	October 26';
    case 43:
      return 'October 27 -	November 2';
    case 44:
      return 'November 3 - November 9';
    case 45:
      return 'November 10 -	November 16';
    case 46:
      return 'November 17 -	November 23';
    case 47:
      return 'November 24 -	December 30';
    case 48:
      return 'December 1 -	December 7';
    case 49:
      return 'December 8 -	December 14';
    case 50:
      return 'December 15 -	December 21';
    case 51:
      return 'December 22 -	December 28';
    case 52:
      return 'December 29 - December 31';
    default:
      return number;
  }
};
