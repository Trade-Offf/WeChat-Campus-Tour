App({
    onLaunch: function () {
      //引入 SDK
      require('./utils/sdk-v1.7.0')

      //初始化 SDK
      let clientID = '4c35ccca4b32b383f3de'
      wx.BaaS.init(clientID)
    },

    //设置全局数据
    golbalData:{
      categoryID:0
    }
    
})