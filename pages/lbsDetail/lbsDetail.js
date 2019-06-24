// pages/lbsDetail/lbsDetail.js
var wxParse = require("../../utils/wxParse-master/wxParse/wxParse.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    title:'',
    description:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let id = options.id;//接收标记点的id
      console.log(id);
      //通过标记点id来查询map表获取标记点信息
      let tableID = 49923
      // 通过 tableID 实例化一个 TableObject 对象，操作该对象即相当于操作对应的数据表
      let Map = new wx.BaaS.TableObject(tableID)
      // 指定 recordID 执行获取相应数据项操作
      Map.get(id).then(res => {
        // success
        console.log(res)
        wxParse.wxParse("content", "html", res.data.description, this);
        this.setData({
          title:res.data.title,
          description: res.data.description,
          imgUrls:res.data.images,
          latitude: res.data.latitude,
          longitude: res.data.longitude
        })

      }, err => {
        // err
      })
      
  },
  

  //查看位置功能
  openLocation:function(){
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name:this.data.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})