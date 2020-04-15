<template>
  <div class="cart-body">
    <div class="cart-body-box">
      <div class="cart-body-box-head">
        <img src="/static/images/fangxingou.png" />
        伊民清真肉业实体店发货 品质保证
      </div>
      <div class="cart-body-box-manage">
        <p>共 {{cartData.length}} 个宝贝</p>
        <span
          @click="manage"
          v-if="!isDelete"
        >管理</span>
        <span
          @click="manage"
          v-if="isDelete"
        >完成</span>
      </div>
    </div>
    <div
      v-if="isCartNull"
      class="cart-null"
    >
      <img src="/static/images/cartnull.jpg" />
      <p>购物车竟然是空的</p>
      <span>再忙，也要记得买点什么犒劳自己~</span>
      <div @click="toIndex">去逛逛</div>
    </div>
    <div v-if="!isCartNull">

      <div
        class="cart-body-box-content"
        v-for="(item,index) in cartData"
        :key="index"
      >
        <div class="van-checkbox">
          <van-checkbox
            class="vancheckbox"
            :value="item.selete"
            @click="checkboxOnChange(index)"
          ></van-checkbox>
        </div>
        <img
          :src="item.coverList[0].url"
          @click="toGoodsDetails(item)"
        />
        <div class="cart-body-box-content-right">
          <p>{{item.goodsName}} {{item.goodsUnit}}</p>
          <span>库存 {{item.goodsStock}} </span>
          <div class="cart-body-box-content-right-bottom">
            <h3>￥ {{item.goodsPrice}}</h3>
            <view class="stepper">
              <!-- 减号 -->
              <text
                :class="minusStatus"
                @click="bindMinus(index)"
              >-</text>
              <!-- 数值 -->
              <text class="input">{{item.goodsNum}}</text>
              <!-- 加号 -->
              <text
                class="normal"
                @click="bindPlus(index)"
              >+</text>
            </view>
          </div>
        </div>
      </div>

      <div class="to-settlement">
        <div
          class="to-settlement-checkbox"
          @click="allChecked"
        >
          全选
        </div>
        <div class="to-settlement-price">
          <p>合计: <span>￥ {{total}}</span></p>
        </div>
        <div
          v-if="!isDelete"
          class="to-settlement-button"
        >
          <span @click="toConfirmOrder">去结算</span>
        </div>
        <div
          v-if="isDelete"
          class="to-settlement-delete"
          @click="removeCart"
        >
          <span>删除</span>
        </div>
      </div>
    </div>
    <div class="guess-love">
      <div class="guess-love-head">
        <span class="guess-love-head-left"></span>
        猜你喜欢
        <span class="guess-love-head-right"></span>
      </div>
      <div class="cattle-goods-box">
        <div class="cattle-goods">
          <div
            class="cattle-goods-div"
            v-for="(item,index) in randomList"
            :key="index"
            @click="toDetails(item)"
          >
            <div
              class="yishouqing"
              v-if="item.goodsStatus === 2"
            >已 售 罄
            </div>
            <image
              lazy-load=true
              mode="widthFile"
              :src='item.coverList.url'
            ></image>
            <p>{{item.goodsName}}</p>
            <span class="price"><span class="price-sign">￥</span>{{item.goodsPrice}}</span>
            <div
              v-if="item.isSpecial === 1"
              class="hot-goods-div-message-right"
            >
              特价
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog id="van-dialog" />

  </div>
</template>
<script>
import { getGoodsDetail, randomGoods } from '@/api/goods'
import { changeQuerystringDetail, changeQuerystring, ENCODE } from '@/utils/function'
import Dialog from '../../../static/vant/dist/dialog/dialog'

