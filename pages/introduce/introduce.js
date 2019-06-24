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
    title: '',
    description: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */

//操作School表；
  onLoad: function (options) {
    let tableID = 49633
    let recordID = '5c7a245df9344b30e584555e'

    let School = new wx.BaaS.TableObject(tableID)

    School.get(recordID).then(res => {
      // success
      console.log(res)
      //更新校园简介
      this.setData({
        schoolName: res.data.schoolName,
        englishName: res.data.englishName,
        imgUrls: res.data.image
      })
    }, err => {
      // err
    })

//处理内容库；
    let contentGroupID = 1535437225057217
    let richTextID = 1535437435235356

    let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)
    MyContentGroup.getContent(richTextID).then(res => {
      // success
      var content = res.data.content
      wxParse.wxParse("content", "html", content, this);
    }, err => {
      // err
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