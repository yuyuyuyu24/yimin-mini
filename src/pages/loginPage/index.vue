<template>
  <div class="loginPage">
    <div class="loginPage-box">
      <img src="http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GEQzgD16BuMLe7xwefdGnY4tQoqlHOU2o*gu*UB8awTjO3Lz4U7uzGBNMeL0Pcld97c5TiKhrxLKXO4d9j2HrdY!/b&bo=ggGCAYIBggEDFzI!&rf=viewer_4&t=5" />
      <p>清真伊民肉业 食品工业 道德工业</p>
      <button
        open-type="getUserInfo"
        @getuserinfo="bindGetUserInfo"
      >微信登录</button>
    </div>
    <van-dialog id="van-dialog" />

  </div>
</template>
<script>
import { miniLogin } from '@/api/login'
import { newUser, searchUser, searchOpenid, changeuserMsg } from '@/api/user'
import Dialog from '../../../static/vant/dist/dialog/dialog'

export default {
  data () {
    return {
      _3rd_session: {},
      userMegList: {}
    }
  },
  onShow () {
    this.login()
  },
  methods: {
    // 登录方法
    login () {
      let _this = this
      wx.login({
        success (res) {
          if (res.code) {
            let data = {
              appid: 'wxe48ab033fb1c161c',
              secret: '20802c6387f3c9d49e71c9cf990f638d',
              code: res.code
            }
            miniLogin('mini/login', data).then(res => {
              _this._3rd_session = JSON.parse(res.data.message)
            })
          } else {
            wx.showToast({
              title: '登录失败，请稍后再试1。',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail () {
          wx.showToast({
            title: '登录失败，请稍后再试2。',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    getUserInfo () { },
    bindGetUserInfo (e) {
      let _this = this
      if (e.mp.detail.rawData) {
        let userMeg = JSON.parse(e.mp.detail.rawData)
        let list = _this._3rd_session
        _this.userMegList = {
          userName: userMeg.nickName,
          userImg: userMeg.avatarUrl,
          session_key: list.session_key,
          openId: list.openid,
          userStatus: '1'
        }
        let search = {
          openId: list.openid
        }
        // 查找该openid是否存在
        searchUser('mini/searchUser', search).then(res => {
          if (res.data.data.count === 0) {
            _this.newUserFun(_this.userMegList) // 不存在就写入用户表内
          } else {
            let openIdList = {
              openid: list.openid
            }
            searchOpenid('mini/searchOpenid', openIdList).then(res => {
              let data = {
                id: res.data.data[0].id,
                userName: userMeg.nickName,
                userImg: userMeg.avatarUrl
              }
              changeuserMsg('mini/changeuserMsg', data).then(res => {
                if (res.data.data) {
                  let openIdList = {
                    openid: list.openid
                  }
                  searchOpenid('mini/searchOpenid', openIdList).then(res => {
                    if (res.data.data) {
                      wx.setStorageSync('userMegList', res.data.data[0])
                      Dialog.alert({
                        title: '恭喜',
                        message: '登录成功！'
                      }).then(() => {
                        wx.navigateBack({
                          delta: 1
                        })
                      })
                    }
                  })
                }
              })
              //
            })
          }
        })
      } else {
        wx.showToast({
          title: '取消授权',
          icon: 'none',
          duration: 2000
        })
      }
    },
    // 创建用户方法
    newUserFun (data) {
      let _this = this
      newUser('mini/newUser', data).then(res => {
        if (res.data.data) {
          _this.userMegList.id = res.data.data.id
          wx.setStorageSync('userMegList', _this.userMegList)
          Dialog.alert({
            title: '恭喜',
            message: '登录成功！'
          }).then(() => {
            wx.navigateBack({
              delta: 1
            })
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.loginPage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
}
.loginPage-box {
  width: 100%;
  height: auto;
  margin: 100rpx auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loginPage-box img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 4rpx;
}
.loginPage-box p {
  font-size: 18px;
  color: #00bf6f;
  font-weight: 600;
  padding-top: 40rpx;
}
button::after {
  border: none;
}

button {
  background-color: transparent;
  padding-left: 0;
  padding-right: 0;
  line-height: inherit;
  width: 80%;
  height: 80rpx;
  background-color: #00bf6f;
  color: #ffffff;
  text-align: center;
  line-height: 80rpx;
  margin-top: 80rpx;
}

button {
  border-radius: 0;
}
</style>
