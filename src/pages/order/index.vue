<template>
  <div class="order">
    <div class="order-head">
      <div
        v-for="(item,index) in tabList"
        :key="index"
        @click="onChangeTab(index)"
        :class="{'selete':index === currentData}"
      >{{item.title}}</div>
    </div>
    <div class="order-content">
      <all-order
        :allOrderData=allOrderData
        :isGoods=isGoods
        v-if="currentData === 0"
      ></all-order>
      <wait-pay v-else-if="currentData === 1"> </wait-pay>
      <pay-to-be-shipped v-else-if="currentData === 2"></pay-to-be-shipped>
      <pay-shipped v-else-if="currentData === 3"></pay-shipped>
      <pay-close v-else></pay-close>
    </div>
  </div>
</template>
<script>
import allOrder from '@/components/order/allOrder'
import waitPay from '@/components/order/waitPay'
import payToBeShipped from '@/components/order/payToBeShipped'
import payShipped from '@/components/order/payShipped'
import payClose from '@/components/order/payClose'
import { getUserOrder, batchQuery } from '@/api/pay'
import querystring from 'querystring'

export default {
  components: {
    allOrder,
    waitPay,
    payToBeShipped,
    payShipped,
    payClose
  },
  data () {
    return {
      currentData: 0,
      tabList: [
        { 'title': '全部订单' },
        { 'title': '待支付' },
        { 'title': '待发货' },
        { 'title': '已完成' },
        { 'title': '交易关闭' }
      ],
      allOrderData: [],
      isGoods: false
    }
  },

  onShow () {
    this.currentData = 0
    this.allOrderData = []
    this.getUserOrderFun()
  },
  methods: {
    // 切换选项卡功能
    onChangeTab (index) {
      this.currentData = index
    },
    // 获取该用户的全部订单
    getUserOrderFun () {
      let _this = this
      let userList = wx.getStorageSync('userMegList') || {}
      let orderData = []
      let data = {
        userId: userList.id,
        pageNumber: 1,
        pageSize: 5
      }
      wx.showLoading({
        title: '加载中'
      })
      getUserOrder('mini/getUserOrder', data).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          orderData = res.data.data
          let count = 0
          let num = orderData.length
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
                  _this.allOrderData = orderData
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
    }
  }
}
</script>
<style scoped>
.order {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.order .order-head {
  width: 100%;
  height: 100rpx;
  border-bottom: 10rpx solid #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
}
.order .order-head div {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.order .order-content {
  width: 100%;
  height: auto;
  margin-top: 110rpx;
}
.selete {
  color: #00bf6f;
}
</style>
