const http = require('http');
const express = require('express');
const path = require('path')
const {dirname} = require('path')
const app = express()
const hbs = require('hbs')
const hostname = '127.0.0.1';
const port = 5000;
const { response, query } = require('express')
const session = require('express-session')
app.use(express.json());
app.use(
  session({
    cookie:{
      maxAge: 1000 * 60 * 60 * 2,
      secure: false,
      httpOnly:true
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: 'secretkey'
  })
)

// engine view set
app.set('view engine', 'hbs')
// register hbs
hbs.registerPartials(__dirname + '/views/partials')
// path
app.use('/public', express.static(path.join(__dirname,'public')))
//encode
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res) => {
  // SELECT COUNT(*) FROM task_tb WHERE is_done = 1 AND task_tb.collections_id = 2;
  const database = `SELECT * FROM collection_tb;`
  dbConnection.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(database, (err,data) => {
      console.log(data)
      const collection = []
      for ( _ of data){
        collection.push({
          id: _.id,
          name: _.name,
          userId: _.user_id,
        })
      }
      dbConnection.releaseConnection(conn)
      res.render('main',{isLogin: req.session.isLogin,collection})
    })
  })
})

app.post('/login', (req,res)=> {
    const {email, password} = req.body
    const login = `SELECT *, MD5(password) AS password FROM user_tb WHERE email="${email}" AND password="${password}"`
    
    dbConnection.getConnection(function (err, conn) {
      if (err) throw err;
  
      conn.query(login, (err, results) => {
        if (err) throw err
      
        if (results.length <= 0) {
          req.session.isLogin = false;
          console.log(results)
          return res.redirect('back')
        } else {
          req.session.isLogin = true;
          console.log(results)
          
          req.session.user = {
            id: results[0].id,
            email: results[0].email,
            name: results[0].name
          }
          req.session.username = req.session.name
          req.session.userId = req.session.user.id
          if ((req.session.userId).length > 0) {
            req.session.isLogin = true;
            console.log(true)
          } else {
            console.log(false)
          }
          console.log('login')
        }
        res.redirect('/')
      })
      dbConnection.releaseConnection(conn)
    })
})

app.post('/register', (req,res)=> {
    const {email, password } = req.body
    const singup = `INSERT INTO user_tb (password,email) VALUES ("${password}","${email}")`
    toDatabase(singup)
    console.log('check')
    res.redirect('back')
})
app.post('/newtask',(req,res)=>{
  const {input} = req.body
  const {inputid} = req.body
  const data = `INSERT INTO task_tb (name,collections_id,is_done) VALUES ('${input}','${inputid}',1)`
  console.log(data)
  toDatabase(data)
  res.redirect('back')
})
app.get('/logout', (req,res)=>{
    req.session.destroy()
    res.redirect('/')
})
app.post('/collection',(req,res)=>{
  const {newcollection} = req.body
  const {userId} = req.session
  const data = `INSERT INTO collection_tb (name,user_id) VALUES ('${newcollection}','${userId}');`
  toDatabase(data)
  res.redirect('/')
})

const dbConnection = require('./connection/db');
const { Console } = require('console');
dbConnection.getConnection(function (err, conn) {
  if (err) throw err;
  console.log('Connected on ID '+ conn.threadId)
  dbConnection.releaseConnection(conn)
})
const toDatabase = ((query) => {
    dbConnection.getConnection(function (err, conn) {
      if (err) throw err;
      conn.query(query)
      dbConnection.releaseConnection(conn)
    })
})

const userRouter = require('./route/school')
app.use ('/school', userRouter)
const loginRouter = require('./route/login')
app.use ('/login', loginRouter)
const registerRouter = require('./route/register')
app.use ('/register', registerRouter)
const todoRouter = require('./route/todo')
app.use ('/todo', todoRouter)



// listen port
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });