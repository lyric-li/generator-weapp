// pages/splash/index.js
import { createStoreBindings } from 'mobx-miniprogram-bindings';
import userStore from '../../store/user';
import maniuwx from '../../utils/maniuwx';

const redirectRoutes = [
  '/pages/personal/index',
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    redirect: '',
    isbind: true,
    height: '',
  },

  setLogoH () {
    // iPhone X
    // 比例 = 图片高度(px) / 屏幕高度(px)
    const rate = 507 / 812;
    const screenHeight = wx.getSystemInfoSync().screenHeight;
    const h = rate * screenHeight;
    this.setData({
      height: `${h}px`,
    });
  },

  /**
   * 立即体验
   */
  toExperience () {
    const { redirect } = this.data;
    if (
      redirect &&
      redirectRoutes.includes(redirect)
    ) {
      wx.switchTab({
        url: redirect,
      });
      return;
    }
    // wx.switchTab({
    //   url: '/pages/home/index',
    // });
  },

  async getUserPhoneNumber ({ detail }) {
    if (detail.errMsg === 'getPhoneNumber:ok') {
      const data = await this.bindUserPhone({
        encryptedData: detail.encryptedData,
        iv: detail.iv,
      }, { loading: true });
      wx.setStorageSync('token', data.token);
      this.toExperience();
    }
  },

  /**
   * 登录
   * @param {*} code 用户登录凭证
   * @param {*} encryptedData 包括敏感数据在内的完整用户信息的加密数据
   * @param {*} iv 加密算法的初始向量
   * @param {*} signature 使用 sha1( rawData + sessionkey ) 得到字符串
   * @param {*} rawData 不包括敏感信息的原始数据字符串
   */
  login ({
    code,
    encryptedData,
    iv,
    signature,
    rawData,
  }) {
    return this.mpLogin({
      code,
      encryptedData,
      iv,
      signature,
      rawData,
    });
  },

  async toLogin () {
    const code = await maniuwx.login();
    wx.setStorageSync('code', code);

    const data = await maniuwx.getUserInfo();
    try {
      let json = await this.login({
        code,
        encryptedData: data.encryptedData,
        iv: data.iv,
        signature: data.signature,
        rawData: data.rawData,
      });
      if (json) {
        json = JSON.parse(json);
        wx.setStorageSync('token', json.token);
      }

      this.toExperience();
    } catch (error) {
      if (error.name === 'ServiceError') {
        error = JSON.parse(error.errors);
        // 未绑定手机号
        if (error.code === 20038) {
          this.setData({
            isbind: false,
          });
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { redirect } = options;
    this.data.redirect = redirect;

    this.storeBindings = createStoreBindings(this, {
      store: userStore,
      actions: [
        'getUserInfo',
        'mpLogin',
        'bindUserPhone',
      ],
    });

    try {
      await this.getUserInfo();
      this.toExperience();
    } catch (error) {
      if (error.name === 'ServiceError') {
        error = JSON.parse(error.errors);
        // 未登录
        if (error.code === 10005) {
          this.toLogin();
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.storeBindings.destroyStoreBindings();
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
    this.setLogoH();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
  onShareAppMessage: function () {

  },
});
