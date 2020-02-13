// 全部数据
let allData = [
  {
    id: 0,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GJ0PAfPCfmURxFaLj0PGvc*XOnZXWJWc1G2nJWOuYhdbAnXFMggBqhgzZzqRR.k.MIAYgsI8vqvsv1g9iOairFM!/b&bo=fwc4BH8HOAQRJxA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GJ0PAfPCfmURxFaLj0PGvc*XOnZXWJWc1G2nJWOuYhdb14SesEKB0mSvtrFunSJD.egXeNwA0C*kgUDbTYhOwHA!/b&bo=fwc4BH8HOAQRJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GAoVGcgUz6hlX60NK1lPiXWFmlmHUP0xu0CqKtylThMmky4dmKzyICgBwNv7vlAAfz8P6*hNCKSnuKmm9XuQzsk!/b&bo=oAU4BAAAAAARF7k!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GEdnfGExvBm.QLptLeUOVJiKYXDvtE2rfrPT0qBQyKdf7tRxYwjD1vCOJZVi3UkFoLfeye6u6aa9Z5Qds5KLJzU!/b&bo=oAU4BAAAAAARJ4k!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GFfxfdpIySXOFUYwtvWf5aw35w5R7Rm.tZGDNvBxlJwjpqjDIW2j17Ihb3RGuznUFCP9leNQq*4TdKGhJ5PsllY!/b&bo=oAU4BAAAAAARN5k!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHBTDiCmzJX5Z*myf7WyOK8kSRKWtJ3PvHxAeZ4imA6kLoP6W0CRK4kiAW3IFna*kttJh1dflCC.bv0xcYKSp0I!/b&bo=gAfAAwAAAAARJ1Q!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GLe9OzW15yAcXssNpMYTGsexPNHOoUsw*pEqzY5osfA6cDSK4d3HvmIx0Akd8B7TKyUSXYdYzJmrKTEWcsDAcIA!/b&bo=gAc4BAAAAAARF5s!&rf=viewer_4&t=5'
    ],
    title: '风干牛肉',
    videoUrl: 'http://photovideo.photo.qq.com/1075_0b534ck26oiehaah3bshkfpdpyaev7gqjxca.f20.mp4?dis_k=63939820c748c8027b22e8cdbf5168a0&dis_t=1581584003&vuin=965833517',
    isVideos: true,
    price: '140',
    content: '风干牛肉干,草原的特产,家乡的味道,采用优质后部位牛肉,多道手续用心制作完成。'
  },
  {
    id: 1,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GCkzxpyyZdslq.zpLLr7XSvJYnVtbIuNe6WsZLvYnhyEgzeWpO8tOXc0DFwrMFRnZbrU19Z31atE6o9VzuNhJdE!/b&bo=IAMgAyADIAMRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GCkzxpyyZdslq.zpLLr7XSvJYnVtbIuNe6WsZLvYnhyEgzeWpO8tOXc0DFwrMFRnZbrU19Z31atE6o9VzuNhJdE!/b&bo=IAMgAyADIAMRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GOKOLLarVbGr6o*stp5*8vWHlsn70sxec1OXSXgngnmOjlG.lYrK*GtWrUi.1ivXrit0iMwb7d.gB2JI6ZYsGvM!/b&bo=gAfAA4AHwAMRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GOoMKdO1LMaRhfIaOXoWm8*NVwnvVc.xG6hplkhqyrItFAS6kN7eaVQimjyDuqiQNrx9BLQEsWOgOWOYp5YV7Rc!/b&bo=gAfAA4AHwAMRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GA3QKCcgZjCzDqxbMLbW9Y1KXB0wPuo1QGk1Kolj4UEeSM35GKW47uCSlKHAME6yDN4nps.a5v6tXK3HIPJrc2k!/b&bo=owJ2AaMCdgERFyA!&rf=viewer_4&t=5'
    ],
    title: '牛肉筋',
    price: '30',
    content: '牛肉筋，肉中含筋，肥瘦均匀，炖食、煲汤最佳。含有特别丰富的胶原蛋白。'
  },
  {
    id: 2,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GLurgSRlReaZBx3L.Jg.mZy2IhNBiOG3NuFBIyfcK.OfZIlULgKjiRdWsWqtQzFucb27NVvyhwM0IbREiquTow0!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GLurgSRlReaZBx3L.Jg.mZy2IhNBiOG3NuFBIyfcK.OfZIlULgKjiRdWsWqtQzFucb27NVvyhwM0IbREiquTow0!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GD0Ejt1GF.JaNiYOpp.PYaBdiiDEJ9BbmOi8eTFLgB.vzY1W3qkuFrseuX2UpoLu6M7Oed2CoqF0ljZ.xKpRgPQ!/b&bo=oAU4BKAFOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GD3fn7*6M5rz30iDcMM.LJWAdHqHceHA30nK4q3fPTI2BGEn*GZdZ3dHtV.PeYU5L3RMpkPjemazXKHrQPoW0s8!/b&bo=OASgBTgEoAURJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GCGRxVwivYWaTn9er3fc64c575HG6y*WFYbYFcQeQ9qLfgO0FOYN*5NrrSZAxHuCzCDTYeTGdyADlyXE9*EVe5w!/b&bo=OASgBTgEoAURFyA!&rf=viewer_4&t=5'
    ],
    title: '牛腹肉',
    price: '43',
    content: '牛腹肉,肥瘦相间、肥而不腻、适合炖。'
  },
  {
    id: 3,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHIkx8s7j9X9r2A.UId4QUT3WFe3MMT.zqw*fyRzffuXeYAFE*uvGPiBFe93NrLvfDHIN7wwwfgcGHofqwhHw6E!/b&bo=gwc4BIMHOAQRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHIkx8s7j9X9r2A.UId4QUT3WFe3MMT.zqw*fyRzffuXeYAFE*uvGPiBFe93NrLvfDHIN7wwwfgcGHofqwhHw6E!/b&bo=gwc4BIMHOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GIqht.Bxf4C1*g8RNLWRCFdiy1MqtW7N6Zk2pN7dlqyi7.AGiFI9eEhdO6.wrnQm4pUkAMk1hGYNgBC8bCI.Wvo!/b&bo=oAU4BKAFOAQRJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GGp6qnV19.bwckEeB6NyGrRV.VNQrTfpQfjsQGVD5MAiHPIG0KglzlbmvDB3zWaTKI972O4lpbesypfYHWS4FOE!/b&bo=OASjBTgEowURFyA!&rf=viewer_4&t=5'

    ],
    title: '牛腩',
    price: '43',
    content: '牛腩,是指带有筋、肉、油花的肉。比较松软,偏瘦,适合炖。'
  },
  {
    id: 4,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GDdp.wzqsppSnrVHnwI65.0opOxCMSXx7vPufsiO.4aSUJv3gV6m9EyzeCBxe9Sa4aj6CpUmx.poHbxRaqefwIk!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GDdp.wzqsppSnrVHnwI65.0opOxCMSXx7vPufsiO.4aSUJv3gV6m9EyzeCBxe9Sa4aj6CpUmx.poHbxRaqefwIk!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHo3JNaTC9t5XsQP8E4BfExy40kJiJTwV5cv*zOIfjTCSQnXwKnsJ.IPJFqwet1wtPgqs*cxy6GegheKAOuXL6s!/b&bo=OASgBTgEoAURFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GMbe.MK5gX4FKRc*zUoekcoO4x35.1phbbGXVohoWOmyndKSXbP.wzn.*AZX4fLYIwCsgXVPJOWpnBrcNcBiD4Q!/b&bo=QAZVCEAGVQgRNwA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GMk04HOOSI80iL8uwCYR7Werk9VspsjsqIKsbNuLjKfBrII5SKgl.TvQjoDSVuNJH.g7Onhpg0NYhTm*rJ3EoY8!/b&bo=OASgBTgEoAURFyA!&rf=viewer_4&t=5'
    ],
    title: '牛腱子',
    price: '46',
    content: '牛腱子,内膜包裹,内藏筋,硬度适中,纹理清晰,适合卤、酱。'
  },
  {
    id: 5,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GM.Y3AMhY6HexzU1AXewG.yMVlFQqzmHzEWziPwc5fYvU.WkwPyfLnvk3fAfCZpLwUYc.6N*pQFFKHPtFUdCKAc!/b&bo=gAc4BIAHOAQRJxA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GM.Y3AMhY6HexzU1AXewG.yMVlFQqzmHzEWziPwc5fYvU.WkwPyfLnvk3fAfCZpLwUYc.6N*pQFFKHPtFUdCKAc!/b&bo=gAc4BIAHOAQRJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GL82TiiuztgfuoDXuZtasfOXKHyv7DFoNdTLIzjWnSJLKMk1AOmxZ2OKSj8pGXXfFgaGbtqXXANR7keZO0LAKeo!/b&bo=OASgBTgEoAURJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GM2uwqPBFNxa1thetZ5zfIEmvRS64TOy1.SzTxu.jvFL5ou0y3riTOeKhKbswx7fvt0RxNQW8*hqb6j4nfT5c*c!/b&bo=OASjBTgEowURFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GBAH82NhsBhWsTVBfpl066urOKP*lUTmIix8lTNaz9TyX*2jrmakIiPqQL*A4CcsBL1X3Bfhpzk4yw2FjRUTNUQ!/b&bo=QAZVCEAGVQgRNwA!&rf=viewer_4&t=5'
    ],
    title: '米龙',
    price: '40',
    content: '米龙,牛后部位肉。深红色,偏瘦肉多汁,适合煸炒。'
  }
]

