Component({
    properties: {
        num: {
            type: Number,
            observer(newData, oldData) { // 属性改变时执行的函数
                // console.log(newData,oldData)
            }
        }
    },
    methods: {
        decreaseAct(e) {
            // this.setData({
            //     num: this.data.num - 1
            // });
            // this.triggerEvent('decreaseAct')
            this.triggerEvent('decreaseAct',{},{bubbles: false})
        },

        increaseAct(e) {
            // this.setData({
            //     num: this.data.num + 1
            // });
            this.triggerEvent('increaseAct',{},{bubbles: false})
        }
    }
})