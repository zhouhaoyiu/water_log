// pages/details/details.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        deviceid: "",
        deviceName: "",
        deviceVoltage: "",
        deviceLocation: "",

        infoArr: [] as any
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options: any) {
        console.log(options);
        this.setData({
            deviceid: options.deviceid,
        });
        wx.request({
            url:
                "http://localhost:7001/get_water_log_by_deviceid" +
                "?deviceid=" +
                this.data.deviceid,
            method: "GET",
            success: (_res) => {
                console.log(_res);
                this.setData({
                    infoArr: _res.data
                })
            },
        });
        wx.request({
            url:
                "http://localhost:7001/get_device_info_by_deviceid" +
                "?deviceid=" +
                this.data.deviceid,
            method: "GET",
            success: (_res: any) => {
                if (!_res.data[0]) return;
                this.setData({
                    deviceName: _res.data[0].deviceName,
                    deviceVoltage: _res.data[0].deviceVoltage || "无电压",
                    deviceLocation: _res.data[0].deviceLocation
                })
            },
        });
    },

    ackNew(e: any) {
        console.log(e.currentTarget.dataset);
        const logid = e.currentTarget.dataset.logid
        wx.request({
            url: "http://localhost:7001/ack_water_log" +
                "?logId=" +
                logid,
            success: _res => {
                console.log(_res);
                if (_res.data === "success") {
                    wx.showToast({
                        title: '已确认',
                        icon: 'success',
                        duration: 2000
                    })
                    this.setData({
                        [`infoArr[${e.currentTarget.dataset.index}].new`]: false,
                    });
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() { },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() { },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() { },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() { },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() { },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() { },
});
