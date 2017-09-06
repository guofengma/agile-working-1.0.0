App({
  getMeetingRooms: function (cb) {
    var that = this
    if (this.globalData.meetingRooms) {
      typeof cb == "function" && cb(this.globalData.meetingRooms)
    } else {
      wx.request({
        url: that.globalData.url + 'meetingRooms'+'/'+this.globalData.teamId,
        method: 'GET',
        header: {
          Authorization:that.globalData.token,
          Subject: that.globalData.openId
        },
        success: function (res) {
          that.globalData.meetingRooms = res.data.payload
          typeof cb == "function" && cb(that.globalData.meetingRooms)
        },
        fail: function () {
          console.log("========================查询会议室失败=================")
        }
      })
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  onLaunch: function (options) {
    //获取openId
    var that = this
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口
          url: that.globalData.url + 'wechat/openid/' + res.code,
          method: 'GET',
          success: function (res) {
            that.globalData.openId = res.data.payload
          }
        })
      }
    })
    //获取用户信息
    this.getUserInfo(function (userInfo) {
      console.log("=============userInfo=================" + userInfo.nickName)
    })
  },
  globalData: {
    meetingRooms: null,
    currentMeetingRoomIndex: 0,
    currentSelectedDate: "",
    activeIndex: 0,
    userInfo: null,
    url: 'https://catframework.cn/agileworking/',
    openId: '',
    teams: null,
    member:null,
    teamIndex:0,
  }
})
