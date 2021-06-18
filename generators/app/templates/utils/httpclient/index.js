import request from './request';
import cookie from './cookie';
import ServiceError from '../error';
import env from '../env';

// 请求客户端
const httpclient = {
  // GET 请求
  get (url, params, options) {
    return this.request(url, params, options);
  },
  // POST 请求
  post (url, params, options = {}) {
    options = Object.assign(options, { method: 'POST' });
    return this.request(url, params, options);
  },
  // 请求
  async request (url = '', params = {}, options = {}) {
    options.method = options.method || 'GET';
    options.header = options.header || {};
    options.header = Object.assign(options.header, { 'content-type': 'application/json' });

    // 设置请求 loading
    if (typeof (options.loading) === 'undefined') {
      options.loading = false;
    }

    return new Promise((resolve, reject) => {
      if (options.loading) {
        wx.showLoading({
          title: '请稍后',
          mask: true,
        });
      }

      // 设置 Cookie
      let Cookie = cookie.getCookie();
      if (Cookie) {
        options.header.token = `${Cookie.token}`;

        Cookie = `token=${Cookie.token};`;
        options.header.Cookie = Cookie;
      }

      request(
        `${env.baseUrl}${env.gateway}${url}`,
        config.data,
        options,
      ).then((res) => {
        if (res && res.header && res.header['Set-Cookie']) {
          let Cookie = res.header['Set-Cookie'].replace(/path=\/,/g, '');
          Cookie = Cookie.replace(/Max-Age=0,/g, '');
          // 保存 Cookie 到 Storage
          cookie.setCookie(Cookie);
        }
        const status = res.statusCode;
        if (status === 200) {
          const result = res.data;
          console.log('┏---------------------------------------------┓');
          console.log(' 请求地址:', url);
          console.log(' 请求方式:', options.method);
          console.log(' 请求参数:', params);
          console.log(' 响应结果:', result);
          console.log('┗---------------------------------------------┛');
          if (result.code === 200) {
            resolve(result.data);
          } else {
            if (result.code !== 10005) {
              const timeout = setTimeout(() => {
                clearTimeout(timeout);
                wx.showToast({
                  title: result.message,
                  icon: 'none',
                  duration: 2000,
                });
              }, 0);
            } else {
              const pages = getCurrentPages();
              const page = pages[pages.length - 1];
              if (page.route !== 'pages/splash/index') {
                const timeout = setTimeout(() => {
                  clearTimeout(timeout);
                  wx.showToast({
                    title: '登录已过期，即将自动为您登录',
                    icon: 'none',
                    duration: 2000,
                  });
                }, 0);
                wx.reLaunch({
                  url: `/pages/splash/index?redirect=/${page.route}`,
                });
              }
            }
            reject(new ServiceError(JSON.stringify(result)));
          }
        } else if (status === 500) {
          const result = {
            code: 500,
            message: '服务器异常, 请稍后重试',
          };
          console.error('┏---------------------------------------------┓');
          console.error(' 请求地址:', url);
          console.error(' 请求方式:', options.method);
          console.error(' 请求参数:', params);
          console.error(' 响应结果:', result);
          console.error('┗---------------------------------------------┛');
          const timeout = setTimeout(() => {
            clearTimeout(timeout);
            wx.showToast({
              title: '服务器异常, 请稍后重试',
              icon: 'none',
              duration: 2000,
            });
          }, 0);
          reject(new ServiceError(JSON.stringify(result)));
        }
      }).catch((err) => {
        console.error('┏---------------------------------------------┓');
        console.error(' 请求地址:', url);
        console.error(' 请求方式:', options.method);
        console.error(' 请求参数:', params);
        console.error(' 请求异常:', err);
        console.error('┗---------------------------------------------┛');
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          wx.showToast({
            title: '服务器异常, 请稍后重试',
            icon: 'none',
            duration: 2000,
          });
        }, 0);
        reject(err);
      }).finally(() => {
        if (options.loading) {
          wx.hideLoading();
        }
      });
    });
  },
};

export default httpclient;
