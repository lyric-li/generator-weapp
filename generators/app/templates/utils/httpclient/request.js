// 小程序请求
const request = (url, data, options) => {
  options = options || {};
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: options.header || { 'content-type': 'application/json' },
      method: options.method || 'GET',
      dataType: options.dataType || 'json',
      responseType: options.responseType || 'text',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export default request;
