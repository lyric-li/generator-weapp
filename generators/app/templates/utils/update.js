// 获取全局唯一的版本更新管理器，用于管理小程序更新
const manager = wx.getUpdateManager();

// 检测更新结果事件
manager.onCheckForUpdate((res) => {
  console.log('检测是否有可用更新');
  if (res.hasUpdate) {
    console.log('有可用更新');
    // 监听小程序有版本更新事件
    manager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已准备好，单击确定重启应用',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            manager.applyUpdate();
          }
        },
      });
    });
    // 监听小程序更新失败事件
    manager.onUpdateFailed(() => {
      wx.showModal({
        title: '提示',
        content: '更新失败，退出应用重试',
        showCancel: false,
      });
    });
  } else {
    console.log('无可用更新');
  }
});
