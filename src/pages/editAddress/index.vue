<template>
  <div class="edit-address">
    <div class="edit-address-from">
      <div class="edit-address-from-name">
        <van-cell-group>
          <van-field
            v-model="addressFrom.name"
            placeholder="请输入收货人"
            border="false"
            label="收货人"
            @change="changeAddressFromName"
          />
          <van-field
            v-model.number="addressFrom.phone"
            placeholder="请输入联系电话"
            border="false"
            label="联系电话"
            type="number"
            maxlength="11"
            @change="changeAddressFromPhone"
          />
          <van-cell
            title="所在区域"
            is-link
            @click="openArea"
          />
          <van-field
            v-model="addressFrom.address"
            type="textarea"
            :placeholder="bindplaceholder"
            autosize
            border="false"
            @change="changeAddressFromAddress"
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
        <div
          class="keep-address"
          @click="keepAddress"
        >保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import Dialog from '../../../static/vant/dist/dialog/dialog'
export default {
  data () {
    return {
      addressFrom: {
        name: '',
        phone: '',
        address: ''
      },
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
      },
      showAddr: '',
      bindplaceholder: '请输入尽可能详细的地址'
    }
  },
  onShow () {
    this.addressFrom.name = ''
    this.addressFrom.phone = ''
    this.addressFrom.address = ''
    this.bindplaceholder = '请输入尽可能详细的地址'
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
      let resAddr = e.mp.detail.values
      this.addressFrom.address = resAddr[0].name + resAddr[1].name + resAddr[2].name
      this.isArea = false
    },
    // 获取输入框内容
    changeAddressFromName (e) {
      this.addressFrom.name = e.mp.detail
    },
    changeAddressFromPhone (e) {
      this.addressFrom.phone = e.mp.detail
    },
    changeAddressFromAddress (e) {
      console.log(e)
      this.addressFrom.address = e.mp.detail
    },
    // 保存地址
    keepAddress () {
      let _this = this
      // 效验表单
      if (this.addressFrom.name === '') {
        _this.bindplaceholder = ''
        Dialog.alert({
          title: '提示',
          message: '收货人姓名不能为空'
        }).then(() => {
          _this.bindplaceholder = '请输入尽可能详细的地址'
        })
        return false
      }
      if (this.checkNumber(this.addressFrom.phone) === false || this.addressFrom.phone.length > 11) {
        _this.bindplaceholder = ''
        Dialog.alert({
          title: '提示',
          message: '联系电话格式不正确'
        }).then(() => {
          _this.bindplaceholder = '请输入尽可能详细的地址'
        })
        return false
      }
      if (this.addressFrom.address === '') {
        _this.bindplaceholder = ''
        Dialog.alert({
          title: '提示',
          message: '收货地址不能为空'
        }).then(() => {
          _this.bindplaceholder = '请输入尽可能详细的地址'
        })
        return false
      }
      let value = wx.getStorageSync('yiminAddress') || []
      if (value.length === 0) {
        let address = []
        _this.addressFrom.isDefault = true
        address.push(_this.addressFrom)
        wx.setStorage({
          key: 'yiminAddress',
          data: address,
          success (res) {
            _this.bindplaceholder = ''
            Dialog.alert({
              title: '提示',
              message: '创建收货地址成功！'
            }).then(() => {
              _this.addressFrom.name = ''
              _this.addressFrom.phone = ''
              _this.addressFrom.address = ''
              _this.bindplaceholder = '请输入尽可能详细的地址'
              wx.navigateBack({
                delta: 1
              })
            })
          },
          file () {
            wx.showToast({
              title: '创建收货地址失败！请检查空间内存或清理小程序缓存。',
              icon: 'none',
              duration: 4000
            })
          }
        })
      } else {
        let addressData = value
        for (let i = 0; i < value.length; i++) {
          value[i].isDefault = false
        }
        _this.addressFrom.isDefault = true
        addressData.push(_this.addressFrom)
        wx.setStorage({
          key: 'yiminAddress',
          data: addressData,
          success (res) {
            Dialog.alert({
              title: '提示',
              message: '创建收货地址成功！'
            }).then(() => {
              _this.addressFrom.name = ''
              _this.addressFrom.phone = ''
              _this.addressFrom.address = ''
              wx.navigateBack({
                delta: 1
              })
            })
          },
          file () {
            wx.showToast({
              title: '创建收货地址失败！请检查空间内存或清理小程序缓存。',
              icon: 'none',
              duration: 4000
            })
          }
        })
      }
    },
    // 数组类型效验
    checkNumber (theObj) {
      var reg = /^[0-9]+.?[0-9]*$/
      if (reg.test(theObj)) {
        return true
      }
      return false
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