export default {
  data () {
    return {
      // 使用data数据对象设置样式名
      minusStatus: 'disabled',
      isCartNull: true,
      cartData: [],
      cartDataNum: [],
      isDelete: false,
      checkedAll: false,
      total: 0,
      removeCartList: [],
      randomList: []
    }
  },
  onShow () {
    this.cartFun()
    this.total = 0
  },
  mounted () {
    let number = 10
    this.randomGoodsFun({ number })
  },
  methods: {
    // 根据缓存获取购物车数据
    cartFun () {
      // 取缓存内的id
      let _this = this
      _this.cartData = []
      let value = wx.getStorageSync('yiminCart') || []
      console.log(value)
      if (value.length === 0) {
        this.isCartNull = true
      } else {
        this.isCartNull = false
        for (let i = 0; i < value.length; i++) {
          let id = value[i].goodsId
          _this.getGoodsDetailFun({ id }, value[i].goodsNum)
        }
      }
    },
    /* 点击减号 */
    bindMinus (index) {
      var num = this.cartData[index].goodsNum
      // 如果大于1时，才可以减
      if (num > 1) {
        num--
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num <= 1 ? 'disabled' : 'normal'
      // 将数值与状态写回
      this.cartData[index].goodsNum = num
      this.minusStatus = minusStatus
      if (this.cartData[index].selete === true) {
        this.count()
      }
    },
    /* 点击加号 */
    bindPlus: function (index) {
      var num = this.cartData[index].goodsNum
      // 不作过多考虑自增1
      num++
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num < 1 ? 'disabled' : 'normal'
      // 将数值与状态写回
      this.cartData[index].goodsNum = num
      this.minusStatus = minusStatus
      if (this.cartData[index].selete === true) {
        this.count()
      }
    },
    // 去逛逛跳转到首页
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
    // 根据id获取商品详情
    getGoodsDetailFun (id, goodsNum) {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      getGoodsDetail('goods/getGoodsDetail', id).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          res.data.data.goodsNum = goodsNum
          res.data.data.selete = false
          _this.cartData.push(changeQuerystringDetail(res.data.data))
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 小程序内随机显示n条数据 在猜你喜欢中使用
    randomGoodsFun (number) {
      let _this = this
      wx.showLoading({
        title: '加载中'
      })
      randomGoods('goods/randomGoods', number).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          _this.randomList = changeQuerystring(res.data.data)
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 点击管理按钮切换状态
    manage () {
      this.isDelete = !this.isDelete
    },
    // 全选
    allChecked (e) {
      let list = this.cartData
      let selectAllStatus = this.checkedAll
      selectAllStatus = !selectAllStatus
      this.total = 0
      for (var i = 0; i < list.length; i++) {
        list[i].selete = selectAllStatus
      }
      this.checkedAll = selectAllStatus
      this.cartData = list
      this.count()
    },
    // 单个多选框点击事件
    checkboxOnChange (index) {
      this.cartData[index].selete = !this.cartData[index].selete
      this.count()
    },
    // 计算总价钱
    count () {
      this.total = 0
      for (let i = 0; i < this.cartData.length; i++) {
        if (this.cartData[i].selete === true) {
          this.total += this.cartData[i].goodsPrice * this.cartData[i].goodsNum
        }
      }
    },
    // 删除购物车内数据
    removeCart () {
      let _this = this
      this.removeCartList = []
      for (let i = 0; i < this.cartData.length; i++) {
        if (this.cartData[i].selete === false) {
          this.removeCartList.push(this.cartData[i])
        }
      }
      // 如果没有选择
      if (this.removeCartList.length === this.cartData.length) {
        wx.showToast({
          title: '请至少选择一项商品进行删除',
          icon: 'none',
          duration: 3000
        })
        // 如果选择全部删除 直接清空该条缓存
      } else if (this.removeCartList.length === 0) {
        let removeLength = this.cartData.length - this.removeCartList.length
        wx.showModal({
          title: '提示',
          content: `确认将这${removeLength}个商品移出购物车？`,
          success (res) {
            if (res.confirm) {
              wx.removeStorage({
                key: 'yiminCart',
                success (res) {
                  wx.showToast({
                    title: '删除成功！',
                    icon: 'success',
                    duration: 3000
                  })
                  _this.cartFun()
                },
                file () {
                  wx.showToast({
                    title: '删除失败！请稍后再试',
                    icon: 'none',
                    duration: 3000
                  })
                }
              })
            }
          }
        })
      } else {
        let removeLength = this.cartData.length - this.removeCartList.length
        wx.showModal({
          title: '提示',
          content: `确认将这${removeLength}个商品移出购物车2？`,
          success (res) {
            if (res.confirm) {
              let cart = []
              for (let i = 0; i < _this.removeCartList.length; i++) {
                let data = {
                  goodsId: _this.removeCartList[i].id,
                  goodsNum: _this.removeCartList[i].goodsNum
                }
                cart.push(data)
                wx.setStorage({
                  key: 'yiminCart',
                  data: cart,
                  success (res) {
                    wx.showToast({
                      title: '删除成功！',
                      icon: 'success',
                      duration: 3000
                    })
                    _this.cartFun()
                  },
                  file () {
                    wx.showToast({
                      title: '删除失败！请稍后再试',
                      icon: 'none',
                      duration: 3000
                    })
                  }
                })
              }
            }
          }
        })
      }
    },
    // 点击购物车图片跳转商品详情
    toGoodsDetails (item) {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: `/pages/goodsDetails/main?id=${ENCODE(item.id)}`,
        success: function (res) {
          wx.hideToast()
        }
      })
    },
    // 点击去结算
    toConfirmOrder () {
      let _this = this
      wx.checkSession({
        success (res) {
          let value = wx.getStorageSync('userMegList')
          if (!value) {
            Dialog.alert({
              title: '提示',
              message: '很抱歉，您需要先进行登录才可以购买商品哦 ~'
            }).then(() => {
              wx.navigateTo({
                url: `/pages/loginPage/main`
              })
            })
          } else {
            let list = []
            let unList = []
            for (let i = 0; i < _this.cartData.length; i++) {
              if (_this.cartData[i].selete === true) {
                list.push({ 'id': _this.cartData[i].id, 'num': _this.cartData[i].goodsNum })
              } else {
                unList.push(_this.cartData[i])
              }
            }
            if (unList.length === _this.cartData.length) {
              wx.showToast({
                title: '请先勾选要购买的商品',
                icon: 'none',
                duration: 3000
              })
            } else {
              wx.showToast({
                title: '跳转中...',
                icon: 'loading'
              })
              let query = JSON.stringify(list)
              wx.navigateTo({
                url: `/pages/confirmOrder/main?data=${query}`,
                success: function (res) {
                  wx.hideToast()
                }
              })
            }
          }
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          // wx.login() // 重新登录
          Dialog.alert({
            title: '提示',
            message: '很抱歉，您需要先进行登录才可以购买商品哦 ~'
          }).then(() => {
            wx.navigateTo({
              url: `/pages/loginPage/main`
            })
          })
        }
      })
    },
    // 点击猜你喜欢跳转
    toDetails (item) {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: `/pages/goodsDetails/main?id=${ENCODE(item.id)}`,
        success: function (res) {
          wx.hideToast()
        }
      })
    }
  }
}
</script>
<style scoped>
.cart-body {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
}
.cart-body .cart-body-box {
  width: auto;
  background-color: #00bf6f;
  padding: 0 20rpx;
}
.cart-body .cart-body-box .cart-body-box-head {
  width: 100%;
  height: 80rpx;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #fff;
}
.cart-body .cart-body-box .cart-body-box-head img {
  width: 142rpx;
  height: 48rpx;
  margin-right: 10rpx;
}
.cart-body .cart-body-box .cart-body-box-manage {
  width: 100%;
  height: 140rpx;
  display: flex;
  align-items: start;
  justify-content: space-between;
  color: #fff;
  line-height: 68rpx;
}
.cart-body .cart-body-box-content {
  width: 85%;
  height: auto;
  border-radius: 20rpx;
  background-color: #fff;
  margin: -50rpx auto;
  margin-bottom: 65rpx;
  display: flex;
  padding: 30rpx;
}
.cart-body .cart-body-box-content .van-checkbox {
  display: flex;
  align-items: center;
}
.cart-body .cart-body-box-content img {
  width: 180rpx;
  height: 180rpx;
  border-radius: 10rpx;
  border: 1px solid #ccc;
  margin-right: 20rpx;
  margin-left: 20rpx;
}
.cart-body .cart-body-box-content .cart-body-box-content-right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;
}
.cart-body .cart-body-box-content .cart-body-box-content-right p {
  line-height: 40rpx;
}
.cart-body .cart-body-box-content .cart-body-box-content-right span {
  font-size: 14px;
  color: #888;
}
.cart-body .cart-body-box-content .cart-body-box-content-right h3 {
  font-size: 18px;
}
.cart-body
  .cart-body-box-content
  .cart-body-box-content-right
  .cart-body-box-content-right-bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  border: 1px solid #ddd;
}

