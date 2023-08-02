const Sequelize=require('sequelize');
const sequelize=new Sequelize('trackerexpense','root','BINDU@2001#123',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize;