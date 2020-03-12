import config from '../utils/parameter'

// 获取全部商品
export async function getAdminDetail (api, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${config.api}/${api}`,
      data,
      method: 'POST',
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}
