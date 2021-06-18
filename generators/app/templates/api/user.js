import httpclient from '../utils/httpclient/index';

const PREFIX = '/xxx';

/**
 * 获取用户信息
 */
export function getUserInfo (params, options) {
  return httpclient.get(
    `${PREFIX}/xxx/getUserInfo`,
    params,
    options,
  );
}

/**
 * 微信小程序登录
 */
export function mpLogin (params, options) {
  return httpclient.post(
    `${PREFIX}/xxx/mpLogin`,
    params,
    options,
  );
}

/**
 * 绑定用户手机号
 */
export function bindUserPhone (params, options) {
  return httpclient.post(
    `${PREFIX}/xxx/bindUserPhone`,
    params,
    options,
  );
}
