// logs.js
const format = require('../../../../utils/format.js');

Page({
  data: {
    logs: [],
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log) => format.formatTime(new Date(log))),
    });
  },
});
