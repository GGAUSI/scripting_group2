const express = require("express");
const dummy = require("./data/dummy");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", (req, res) => {
    const data = {title : "Dashboard",
     active : "Dashboard",};
    res.render("index", data);
});

app.get("/reports", (req, res) => {
    const months = []
    const sales = []
    const names = []
    const salary = []
    const expenses =[]

    dummy.salesData.forEach(function (item){
        months.push(item.month);
        sales.push(item.sales);
    })
    dummy.salaryData.forEach(function (item){
        names.push(item.name);
        salary.push(item.salary);
    })
    dummy.expensesData.forEach(function (item){
        expenses.push(item.expenses);
    })
    
    const data = {title : "Reports",
     active : "Reports",
      months, 
      sales, 
      names, 
      salary,
      expenses
    };
    res.render("reports", data);
});
app.listen(3000, () => {
    console.log("server has started")}
    );

