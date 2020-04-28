<template>
  <div class="confirmOrder">
    <div
      class="confirmOrder-address-null"
      v-if="isAddressNull"
      @click="toAddAddress"
    >
      <span>添加收货地址</span>
    </div>
    <div
      class="confirmOrder-address"
      v-if="!isAddressNull"
      @click="toAddAddress"
    >
      <div>
        <p>收货人：{{addressData.name}}</p>
        <span>{{addressData.phone}}</span>
      </div>
      <h3>{{addressData.address}}</h3>
    </div>
    <div
      class="confirmOrder-goods"
      v-for="(item,index) in orderData"
      :key="index"
    >
      <img
        v-if="item.coverList"
        :src="item.coverList[0].url"
      />
      <div class="confirmOrder-goods-right">
        <p>{{item.goodsName}} {{item.goodsUnit}}</p>
        <span>数量 × {{item.goodsNum}}</span>
        <h3>￥ {{item.goodsPrice}}</h3>
      </div>
    </div>
    <van-field
      :value="message"
      label="留言"
      type="textarea"
      autosize
      border="false"
      @change="remarkFun"
      :placeholder="bindplaceholder"
    />
    <div
      class="shipping-methods"
      v-if="false"
    >
      请选择提货方式：
      <van-radio-group
        class="van-radio-group"
        :value="radio"
        @change="onChange"
      >
        <van-radio
          checked-color="#00bf6f"
          name="delivery"
        >专员配送</van-radio>
        <van-radio
          checked-color="#00bf6f"
          name="self"
        >自提</van-radio>
      </van-radio-group>
    </div>
    <div class="confirmOrder-notice">
      购买前请确保您已经阅读<span @click="toBuyerNotice">买家须知</span> , 配送时间为每天上午11:00前的订单，当天下午配送。上午11:00后的订单，第二天上午配送。提交订单即表示同意<span @click="toBuyerNotice">买家须知</span>。
    </div>
    <div class="confirmOrder-submit">
      <div class="confirmOrder-submit-button">
        <div class="confirmOrder-submit-button-center">
          <p>实付款: ￥ <span class="price">{{total + deliveryMoney}}</span></p>
          <div
            class="total"
            v-if="isDelivery"
          >
            <span>商品总价: ￥{{total}}</span>
            <span>另需配送费: {{deliveryMoney}}元</span>
          </div>
        </div>
        <div
          class="confirmOrder-submit-button-right"
          @click="submitOrder"
        >提交订单</div>
      </div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import { changeQuerystringDetail } from '@/utils/function'
import { getGoodsDetail } from '@/api/goods'
import { searchOpenid } from '@/api/user'
import { newOrder, changeOrderStatus, pay, queryOrderStatus, queryWaitPayOrders } from '@/api/pay'
import Dialog from '../../../static/vant/dist/dialog/dialog'

