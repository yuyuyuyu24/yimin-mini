<template>
  <div class="viewAtlas-page">
    <div class="viewAtlas-shop" @click="checkViewAtlasDetails">
      <div class="viewAtlas-opacity">
        <h2>{{realShooting.length}}+</h2>
        <span>店铺实拍</span>
      </div>
    </div>
  </div>
</template>

<script>
// 导入店内实拍照片
import data from '@/utils/data.js'

export default {
  data () {
    return {
      realShooting: data.realShootingData
    }
  },
  methods: {
    // 查看图集详情
    checkViewAtlasDetails () {
      wx.previewImage({
        current: data.realShootingData[0],
        urls: data.realShootingData
      })
    }
  }
}
</script>

<style scoped>
.viewAtlas-page {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
}
.viewAtlas-page .viewAtlas-shop {
  width: 680rpx;
  height: 340rpx;
  box-shadow: darkgrey 0 0 30rpx -10rpx;
  border-radius: 8rpx;
  display: flex;
  justify-content: flex-end;
  background: url("http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GIGP1a3293EJGtsS6FqigUzj*2dY0LbLMzVTV7iocZkLQzDO0cntIiRbFs*bUSYUChHzp3927whvNQI4c0PaKRo!/b&bo=NgR.AgAAAAARF24!&rf=viewer_4&t=5")
    no-repeat;
  background-size: 100% 100%;
}
.viewAtlas-page .viewAtlas-shop .viewAtlas-opacity {
  width: 260rpx;
  height: 340rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-top-right-radius: 8rpx;
  border-bottom-right-radius: 8rpx;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.viewAtlas-page .viewAtlas-shop .viewAtlas-opacity h2 {
  font-size: 42px;
}
.viewAtlas-page .viewAtlas-shop .viewAtlas-opacity span {
  font-size: 18px;
}
</style>
