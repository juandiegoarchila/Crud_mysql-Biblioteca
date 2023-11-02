var mysql= require("mysql");
var con= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'Biblioteca'
}
);
con.connect(
    (err)=>{
        if(!err){
            console.log('conexion establecida');
        }else{
            console.log('Error de conexion');
        }
    }
);
module.exports=con;