// 牛肉数据
let cattleData = [
  {
    id: 0,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GJ0PAfPCfmURxFaLj0PGvc*XOnZXWJWc1G2nJWOuYhdbAnXFMggBqhgzZzqRR.k.MIAYgsI8vqvsv1g9iOairFM!/b&bo=fwc4BH8HOAQRJxA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GJ0PAfPCfmURxFaLj0PGvc*XOnZXWJWc1G2nJWOuYhdb14SesEKB0mSvtrFunSJD.egXeNwA0C*kgUDbTYhOwHA!/b&bo=fwc4BH8HOAQRJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GAoVGcgUz6hlX60NK1lPiXWFmlmHUP0xu0CqKtylThMmky4dmKzyICgBwNv7vlAAfz8P6*hNCKSnuKmm9XuQzsk!/b&bo=oAU4BAAAAAARF7k!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GEdnfGExvBm.QLptLeUOVJiKYXDvtE2rfrPT0qBQyKdf7tRxYwjD1vCOJZVi3UkFoLfeye6u6aa9Z5Qds5KLJzU!/b&bo=oAU4BAAAAAARJ4k!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GFfxfdpIySXOFUYwtvWf5aw35w5R7Rm.tZGDNvBxlJwjpqjDIW2j17Ihb3RGuznUFCP9leNQq*4TdKGhJ5PsllY!/b&bo=oAU4BAAAAAARN5k!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHBTDiCmzJX5Z*myf7WyOK8kSRKWtJ3PvHxAeZ4imA6kLoP6W0CRK4kiAW3IFna*kttJh1dflCC.bv0xcYKSp0I!/b&bo=gAfAAwAAAAARJ1Q!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GLe9OzW15yAcXssNpMYTGsexPNHOoUsw*pEqzY5osfA6cDSK4d3HvmIx0Akd8B7TKyUSXYdYzJmrKTEWcsDAcIA!/b&bo=gAc4BAAAAAARF5s!&rf=viewer_4&t=5'
    ],
    title: '风干牛肉',
    videoUrl: 'http://photovideo.photo.qq.com/1075_0b534ck26oiehaah3bshkfpdpyaev7gqjxca.f20.mp4?dis_k=63939820c748c8027b22e8cdbf5168a0&dis_t=1581584003&vuin=965833517',
    isVideos: true,
    price: '140',
    content: '风干牛肉干,草原的特产,家乡的味道,采用优质后部位牛肉,多道手续用心制作完成。'
  },
  {
    id: 1,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GCkzxpyyZdslq.zpLLr7XSvJYnVtbIuNe6WsZLvYnhyEgzeWpO8tOXc0DFwrMFRnZbrU19Z31atE6o9VzuNhJdE!/b&bo=IAMgAyADIAMRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GCkzxpyyZdslq.zpLLr7XSvJYnVtbIuNe6WsZLvYnhyEgzeWpO8tOXc0DFwrMFRnZbrU19Z31atE6o9VzuNhJdE!/b&bo=IAMgAyADIAMRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GOKOLLarVbGr6o*stp5*8vWHlsn70sxec1OXSXgngnmOjlG.lYrK*GtWrUi.1ivXrit0iMwb7d.gB2JI6ZYsGvM!/b&bo=gAfAA4AHwAMRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GOoMKdO1LMaRhfIaOXoWm8*NVwnvVc.xG6hplkhqyrItFAS6kN7eaVQimjyDuqiQNrx9BLQEsWOgOWOYp5YV7Rc!/b&bo=gAfAA4AHwAMRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GA3QKCcgZjCzDqxbMLbW9Y1KXB0wPuo1QGk1Kolj4UEeSM35GKW47uCSlKHAME6yDN4nps.a5v6tXK3HIPJrc2k!/b&bo=owJ2AaMCdgERFyA!&rf=viewer_4&t=5'
    ],
    title: '牛肉筋',
    price: '30',
    content: '牛肉筋，肉中含筋，肥瘦均匀，炖食、煲汤最佳。含有特别丰富的胶原蛋白。'
  },
  {
    id: 2,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GLurgSRlReaZBx3L.Jg.mZy2IhNBiOG3NuFBIyfcK.OfZIlULgKjiRdWsWqtQzFucb27NVvyhwM0IbREiquTow0!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GLurgSRlReaZBx3L.Jg.mZy2IhNBiOG3NuFBIyfcK.OfZIlULgKjiRdWsWqtQzFucb27NVvyhwM0IbREiquTow0!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GD0Ejt1GF.JaNiYOpp.PYaBdiiDEJ9BbmOi8eTFLgB.vzY1W3qkuFrseuX2UpoLu6M7Oed2CoqF0ljZ.xKpRgPQ!/b&bo=oAU4BKAFOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GD3fn7*6M5rz30iDcMM.LJWAdHqHceHA30nK4q3fPTI2BGEn*GZdZ3dHtV.PeYU5L3RMpkPjemazXKHrQPoW0s8!/b&bo=OASgBTgEoAURJxA!&rf=viewer_4&t=5',
      ''
    ],
    title: '牛腹肉',
    price: '43',
    content: '牛腹肉,肥瘦相间、肥而不腻、适合炖。'
  },
  {
    id: 3,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHIkx8s7j9X9r2A.UId4QUT3WFe3MMT.zqw*fyRzffuXeYAFE*uvGPiBFe93NrLvfDHIN7wwwfgcGHofqwhHw6E!/b&bo=gwc4BIMHOAQRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHIkx8s7j9X9r2A.UId4QUT3WFe3MMT.zqw*fyRzffuXeYAFE*uvGPiBFe93NrLvfDHIN7wwwfgcGHofqwhHw6E!/b&bo=gwc4BIMHOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GIqht.Bxf4C1*g8RNLWRCFdiy1MqtW7N6Zk2pN7dlqyi7.AGiFI9eEhdO6.wrnQm4pUkAMk1hGYNgBC8bCI.Wvo!/b&bo=oAU4BKAFOAQRJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GGp6qnV19.bwckEeB6NyGrRV.VNQrTfpQfjsQGVD5MAiHPIG0KglzlbmvDB3zWaTKI972O4lpbesypfYHWS4FOE!/b&bo=OASjBTgEowURFyA!&rf=viewer_4&t=5'
    ],
    title: '牛腩',
    price: '43',
    content: '牛腩,是指带有筋、肉、油花的肉。比较松软,偏瘦,适合炖。'
  },
  {
    id: 4,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GDdp.wzqsppSnrVHnwI65.0opOxCMSXx7vPufsiO.4aSUJv3gV6m9EyzeCBxe9Sa4aj6CpUmx.poHbxRaqefwIk!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GDdp.wzqsppSnrVHnwI65.0opOxCMSXx7vPufsiO.4aSUJv3gV6m9EyzeCBxe9Sa4aj6CpUmx.poHbxRaqefwIk!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHo3JNaTC9t5XsQP8E4BfExy40kJiJTwV5cv*zOIfjTCSQnXwKnsJ.IPJFqwet1wtPgqs*cxy6GegheKAOuXL6s!/b&bo=OASgBTgEoAURFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GMbe.MK5gX4FKRc*zUoekcoO4x35.1phbbGXVohoWOmyndKSXbP.wzn.*AZX4fLYIwCsgXVPJOWpnBrcNcBiD4Q!/b&bo=QAZVCEAGVQgRNwA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GMk04HOOSI80iL8uwCYR7Werk9VspsjsqIKsbNuLjKfBrII5SKgl.TvQjoDSVuNJH.g7Onhpg0NYhTm*rJ3EoY8!/b&bo=OASgBTgEoAURFyA!&rf=viewer_4&t=5'
    ],
    title: '牛腱子',
    price: '46',
    content: '牛腱子,内膜包裹,内藏筋,硬度适中,纹理清晰,适合卤、酱。'
  },
  {
    id: 5,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GM.Y3AMhY6HexzU1AXewG.yMVlFQqzmHzEWziPwc5fYvU.WkwPyfLnvk3fAfCZpLwUYc.6N*pQFFKHPtFUdCKAc!/b&bo=gAc4BIAHOAQRJxA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GM.Y3AMhY6HexzU1AXewG.yMVlFQqzmHzEWziPwc5fYvU.WkwPyfLnvk3fAfCZpLwUYc.6N*pQFFKHPtFUdCKAc!/b&bo=gAc4BIAHOAQRJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GL82TiiuztgfuoDXuZtasfOXKHyv7DFoNdTLIzjWnSJLKMk1AOmxZ2OKSj8pGXXfFgaGbtqXXANR7keZO0LAKeo!/b&bo=OASgBTgEoAURJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GM2uwqPBFNxa1thetZ5zfIEmvRS64TOy1.SzTxu.jvFL5ou0y3riTOeKhKbswx7fvt0RxNQW8*hqb6j4nfT5c*c!/b&bo=OASjBTgEowURFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GBAH82NhsBhWsTVBfpl066urOKP*lUTmIix8lTNaz9TyX*2jrmakIiPqQL*A4CcsBL1X3Bfhpzk4yw2FjRUTNUQ!/b&bo=QAZVCEAGVQgRNwA!&rf=viewer_4&t=5'
    ],
    title: '米龙',
    price: '40',
    content: '米龙,牛后部位肉。深红色,偏瘦肉多汁,适合煸炒。'
  }
]

