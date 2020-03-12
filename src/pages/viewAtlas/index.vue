<template>
  <div class="viewAtlas-page">
    <div
      class="viewAtlas-shop"
      v-for="(item,index) in realShooting"
      :key="index"
      @click="checkViewAtlasDetails(index)"
      :style="{ 'background': 'url('+item.atlasImgs[0].url+') no-repeat center center', 'background-size': '100% 100%'}"
    >
      <div class="viewAtlas-opacity">
        <h2>{{item.atlasImgs.length}}+</h2>
        <span>{{item.atlasName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getAtlas } from '@/api/atlas'
import { changeQuerystringAtlas } from '@/utils/function'

export default {
  data () {
    return {
      realShooting: []
    }
  },
  mounted () {
    this.getAtlasFun()
  },
  methods: {
    // 获取图集
    getAtlasFun () {
      let _this = this
      getAtlas('atlas/getAtlas').then(res => {
        if (res.data.data) {
          _this.realShooting = changeQuerystringAtlas(res.data.data)
          for (let i = 0; i < res.data.data.length; i++) {
            if (JSON.stringify(_this.realShooting[i].atlasImgs[0]) === '{}') {
              _this.realShooting.splice(0, 1)
            }
          }
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 查看图集详情
    checkViewAtlasDetails (index) {
      let atlasImgs = []
      for (let i = 0; i < this.realShooting[index].atlasImgs.length; i++) {
        atlasImgs.push(this.realShooting[index].atlasImgs[i].url)
      }
      wx.previewImage({
        current: atlasImgs[0],
        urls: atlasImgs
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
  margin-bottom: 20rpx;
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
