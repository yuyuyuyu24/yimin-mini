import config from '../utils/parameter'

// 获取全部用户
export async function miniGetGoods (api, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${config.api}/${api}`,
      data,
      method: 'GET',
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

// 创建用户
export async function newUser (api, data) {
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
// 查找该openid是否存在
export async function searchUser (api, data) {
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
// 根据openid查找表内已存在的用户
export async function searchOpenid (api, data) {
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
// 更改用户信息
export async function changeuserMsg (api, data) {
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
