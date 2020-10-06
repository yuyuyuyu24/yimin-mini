<template>
  <van-popup
    :show="isOrderNow"
    closeable
    position="bottom"
    custom-style="height: 70%"
    @close="onClose"
  >
    <div class="cart">
      <span class="cart-title">立即购买</span>
      <div class="cart-header">
        <div
          class="bg"
          v-if="orderData.coverList"
          :style="{
                  background: 'url('+orderData.coverList[0].url+') no-repeat center/cover'
                }"
        ></div>
        <div class="cart-header-right">
          <h3>{{orderData.goodsName}}</h3>
          <p>￥{{orderData.goodsPrice}}</p>
          <span>库存 {{orderData.goodsStock}}</span>
        </div>
      </div>
      <div class="cart-center">
        <p>购买数量</p>
        <view class="stepper">
          <!-- 减号 -->
          <text :class="minusStatus" @click="bindMinus">-</text>
          <!-- 数值 -->
          <text class="input">{{num}}</text>
          <!-- 加号 -->
          <text class="normal" @click="bindPlus">+</text>
        </view>
      </div>
      <div class="cart-footer" @click="ordernowFun">立即购买</div>
    </div>
  </van-popup>
</template>
<script>
export default {
  data () {
    return {
      isOrderNow: false,
      // input默认是1
      num: 1,
      // 使用data数据对象设置样式名
      minusStatus: 'disabled',
      orderData: {}
    }
  },
  mounted () {
    this.$on('ordernowMethod', (res) => {
      this.isOrderNow = res.isOrderNow
      this.orderData = res.hotGoodsList
    })
  },
  methods: {
    onClose () {
      this.isOrderNow = false
      this.num = 1
    },
    /* 点击减号 */
    bindMinus: function () {
      var num = this.num
      // 如果大于1时，才可以减
      if (num > 1) {
        num--
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num <= 1 ? 'disabled' : 'normal'
      // 将数值与状态写回
      this.num = num
      this.minusStatus = minusStatus
    },
    /* 点击加号 */
    bindPlus: function () {
      var num = this.num
      // 不作过多考虑自增1
      num++
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num < 1 ? 'disabled' : 'normal'
      // 将数值与状态写回
      this.num = num
      this.minusStatus = minusStatus
    },
    // 立即购买
    ordernowFun () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      let list = []
      list.push({ 'id': this.orderData.id, 'num': this.num })
      wx.navigateTo({
        url: `/pages/confirmOrder/main?data=${JSON.stringify(list)}`,
        success: function (res) {
          wx.hideToast()
        }
      })
      this.onClose()
    }
  }
}
</script>
<style lang="less" scoped>
.cart {
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30rpx;
}
.cart .cart-title {
  line-height: 100rpx;
  font-size: 20px;
}
.cart .cart-header {
  width: 100%;
  height: 30%;
  display: flex;
  margin: 20rpx;
  align-items: center;
}
.cart .cart-header .bg {
  width: 172rpx;
  height: 172rpx;
  border-radius: 12rpx;
}
.cart .cart-header .cart-header-right {
  width: auto;
  height: 172rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20rpx;
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

.cart .cart-center {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-between;
  p {
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 28rpx;
    margin-top: 16rpx;
  }
}
.cart .cart-footer {
  width: 90%;
  height: 80rpx;
  background-color: #00bf6f;
  border-radius: 10rpx;
  text-align: center;
  line-height: 80rpx;
  color: #fff;
}
/*主容器*/
.stepper {
  width: 200rpx;
  height: 60rpx;
  display: flex;
}

/*加号和减号*/
.stepper text {
  width: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  float: left;
  background-color: #ddd;
}

/*数值*/
.stepper .input {
  width: 60rpx;
  height: 60rpx;
  float: left;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  background-color: #ddd;
}

/*普通样式*/
.stepper .normal {
  color: black;
}

/*禁用样式*/
.stepper .disabled {
  color: #fff;
}
</style>
