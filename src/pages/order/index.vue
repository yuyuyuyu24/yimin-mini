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
      <all-order v-if="currentData === 0"></all-order>
      <wait-pay v-else-if="currentData === 1"> </wait-pay>
      <pay-success v-else-if="currentData === 2"></pay-success>
      <pay-close v-else></pay-close>
    </div>
  </div>
</template>
<script>
import allOrder from '@/components/order/allOrder'
import waitPay from '@/components/order/waitPay'
import paySuccess from '@/components/order/paySuccess'
import payClose from '@/components/order/payClose'

export default {
  components: {
    allOrder,
    waitPay,
    paySuccess,
    payClose
  },
  data () {
    return {
      currentData: 0,
      tabList: [
        { 'title': '全部订单' },
        { 'title': '待付款' },
        { 'title': '交易成功' },
        { 'title': '交易关闭' }
      ]
    }
  },
  methods: {
    // 切换选项卡功能
    onChangeTab (index) {
      this.currentData = index
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
}
.selete {
  color: #00bf6f;
}
</style>