// 羊肉数据
let sheepData = [{
  id: 1,
  imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581433571198&di=4683f0777939221525acdc87c4f58cea&imgtype=0&src=http%3A%2F%2Ffile.youboy.com%2Fa%2F90%2F96%2F10%2F4%2F11879894.jpg',
  title: '羊肉块',
  price: '999'
}]

// 鸡肉数据
let chickenData = [{
  id: 2,
  imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581433571198&di=4683f0777939221525acdc87c4f58cea&imgtype=0&src=http%3A%2F%2Ffile.youboy.com%2Fa%2F90%2F96%2F10%2F4%2F11879894.jpg',
  title: '鸡肉块',
  price: '999'
}]

// 其他数据
let otherData = [{
  id: 0,
  imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581433571198&di=4683f0777939221525acdc87c4f58cea&imgtype=0&src=http%3A%2F%2Ffile.youboy.com%2Fa%2F90%2F96%2F10%2F4%2F11879894.jpg',
  title: '肉干',
  videoUrl: 'http://photovideo.photo.qq.com/1075_0b534ck26oiehaah3bshkfpdpyaev7gqjxca.f20.mp4?dis_k=63939820c748c8027b22e8cdbf5168a0&dis_t=1581584003&vuin=965833517',
  isVideos: true,
  price: '999'
}]

