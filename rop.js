/*
 * ROP screening window logic.
 * A line-for-line port of the RCPCH "ROP Screening Window Calculator 2024"
 * (v3.2, October 2024) spreadsheet, cells C11:C14 and E8.
 */
(function (root) {
  'use strict';

  var DAY_MS = 86400000;
  var PMA_31_WEEKS = 217; // 31+0 weeks in days
  var PMA_36_WEEKS = 252; // 36+0 weeks in days
  var MIN_START = 28;     // never screen before 28 days of age

  /** Returns { status, message, startDay, endDay, startDate, endDate, gaDays }.
   *  status: 'examine' | 'consider' | 'not-eligible' */
  function calculate(weeks, days, birthweight, dob) {
    var gaDays = weeks * 7 + days;
    var startDay;

    if (weeks < 32) {
      startDay = Math.max(PMA_31_WEEKS - gaDays, MIN_START);
    } else if (birthweight <= 1500) {
      startDay = Math.max(Math.min(PMA_36_WEEKS - gaDays, MIN_START), 0);
    } else {
      startDay = null;
    }

    var status;
    if (weeks === 31 && birthweight > 1500) status = 'consider';
    else if (weeks < 31 || birthweight < 1501) status = 'examine';
    else status = 'not-eligible';

    if (startDay === null) {
      return { status: 'not-eligible', gaDays: gaDays, startDay: null, endDay: null, startDate: null, endDate: null };
    }
    var endDay = startDay + 6;
    return {
      status: status,
      gaDays: gaDays,
      startDay: startDay,
      endDay: endDay,
      startDate: dob ? addDays(dob, startDay) : null,
      endDate: dob ? addDays(dob, endDay) : null
    };
  }

  /** dob is a Date at UTC midnight; avoids DST drift. */
  function addDays(dob, n) {
    return new Date(dob.getTime() + n * DAY_MS);
  }

  /** "YYYY-MM-DD" -> Date at UTC midnight, or null if invalid. */
  function parseISODate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    if (!m) return null;
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    if (d.getUTCFullYear() !== +m[1] || d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) return null;
    return d;
  }

  /** PMA in "weeks+days" for a given gestational age in days. */
  function formatPMA(totalDays) {
    return Math.floor(totalDays / 7) + '+' + (totalDays % 7);
  }

  var api = { calculate: calculate, parseISODate: parseISODate, addDays: addDays, formatPMA: formatPMA };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ROP = api;
})(typeof window !== 'undefined' ? window : globalThis);
