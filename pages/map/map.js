// pages/map/map.js
//使用require将公共的配置参数代码导入，并用变量config来保存
var config = require('../../config/config')
const app = getApp();//获取APP应用实例
Page({

//页面的初始数据
  data: {
    activeCategory: '',//当前激活的分类
    categoryData: ['出入口', '食堂', '宿舍区', '实验室', '教学区', '快递点', '生活区', '运动场'],
    coreLongitude: '120.025140',//中心经度
    coreLatitude: '30.219861',//中心纬度
    scale: 17,//缩放级别
    markers: [],//标记点
    isSpread: true, //底部可滚动视图区域是否显示，true表示展开，false表示收缩
    scrollLeft: 0,//横向滚动条位置，默认为0
    merchantsData: []//某一分类下的所有标记点数据
  },

  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    var that = this
    this.setData({
      activeCategory: config.CATEGORY
    })

    let categoryID = this.data.categoryData.indexOf(config.CATEGORY);
    //console.log(categoryID);

    app.golbalData.categoryID = categoryID;

    this.getCategory(config.CATEGORY, function (res) {
      // console.log(res);
      let merchantsData = res.data.objects
      that.setData({
        merchantsData: merchantsData
      })

      // console.log(merchantsData);

      that.setMarkers(merchantsData);

    });

  },

  //获取某一分类下所有标记点数据
  getCategory(name, cb) {
    //1.通过 tableID 实例化一个 TableObject 对象，操作该对象即相当于操作对应的数据表
    let tableID = 49923
    let Map = new wx.BaaS.TableObject(tableID);
    // 2.示例化一个 Query 对象，在该对象上添加查询条件

    let query = new wx.BaaS.Query()

    query.in('category', [name])

    Map.setQuery(query).find().then(res => cb(res), err => {
      // err
      //console.log(res.date.object)
    })
  },

  //  在地图上显示获取的标记点位置
  setMarkers(merchants) {
    let markers = [];
    let categoryID = app.golbalData.categoryID;
    merchants.forEach((item) => {
      let marker = {
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        iconPath: '../../images/second/' + categoryID + '.png',
        width: 32,
        height: 40
      }
      markers.push(marker)
    })

    this.setData({
      markers
    })
  },

  categoryChange: function (e) {
    var that = this
    // console.log(e);
    var category = e.currentTarget.dataset.category;
    this.setData({
      activeCategory: category
    })

    let categoryID = this.data.categoryData.indexOf(category);
    //console.log(categoryID);

    app.golbalData.categoryID = categoryID;

    this.getCategory(category, function (res) {
      // console.log(res);
      let merchantsData = res.data.objects;
      that.setData({
        merchantsData
      })

      that.setMarkers(merchantsData)
    });

  },

  switchMerchantsItems(e) {
    this.setData({
      isSpread: !this.data.isSpread
    })
  },

  //给标记点绑定触发事件
  markerTap: function (e) {
    console.log(e);
    let markerId = e.markerId;
    let markers = this.data.markers;
    let categoryID = app.golbalData.categoryID;
    let merchantsData = this.data.merchantsData;

    //更新选中标记点的图标
    markers.forEach(item => {
      if (item.id == markerId) {
        item.iconPath = '../../images/second/' + categoryID + "choosed.png";
      } else {
        item.iconPath = '../../images/second/' + categoryID + ".png";
      }
    })
    //更新地图上的标记点数据
    this.setData({
      markers
    })

    //更新底部可滚动视图区域的横向滚动条位置
    let scrollLeft;
    // let activeMerchantIndex;
    merchantsData.forEach((item, index) => {
      if (item.id == markerId) {
        scrollLeft = index * 140;
        this.setData({
          scrollLeft,
          activeMerchantIndex: index
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})