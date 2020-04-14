import config from '../utils/parameter'

// 收藏
export async function toCollection (api, data) {
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
// 取消收藏
export async function cancelCollection (api, data) {
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

// 获取用户收藏的全部商品
export async function getCollectionShop (api, data) {
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

// 根据用户id和商品id查找该条商品有没有收藏过
export async function searchCollection (api, data) {
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
