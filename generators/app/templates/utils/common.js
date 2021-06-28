/**
 * 延时执行
 * @param {*} n 延时秒杀
 * @returns Promise
 */
export function sleep (n) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve();
    }, n * 1000);
  });
}

/**
 * 数组装对象
 * @param {*} arr 目标数组
 * @param {*} k1 key1
 * @param {*} k2 key2
 */
export function array2obj (
  arr = [],
  k1 = 'id',
  k2 = 'name'
) {
  return Object.fromEntries(
    arr.map((item) => [item[k1], item[k2]])
  );
}

/**
 * 格式化时间
 * @param {*} date 日期
 * @returns
 */
export function formatTime (date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

function formatNumber (n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};
