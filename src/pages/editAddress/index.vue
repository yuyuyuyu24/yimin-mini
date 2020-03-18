<template>
  <div class="edit-address">
    <div class="edit-address-from">
      <div class="edit-address-from-name">
        <van-cell-group>
          <van-field
            :value="addressFrom.name"
            placeholder="请输入收货人"
            border="false"
            label="收货人"
          />
          <van-field
            :value="addressFrom.phone"
            placeholder="请输入联系电话"
            border="false"
            label="联系电话"
            type="number"
            maxlength="11"
          />
          <van-cell
            title="所在区域"
            is-link
            @click="openArea"
          />
          <van-field
            :value="addressFrom.address"
            type="textarea"
            placeholder="请输入详细地址"
            autosize
            border="false"
          />
        </van-cell-group>
        <van-popup
          :show="isArea"
          position="bottom"
          custom-style="height: 50%;"
        >
          <van-area
            @cancel="closeArea"
            :area-list="areaList"
            @confirm="finishArea"
          />
        </van-popup>
        <van-dialog id="van-dialog" />
        <div class="keep-address">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import Dialog from '../../../static/vant/dist/dialog/dialog'
export default {
  data () {
    return {
      addressFrom: {},
      isArea: false,
      areaList: {
        province_list: {
          150000: '内蒙古自治区'
        },
        city_list: {
          150400: '赤峰市'
        },
        county_list: {
          150426: '翁牛特旗'
        }
      }
    }
  },
  methods: {
    // 打开地址选择框
    openArea () {
      Dialog.alert({
        title: '提示',
        message: '目前仅支持乌丹镇本地配送，外地物流配送即将上线。感谢理解，敬请期待！'
      }).then(() => {
        this.isArea = true
      })
    },
    // 取消地址选择框
    closeArea () {
      this.isArea = false
    },
    // 完成地址选择
    finishArea (e) {
      console.log(e.mp.detail.values)
      this.isArea = false
    }
  }
}
</script>
<style scoped>
.edit-address {
  width: 100%;
  height: auto;
  border-top: 10rpx solid #f4f4f4;
}
.edit-address .edit-address-from {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.edit-address .edit-address-from .edit-address-from-name {
  width: 100%;
  height: 100rpx;
}
.keep-address {
  width: 90%;
  height: 80rpx;
  margin: 40rpx auto;
  text-align: center;
  line-height: 80rpx;
  color: #fff;
  background-color: #00bf6f;
}
</style>
