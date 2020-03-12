import querystring from 'querystring'

// 把数据库中的string格式的数据转成数组 商品搜索结果
export function changeQuerystring (data) {
  for (let i = 0; i < data.length; i++) {
    data[i].coverList = querystring.parse(data[i].coverList)
    data[i].swiperList = data[i].swiperList.substr(1).substring(0, data[i].swiperList.length - 1)
    data[i].swiperList = data[i].swiperList.split(',')
    let swiperList = []
    for (let j = 0; j < data[i].swiperList.length; j++) {
      swiperList.push(querystring.parse(data[i].swiperList[j]))
    }
    data[i].swiperList = swiperList
    let videoList = []
    if (data.videoList === '') {
      data.videoList = []
    } else {
      videoList.push(querystring.parse(data.videoList))
      data.videoList = videoList
    }
  }
  return data
}
// 把数据库中的string格式的数据转成数组 商品详情
export function changeQuerystringDetail (data) {
  let coverList = []
  coverList.push(querystring.parse(data.coverList))
  data.coverList = coverList

  data.swiperList = data.swiperList.substr(1).substring(0, data.swiperList.length - 1)
  data.swiperList = data.swiperList.split(',')
  let swiperList = []
  for (let j = 0; j < data.swiperList.length; j++) {
    swiperList.push(querystring.parse(data.swiperList[j]))
  }
  data.swiperList = swiperList

  let videoList = []
  if (data.videoList === '') {
    data.videoList = []
  } else {
    videoList.push(querystring.parse(data.videoList))
    data.videoList = videoList
  }
  return data
}

// 把数据库中的string格式的数据转成数组 图集

export function changeQuerystringAtlas (data) {
  for (let i = 0; i < data.length; i++) {
    data[i].atlasImgs = data[i].atlasImgs.substr(1).substring(0, data[i].atlasImgs.length - 1)
    data[i].atlasImgs = data[i].atlasImgs.split(',')
    let atlasImgs = []
    for (let j = 0; j < data[i].atlasImgs.length; j++) {
      atlasImgs.push(querystring.parse(data[i].atlasImgs[j]))
    }
    data[i].atlasImgs = atlasImgs
  }
  return data
}

export function ENCODE (id) {
  return id * 24
}

export function UNENCODE (id) {
  return id / 24
}
