const wxp = {
  checkSession () {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success () {
          // session_key 未过期，并且在本生命周期一直有效
          resolve(false);
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          resolve(true);
        },
      });
    });
  },
  login () {
    return new Promise((resolve, reject) => {
      wx.login({
        success (res) {
          resolve(res.code);
        },
        fail () {
          reject();
        },
      });
    });
  },
  getUserInfo () {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success (res) {
          resolve(res);
        },
        fail () {
          reject();
        },
      });
    });
  },
};

export default wxp;
