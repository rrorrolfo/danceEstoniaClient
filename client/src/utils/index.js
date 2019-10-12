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
 * Scrolls the window to the specified coordenates.
 * @param {number} x X coordenate where the window will scroll.
 * @param {number} y Y coordenate where the window will scroll.
 * @return {void}
 */
export const scrollToRef = (x = 0, y = 0) => window.scrollTo(x, y);

/**
 * Checks if a string value has no characters.
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

/**
 * @param {number} weekNumber - Number equivalent to a week of the year.
 * @param {number} year - Year.
 * @param {string.oneOf(["eng", "est"])} lang - Selected language.
 * @returns {string} Month and days of a week.
 */
export const weekToString = (weekNumber, year, lang) => {
  const number = parseInt(weekNumber, 10);
  if (year === 2019) {
    if (lang === 'eng') {
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
    }
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
        return 'Oktoober 6 -	Oktoober 12';
      case 41:
        return 'Oktoober 13 -	Oktoober 19';
      case 42:
        return 'Oktoober 20 -	Oktoober 26';
      case 43:
        return 'Oktoober 27 -	November 2';
      case 44:
        return 'November 3 - November 9';
      case 45:
        return 'November 10 -	November 16';
      case 46:
        return 'November 17 -	November 23';
      case 47:
        return 'November 24 -	Detsember 30';
      case 48:
        return 'Detsember 1 -	Detsember 7';
      case 49:
        return 'Detsember 8 -	Detsember 14';
      case 50:
        return 'Detsember 15 -	Detsember 21';
      case 51:
        return 'Detsember 22 -	Detsember 28';
      case 52:
        return 'Detsember 29 - Detsember 31';
      default:
        return number;
    }
  }
  if (year === 2020) {
    if (lang === 'eng') {
      switch (number) {
        case 0:
          return 'January 1 -	January 5';
        case 1:
          return 'January 6 -	January 12';
        case 2:
          return 'January 13 -	January 19';
        case 3:
          return 'January 20 -	January 26';
        case 4:
          return 'January 27 -	February 2';
        case 5:
          return 'February 3 -	February 9';
        case 6:
          return 'February 10 -	February 16';
        case 7:
          return 'February 17 -	February 23';
        case 8:
          return 'February 24 -	March 1';
        case 9:
          return 'March 2 -	March 8';
        case 10:
          return 'March 9 -	March 15';
        case 11:
          return 'March 16 -	March 22';
        case 12:
          return 'March 23 -	March 29';
        case 13:
          return 'March 30 -	April 5';
        case 14:
          return 'April 6 -	April 12';
        case 15:
          return 'April 13 -	April 19';
        case 16:
          return 'April 20 -	April 26';
        case 17:
          return 'April 27 -	May 3';
        case 18:
          return 'May 4 -	May 10';
        case 19:
          return 'May 11 -	May 17';
        case 20:
          return 'May 18 -	May 24';
        case 21:
          return 'May 25 -	May 31';
        case 22:
          return 'June 1 -	June 7';
        case 23:
          return 'June 8 -	June 14';
        case 24:
          return 'June 15 -	June 21';
        case 25:
          return 'June 22 -	June 28';
        case 26:
          return 'June 29 -	July 5';
        case 27:
          return 'July 6 -	July 12';
        case 28:
          return 'July 13 -	July 19';
        case 29:
          return 'July 20 -	July 26';
        case 30:
          return 'July 27 -	August 2';
        case 31:
          return 'August 3 -	August 9';
        case 32:
          return 'August 10 -	August 16';
        case 33:
          return 'August 17 -	August 23';
        case 34:
          return 'August 24 -	August 30';
        case 35:
          return 'August 31 -	September 6';
        case 36:
          return 'September 7 -	September 13';
        case 37:
          return 'September 14 -	September 20';
        case 38:
          return 'September 21 -	September 27';
        case 39:
          return 'September 28 -	October 4';
        case 40:
          return 'October 5 -	October 11';
        case 41:
          return 'October 12 -	October 18';
        case 42:
          return 'October 19 -	October 25';
        case 43:
          return 'October 24 -	November 1';
        case 44:
          return 'November 2 - November 8';
        case 45:
          return 'November 9 -	November 15';
        case 46:
          return 'November 16 -	November 22';
        case 47:
          return 'November 23 -	December 29';
        case 48:
          return 'November 30 -	December 6';
        case 49:
          return 'December 7 -	December 13';
        case 50:
          return 'December 14 -	December 20';
        case 51:
          return 'December 21 -	December 27';
        case 52:
          return 'December 28 - December 31';
        default:
          return number;
      }
    }
    switch (number) {
      case 0:
        return 'Jaanuar 1 -	Jaanuar 5';
      case 1:
        return 'Jaanuar 6 -	Jaanuar 12';
      case 2:
        return 'Jaanuar 13 -	Jaanuar 19';
      case 3:
        return 'Jaanuar 20 -	Jaanuar 26';
      case 4:
        return 'Jaanuar 27 -	Veebruar 2';
      case 5:
        return 'Veebruar 3 -	Veebruar 9';
      case 6:
        return 'Veebruar 10 -	Veebruar 16';
      case 7:
        return 'Veebruar 17 -	Veebruar 23';
      case 8:
        return 'Veebruar 24 -	Märts 1';
      case 9:
        return 'Märts 2 -	Märts 8';
      case 10:
        return 'Märts 9 -	Märts 15';
      case 11:
        return 'Märts 16 -	Märts 22';
      case 12:
        return 'Märts 23 -	Märts 29';
      case 13:
        return 'Märts 30 -	Aprill 5';
      case 14:
        return 'Aprill 6 -	Aprill 12';
      case 15:
        return 'Aprill 13 -	Aprill 19';
      case 16:
        return 'Aprill 20 -	Aprill 26';
      case 17:
        return 'Aprill 27 -	May 3';
      case 18:
        return 'Mai 4 -	Mai 10';
      case 19:
        return 'Mai 11 -	Mai 17';
      case 20:
        return 'Mai 18 -	Mai 24';
      case 21:
        return 'Mai 25 -	Mai 31';
      case 22:
        return 'Juuni 1 -	Juuni 7';
      case 23:
        return 'Juuni 8 -	Juuni 14';
      case 24:
        return 'Juuni 15 -	Juuni 21';
      case 25:
        return 'Juuni 22 -	Juuni 28';
      case 26:
        return 'Juuni 29 -	Juuli 5';
      case 27:
        return 'Juuli 6 -	Juuli 12';
      case 28:
        return 'Juuli 13 -	Juuli 19';
      case 29:
        return 'Juuli 20 -	Juuli 26';
      case 30:
        return 'Juuli 27 -	August 2';
      case 31:
        return 'August 3 -	August 9';
      case 32:
        return 'August 10 -	August 16';
      case 33:
        return 'August 17 -	August 23';
      case 34:
        return 'August 24 -	August 30';
      case 35:
        return 'August 31 -	September 6';
      case 36:
        return 'September 7 -	September 13';
      case 37:
        return 'September 14 -	September 20';
      case 38:
        return 'September 21 -	September 27';
      case 39:
        return 'September 28 -	October 4';
      case 40:
        return 'Oktoober 5 -	Oktoober 11';
      case 41:
        return 'Oktoober 12 -	Oktoober 18';
      case 42:
        return 'Oktoober 19 -	Oktoober 25';
      case 43:
        return 'Oktoober 24 -	November 1';
      case 44:
        return 'November 2 - November 8';
      case 45:
        return 'November 9 -	November 15';
      case 46:
        return 'November 16 -	November 22';
      case 47:
        return 'November 23 -	November 29';
      case 48:
        return 'November 30 -	Detsember 6';
      case 49:
        return 'Detsember 7 -	Detsember 13';
      case 50:
        return 'Detsember 14 -	Detsember 20';
      case 51:
        return 'Detsember 21 -	Detsember 27';
      case 52:
        return 'Detsember 28 - Detsember 31';
      default:
        return number;
    }
  }
  return true;
};
