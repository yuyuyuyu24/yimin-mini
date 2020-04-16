<template>
  <div class="orderDetails">
    <div
      class="orderDetails-head-watingPay"
      v-if="orderData.orderStatus === '1'"
    >
      <p>未支付的订单将于每天23点59分59秒关闭订单，请您合理安排时间尽快支付。</p>
    </div>
    <div
      class="orderDetails-head-waitingDeliver"
      v-if="orderData.orderStatus === '2'"
    >
      <p>商家将立刻处理您的订单，请耐心等待</p>
    </div>
    <div
      class="orderDetails-head-successPay"
      v-if="orderData.orderStatus === '3'"
    >
      <p>订单完成！商家已发货，请您耐心等待。如有疑问请点击下方'致电商家'联系商家。</p>
    </div>

    <div
      class="orderDetails-head-closePay"
      v-if="orderData.orderStatus === '4'"
    ></div>
    <div class="orderDetails-address">
      <div>
        <p>收货人：{{orderData.userName}}</p>
        <span>{{orderData.userPhone}}</span>
      </div>
      <h3>{{orderData.userAddress}}</h3>
    </div>
    <div
      class="orderDetails-goods"
      v-for="(item,index) in orderList"
      :key="index"
    >
      <img :src="item.coverList[0].url" />
      <div class="orderDetails-goods-right">
        <p>{{item.goodsName}} {{item.goodsUnit}}</p>
        <span>数量 × {{item.goodsNum}}</span>
        <h3>￥ {{item.goodsPrice}}</h3>
      </div>
      <div
        @click="toComment(index)"
        class="orderDetails-comment"
        v-if="orderData.orderStatus === '2' || orderData.orderStatus === '3'"
      >评论</div>
    </div>
    <div class="orderDetails-total">
      <p>总计：</p>
      <span>￥ {{orderData.goodsPrice+orderData.deliveryMoney}} (商品总金额 {{orderData.goodsPrice}}+{{orderData.deliveryMoney}}元配送费)</span>
    </div>
    <div
      class="orderDetails-remarks"
      v-if="orderData.remarks"
    >
      <p>留言：</p>
      <span>{{orderData.remarks}}</span>
    </div>
    <div class="orderDetails-message">
      <div>
        <p>订单编号:</p>
        <span>{{orderData.orderNumber}}<span
            class="copyButton"
            @click="copyOrderNumber(orderData.orderNumber)"
          >复制</span></span>
      </div>
      <div>
        <p>创建时间:</p>
        <span>{{orderData.createdTime}}</span>
      </div>
      <div>
        <p>配送方式:</p>
        <span>{{orderData.deliveryMthods}}</span>
      </div>
    </div>
    <div class="orderDetails-handle">
      <div
        class="orderDetails-listen"
        v-if="false"
      >申请售后</div>
      <div
        class="orderDetails-listen"
        @click="deleteOrders"
      >删除订单</div>
      <div
        class="orderDetails-closeOrder"
        v-if="orderData.orderStatus === '1'"
        @click="closeOrders"
      >取消订单</div>
      <div
        class="orderDetails-pay"
        v-if="orderData.orderStatus === '1'"
        @click="pay"
      >立即支付</div>
      <div
        class="orderDetails-call"
        v-if="orderData.orderStatus === '2' || orderData.orderStatus === '3'"
        @click="callShop"
      >致电商家</div>

    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import { changeOrderStatus, pay, searchOrder, queryOrderStatus, deleteOrders } from '@/api/pay'
import { searchOpenid } from '@/api/user'
import { searchComment } from '@/api/comment'
import { ENCODE, UNENCODE, formatDate, changeQuerystringDetail } from '@/utils/function'
import { getGoodsDetail } from '@/api/goods'
import Dialog from '../../../static/vant/dist/dialog/dialog'

