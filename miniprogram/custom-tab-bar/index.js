Component({
    data: {
        selected: 0,
        color: "black",
        selectedColor: "#2b5cab",
        list: [{
                pagePath: "/pages/sign/sign",
                text: "签署",
                iconName: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMmVtIiBoZWlnaHQ9IjJlbSIgdmlld0JveD0iMCAwIDE2IDE2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHBhdGggZD0iTTcuMzQ5OTggOC42NDk5OFYxMi41SDguNjQ5OThWOC42NDk5OEgxMi41VjcuMzQ5OThIOC42NDk5OFYzLjVINy4zNDk5OFY3LjM0OTk4SDMuNVY4LjY0OTk4SDcuMzQ5OThaIj48L3BhdGg+DQo8L3N2Zz4=",
                activeName: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMmVtIiBoZWlnaHQ9IjJlbSIgdmlld0JveD0iMCAwIDE2IDE2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHBhdGggZD0iTTcuMzQ5OTggOC42NDk5OFYxMi41SDguNjQ5OThWOC42NDk5OEgxMi41VjcuMzQ5OThIOC42NDk5OFYzLjVINy4zNDk5OFY3LjM0OTk4SDMuNVY4LjY0OTk4SDcuMzQ5OThaIiBmaWxsPSIjMmI1Y2FiIj48L3BhdGg+DQo8L3N2Zz4="
            },
            {
                pagePath: "/pages/test/test",
                text: "供水知识",
                iconName: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMmVtIiBoZWlnaHQ9IjJlbSIgdmlld0JveD0iMCAwIDE2IDE2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHBhdGggZD0iTTE0IDQuNUgyVjMuNUgxNFY0LjVaIj48L3BhdGg+DQo8cGF0aCBkPSJNMTQgOC41SDJWNy41SDE0VjguNVoiPjwvcGF0aD4NCjxwYXRoIGQ9Ik0yIDEyLjVIMTRWMTEuNUgyVjEyLjVaIj48L3BhdGg+DQo8L3N2Zz4=",
                activeName: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMmVtIiBoZWlnaHQ9IjJlbSIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSIjMmI1Y2FiIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHBhdGggZD0iTTE0IDQuNUgyVjMuNUgxNFY0LjVaIj48L3BhdGg+DQo8cGF0aCBkPSJNMTQgOC41SDJWNy41SDE0VjguNVoiPjwvcGF0aD4NCjxwYXRoIGQ9Ik0yIDEyLjVIMTRWMTEuNUgyVjEyLjVaIj48L3BhdGg+DQo8L3N2Zz4="
            }
        ]
    },
    attached() {},
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({
                url
            })
        }
    }
})