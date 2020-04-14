<template>
  <div class="all-order">
    <div
      class="order-null"
      v-if="toBeOrderData.length === 0"
    >
      <i class="iconfont iconno_result"></i>
      没有发现内容哦 ~
      <div @click="toIndex">去逛逛</div>
    </div>
    <div v-if="toBeOrderData.length !== 0">
      <div
        class="all-order-box"
        v-for="(item,index) in toBeOrderData"
        :key="index"
      >
        <div class="all-order-box-head">
          {{ item.orderStatus }}
        </div>
        <div
          class="all-order-box-content-box"
          v-if="isGoods"
        >
          <div
            class="all-order-box-content"
            v-for="(item1,jIndex) in item.goods"
            :key="jIndex"
          >
            <img :src="item1.coverList.url" />
            <div class="all-order-box-content-right">
              <p>{{item1.goodsName}} /{{item1.goodsUnit}}</p>
              <span>数量：× {{item.goodsInfo[jIndex].num}}</span>
              <h3>￥ {{item1.goodsPrice}}</h3>
            </div>
          </div>
        </div>
        <div
          class="all-order-box-footer"
          @click="toOrderDetails(item)"
        >
          <div>查看详情</div>
        </div>
      </div>
    </div>

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
        orderStatus: '2',
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
<style scoped>
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
.all-order .all-order-box .all-order-box-content img {
  width: 140rpx;
  height: 140rpx;
  border: 1px solid #ccc;
  margin-left: 40rpx;
}
.all-order .all-order-box .all-order-box-content .all-order-box-content-right {
  width: auto;
  display: flex;
  flex-direction: column;
  margin-left: 40rpx;
}
.all-order
  .all-order-box
  .all-order-box-content
  .all-order-box-content-right
  p {
  font-size: 18px;
}
.all-order
  .all-order-box
  .all-order-box-content
  .all-order-box-content-right
  span {
  font-size: 12px;
  color: #666;
  padding: 10rpx 0;
}
.all-order
  .all-order-box
  .all-order-box-content
  .all-order-box-content-right
  h3 {
  font-size: 18px;
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
