<template>
  <div class="page">
    <back-top v-if="isBack"></back-top>
    <div class="cattle-title">
      <h2>羊肉</h2>
      <p>纯真纯味的草原羊肉，满足你跳动的味蕾。吃绿色的肉，吃健康的羊肉。</p>
    </div>
    <div class="cattle-goods-box">
      <div class="cattle-goods">
        <div
          v-for="(item,index) in sheepGoods"
          :key="index"
          @click="toDetails(item)"
          class="cattle-goods-div"
        >
          <div class="yishouqing" v-if="item.goodsStatus === 2">已 售 罄</div>
          <div
            class="bg"
            :style="{
                  background: 'url('+item.coverList.url+') no-repeat center/cover'
                }"
          ></div>
          <p>{{item.goodsName}}</p>
          <span class="price">
            <span class="price-sign">￥</span>
            {{item.goodsPrice}}
          </span>
          <div v-if="item.isSpecial === 1" class="hot-goods-div-message-right">特价</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backTop from '@/components/backTop'
import { queryClassGoods } from '@/api/goods'
import { changeQuerystring, ENCODE } from '@/utils/function'

export default {
  data () {
    return {
      sheepGoods: [],
      isBack: false,
      conut: 0
    }
  },
  components: {
    backTop
  },
  onPageScroll (e) {
    if (e.scrollTop > this.GLOBAL.SCROLL_TOP) {
      this.isBack = true
    } else {
      this.isBack = false
    }
  },
  mounted () {
    this.conut = 0
    this.sheepGoods = []
    this.queryClassGoodsFun()
  },
  onReachBottom () {
    this.queryClassGoodsFun()
  },
  methods: {
    // 根据分类显示商品 接口
    queryClassGoodsFun () {
      let _this = this
      this.conut += 1
      let data = {
        goodsType: 'S',
        pageNumber: _this.conut,
        pageSize: 5
      }
      wx.showLoading({
        title: '加载中'
      })
      queryClassGoods('goods/queryClassGoods', data).then(res => {
        wx.hideLoading()
        if (res.data.data) {
          if (res.data.data.length === 0) {
            wx.showToast({
              title: '商品加载完毕！',
              icon: 'none',
              duration: 1000
            })
          }
          _this.sheepGoods = _this.sheepGoods.concat(changeQuerystring(res.data.data))
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 返回顶部
    fatherMethod (e) { // 一键回到顶部
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    },
    // 跳转至商品详情页面
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
.cattle-title {
  width: 100%;
  height: 200rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-bottom: 4rpx solid #f4f4f4;
  padding-top: 30rpx;
}
.cattle-title h2 {
  font-size: 20px;
}
.cattle-title p {
  font-size: 14px;
  color: #777;
  padding: 30rpx 30rpx;
  line-height: 46rpx;
}
.cattle-goods-box {
  width: 100%;
  height: auto;
}
.cattle-goods-box .cattle-goods {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}
.cattle-goods-box .cattle-goods .cattle-goods-div {
  width: 330rpx;
  border-radius: 6rpx;
  margin: 0 30rpx 30rpx 30rpx;
  box-shadow: darkgrey 0 0 30rpx -10rpx;
  position: relative;
}
.cattle-goods-box .cattle-goods .cattle-goods-div:nth-child(even) {
  margin: 0 0 30rpx 0;
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

.cattle-goods-box .cattle-goods .cattle-goods-div .bg {
  width: 100%;
  height: 260rpx;
  border-top-left-radius: 6rpx;
  border-top-right-radius: 6rpx;
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
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 28rpx;
  padding: 20rpx 0 0 20rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cattle-goods-box .cattle-goods .cattle-goods-div .price {
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ff443d;
  line-height: 32rpx;
  padding: 20rpx 0 20rpx 0;
  display: block;
}
.cattle-goods-box .cattle-goods .cattle-goods-div .price-sign {
  font-size: 12px;
  padding-left: 20rpx;
  color: #ff5f5f;
}
</style>
