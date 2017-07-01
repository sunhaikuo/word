var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs-extra')
app.use(express.static(path.resolve('./static')))
app.get('/delete', function (req, res) {
    var id = req.query.id
    var filePath = path.resolve('./static/database.json')
    var json = fs.readJSONSync(filePath)
    var data = json.data
    for (var i = 0; i < data.length; i++) {
        var item = data[i]
        if (item.id == id) {
            data.splice(i, 1)
        }
    }
    json.data = data
    json.length = data.length
    var result = fs.writeJsonSync(filePath, json)
    res.send('Success')
})
app.get('/length', function (req, res) {
    var json = fs.readJSONSync(path.resolve('./static/database.json'))
    var length = json.length
    res.send({
        length: length
    })
})
app.get('/random', function (req, res) {
    var json = fs.readJSONSync(path.resolve('./static/database.json'))
    var length = json.length
    var data = json.data
    data.sort(function () {
        return 0.5 - Math.random()
    })
    var result = data.slice(0, 15)
    res.send(result)
})
app.get('/add', function (req, res) {
    var key = req.query.key
    var value = req.query.value
    var obj = {
        id: (+(new Date())),
        key: key,
        value: value
    }
    if (key && value) {
        var filePath = path.resolve('./static/database.json')
        var json = fs.readJSONSync(filePath)
        var data = json.data
        data.push(obj)
        json.data = data
        json.length = data.length
        var result = fs.writeJsonSync(filePath, json)
        res.send({
            success: true,
            data: obj
        })
    } else {
        res.send({
            success: false,
            msg: '所填写的值为空'
        })
    }
})
app.listen(5000, function () {
    console.log('Listen 5000!')
})