<template>
  <div class="comments">
    <div class="comments-box">
      <van-cell-group>
        <van-field
          v-model="commentsFrom.comment"
          type="textarea"
          autosize
          border="false"
          @change="changeCommentsFrom"
          :placeholder="bindplaceholder"
        />
      </van-cell-group>
    </div>
    <div
      @click="submit"
      class="button"
    >提交</div>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import { UNENCODE } from '@/utils/function'
import { newComment } from '@/api/comment'
import Dialog from '../../../static/vant/dist/dialog/dialog'

export default {
  data () {
    return {
      commentsFrom: {
        comment: ''
      },
      userId: '',
      goodsId: '',
      bindplaceholder: '请输入商品评价 字数限制140'
    }
  },
  onShow () {
    this.commentsFrom.comment = ''
    this.bindplaceholder = ''
    Dialog.alert({
      title: '提示',
      confirmButtonText: '我知道了，并会遵守',
      message: '根据互联网管理条例等相关规定，禁止发布色情，暴力等相关违法内容，违者会受到相应处罚！'
    }).then(() => {
      this.bindplaceholder = '请输入商品评价 字数限制140'
    })
  },
  mounted () {
    this.userId = UNENCODE(this.$root.$mp.query.userId)
    this.goodsId = UNENCODE(this.$root.$mp.query.goodsId)
  },
  methods: {
    submit () {
      let _this = this
      let userList = wx.getStorageSync('userMegList') || {}
      if (userList.userStatus === '2') {
        wx.showToast({
          title: '抱歉，您的账号暂时被冻结，无法进行评论操作。如有疑问，请到我的页面内点击联系客服进行咨询。',
          icon: 'none',
          duration: 3000
        })
        return false
      }
      if (this.commentsFrom.comment === '') {
        wx.showToast({
          title: '内容不能为空！',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      if (this.commentsFrom.comment.length > 140) {
        wx.showToast({
          title: '评论字数不能超过140字！',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      let data = {
        userId: this.userId,
        goodsId: this.goodsId,
        createTime: new Date().getTime() + '',
        userName: userList.userName,
        userImg: userList.userImg,
        comment: this.commentsFrom.comment,
        commentStatus: '1'
      }
      _this.newCommentFun(data)
    },
    // 创建评论接口
    newCommentFun (data) {
      wx.showLoading({
        title: '加载中'
      })
      newComment('mini/newComment', data).then(res => {
        if (res.data.data) {
          wx.hideLoading()
          this.bindplaceholder = ''
          Dialog.alert({
            title: '提示',
            message: '评论成功！'
          }).then(() => {
            wx.navigateBack({
              delta: 1
            })
          })
        }
      }).catch(() => {
        wx.showToast({
          title: '网络出现问题，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    changeCommentsFrom (e) {
      this.commentsFrom.comment = e.mp.detail
    }
  }
}
</script>
<style scoped>
.comments {
  width: auto;
  height: auto;
  padding: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.comments .comments-box {
  width: 100%;
  height: auto;
  
}
.comments .button {
  width: 100%;
  height: 70rpx;
  border-radius: 10rpx;
  background-color: #00bf6f;
  text-align: center;
  color: #fff;
  line-height: 70rpx;
  margin-top: 30rpx;
}
</style>