export default {
  data () {
    return {
      orderData: {},
      orderList: []
    }
  },
  mounted () {
    this.orderData = {}
    this.orderList = []
    let id = UNENCODE(this.$root.$mp.query.id)
    let userList = wx.getStorageSync('userMegList') || {}
    let data = {
      userId: userList.id,
      id
    }
    this.searchOrderFun(data)
  },
  methods: {
    // 根据用户id和订单id查找该条订单
    searchOrderFun (data) {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      searchOrder('mini/searchOrder', data).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          res.data.data.createdTime = formatDate(Number(res.data.data.createdTime))
          res.data.data.goodsInfo = JSON.parse(res.data.data.goodsInfo)
          if (res.data.data.deliveryMthods === 'delivery') {
            res.data.data.deliveryMthods = '专员配送'
          } else {
            res.data.data.deliveryMthods = '自提'
          }
          _this.orderData = res.data.data
          for (let i = 0; i < _this.orderData.goodsInfo.length; i++) {
            let id = _this.orderData.goodsInfo[i].id
            let goodsNum = _this.orderData.goodsInfo[i].num
            _this.getGoodsDetailFun({ id }, goodsNum)
          }
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 获取商品详情接口
    getGoodsDetailFun (id, goodsNum) {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      getGoodsDetail('goods/getGoodsDetail', id).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          res.data.data.goodsNum = goodsNum
          // _this.total += res.data.data.goodsPrice * res.data.data.goodsNum
          _this.orderList.push(changeQuerystringDetail(res.data.data))
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 致电商家
    callShop () {
      Dialog.alert({
        title: '提示',
        message: '现在是营业高峰期，电话有可能暂时无法接通，请您耐心等待或稍等几分钟后再次拨打。'
      }).then(() => {
        wx.makePhoneCall({
          phoneNumber: '15924536788',
          fail () { }
        })
      })
    },
    // 复制订单编号
    copyOrderNumber (data) {
      wx.setClipboardData({
        // 准备复制的数据
        data,
        success: function (res) {
          wx.showToast({
            title: '复制成功'
          })
        }
      })
    },
    // 立即支付
    pay () {
      let _this = this
      let userList = wx.getStorageSync('userMegList') || {}
      if (userList !== {}) {
        let data = {
          openid: userList.openId
        }
        searchOpenid('mini/searchOpenid', data).then(res => {
          if (res.data.data) {
            wx.setStorageSync('userMegList', res.data.data[0])
            if (res.data.data[0].userStatus === '2') {
              wx.showToast({
                title: '抱歉，您的账号暂时被冻结，无法进行支付操作。如有疑问，请到我的页面内点击联系客服进行咨询。',
                icon: 'none',
                duration: 3000
              })
            } else {
              for (let i = 0; i < _this.orderList.length; i++) {
                if (_this.orderList[i].goodsStatus === 2) {
                  wx.showToast({
                    title: `抱歉，${_this.orderList[i].goodsName}暂时没有货啦，具体到货日期可咨询商家。`,
                    icon: 'none',
                    duration: 4000
                  })
                  return false
                }
                if (_this.orderList[i].goodsStatus === 3) {
                  wx.showToast({
                    title: `抱歉，${_this.orderList[i].goodsName}暂时已被商家下架，具体上架日期可咨询商家。`,
                    icon: 'none',
                    duration: 4000
                  })
                  return false
                }
              }
              let chuck = _this.orderList.every(function (value, index, array) {
                return value.goodsStatus === 1
              })
              if (chuck) {
                _this.payFun()
              }
            }
          }
        })
      }
    },
    // 取消订单
    closeOrders () {
      let _this = this
      wx.showModal({
        title: '提示',
        content: '是否要取消订单?',
        success (res) {
          if (res.confirm) {
            let orderId = _this.orderData.id
            let data = {
              id: orderId,
              orderStatus: '4'
            }
            wx.showLoading({
              title: '加载中'
            })
            changeOrderStatus('mini/changeOrderStatus', data).then(res => {
              wx.hideLoading()
              Dialog.alert({
                title: '提示',
                message: '取消订单成功！'
              }).then(() => {
                wx.switchTab({
                  url: '/pages/my/main'
                })
              })
            }).catch(() => {
              wx.showToast({
                title: '网络出现问题，请稍后再试！',
                icon: 'none',
                duration: 2000
              })
            })
          }
        }
      })
    },
    // 支付接口
    payFun () {
      let _this = this
      let str = ''
      for (let i = 0; i < _this.orderList.length; i++) {
        str += _this.orderList[i].goodsName + ','
      }
      if (str.length > 0) {
        str = str.substr(0, str.length - 1)
      }
      let orderId = _this.orderData.id
      let userList = wx.getStorageSync('userMegList') || {}
      let data = {
        openid: userList.openId,
        money: 0.01,
        goodsMessage: str
      }
      pay('mini/pay', data).then(res => {
        wx.hideLoading()
        if (res.data.message) {
          let payData = JSON.parse(res.data.message)
          let timeStamp = payData.timeStamp
          let nonceStr = payData.nonceStr
          let packages = 'prepay_id=' + payData.package
          let signType = 'MD5'
          let paySign = payData.paySign
          let time = payData.time

          wx.requestPayment({
            timeStamp: timeStamp, // 时间搓
            nonceStr: nonceStr, // 随机字符串
            package: packages, // repay_id
            signType: signType, // 签名算法
            paySign: paySign, // 签名
            success (res) {
              let data = {
                id: orderId,
                orderStatus: '2'
              }
              _this.changeOrderStatusFun(data)
              Dialog.alert({
                title: '恭喜',
                message: '支付成功，可到我的订单查看'
              }).then(() => {
                wx.switchTab({
                  url: '/pages/my/main'
                })
              })
            },
            fail () {
              let data = {
                time
              }
              queryOrderStatus('mini/queryOrderStatus', data).then(res => {
                wx.hideLoading()
                let reData = JSON.parse(res.data.message)
                if (reData.trade_state_desc[0] === '支付成功') {
                  let data = {
                    id: orderId,
                    orderStatus: '2'
                  }
                  _this.changeOrderStatusFun(data)
                  Dialog.alert({
                    title: '恭喜',
                    message: '支付成功，可到我的订单查看'
                  }).then(() => {
                    wx.switchTab({
                      url: '/pages/my/main'
                    })
                  })
                }
                if (reData.trade_state_desc[0] === '订单未支付') {
                  let data = {
                    id: orderId,
                    orderStatus: '1'
                  }
                  _this.changeOrderStatusFun(data)
                  Dialog.alert({
                    title: '提示',
                    message: '取消支付，可到我的订单完成支付'
                  }).then(() => {
                    wx.switchTab({
                      url: '/pages/my/main'
                    })
                  })
                }
              }).catch(() => {
                wx.showToast({
                  title: '网络出现问题，请稍后再试！',
                  icon: 'none',
                  duration: 2000
                })
              })
            }
          })
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 更改订单状态 接口
    changeOrderStatusFun (data) {
      wx.showLoading({
        title: '加载中'
      })
      changeOrderStatus('mini/changeOrderStatus', data).then(res => {
        wx.hideLoading()
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 删除订单
    deleteOrders () {
      let _this = this
      wx.showModal({
        title: '提示',
        content: '是否要删除订单?',
        success (res) {
          if (res.confirm) {
            let id = UNENCODE(_this.$root.$mp.query.id)
            let userList = wx.getStorageSync('userMegList') || {}
            let data = {
              userId: userList.id,
              id
            }
            wx.showLoading({
              title: '加载中'
            })
            deleteOrders('mini/deleteOrders', data).then(res => {
              wx.hideLoading()
              Dialog.alert({
                title: '提示',
                message: '删除订单成功！'
              }).then(() => {
                wx.switchTab({
                  url: '/pages/my/main',
                  fail (err) {
                    console.log(err)
                  }
                })
              })
            }).catch(() => {
              wx.showToast({
                title: '网络出现问题，请稍后再试！',
                icon: 'none',
                duration: 2000
              })
            })
          }
        }
      })
    },
    // 评论
    toComment (index) {
      let data = {
        userId: this.orderData.userId,
        goodsId: this.orderList[index].id
      }
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      searchComment('mini/searchComment', data).then(res => {
        if (res.data) {
          wx.hideLoading()
          if (res.data.data) {
            wx.showToast({
              title: '抱歉，您已经评价过该商品！请选择其他购买的商品进行评价吧！',
              icon: 'none',
              duration: 3000
            })
          } else {
            wx.navigateTo({
              url: `/pages/comments/main?userId=${ENCODE(_this.orderData.userId)}&goodsId=${ENCODE(_this.orderList[index].id)}`
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
<style scoped>
.orderDetails {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
.orderDetails-head-successPay {
  width: 100%;
  height: 200rpx;
  background: url('http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GAP2gAOoVtYSPNzXwX6U1vZZDR7s9HrrfB*VbOrnn5iEXyZLJVGXafUVJYfGxSlPq80dNJB*gZhTZ6VN*QIU7y4!/b&bo=mAMBAZgDAQEDFzI!&rf=viewer_4&t=5')
    no-repeat;
  background-size: 100% 100%;
}
.orderDetails-head-successPay p {
  position: absolute;
  font-size: 12px;
  color: #fff;
  left: 33rpx;
  top: 110rpx;
  width: 60%;
}

.orderDetails-head-watingPay {
  width: 100%;
  height: 200rpx;
  background: url('http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GAsz5zL2e18NC8rYwXJ.uaOn6uiwCRmAOV0Ul25fmjtbzL9lr6MN6GWvZQPdyUBoHwnNZ4U9E36ZkxP8z2YjLJ8!/b&bo=mAMEAZgDBAEDFzI!&rf=viewer_4&t=5')
    no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.orderDetails-head-watingPay p {
  position: absolute;
  font-size: 12px;
  color: #fff;
  left: 33rpx;
  top: 110rpx;
  width: 60%;
}

.orderDetails-head-waitingDeliver {
  width: 100%;
  height: 200rpx;
  background: url('http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GKeYqhosuSw3SRbtcfA.VaiXt1eXBlSUo7LbezD3Af6o.Lc7PY0jxgwQfJ5ddcF8oahi3WKM4kLPUG3vDEnC8TE!/b&bo=5gGHAOYBhwADFzI!&rf=viewer_4&t=5')
    no-repeat;
  background-size: 100% 100%;
}
.orderDetails-head-waitingDeliver p {
  position: absolute;
  font-size: 12px;
  color: #fff;
  left: 33rpx;
  top: 110rpx;
}
.orderDetails-head-closePay {
  width: 100%;
  height: 200rpx;
  background: url('http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GF.ER5gPgZ7xmJgVaVOoCkRIfXtFPKmc6H5O.ns5H0zIAEsE2ATejrVPckoNJlPwYTAnvyrnuKokvRFCVaB3YCI!/b&bo=lgMBAZYDAQEDFzI!&rf=viewer_4&t=5')
    no-repeat;
  background-size: 100% 100%;
}
.orderDetails-address {
  width: auto;
  height: 160rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 40rpx;
  border-bottom: 10rpx solid #f4f4f4;
}
.orderDetails-address div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.orderDetails-address h3 {
  color: #888;
}
.orderDetails-goods {
  width: auto;
  height: 280rpx;
  display: flex;
  padding: 0 40rpx;
  align-items: center;
  border-bottom: 10rpx solid #f4f4f4;
  position: relative;
}
.orderDetails-goods .orderDetails-comment {
  width: auto;
  padding: 16rpx 24rpx;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 40rpx;
}
.orderDetails-goods img {
  width: 200rpx;
  height: 200rpx;
  border: 1px solid #f4f4f4;
}
.orderDetails-goods .orderDetails-goods-right {
  display: flex;
  height: 200rpx;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20rpx;
}
.orderDetails-goods .orderDetails-goods-right span {
  font-size: 14px;
  color: #888;
}
.orderDetails-goods .orderDetails-goods-right h3 {
  font-size: 18px;
}
.orderDetails-total {
  width: auto;
  height: auto;
  display: flex;
  padding: 20rpx 40rpx;
  align-items: center;
  border-bottom: 10rpx solid #f4f4f4;
  color: #666;
}
.orderDetails-total span {
  width: 80%;
}
.orderDetails-remarks {
  width: auto;
  height: auto;
  display: flex;
  padding: 20rpx 40rpx;
  align-items: center;
  border-bottom: 10rpx solid #f4f4f4;
  color: #666;
}
.orderDetails-remarks span {
  width: 80%;
}
.orderDetails-message {
  width: auto;
  height: 240rpx;
  display: flex;
  padding: 0 40rpx;
  align-items: center;
  flex-direction: column;
  border-bottom: 10rpx solid #f4f4f4;
  font-size: 14px;
  color: #666;
  margin-bottom: 130rpx;
  justify-content: space-around;
}
.orderDetails-message div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.orderDetails-message span {
  display: flex;
  align-items: center;
}
.orderDetails-message .copyButton {
  width: 80rpx;
  height: 40rpx;
  border: 1px solid #333;
  margin-left: 10rpx;
  align-items: center;
  justify-content: center;
}
.orderDetails-handle {
  width: 100%;
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 10rpx solid #f4f4f4;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 99;
}
.orderDetails-handle div {
  width: auto;
  padding: 16rpx 24rpx;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}
.orderDetails-handle .orderDetails-pay {
  background-color: #34bbb8;
  color: #fff;
  border: none;
}
</style>