export default {
  data () {
    return {
      orderData: [],
      num: 0,
      total: 0,
      isAddressNull: true,
      addressData: {},
      radio: 'delivery',
      cartData: [],
      message: '',
      deliveryMoney: 5,
      isDelivery: true,
      bindplaceholder: '请输入留言'
    }
  },
  onShow () {
    this.cartData = []
    this.orderData = []
    this.total = 0
    this.message = ''
    // this.bindplaceholder = '请输入留言'
    this.cartData = JSON.parse(this.$root.$mp.query.data)
    this.cartFun()
    this.getAddress()
  },
  methods: {
    // 购物车过来的数据进行循环
    cartFun () {
      for (let i = 0; i < this.cartData.length; i++) {
        let id = this.cartData[i].id
        let goodsNum = this.cartData[i].num
        this.getGoodsDetailFun({ id }, goodsNum)
      }
    },
    // 取本地缓存的地址信息
    getAddress () {
      let _this = this
      let value = wx.getStorageSync('yiminAddress') || []
      if (value.length === 0) {
        this.isAddressNull = true
      } else {
        this.isAddressNull = false
        for (let i = 0; i < value.length; i++) {
          if (value[i].isDefault) {
            _this.addressData = value[i]
          }
        }
      }
    },
    onChange (e) {
      this.radio = e.mp.detail
      if (this.radio === 'delivery') {
        this.isDelivery = true
        this.deliveryMoney = 5
      } else {
        this.isDelivery = false
        this.deliveryMoney = 0
      }
    },
    // 获取到留言框内容
    remarkFun (e) {
      this.message = e.mp.detail
    },
    // 跳转到买家须知
    toBuyerNotice () {
      wx.navigateTo({
        url: '/pages/buyerNotice/main'
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
          _this.total += res.data.data.goodsPrice * res.data.data.goodsNum
          _this.orderData.push(changeQuerystringDetail(res.data.data))
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 跳转到编辑地址页面
    toAddAddress () {
      wx.showLoading({
        title: '跳转中'
      })
      wx.navigateTo({
        url: '/pages/address/main',
        success (res) {
          wx.hideLoading()
        }
      })
    },
    // 提交订单
    submitOrder () {
      let _that = this
      if (this.isAddressNull) {
        wx.showToast({
          title: '请先添加收货地址！',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      if (this.total < 100) {
        wx.showToast({
          title: '抱歉，订单满100元才可以配送',
          icon: 'none',
          duration: 2000
        })
        return false
      }
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
              return false
            } else {
              let data = {
                userId: userList.id
              }
              queryWaitPayOrders('mini/queryWaitPayOrders', data).then(res => {
                if (res.data.data.length > 0) {
                  _that.bindplaceholder = ''
                  Dialog.alert({
                    title: '提示',
                    message: '您还有待支付的订单，请先去完成支付或取消订单。'
                  }).then(() => {
                    _that.bindplaceholder = '请输入留言'
                    wx.switchTab({
                      url: '/pages/my/main'
                    })
                  })
                } else {
                  this.payFun()
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
        }).catch(() => {
          wx.showToast({
            title: '网络出现问题，请稍后再试！',
            icon: 'none',
            duration: 2000
          })
        })
      }
    },
    // 支付信息接口
    payFun () {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      let userList = wx.getStorageSync('userMegList') || {}

      let orderData = {
        userId: userList.id,
        orderNumber: new Date().getTime() + '' + userList.id,
        goodsPrice: _this.total,
        deliveryMoney: _this.deliveryMoney,
        userName: _this.addressData.name,
        userPhone: _this.addressData.phone,
        userAddress: _this.addressData.address,
        goodsInfo: JSON.stringify(_this.cartData),
        deliveryMthods: 'delivery',
        remarks: _this.message,
        createdTime: new Date().getTime() + '',
        orderStatus: '1',
        orderType: '1'
      }
      this.newOrderFun(orderData, userList)
    },
    // 创建订单
    newOrderFun (data, userList) {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      newOrder('mini/newOrder', data).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          let str = ''
          for (let i = 0; i < _this.orderData.length; i++) {
            str += _this.orderData[i].goodsName + ','
          }
          if (str.length > 0) {
            str = str.substr(0, str.length - 1)
          }
          let orderId = res.data.data.id
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
                  _this.bindplaceholder = ''
                  let data = {
                    id: orderId,
                    orderStatus: '2'
                  }
                  _this.changeOrderStatusFun(data)
                  Dialog.alert({
                    title: '恭喜',
                    message: '支付成功，可到我的订单查看！'
                  }).then(() => {
                    _this.bindplaceholder = '请输入留言'
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
                      _this.bindplaceholder = ''
                      Dialog.alert({
                        title: '恭喜',
                        message: '支付成功，可到我的订单查看'
                      }).then(() => {
                        _this.bindplaceholder = '请输入留言'
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
                      _this.bindplaceholder = ''
                      Dialog.alert({
                        title: '提示',
                        message: '取消支付，可到我的订单完成支付'
                      }).then(() => {
                        _this.bindplaceholder = '请输入留言'
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
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 更改订单状态
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
    // 微信小程序查询订单状态
    queryOrderStatusFun (data) {
      wx.showLoading({
        title: '加载中'
      })
    }
  }

}
</script>
<style scoped>
.confirmOrder {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
.confirmOrder-address-null {
  width: auto;
  height: 120rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 40rpx;
  border-bottom: 10rpx solid #f4f4f4;
  border-top: 10rpx solid #f4f4f4;
}
.confirmOrder-address {
  width: auto;
  height: 160rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 40rpx;
  border-top: 10rpx solid #f4f4f4;
  border-bottom: 10rpx solid #f4f4f4;
}
.confirmOrder-address div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.confirmOrder-address h3 {
  color: #888;
}
.confirmOrder-goods {
  width: auto;
  height: 280rpx;
  display: flex;
  padding: 0 40rpx;
  align-items: center;
  border-bottom: 2rpx solid #f4f4f4;
}
.confirmOrder-goods img {
  width: 200rpx;
  height: 200rpx;
  border: 1px solid #f4f4f4;
}
.confirmOrder-goods .confirmOrder-goods-right {
  display: flex;
  height: 200rpx;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20rpx;
}
.confirmOrder-goods .confirmOrder-goods-right span {
  font-size: 14px;
  color: #888;
}
.confirmOrder-goods .confirmOrder-goods-right h3 {
  font-size: 18px;
}
.shipping-methods {
  width: auto;
  height: auto;
  border-top: 10rpx solid #f4f4f4;

  padding: 40rpx 40rpx;
  display: flex;
  justify-content: space-between;
}
.shipping-methods .van-radio-group {
  display: flex;
}
.shipping-methods .van-radio-group ._van-radio {
  margin-right: 20rpx;
}
.confirmOrder-notice {
  width: auto;
  height: auto;
  border-top: 10rpx solid #f4f4f4;
  padding: 20rpx 40rpx;
  line-height: 60rpx;
  margin-bottom: 170rpx;
}
.confirmOrder-notice span {
  color: #00bf6f;
}
.confirmOrder-submit {
  width: 100%;
  height: 160rpx;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  border-top: 10rpx solid #f4f4f4;
  background-color: #fff;
}
.confirmOrder-submit .confirmOrder-submit-button {
  width: auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 40rpx;
  align-items: center;
}
.confirmOrder-submit .confirmOrder-submit-button .price {
  font-size: 20px;
}
.confirmOrder-submit
  .confirmOrder-submit-button
  .confirmOrder-submit-button-center {
  display: flex;
  flex-direction: column;
}
.confirmOrder-submit
  .confirmOrder-submit-button
  .confirmOrder-submit-button-center
  .total {
  font-size: 12px;
}
.confirmOrder-submit
  .confirmOrder-submit-button
  .confirmOrder-submit-button-center
  .total
  span {
  padding-right: 10rpx;
}

.confirmOrder-submit
  .confirmOrder-submit-button
  .confirmOrder-submit-button-right {
  width: 180rpx;
  height: 80rpx;
  background-color: #00bf6f;
  color: #ffffff;
  text-align: center;
  line-height: 80rpx;
}
</style>
