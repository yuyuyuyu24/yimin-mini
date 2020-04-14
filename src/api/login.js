import config from '../utils/parameter'

// 登录
export async function miniLogin (api, data) {
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
