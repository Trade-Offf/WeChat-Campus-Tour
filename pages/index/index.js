//index.js
//获取应用实例
Page({
  
  onTap1:function(){
    wx.navigateTo({
      url: '../introduce/introduce',
    })
  },

  onTap2: function () {
    wx.navigateTo({
      url: '../map/map',
    })
  }

})