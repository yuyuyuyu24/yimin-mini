<template>
  <div>
    <div class="search-box">
      <div class="search-box-left">
        <i class="iconfont iconsousuo-copy"></i>
        <input
          class="search"
          v-model="search"
          placeholder="搜索你想要的商品..."
          placeholder-style="font-size:12px;"
        />
      </div>
      <div
        class="search-btn"
        @click="toSearchRes"
      >搜索</div>
    </div>
    <div class="hot-search-box">
      <h2>热门搜索</h2>
      <div class="hot-search">
        <span
          v-for="(item,index) in hotSearch"
          :key="index"
          @click="onSearch(item)"
        >{{item}}</span>
      </div>
    </div>
    <div class="hot-search-box">
      <div class="hot-search-title">
        <h2>搜索记录</h2>
        <i
          class="iconfont iconlajitong-copy"
          @click="removeSearchHistory"
        ></i>
      </div>
      <view
        class="hot-search-not"
        v-if="searchHistoryList.length === 0"
      >
        <i class="iconfont iconno_result"></i>
        <h2>没有发现搜索记录哦！</h2>
      </view>
      <div class="hot-search">
        <span
          v-for="(item,index) in searchHistoryList"
          :key="index"
          @click="onSearch(item)"
        >{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hotSearch: [
        '风干牛肉',
        '牛',
        '羊',
        '鸡',
        '奶制品'
      ],
      search: '',
      searchHistory: [],
      searchHistoryList: []
    }
  },
  mounted () {

  },
  methods: {
    // 点击搜索
    toSearchRes () {
      let _that = this
      if (_that.search === '') {
        return wx.showToast({
          title: '请输入内容',
          icon: 'none'
        })
      }
      // 本地缓存搜索历史
      _that.searchHistory.push(_that.search)
      if (_that.searchHistory.length > this.GLOBAL.SEARCH_HISTORY_NUM) {
        _that.searchHistory.splice(0, 1)
      }
      wx.setStorage({
        key: 'searchHistory',
        data: _that.searchHistory
      })
      wx.showToast({
        title: '跳转中...',
        icon: 'loading'
      })
      wx.navigateTo({
        url: `/pages/searchRes/main?search=${_that.search}`,
        success: function (res) {
          wx.hideToast()
        }
      })
      // 清空搜索框内容
      _that.search = ''
    },
    // 点击热门商品和搜索历史记录置于搜索框内
    onSearch (item) {
      this.search = item
    },
    // 删除历史搜索记录
    removeSearchHistory () {
      let _that = this
      wx.showModal({
        title: '提示',
        content: '确定要清空历史记录吗?',
        success (res) {
          if (res.confirm) {
            wx.removeStorage({
              key: 'searchHistory',
              success (res) {
                _that.searchHistoryList = []
                _that.searchHistory = []
                wx.showToast({
                  title: '成功',
                  icon: 'success'
                })
              }
            })
          }
        }
      })
    }
  },
  // 页面打开 就
  onShow () {
    let _that = this
    // 更新一次缓存
    wx.getStorage({
      key: 'searchHistory',
      success (res) {
        _that.searchHistoryList = []
        for (var i = 0; i < res.data.length; i++) {
          if (_that.searchHistoryList.indexOf(res.data[i]) === -1) {
            _that.searchHistoryList.push(res.data[i])
            _that.searchHistoryList.reverse()
          }
        }
      }
    })
  }
}
</script>

<style scoped>
.search-box {
  width: 680rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  margin: 20rpx auto;
  justify-content: space-between;
}
.search-box .search-box-left {
  width: 580rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
}
.search-box .search {
  width: 100%;
  height: 100%;
  border-radius: 5rpx;
  font-size: 12px;
  padding-left: 10rpx;
}
.search-box i {
  padding-left: 10rpx;
  font-size: 18px;
}
.search-box .search-btn {
  width: 80rpx;
  height: 60rpx;
  font-size: 14px;
  text-align: center;
  line-height: 60rpx;
  background-color: #7d45e8;
  color: #fff;
  border-radius: 4rpx;
}
.hot-search-box {
  width: 680rpx;
  height: auto;
  margin: 60rpx auto;
  padding: 0 35rpx;
}
.hot-search-box .hot-search-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.hot-search-box .hot-search-title i {
  font-size: 24px;
}
.hot-search-box h2 {
  font-size: 18px;
}
.hot-search-box .hot-search-not {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hot-search-box .hot-search-not i {
  font-size: 30px;
  padding: 40rpx 0;
}

.hot-search-box .hot-search-not h2 {
  font-size: 20px;
}

.hot-search {
  width: 100%;
  height: auto;
  margin-top: 30rpx;
  display: flex;
  flex-wrap: wrap;
}
.hot-search span {
  width: auto;
  height: 36rpx;
  border-radius: 8rpx;
  background-color: #f1f1f1;
  padding: 16rpx 24rpx;
  font-size: 14px;
  text-align: center;
  line-height: 36rpx;
  margin: 6rpx 10rpx;
}
</style>
