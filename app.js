const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'view')));
app.use(cors());
const sequelize=require('./util/database');
const User=require('./model/user');
sequelize.sync()
.then(()=>{
    console.log('details synchronised with database')
})
.catch((err)=>{
    console.log('failed to synchronise with database')
})
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'view','signup.html'));
}); 
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'view','login.html'));
})
const userRoute=require('./routes/users');


app.use('/user',userRoute);
app.listen(10000);