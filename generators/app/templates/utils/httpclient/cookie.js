function trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

const cookie = {
  token: '',

  // 获取 Cookie
  getCookie () {
    let token = this.token;
    if (!token) {
      token = wx.getStorageSync('token');
    }
    return {
      token,
    };
  },
  // 设置 Cookie
  setCookie (Cookie) {
    const Cookies = Cookie.split(';');
    if (Cookies.length === 0) {return;}
    Cookies.forEach((temp) => {
      const temps = temp.split('=');
      const key = trim(temps[0]);
      const value = temps[1];
      switch (key) {
      case 'token':
        this.token = value;
        wx.setStorageSync('token', value);
        break;
      }
    });
  },
};

export default cookie;
