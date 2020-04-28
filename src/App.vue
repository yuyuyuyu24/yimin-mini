<script>
import { getNotice } from '@/api/notice'
export default {
  data () {
    return {
      alertNotice: {}
    }
  },
  onLaunch: function () {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
    this.getNoticeFun()
  },
  methods: {
    getNoticeFun () {
      let _this = this
      getNotice('notice/getNotice').then(res => {
        if (res.data.data) {
          _this.alertNotice = res.data.data[0]
          if (_this.alertNotice.noticeStatus === 1) {
            wx.showModal({
              title: _this.alertNotice.noticeTitle,
              content: _this.alertNotice.noticeContent,
              showCancel: false
            })
          }
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style  lang="wxss">
@import '../static/font/iconfont.css';
page {
  height: 100%;
}
</style>
