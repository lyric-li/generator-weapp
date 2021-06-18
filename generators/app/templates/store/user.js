import {
  configure,
  observable,
  action,
  runInAction,
} from 'mobx-miniprogram';

import {
  getUserInfo,
  mpLogin,
  bindUserPhone,
} from '../api/user';

// 不允许在动作外部修改状态
configure({ enforceActions: 'observed' });

const store = observable({
  userInfo: void 0,

  /**
   * 获取用户信息
   */
  getUserInfo: action(function (payload, options) {
    return new Promise((resolve, reject) => {
      getUserInfo(
        payload,
        options
      ).then((data) => {
        runInAction(() => {
          this.userInfo = data;
        });
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  }),

  /**
   * 微信登录
   */
  mpLogin: action(function (payload, options) {
    return new Promise((resolve, reject) => {
      mpLogin(
        payload,
        options
      ).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  }),

  /**
   * 绑定用户手机号
   */
  bindUserPhone: action(function (payload, options) {
    return new Promise((resolve, reject) => {
      bindUserPhone(
        payload,
        options
      ).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  }),

});

export default store;
