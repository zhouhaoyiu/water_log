// pages/list/list.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        Arr: [] as any,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getTabBar().setData({
            selected: 0
        });
        // 建立websocket连接
        const socketTask = wx.connectSocket({
            url: "ws://localhost:7002",
            success: function (res) {
                console.log("连接成功");
            },
            fail: (res) => {
                console.log(res, 123);
            },
        });
        socketTask.onMessage((res) => {
            let addData = JSON.parse(res.data as string)
            addData.new = true
            console.log(addData);

            this.setData({
                Arr: [addData, ...this.data.Arr,],
            });
        });
        wx.request({
            url: "http://localhost:7001/get_water_logs",
            method: 'GET',
            success: _res => {
                console.log(_res);
                this.setData({
                    Arr: _res.data
                })

            }
        })
    },

    ackNew(item: any){
        if(this.data.Arr[item.currentTarget.dataset.index].new === false) return;
        // toast
        wx.showToast({
            title: '已确认',
            icon: 'success',
            duration: 1000
        })
        this.setData({
            [`Arr[${item.currentTarget.dataset.index}].new`]: false
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
