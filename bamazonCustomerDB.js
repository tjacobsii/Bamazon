var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "tjac2822733",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err; // Guard clause
  console.log("connected as id " + connection.threadId + "\n");
  makeTable();
});

var makeTable = function() {
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].id+" || "+res[i].product+" || "+
                res[i].department_name+" || "+res[i].price+" || "+
                res[i].stock_quantity+"\n");
        }
    promptCustomer(res);    
    })
}
var promptCustomer = function(res){
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What do you want to purchase [Quit with Q]"
    }]).then(function(answer){
        var correct = false;
        if(answer.choice.toUpperCase()=="Q"){
            process.exit();
        }
        for(var i=0;i<res.length; i++){
            if(res[i].product==answer.choice){
                correct=true;
                var product=answer.choice;
                var id=i;
                inquirer.prompt({
                    type: "input",
                    name:"quantity",
                    message:"How many do you want to buy?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }  
                    }
                }).then(function(answer){
                    if((res[id].stock_quantity-answer.quantity)>0){
                        connection.query("UPDATE products SET stock_quantity='"+
                        (res[id].stock_quantity-answer.quantity)+"' WHERE product='"+
                        product+"'", function(err,res2){
                            console.log("Product Purchased!");
                            makeTable();
                        })
                    } else {
                        consol.log("Not a valid selection!");
                        promptCustomer(res);
                    }
                })
            }
        }
    if(i==res.length && correct==false){
        console.log("Invalid Selection");
        promptCustomer(res);
    }    
    })
}
