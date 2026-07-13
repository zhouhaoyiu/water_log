// @ts-nocheck
import dayjs from "dayjs";
import Toast, {
    ToastOptionsType,
    hideToast,
} from "tdesign-miniprogram/toast/index";
const width = wx.getSystemInfoSync().windowWidth;
Page({
    data: {
        activeValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        width,
        ysrSignContext: undefined as unknown as WechatMiniprogram.CanvasContext,
        ysrSignCanvas: undefined as unknown as WechatMiniprogram.Canvas,
        ysrHasDraw: false,
        ysrDrawOk: false,
        ysrDrawShow: false,
        ysrSrc: null,
        ysrBase64: null,
        showConfirm: false,

        jfh: "",
        mc: "",
        cbh: "",
        lxdh: "",
        // sfzh: "",
        dz: "",
        infoId: "",
        searchOk: false
    },
    handleChange(e: { detail: { value: number[] } }) {
        this.setData({
            activeValues: e.detail.value,
        });
    },
    openDialog() {
        this.setData({
            showConfirm: true
        })
    },
    closeDialog() {
        this.setData({
            showConfirm: false
        })
    },
    reSearch() {
        this.setData({
            ysrHasDraw: false,
            ysrDrawOk: false,
            ysrDrawShow: false,
            ysrSrc: null,
            ysrBase64: null,
            jfh: "",
            mc: "",
            cbh: "",
            lxdh: "",
            // sfzh: "",
            dz: "",
            searchOk: false,
            infoId: "",
            status: 0
        })
    },
    setInputData(e: unknown) {
        this.setData({
            [e.target.dataset.inputfield]: e.detail.value,
        });
    },
    hide() {
        hideToast({
            context: this,
            selector: "#t-toast",
        });
    },
    submitJob() {
        const that = this
        if (!this.data.searchOk) {
            this.handleToast({
                message: "提交错误",
                theme: "fail",
            });
            return;
        }
        if (!this.data.jfh) {
            this.handleToast({
                message: "请填写缴费号",
                theme: "fail",
            });
            return;
        }
        if (!this.data.lxdh) {
            this.handleToast({
                message: "请填写联系电话",
                theme: "fail",
            });
            return;
        }
        // if (!this.data.sfzh) {
        //     this.handleToast({
        //         message: "请填写身份证号",
        //         theme: "fail",
        //     });
        //     return;
        // }
        if (!this.data.ysrBase64) {
            this.handleToast({
                message: "请用水人签字",
                theme: "fail",
            });
            return;
        }
        wx.request({
            method: "POST",
            url: "http://localhost:8094/Info/updateInfo",
            data: {
                infoId: that.data.infoId,
                lxdh: that.data.lxdh,
                // sfzh: that.data.sfzh,
                sfzh: 123,
                ysrBase64: that.data.ysrBase64,
                status: 1
            },
            success(res) {
                if (res.data == 1) {
                    that.handleToast({
                        message: "合同签订成功",
                        theme: "success",
                    });
                    wx.request({
                        method: "POST",
                        url: "http://localhost:8094/SignLog/insertSignLog",
                        data: {
                            logTime: dayjs(`${new Date()}`).format('YYYY-MM-DD HH:mm:ss'),
                            logJfh: that.data.jfh,
                            logCbh: that.data.cbh,
                            // logSfzh: that.data.sfzh,
                            logSfzh: 1324
                        }
                    })
                    that.setData({
                        activeValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        ysrSignContext: undefined as unknown as WechatMiniprogram.CanvasContext,
                        ysrSignCanvas: undefined as unknown as WechatMiniprogram.Canvas,
                        ysrHasDraw: false,
                        ysrDrawOk: false,
                        ysrDrawShow: false,
                        ysrSrc: null,
                        ysrBase64: null,

                        jfh: "",
                        mc: "",
                        cbh: "",
                        lxdh: "",
                        // sfzh: "",
                        dz: "",
                        infoId: "",
                        searchOk: false
                    })
                    that.closeDialog()
                }
                else {
                    that.handleToast({
                        message: "合同签订失败",
                        theme: "fail",
                    });
                }
            },
            fail(e) {
                that.handleToast({
                    message: "合同签订失败",
                    theme: "fail",
                });
            }
        })
    },
    searchInfo() {
        if (!this.data.jfh) {
            this.toast({
                message: "请输入缴费号后查询",
                theme: "fail",
                direction: "column",
            });
            return;
        }
        const that = this;
        wx.request({
            url: "http://localhost:8094/Info/selectInfoByJfh",
            method: "GET",
            data: {
                jfh: this.data.jfh,
            },
            success(res) {
                console.log(res);
                if (!res.data || res.data == "") {
                    that.toast({
                        message: "未查询到信息",
                        theme: "fail",
                        direction: "column",
                    });

                } else {
                    that.setData({
                        mc: res.data.mc,
                        cbh: res.data.cbh,
                        lxdh: res.data.lxdh,
                        dz: res.data.dz,
                        infoId: res.data.infoId,
                        status: res.data.status,
                        ysrBase64: res.data.ysrBase64,
                        searchOk: true
                    });
                    if (res.data.status == 1) {
                        that.setData({
                            ysrHasDraw: true,
                            ysrDrawOk: true,
                            ysrDrawShow: false,
                        })
                    }
                    that.hide();
                }
            },
            fail(e) {
                that.toast({
                    message: "未查询到信息",
                    theme: "fail",
                    direction: "column",
                });
            },
        });
        this.toast({
            message: "加载中...",
            theme: "loading",
            direction: "column",
        });
    },
    toast(option: ToastOptionsType) {
        Toast({
            context: this,
            selector: "#t-toast",
            ...option,
            direction: "column"
        });
    },
    handleToast(message: string | ToastOptionsType, theme: string) {
        this.toast({
            message: typeof message === "string" ? message : message.message,
            theme: typeof message === "string" ? theme : message.theme,
            duration: typeof message === "string" ? theme : message.duration,
        });
    },
    openSign(e: { target: { dataset: { name: string } } }) {
        const name = e.target.dataset.name;
        if (!this.data[`${name}SignContext`]) {
            const query = wx.createSelectorQuery();
            query
                .select(`.${name}Sign`)
                .fields({ node: true })
                .exec((res) => {
                    const canvas = res[0].node;
                    canvas.width = width;
                    canvas.height = "250";
                    let canvasContext = canvas.getContext("2d");
                    canvasContext.strokeStyle = "black";
                    canvasContext.lineWidth = 2;
                    this.setData({
                        [`${name}SignContext`]: canvasContext,
                        [`${name}SignCanvas`]: canvas,
                    });
                });
        }
        this.setData({
            [`${name}DrawShow`]: true,
            [`${name}HasDraw`]: false,
            [`${name}DrawOk`]: false,
            [`${name}Src`]: "",
            [`${name}Base64`]: "",
        });
    },
    touchstart(e: {
        touches: { x: unknown; y: unknown }[];
        target: { dataset: { name: string } };
    }) {
        const name = e.target.dataset.name;
        if (this.data[`${name}DrawOk`]) {
            return;
        }
        const canvasContext = this.data[`${name}SignContext`];
        canvasContext.beginPath();
        canvasContext.moveTo(e.touches[0].x, e.touches[0].y);

        this.setData({
            [`${name}SignContext`]: canvasContext,
            [`${name}HasDraw`]: true,
        });
    },

    touchmove(e: {
        touches: { x: number | string; y: number | string }[];
        target: { dataset: { name: string } };
    }) {
        const name = e.target.dataset.name;
        if (this.data[`${name}DrawOk`]) {
            return;
        }
        var x = e.touches[0].x;
        var y = e.touches[0].y;
        let canvasContext = this.data[`${name}SignContext`];
        canvasContext.lineTo(x, y);
        canvasContext.stroke();
        this.setData({
            [`${name}SignContext`]: canvasContext,
        });
    },

    resign(e: { currentTarget: { dataset: { name: string } } }) {
        const name = e.currentTarget.dataset.name;
        let canvasContext = this.data[`${name}SignContext`];
        canvasContext.clearRect(0, 0, this.data.width, 250);
        this.setData({
            [`${name}HasDraw`]: false,
            [`${name}Src`]: null,
            [`${name}DrawOk`]: false,
            [`${name}Src`]: "",
            [`${name}Base64`]: "",
        });
    },

    signOk(e: { currentTarget: { dataset: { name: string } } }) {
        const name = e.currentTarget.dataset.name;
        let chineseName = "";
        switch (name) {
            case "ysr":
                chineseName = "用水人";
                break;
        }
        if (!this.data[`${name}HasDraw`]) {
            this.handleToast({
                message: `请${chineseName}完成签字`,
                theme: "fail"
            });
            return;
        } else {
            this.handleToast({
                message: `${chineseName}签字成功`,
                theme: "success",
                duration: 2000
            });
        }

        wx.canvasToTempFilePath(
            {
                canvas: this.data[`${name}SignCanvas`] as WechatMiniprogram.Canvas,
                success: (res) => {
                    const fileManager = wx.getFileSystemManager();
                    const base64 = fileManager.readFileSync(res.tempFilePath, "base64");

                    this.setData({
                        [`${name}Src`]: res.tempFilePath,
                        [`${name}Base64`]: base64,
                        [`${name}DrawOk`]: true,
                        [`${name}DrawShow`]: false,
                    });
                    let canvasContext = this.data[`${name}SignContext`];
                    canvasContext.clearRect(0, 0, this.data.width, 250);
                },
                fail(e) {
                    console.log(e);
                },
            },
            this
        );
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getTabBar().setData({
            selected: 0,
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
});
