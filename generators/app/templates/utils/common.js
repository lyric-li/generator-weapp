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
