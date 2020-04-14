const SEARCH_HISTORY_NUM = 10 // 历史搜索缓存条数上限
const SCROLL_TOP = 230 // 页面距离顶部像素出现返回顶部按钮
const WE_CHAT_ONE = '13604764886' // 微信1
const WE_CHAT_TWO = '15924536788' // 微信2
const ADDRESS_ONE = '内蒙古自治区赤峰市翁牛特旗乌丹镇新华街体育场对面。' // 店铺1
const ADDRESS_TWO = '内蒙古自治区赤峰市翁牛特旗乌丹镇全宁路农业银行对面(清真伊民肉食)。' // 店铺1
const ADDRESS_ONE_JING = 119.0131330500
const ADDRESS_ONE_WEI = 42.9345936300
const ADDRESS_TWO_JING = 119.0158313500
const ADDRESS_TWO_WEI = 42.9365337600
const api = 'https://api.ymry.xyz:3000/api'
// const api = 'https://localhost:3000/api'
const deliveryMoney = 5

export default {
  api,
  SEARCH_HISTORY_NUM,
  SCROLL_TOP,
  WE_CHAT_ONE,
  WE_CHAT_TWO,
  ADDRESS_ONE,
  ADDRESS_TWO,
  ADDRESS_ONE_JING,
  ADDRESS_ONE_WEI,
  ADDRESS_TWO_JING,
  ADDRESS_TWO_WEI,
  deliveryMoney,
  //  订单状态
  ORDER_STATUS: {
    ORDER_STATUS_DZF: '1',
    ORDER_STATUS_YZFDFH: '2',
    ORDER_STATUS_YWC: '3',
    ORDER_STATUS_YGB: '4',
    ORDER_STATUS_FUN: function (val) {
      const arr = {}
      arr[this.ORDER_STATUS_DZF] = '待支付'
      arr[this.ORDER_STATUS_YZFDFH] = '已支付待发货'
      arr[this.ORDER_STATUS_YWC] = '已完成'
      arr[this.ORDER_STATUS_YGB] = '已关闭'
      if (val && arr[val]) {
        return arr[val]
      } else {
        return arr
      }
    }
  }
}
