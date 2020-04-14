<template>
  <div class="shopCard">
    <img
      class="shopCard-card"
      src="http://www.ymry.xyz/upload_pic_1586835720445_1.png"
    />
    <div class="shopCard-text">
      <p>清真伊民肉业购物卡权益：</p>
      <span>1. 善解人意。当您想馈赠给亲朋好友时，担心自己挑选的商品不是亲朋好友喜欢的，您可以购买购物卡充值并赠予好友，将购买物品的选择权完全交给了好友；</span>
      <span>2. 固定金额。每张购物卡都含有固定的金额，购买前后商家也会告诉您购物卡的余额。避免您在使用时超出预算；</span>
      <span>3. 安全。避免现金不安全，银行卡不放心等缺陷；</span>
      <span>4. 方便快捷。办理购物卡后，购物无需再使用现金支付，即刷即扣，方便快捷；</span>
      <span>注:由于办卡需要录入相关信息，暂只支持实体店内办理。</span>
    </div>
    <div
      class="shopCard-button"
      @click="understand"
    >我已了解</div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    understand () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>
<style scoped>
.shopCard {
  width: 100%;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.shopCard .shopCard-card {
  width: 674rpx;
  height: 385rpx;
  margin-top: 40rpx;
}
.shopCard .shopCard-text {
  width: auto;
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}
.shopCard .shopCard-text p {
  font-size: 16px;
  font-weight: 600;
  padding: 20rpx 0;
  text-align: center;
}
.shopCard .shopCard-text span {
  color: #666;
  line-height: 50rpx;
}
.shopCard .shopCard-button {
  width: 90%;
  height: 80rpx;
  border-radius: 12rpx;
  background-color: #00bf6f;
  text-align: center;
  color: #fff;
  line-height: 80rpx;
  margin-bottom: 40rpx;
}
</style>
