<template>
  <div class="buyerNotice">
    <div class="buyerNotice-title">
      <p>清真伊民肉业交易申明</p>
    </div>
    <div class="buyerNotice-body">
      <p>请您在提交订单前谨慎完整的阅读以下买家须知（以下简称“规则”），并确保您在完全知情并接受本规则的情况下提交订单购买商品。如您不同意或不理解本规则内容的，您应停止提交订单。如您继续提交订单，则视为您认可并同意本规则的全部内容。感谢理解！</p>
      <h2>一、交易模式及流程</h2>
      <span>1、清真伊民肉业目前仅支持本地配送，暂不支持自提。外地物流功能即将上线。</span>
      <span>2、交易流程主要为：①选择商品 ②确认支付 ③付款 ④支付成功 至此，流程结束。</span>
      <span>3、每笔订单满100元起送，每笔订单有五元配送费。</span>
      <span>4、每笔未进行支付的订单，将于每天的23:59:59进行关闭，请您合理的安排支付时间，否则造成的损失商家不予处理。</span>
      <span>5、清真伊民肉业保证，小程序内的每一个商品都是与实体店一致的价格，不存在线上抬高商品价格的情况。</span>
      <span>6、买家如对商品有特殊要求，可在提交订单时写上留言，商家会尽量满足您的需求。</span>
      <span>7、关于发票或收据，由于发票的特殊性质，建议您下单前先于商家进行沟通。</span>
      <h2>二、发货时效</h2>
      <span>1、清真伊民肉业发货时间如下：每天上午11:00前的订单，当天下午配送。下午5:00后的订单，第二天上午配送。</span>
      <span>2、由于冷鲜肉类的特殊性，如果遇到恶劣天气或发生其他意外事件，商家会立即与买家进行电话沟通，所以填写收货联系电话请一定填写正确且可以保持联系畅通的联系方式。</span>
      <h2>三、售后服务</h2>
      <span>1、由于冷鲜肉类的特殊性，请您当面收货时一定确认好商品的完好。如果发现购买的商品有破损、包装损坏、质量问题、肉类与商家表述不符等情况，一定要在收货时当面与配送员说明拒收，否则过期不予处理。</span>
      <span>2、如果后续还有其他问题，您可以在小程序中联系客服或者在订单页面与商家进行电话沟通。</span>
      <span>3、关于退货问题：我们的初衷是完成每一笔双方都放心、满意的交易。如因为质量问题情况，请与商家进行电话沟通或者去实体店内进行沟通。</span>
      <h2>四、免责声明</h2>
      <span>1、清真伊民肉业抵制任何利用平台漏洞恶意刷单、套现、攻击商家平台等行为。如发现用户存在上述行为，商家有权关闭交易订单、封闭用户账号、或采用进一步法律措施。</span>
      <span>2、由于互联网技术和商品流动量较大等原因，清真伊民肉业小程序有可能存在信息稍微的滞后性或差错，对此情况如出现商品购买前显示有库存，但实际上有可能库存不足。这类情况商家会第一时间与买家沟通讨论后续处理。</span>
      <h2>五、其他</h2>
      <span>1、本规则由清真伊民肉业制定并公示，清真伊民肉业有权利对本规则进行修改和调整，并向买家进行公示后执行。</span>
      <span>2、如有任何问题，可联系商家进行咨询。</span>
      <span>生效时间 2020年4月15日</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }

}
</script>
<style scoped>
.confirmOrder {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-top: 10rpx solid #f4f4f4;
}
.buyerNotice-title {
  width: 100%;
  height: 300rpx;
  background: url('http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GI6MFesEiAmSHTjt*MflESYD9Z4NVg89N8YffZzm7xgdxqUjoBOg9CTlgoOaCBlddbbw*dQcf8Xvs55X5TbgRbo!/b&bo=OASwATgEsAEDNxI!&rf=viewer_4&t=5')
    no-repeat;
  background-size: 100% 100%;
}
.buyerNotice-title p {
  text-align: center;
  color: #e2c8ad;
  letter-spacing: 2px;
  padding-top: 40rpx;
  font-size: 18px;
}
.buyerNotice-body {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}
.buyerNotice-body p {
  font-weight: 600;
  color: #000;
  font-size: 14px;
  line-height: 24px;
}
.buyerNotice-body h2 {
  font-size: 18px;
  font-weight: 200;
  line-height: 80rpx;
}
.buyerNotice-body span {
  color: #333;
  font-size: 14px;
  line-height: 60rpx;
}
</style>
