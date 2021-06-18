// packages/pages/webview/index.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
  },

  /**
   * 网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息
   *
   * e.detail = { data }，data是多次 postMessage 的参数组成的数组
   */
  onMessage ({ detail }) {
    const { data } = detail;
    if (
      data &&
      Array.isArray(data) &&
      data.length > 0
    ) {
      const { emitter } = app.globalData;
      data.forEach(({ event }) => {
        if (event === 'xxxxx') {
          // emitter.on('xxxxx', () => {});
          emitter.emit('xxxxx');
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tgt = wx.getStorageSync('tgt');

    let { target } = options;
    target = decodeURIComponent(target);
    if (target.includes('?')) {
      this.setData({
        url: `${target}&tgt=${tgt}`,
      });
      return;
    }
    this.setData({
      url: `${target}?tgt=${tgt}`,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    const target = encodeURIComponent(options.webViewUrl);
    return {
      path: '/pages/splash/index',
    };
  },
});
