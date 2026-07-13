import Toast from "tdesign-miniprogram/toast";

// pages/input/input.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        deviceId: "",
        deviceName: "",
        deviceLocation: "",
        deviceGroupId: "",
        deviceValid: false,

        groupArr: [] as Array<{ label: string; value: string }>,
        groupText: "",
        groupValue: [],
        groupVisiable: false,

        idInputEditAble: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getTabBar().setData({
            selected: 1,
        });
        wx.request({
            url: "http://localhost:7001/get_all_group",
            method: "GET",
            success: (_res: { data: DeviceGroup[] }) => {
                console.log(_res);
                const groupArr = _res.data.map((item) => {
                    return {
                        label: item.groupName,
                        value: item.groupId,
                    };
                });
                this.setData({
                    groupArr,
                });
            },
            fail: (_err) => {
                console.log(_err);
            },
        });
    },

    checkDevice() {
        if (!this.data.deviceId) {
            this.handleToast("请输入设备ID", "fail")
        }
        wx.request({
            url: "http://localhost:7001/check_device",
            method: "GET",
            data: {
                deviceId: this.data.deviceId,
            },
            success: (_res) => {
                console.log(_res);
                if (_res.data === "fail") {
                    this.setData({
                        deviceValid: true,
                        idInputEditAble: true
                    });
                    this.handleToast("请继续绑定", "success");

                } else {
                    this.handleToast("设备已绑定", "fail");
                }
            },
        });
    },
    setInputData(e: MiniEvent<{ value: string }, { inputfield: string }>) {
        this.setData({
            [e.target.dataset.inputfield]: e.detail.value
        });
    },
    onGroupPicker() {
        this.setData({
            groupVisiable: true,
        })
    },
    onPickerChange(e: MiniEvent<{ value: string[]; label: string[] }, { key: string }>) {
        const { key } = e.currentTarget.dataset;
        const { value, label } = e.detail;

        console.log('picker change:', e.detail);
        this.setData({
            [`${key}Visible`]: false,
            deviceGroupId: value[0],
            [`${key}Text`]: label[0]
        });
    },

    scanDeviceQr() {
        wx.scanCode({
            success: (res) => {
                console.log(res);
                this.setData({
                    deviceId: res.result
                });
                this.checkDevice();
            },
            fail: (err) => {
                console.log(err);
            }
        })
    },

    addDevice() {
        const sendData = {
            deviceId: this.data.deviceId,
            deviceName: this.data.deviceName,
            deviceLocation: this.data.deviceLocation,
            deviceGroupId: this.data.deviceGroupId
        }
        console.log(123);

        wx.request({
            url: "http://localhost:7001/create_device",
            method: "POST",
            data: sendData,
            success: (_res) => {
                console.log(_res);
                if (_res.data === "success") {
                    this.handleToast("添加成功", "success");
                    this.setData({
                        deviceValid: false,
                        idInputEditAble: false
                    });
                } else {
                    this.handleToast("添加失败", "fail");
                }
            },
        })
    },

    moveToLocation() {
        let that = this;
        wx.chooseLocation({
            success: function (res) {
                //赋值给data中的mapName
                that.setData({
                    deviceLocation: res.name
                });
            },
            //错误信息
            fail: function (e) {
                console.log(e);
            }
        });
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
    handleToast(message: string, theme: "loading" | "success" | "fail") {
        Toast({
            context: this,
            selector: "#t-toast",
            message: message,
            theme: theme,
            direction: "column",
        });
    },
});
