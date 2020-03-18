<template>
  <div class="all-order">
    <div
      class="order-null"
      v-if="isOrderNull"
    >
      <i class="iconfont iconno_result"></i>
      没有发现内容哦 ~
    </div>
    <div
      class="all-order-box"
      v-if="!isOrderNull"
    >
      <div class="all-order-box-head">
        交易关闭
      </div>
      <div class="all-order-box-content">
        <img />
        <div class="all-order-box-content-right">
          <p>风干牛肉 500克</p>
          <span>数量：× 10</span>
          <h3>￥ 100</h3>
        </div>
      </div>
      <div class="all-order-box-footer">
        <div>删除订单</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isOrderNull: true
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
}
.all-order .order-null i {
  font-size: 50px;
}

.all-order .all-order-box {
  width: 100%;
  height: 400rpx;
  background-color: #fff;
  border-bottom: 10rpx solid #f4f4f4;
  display: flex;
  flex-direction: column;
}
.all-order .all-order-box .all-order-box-head {
  width: auto;
  height: 20%;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  align-items: center;
  color: #333;
  padding-left: 40rpx;
}
.all-order .all-order-box .all-order-box-content {
  width: 100%;
  height: 50%;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  align-items: center;
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
