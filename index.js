/**
 * 一个使用方式很像 moment.js 的库
 * 但是只提供了函数式风格的 API
 */

function Moment(time = +new Date) {
  if (!(this instanceof Moment)) {
    return new Moment(time);
  }
  if (time instanceof Moment) {
    time = time.valueOf();
  }
  this._value = new Date(time) || new Date();
}

Moment.prototype.valueOf = function() {
  return this._value.valueOf();
}

Moment.prototype.format = function(str = 'YYYY-MM-DD HH:mm:ss') {
  let leftPadZero = num => {
    if (num < 10) {
      return '0' + num;
    }
    return num;
  };

  const year = this._value.getFullYear();
  const months = this._value.getMonth() + 1;
  let days = this._value.getDate();
  const hours = this._value.getHours();
  const minutes = this._value.getMinutes();
  const seconds = this._value.getSeconds();

  let res = str;
  if (/YYYY/.test(str)) {
    res = res.replace('YYYY', year);
  }
  if (/MM/.test(str)) {
    res = res.replace('MM', leftPadZero(months));
  }
  if (/DD/.test(str)) {
    res = res.replace('DD', leftPadZero(days));
  } else if (/dd/.test(str)) {
    res = res.replace('dd', days);
  }

  if (/HH/.test(str)) {
    res = res.replace('HH', leftPadZero(hours));
  }
  if (/mm/.test(str)) {
    res = res.replace('mm', leftPadZero(minutes));
  }
  if (/:ss/.test(str)) {
    res = res.replace('ss', leftPadZero(seconds));
  }
  return res;
};

/**
 * 与 moment.js 的 add 方法一致
 * @param {Number} num  [数字]
 * @param {String} unit ['days']
 */
Moment.prototype.add = function(num, unit) {
  let res = Moment();
  if (['ms', 'seconds', 'minutes', 'hours', 'days', 'weeks'].indexOf(unit) > -1) {
    const unitMap = {
      ms: 1,
      seconds: 1000,
      minutes: 60 * 1000,
      hours: 3600 * 1000,
      days: 24 * 3600 * 1000,
      weeks: 7 * 24 * 3600 * 1000,
    };
    let increase = num * unitMap[unit];
    res = Moment(new Date(this._value.valueOf() + increase));
  }
  return res;
};

Moment.prototype.endOf = function(unit) {
  /**
   * iOS: YYYY/MM/DD HH:mm:ss 才能与安卓一致
   */
  const endOfDay = this.format('YYYY/MM/DD') + ' 23:59:59';
  return Moment(endOfDay);
};

module.exports = Moment;
