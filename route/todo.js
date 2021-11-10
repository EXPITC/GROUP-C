const { request } = require("express")
const express = require(`express`)
const router = express.Router()
const dbConnection = require('../connection/db');
const { route } = require("./school");
router.use(express.json())
const toDatabase = ((query) => {
    dbConnection.getConnection(function (err, conn) {
      if (err) throw err;
      conn.query(query)
      dbConnection.releaseConnection(conn)
    })
})

router.get('/:id',(req, res) => {
    const {id} = req.params
    send = `SELECT * FROM task_tb WHERE collections_id = ${id};SELECT user_id as id, name FROM collection_tb WHERE id =  ${id};`
    console.log(send)
    dbConnection.getConnection(function (err, conn) {
        if (err) throw err;
        conn.query(send,(err,data) => {
            console.log(data[0])
            taskisDone = []
            for( _ of data[0]) {
                if(_.is_done == 0){
                    taskisDone.push({
                        id : _.id,
                        name : _.name,
                    })
                }
            }
            tasknotyet = []
            for(_ of data[0]) {
                if (_.is_done == 1) {
                    tasknotyet.push({
                        id: _.id,
                        name:_.name
                    })
                }
            }
            const name = data[1][0].name
            const id = req.params.id
            const userid = req.session.userId
            const owner = data[1][0]
            let val = false
            if(owner.id == userid) {val = true}
            console.log(userid, val,name)
            const notyet = tasknotyet.length
            const done = taskisDone.length
            dbConnection.releaseConnection(conn)
            res.render('todos',{isLogin:req.session.isLogin,id,taskisDone,tasknotyet,notyet,done,val,name})
        })
    })

})
router.get('/done/:id',(req, res) => {
    const {id} = req.params
    const data  = `UPDATE task_tb SET is_done = 0 WHERE id = ${id}`
    console.log(data)
    toDatabase(data)
    res.redirect('back')
})
router.get('/notyet/:id',(req, res) => {
    const {id} = req.params
    const data  = `UPDATE task_tb SET is_done = 1 WHERE id = ${id}`
    console.log(data)
    toDatabase(data)
    res.redirect('back')
})
router.get('/del/:id',(req, res)=>{
    const {id} = req.params 
    const data  = `DELETE FROM collection_tb WHERE id = ${id}`
    console.log(data)
    toDatabase(data)
    res.redirect('/')
})

router.get('/deleted/:id',(req, res)=>{
    const {id} = req.params
    const data = `DELETE FROM task_tb WHERE id = ${id}`
    toDatabase(data)
    res.redirect('back')
})
module.exports = router