// 精选商品数据
let hotGoodsData = [
  {
    id: 0,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GJ0PAfPCfmURxFaLj0PGvc*XOnZXWJWc1G2nJWOuYhdbAnXFMggBqhgzZzqRR.k.MIAYgsI8vqvsv1g9iOairFM!/b&bo=fwc4BH8HOAQRJxA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GJ0PAfPCfmURxFaLj0PGvc*XOnZXWJWc1G2nJWOuYhdb14SesEKB0mSvtrFunSJD.egXeNwA0C*kgUDbTYhOwHA!/b&bo=fwc4BH8HOAQRJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GAoVGcgUz6hlX60NK1lPiXWFmlmHUP0xu0CqKtylThMmky4dmKzyICgBwNv7vlAAfz8P6*hNCKSnuKmm9XuQzsk!/b&bo=oAU4BAAAAAARF7k!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GEdnfGExvBm.QLptLeUOVJiKYXDvtE2rfrPT0qBQyKdf7tRxYwjD1vCOJZVi3UkFoLfeye6u6aa9Z5Qds5KLJzU!/b&bo=oAU4BAAAAAARJ4k!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GFfxfdpIySXOFUYwtvWf5aw35w5R7Rm.tZGDNvBxlJwjpqjDIW2j17Ihb3RGuznUFCP9leNQq*4TdKGhJ5PsllY!/b&bo=oAU4BAAAAAARN5k!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHBTDiCmzJX5Z*myf7WyOK8kSRKWtJ3PvHxAeZ4imA6kLoP6W0CRK4kiAW3IFna*kttJh1dflCC.bv0xcYKSp0I!/b&bo=gAfAAwAAAAARJ1Q!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GLe9OzW15yAcXssNpMYTGsexPNHOoUsw*pEqzY5osfA6cDSK4d3HvmIx0Akd8B7TKyUSXYdYzJmrKTEWcsDAcIA!/b&bo=gAc4BAAAAAARF5s!&rf=viewer_4&t=5'
    ],
    title: '风干牛肉',
    videoUrl: 'http://photovideo.photo.qq.com/1075_0b534ck26oiehaah3bshkfpdpyaev7gqjxca.f20.mp4?dis_k=63939820c748c8027b22e8cdbf5168a0&dis_t=1581584003&vuin=965833517',
    isVideos: true,
    price: '140',
    content: '风干牛肉干,草原的特产,家乡的味道,采用优质后部位牛肉,多道手续用心制作完成。'
  },
  {
    id: 1,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GCkzxpyyZdslq.zpLLr7XSvJYnVtbIuNe6WsZLvYnhyEgzeWpO8tOXc0DFwrMFRnZbrU19Z31atE6o9VzuNhJdE!/b&bo=IAMgAyADIAMRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GCkzxpyyZdslq.zpLLr7XSvJYnVtbIuNe6WsZLvYnhyEgzeWpO8tOXc0DFwrMFRnZbrU19Z31atE6o9VzuNhJdE!/b&bo=IAMgAyADIAMRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GOKOLLarVbGr6o*stp5*8vWHlsn70sxec1OXSXgngnmOjlG.lYrK*GtWrUi.1ivXrit0iMwb7d.gB2JI6ZYsGvM!/b&bo=gAfAA4AHwAMRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GOoMKdO1LMaRhfIaOXoWm8*NVwnvVc.xG6hplkhqyrItFAS6kN7eaVQimjyDuqiQNrx9BLQEsWOgOWOYp5YV7Rc!/b&bo=gAfAA4AHwAMRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GA3QKCcgZjCzDqxbMLbW9Y1KXB0wPuo1QGk1Kolj4UEeSM35GKW47uCSlKHAME6yDN4nps.a5v6tXK3HIPJrc2k!/b&bo=owJ2AaMCdgERFyA!&rf=viewer_4&t=5'
    ],
    title: '牛肉筋',
    price: '30',
    content: '牛肉筋，肉中含筋，肥瘦均匀，炖食、煲汤最佳。含有特别丰富的胶原蛋白。'
  },
  {
    id: 2,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GLurgSRlReaZBx3L.Jg.mZy2IhNBiOG3NuFBIyfcK.OfZIlULgKjiRdWsWqtQzFucb27NVvyhwM0IbREiquTow0!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GLurgSRlReaZBx3L.Jg.mZy2IhNBiOG3NuFBIyfcK.OfZIlULgKjiRdWsWqtQzFucb27NVvyhwM0IbREiquTow0!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GD0Ejt1GF.JaNiYOpp.PYaBdiiDEJ9BbmOi8eTFLgB.vzY1W3qkuFrseuX2UpoLu6M7Oed2CoqF0ljZ.xKpRgPQ!/b&bo=oAU4BKAFOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GD3fn7*6M5rz30iDcMM.LJWAdHqHceHA30nK4q3fPTI2BGEn*GZdZ3dHtV.PeYU5L3RMpkPjemazXKHrQPoW0s8!/b&bo=OASgBTgEoAURJxA!&rf=viewer_4&t=5',
      ''
    ],
    title: '牛腹肉',
    price: '43',
    content: '牛腹肉,肥瘦相间、肥而不腻、适合炖。'
  },
  {
    id: 3,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHIkx8s7j9X9r2A.UId4QUT3WFe3MMT.zqw*fyRzffuXeYAFE*uvGPiBFe93NrLvfDHIN7wwwfgcGHofqwhHw6E!/b&bo=gwc4BIMHOAQRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHIkx8s7j9X9r2A.UId4QUT3WFe3MMT.zqw*fyRzffuXeYAFE*uvGPiBFe93NrLvfDHIN7wwwfgcGHofqwhHw6E!/b&bo=gwc4BIMHOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GIqht.Bxf4C1*g8RNLWRCFdiy1MqtW7N6Zk2pN7dlqyi7.AGiFI9eEhdO6.wrnQm4pUkAMk1hGYNgBC8bCI.Wvo!/b&bo=oAU4BKAFOAQRJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GGp6qnV19.bwckEeB6NyGrRV.VNQrTfpQfjsQGVD5MAiHPIG0KglzlbmvDB3zWaTKI972O4lpbesypfYHWS4FOE!/b&bo=OASjBTgEowURFyA!&rf=viewer_4&t=5'
    ],
    title: '牛腩',
    price: '43',
    content: '牛腩,是指带有筋、肉、油花的肉。比较松软,偏瘦,适合炖。'
  },
  {
    id: 4,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GDdp.wzqsppSnrVHnwI65.0opOxCMSXx7vPufsiO.4aSUJv3gV6m9EyzeCBxe9Sa4aj6CpUmx.poHbxRaqefwIk!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GDdp.wzqsppSnrVHnwI65.0opOxCMSXx7vPufsiO.4aSUJv3gV6m9EyzeCBxe9Sa4aj6CpUmx.poHbxRaqefwIk!/b&bo=gAc4BIAHOAQRFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHo3JNaTC9t5XsQP8E4BfExy40kJiJTwV5cv*zOIfjTCSQnXwKnsJ.IPJFqwet1wtPgqs*cxy6GegheKAOuXL6s!/b&bo=OASgBTgEoAURFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GMbe.MK5gX4FKRc*zUoekcoO4x35.1phbbGXVohoWOmyndKSXbP.wzn.*AZX4fLYIwCsgXVPJOWpnBrcNcBiD4Q!/b&bo=QAZVCEAGVQgRNwA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GMk04HOOSI80iL8uwCYR7Werk9VspsjsqIKsbNuLjKfBrII5SKgl.TvQjoDSVuNJH.g7Onhpg0NYhTm*rJ3EoY8!/b&bo=OASgBTgEoAURFyA!&rf=viewer_4&t=5'
    ],
    title: '牛腱子',
    price: '46',
    content: '牛腱子,内膜包裹,内藏筋,硬度适中,纹理清晰,适合卤、酱。'
  },
  {
    id: 5,
    imgUrl: 'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GM.Y3AMhY6HexzU1AXewG.yMVlFQqzmHzEWziPwc5fYvU.WkwPyfLnvk3fAfCZpLwUYc.6N*pQFFKHPtFUdCKAc!/b&bo=gAc4BIAHOAQRJxA!&rf=viewer_4&t=5',
    imgUrlList: [
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GM.Y3AMhY6HexzU1AXewG.yMVlFQqzmHzEWziPwc5fYvU.WkwPyfLnvk3fAfCZpLwUYc.6N*pQFFKHPtFUdCKAc!/b&bo=gAc4BIAHOAQRJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GL82TiiuztgfuoDXuZtasfOXKHyv7DFoNdTLIzjWnSJLKMk1AOmxZ2OKSj8pGXXfFgaGbtqXXANR7keZO0LAKeo!/b&bo=OASgBTgEoAURJxA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GM2uwqPBFNxa1thetZ5zfIEmvRS64TOy1.SzTxu.jvFL5ou0y3riTOeKhKbswx7fvt0RxNQW8*hqb6j4nfT5c*c!/b&bo=OASjBTgEowURFyA!&rf=viewer_4&t=5',
      'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GBAH82NhsBhWsTVBfpl066urOKP*lUTmIix8lTNaz9TyX*2jrmakIiPqQL*A4CcsBL1X3Bfhpzk4yw2FjRUTNUQ!/b&bo=QAZVCEAGVQgRNwA!&rf=viewer_4&t=5'
    ],
    title: '米龙',
    price: '40',
    content: '米龙，牛后部位肉。深红色，偏瘦肉多汁，适合煸炒。'
  }
]

