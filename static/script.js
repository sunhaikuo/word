var app = new Vue({
    el: '#app',
    data: {
        key: '',
        value: '',
        isReturn: true,
        randomArr: [],
        length: 0,
        keyIsError: false,
        valIsError: false
    },
    methods: {
        submit: function () {
            if (!this.key) {
                this.keyIsError = true
                return
            }
            this.keyIsError = false
            if (!this.value) {
                this.valIsError = true
                return
            }

            this.valIsError = false
            var params = {
                key: this.key,
                value: this.value
            }
            if (this.isReturn) {
                this.isReturn = false
                axios.get('/add', {
                    params: params
                }).then((response) => {
                    this.isReturn = true
                    if (response.data.success) {
                        this.randomArr.splice(0, 0, response.data.data)
                        this.key = ''
                        this.value = ''
                        this.length++
                    } else {
                        alert(response.data.msg)
                    }
                    console.log(response.data)
                }, (err) => {
                    this.isReturn = true
                    console.log(err)
                })
            }

        },
        show: function (id, index) {
            var obj = this.randomArr[index]
            obj.show = true
            this.randomArr.splice(index, 1, obj)
        },
        random: function () {
            axios.get('/random').then((response) => {
                this.randomArr = response.data
            }, (err) => {
                alert('error')
            })
        },
        getLenth: function () {
            axios.get('/length').then((response) => {
                this.length = response.data.length
            }, (err) => {
                alert('error')
            })
        },
        delete1: function (id, index) {
            if (!window.confirm('删除后数据将不可恢复，确定删除吗？')) {
                return
            }
            var params = {
                id: id
            }
            axios.get('/delete', {
                params: params
            }).then((response) => {
                this.randomArr.splice(0, 1)
                this.length--
            }, (err) => {
                alert('error')
            })
        }
    },
    mounted: function () {
        this.getLenth()
        this.random()
    }
})