/*数值*/
.stepper .input {
  width: 60rpx;
  height: 60rpx;
  float: left;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  border: 1px solid #ddd;
}
.cart-null {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50rpx;
}
.cart-null img {
  width: 313rpx;
  height: 263rpx;
  display: flex;
}
.cart-null p {
  font-size: 18px;
  margin-top: 40rpx;
}
.cart-null span {
  font-size: 14px;
  color: #888;
  margin-top: 30rpx;
}
.cart-null div {
  width: 160rpx;
  height: 70rpx;
  border: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30rpx;
}
.to-settlement {
  width: 100%;
  height: 100rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  z-index: 99;
}
.to-settlement .to-settlement-checkbox {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.to-settlement .to-settlement-price {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.to-settlement .to-settlement-price span {
  font-size: 20px;
}
.to-settlement .to-settlement-button {
  width: 30%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00bf6f;
}
.to-settlement .to-settlement-button span {
  width: 70%;
  height: 70%;
  border: 1px solid #00bf6f;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 37rpx;
}
.to-settlement .to-settlement-delete {
  width: 30%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f84c4c;
}
.to-settlement .to-settlement-delete span {
  width: 70%;
  height: 70%;
  border: 1px solid #f84c4c;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 37rpx;
}
.guess-love {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 100rpx;
}
.guess-love .guess-love-head {
  width: 100%;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
}
.guess-love .guess-love-head span {
  width: 30%;
  height: 2rpx;
  background-color: #ddd;
}
.guess-love .guess-love-head .guess-love-head-left {
  margin-right: 30rpx;
}
.guess-love .guess-love-head .guess-love-head-right {
  margin-left: 30rpx;
}

.cattle-goods-box {
  width: 100%;
  height: auto;
  background-color: #f4f4f4;
}
.cattle-goods-box .cattle-goods {
  width: 700rpx;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin: 20rpx auto;
  background-color: #f4f4f4;
}
.cattle-goods-box .cattle-goods .cattle-goods-div {
  width: 340rpx;
  height: 400rpx;
  border-radius: 8rpx;
  margin: 0 10rpx 10rpx 0;
  position: relative;
  background-color: #fff;
}
.cattle-goods-box .cattle-goods .cattle-goods-div .yishouqing {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cattle-goods-box .cattle-goods .cattle-goods-div image {
  width: 100%;
  height: 70%;
  border-top-left-radius: 8rpx;
  border-top-right-radius: 8rpx;
}
.cattle-goods-box .hot-goods-div-message-right {
  width: 80rpx;
  height: 60rpx;
  background-color: #b4db9a;
  color: #fff;
  text-align: center;
  line-height: 60rpx;
  border-radius: 15rpx;
  position: absolute;
  bottom: 37rpx;
  right: 20rpx;
}
.cattle-goods-box .cattle-goods .cattle-goods-div p {
  font-size: 16px;
  font-weight: 600;
  padding-left: 20rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cattle-goods-box .cattle-goods .cattle-goods-div .price {
  font-size: 20px;
  padding-left: 20rpx;
  font-weight: 600;
  color: #ff5f5f;
}
.cattle-goods-box .cattle-goods .cattle-goods-div .price-sign {
  font-size: 14px;
  color: #ff5f5f;
}
.cattle-goods-box .cattle-goods .cattle-goods-div .price-unit {
  font-size: 14px;
  color: #222;
}
</style>
