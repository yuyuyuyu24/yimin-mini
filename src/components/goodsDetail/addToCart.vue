<template>
  <van-popup
    :show="isAddToCart"
    closeable
    position="bottom"
    custom-style="height: 70%"
    @close="onClose"
  >
    <div class="cart">
      <span class="cart-title">加入购物车</span>
      <div class="cart-header">
        <img
          :src="cartData.coverList[0].url"
          v-if="cartData.coverList"
        />
        <div class="cart-header-right">
          <p>￥{{cartData.goodsPrice}}</p>
          <span>库存 {{cartData.goodsStock}} </span>
        </div>
      </div>
      <div class="cart-center">
        购买数量
        <view class="stepper">
          <!-- 减号 -->
          <text
            :class="minusStatus"
            @click="bindMinus"
          >-</text>
          <!-- 数值 -->
          <text class="input">{{num}}</text>
          <!-- 加号 -->
          <text
            class="normal"
            @click="bindPlus"
          >+</text>
        </view>
      </div>
      <div
        class="cart-footer"
        @click="addCartFun"
      >加入购物车</div>
    </div>
  </van-popup>
</template>
<script>
export default {
  data () {
    return {
      isAddToCart: false,
      // input默认是1
      num: 1,
      // 使用data数据对象设置样式名
      minusStatus: 'disabled',
      cartData: {}
    }
  },
  mounted () {
    this.$on('addToCartMethod', (res) => {
      this.isAddToCart = res.isAddToCart
      this.cartData = res.hotGoodsList
    })
  },
  methods: {
    // 关闭加入购物车框 清空状态
    onClose () {
      this.isAddToCart = false
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
    // 加入购物车
    addCartFun () {
      let _this = this
      var value = wx.getStorageSync('yiminCart') || []
      if (value.length === 0) {
        let cart = []
        let data = {
          goodsId: _this.cartData.id,
          goodsNum: _this.num
        }
        cart.push(data)
        wx.setStorage({
          key: 'yiminCart',
          data: cart,
          success (res) {
            wx.showToast({
              title: '加入购物车成功！',
              icon: 'success',
              duration: 2000
            })
            _this.onClose()
          },
          file () {
            wx.showToast({
              title: '加入购物车失败！请检查空间内存或清理小程序缓存。',
              icon: 'none',
              duration: 4000
            })
          }
        })
      } else {
        // 先循环 查看该条商品是否已存在购物车内
        for (let i = 0; i < value.length; i++) {
          if (_this.cartData.id === value[i].goodsId) {
            wx.showToast({
              title: '该商品已在购物车中啦！快去购物车内查看吧！',
              icon: 'none',
              duration: 4000
            })
            return false
          }
        }
        let cartData = value
        let data = {
          goodsId: _this.cartData.id,
          goodsNum: _this.num
        }
        cartData.push(data)
        wx.setStorage({
          key: 'yiminCart',
          data: cartData,
          success (res) {
            wx.showToast({
              title: '加入购物车成功！',
              icon: 'success',
              duration: 2000
            })
            _this.onClose()
          },
          file () {
            wx.showToast({
              title: '加入购物车失败！请检查空间内存或清理小程序缓存。',
              icon: 'none',
              duration: 4000
            })
          }
        })
      }
    }
  }
}
</script>
<style scoped>
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
.cart .cart-header img {
  width: 200rpx;
  height: 200rpx;
  border-radius: 15rpx;
  border: 1px solid #ccc;
}
.cart .cart-header .cart-header-right {
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
}
.cart .cart-header .cart-header-right p {
  font-size: 24px;
  padding-bottom: 20px;
}
.cart .cart-header .cart-header-right span {
  color: #888;
}

.cart .cart-center {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-between;
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
