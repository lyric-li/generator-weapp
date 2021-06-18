// app.js

// 检查更新
import './utils/update';
import env from './utils/env';
import emitter from './utils/emitter';

App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null,
    env,
    emitter,
  },
});
