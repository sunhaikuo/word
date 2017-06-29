var app = new Vue({
    el: '#app',
    data: {
        key: 'hello',
        value: '你好',
        isReturn: true,
        randomArr: []
    },
    methods: {
        submit: function () {
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

                    } else {

                    }
                    console.log(response.data)
                }, (err) => {
                    this.isReturn = true
                    console.log(err)
                })
            }

        },
        random: function () {
            axios.get('/random').then((response) => {
                this.randomArr = response.data
            }, (err) => {
                alert('error')
            })
        },
        delete1: function (id, index) {
            this.randomArr.splice(0, 1)
            var params = {
                id: id
            }
            axios.get('/delete', {
                params: params
            }).then((response) => {

            }, (err) => {
                alert('error')
            })
        }
    }
})