const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
const sequelize=require('./util/database');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'view')));
app.use(cors());



const User=require('./model/user');
const Expense=require('./model/userexpense');
const order=require('./model/order');


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'view','signup.html'));
}); 
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'view','login.html'));
})
const userRoute=require('./routes/users');
const expenseRoute=require('./routes/expenses');
const purchaseRoute=require('./routes/purchase');

app.use('/user',userRoute);
app.use('/expense',expenseRoute);
app.use('/purchase',purchaseRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(order);
order.belongsTo(User)

sequelize.sync()
.then(()=>{
    console.log('details synchronised with database')
})
.catch((err)=>{
    console.log('failed to synchronise with database')
})
app.listen(10000);