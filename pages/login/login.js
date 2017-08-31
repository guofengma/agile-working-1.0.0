let app = getApp();
import { queryTeam, queryTeamMember } from "../../service/service.js"
Page({
  data: {
    teamIndex: 0,
  },
  onLoad: function (options) {
    var that = this
    queryTeam(app.globalData.url, app, function (teams) {
      that.setData({
        teams: app.globalData.teams
      })
      app.globalData.teamId = that.data.teams[0].id


    })

  },
  bindSelectTeam: function (e) {
    console.log("选择的值：" + e.detail.value)
    this.setData({
      teamIndex: e.detail.value,

    })
    app.globalData.teamIndex = e.detail.value
    app.globalData.teamId = this.data.teams[e.detail.value].id
    console.log("选择的id" + app.globalData.teamId)
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  //设置参数值，要使用this.setData({}）方法
  loginBtnClick: function (e) {
    queryTeamMember(app.globalData.url, app, function (member) {
      console.log("回调函数")
      if (app.globalData.member != null) {
        wx.switchTab({
          url: '../schedule/list',
        })
      }
      else {
        wx.navigateTo({
          url: '../regist/regist',
        })
      }
    })
  }
  })