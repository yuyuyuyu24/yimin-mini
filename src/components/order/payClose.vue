<template>
  <div class="all-order">
    <div class="order-null" v-if="toBeOrderData.length === 0">
      <i class="iconfont iconno_result"></i>
      没有发现内容哦 ~
      <div @click="toIndex">去逛逛</div>
    </div>
    <div v-if="toBeOrderData.length !== 0">
      <div class="all-order-box" v-for="(item,index) in toBeOrderData" :key="index">
        <div class="all-order-box-head">
          {{ item.orderStatus }}
          <p v-if="item.deliveryMthods === 'delivery'">专员配送</p>
          <p v-if="item.deliveryMthods === 'self'">自提</p>
        </div>
        <div class="all-order-box-content-box" v-if="isGoods">
          <div class="all-order-box-content" v-for="(item1,jIndex) in item.goods" :key="jIndex">
            <div
              class="bg"
              :style="{
                  background: 'url('+item1.coverList.url+') no-repeat center/cover'
                }"
            ></div>
            <div class="all-order-box-content-right">
              <h3>{{item1.goodsName}} /{{item1.goodsUnit}}</h3>
              <p>￥ {{item1.goodsPrice}}</p>
              <span>数量：× {{item.goodsInfo[jIndex].num}}</span>
            </div>
          </div>
        </div>
        <div class="all-order-box-footer" @click="toOrderDetails(item)">
          <div>查看详情</div>
        </div>
      </div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import { getUserStatusOrder, batchQuery } from '@/api/pay'
import querystring from 'querystring'
import { ENCODE } from '@/utils/function'

export default {
  data () {
    return {
      isOrderNull: true,
      toBeOrderData: [],
      isGoods: false,
      busData: [],
      conut: 0
    }
  },
  mounted () {
    this.getUserStatusOrderFun()
  },
  onReachBottom () {
    this.getUserStatusOrderFun()
  },
  methods: {
    // 获取该用户的全部订单
    getUserStatusOrderFun () {
      let _this = this
      let userList = wx.getStorageSync('userMegList') || {}
      let orderData = []
      this.conut += 1
      let data = {
        userId: userList.id,
        orderStatus: '4',
        pageNumber: _this.conut,
        pageSize: 5
      }
      wx.showLoading({
        title: '加载中'
      })
      getUserStatusOrder('mini/getUserStatusOrder', data).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          orderData = res.data.data
          let count = 0
          let num = orderData.length
          if (orderData.length === 0) {
            wx.showToast({
              title: '订单加载完毕！',
              icon: 'none',
              duration: 2000
            })
          }
          orderData.forEach(e => {
            e.goodsInfo = JSON.parse(e.goodsInfo)
            if (e.orderStatus === '1') {
              e.orderStatus = '待支付'
            } else if (e.orderStatus === '2') {
              e.orderStatus = '已支付待发货'
            } else if (e.orderStatus === '3') {
              e.orderStatus = '已完成'
            } else {
              e.orderStatus = '已关闭'
            }
            let idObj = []
            for (let i = 0; i < e.goodsInfo.length; i++) {
              let id = e.goodsInfo[i].id
              idObj.push(id)
            }
            batchQuery('mini/batchQuery', idObj).then(res => {
              if (res.data.data) {
                e.goods = []
                count++
                for (let i = 0; i < res.data.data.length; i++) {
                  e.goods[i] = res.data.data[i]
                  e.goods[i].coverList = querystring.parse(res.data.data[i].coverList)
                }
                if (count === num) {
                  _this.isGoods = true
                  _this.busData = orderData
                  _this.toBeOrderData = _this.toBeOrderData.concat(_this.busData)
                }
              }
            }).catch(() => {
              wx.showToast({
                title: '网络出现问题，请稍后再试！',
                icon: 'none',
                duration: 2000
              })
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
    toIndex () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.switchTab({
        url: '/pages/index/main',
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 跳转到订单详情
    toOrderDetails (item) {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: `/pages/orderDetails/main?id=${ENCODE(item.id)}`,
        success: function (res) {
          wx.hideToast()
        }
      })
    }
  }
}
</script>
<style lang="less"  scoped>
.all-order {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
.all-order .order-null {
  width: 100%;
  height: 300rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  margin-top: 100rpx;
}
.all-order .order-null i {
  font-size: 50px;
}
.all-order .order-null div {
  width: 120rpx;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
  font-size: 16px;
  border: 1px solid #888;
}
.all-order .all-order-box {
  width: 100%;
  height: auto;
  background-color: #fff;
  border-bottom: 10rpx solid #f4f4f4;
  display: flex;
  flex-direction: column;
}
.all-order .all-order-box .all-order-box-head {
  width: auto;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  align-items: center;
  color: #333;
  padding-left: 40rpx;
  line-height: 80rpx;
  p {
    font-size: 24rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    margin-left: 10rpx;
  }
}
.all-order .all-order-box .all-order-box-content-box {
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
}
.all-order .all-order-box .all-order-box-content {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  margin: 20rpx 0;
}
.all-order .all-order-box .all-order-box-content .bg {
  width: 172rpx;
  height: 172rpx;
  border-radius: 12rpx;
  margin-left: 30rpx;
}
.all-order .all-order-box .all-order-box-content .all-order-box-content-right {
  width: auto;
  display: flex;
  flex-direction: column;
  margin-left: 30rpx;
  h3 {
    width: 486rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 32rpx;
    margin-bottom: 20rpx;
  }
  p {
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ff443d;
    line-height: 28rpx;
    margin-bottom: 20rpx;
  }
  span {
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 24rpx;
  }
}
.all-order .all-order-box .all-order-box-footer {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20rpx 0;
}
.all-order .all-order-box .all-order-box-footer div {
  width: 150rpx;
  height: 60rpx;
  border: 1px solid #ccc;
  color: #333;
  text-align: center;
  line-height: 60rpx;
  margin-right: 40rpx;
}
</style>