// 首页轮播图数据
let swiperData = [
  'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GKbSETwDktDJ.WQBaufSMvIimr9x0S*43a0Z6cWadVoQCGtmVN2pK.tH3BTaf.PmAbtZ1YOJOBgt2Yy2W9.Etkc!/b&bo=jQYhBI0GIQQRJxA!&rf=viewer_4&t=5',
  'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GExurU3CuWTPSn.clu9*OO7uH9BwAScq.gdAfMWH.c7GZI4oICBIU09SZEX90AVwz6Pk6hLAoP0FRtU5*NaTxlU!/b&bo=NQlWBTUJVgURJxA!&rf=viewer_4&t=5',
  'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GJ0PAfPCfmURxFaLj0PGvc*XOnZXWJWc1G2nJWOuYhdbVo2eEpCROa9Rzd8l3L2M5x2DF61tqDGF1AmWFPWDNo4!/b&bo=fwc4BH8HOAQRJxA!&rf=viewer_4&t=5',
  'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GFbt0wsbjNOK9SCWxC1e9ynQoqMznNHGvca2N25ZEvg2m*ne.CPF*bkV*gMlemyqFgAiRBhTh01AiFNQve3XqPs!/b&bo=OARfAjgEXwIRFyA!&rf=viewer_4&t=5',
  'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GJ1zgObxeBfLRBRPWKskKGf8JkFhCPtR3NBgtBhIM7RZmx7Kf4TaPAO5U9BZxU6HTGvq**U5frirEIeA8ykjrLE!/b&bo=XwIvAV8CLwERFyA!&rf=viewer_4&t=5',
  'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GM*KEulFlZ*ZrSttM3.r5DbpDyNYRtjMIzZ*3tdOI8vOYkyhuTvZGnR0NOq3aLN2s.xXlXAVRBIYYyq2oYQ4wOc!/b&bo=mgXBA5oFwQMRJxA!&rf=viewer_4&t=5',
  'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GNI6Jp0wYG8Dn1PheMpJxRGKY*eyF9aKTv5*BWa7mkzR12u2SWdyHF*TmbqGyE*SzhXfJHZTPrcOQwYpJBStGfA!/b&bo=KQk4BAAAAAARJww!&rf=viewer_4&t=5'
]

// 图集-店内实拍
let realShootingData = [
  'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GIGP1a3293EJGtsS6FqigUzj*2dY0LbLMzVTV7iocZkLQzDO0cntIiRbFs*bUSYUChHzp3927whvNQI4c0PaKRo!/b&bo=NgR.AgAAAAARF24!&rf=viewer_4&t=5',
  'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GKbSETwDktDJ.WQBaufSMvIimr9x0S*43a0Z6cWadVoQCGtmVN2pK.tH3BTaf.PmAbtZ1YOJOBgt2Yy2W9.Etkc!/b&bo=jQYhBI0GIQQRJxA!&rf=viewer_4&t=5',
  'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GExurU3CuWTPSn.clu9*OO7uH9BwAScq.gdAfMWH.c7GZI4oICBIU09SZEX90AVwz6Pk6hLAoP0FRtU5*NaTxlU!/b&bo=NQlWBTUJVgURJxA!&rf=viewer_4&t=5'
]
export default { allData, cattleData, sheepData, chickenData, otherData, hotGoodsData, swiperData, realShootingData }
