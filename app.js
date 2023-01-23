const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

const port = 3000 || process.env.PORT;

var lists =["firstItemInArray", "wantsToIntegrateMongoDB"];

app.listen(port, () => console.log(`Server started at port ${port}`));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.render("list",{list:lists});
});

app.post("/add", function(req,res){
    const newItem = req.body.newItem;
    lists.push(newItem);
    res.redirect("/");
})

app.post("/delete", (req,res) => {
    const delItem = req.body.delItem;
    lists = lists.filter((element, index)=> index != delItem );
    res.redirect("/");
});

app.get("/:page", (req,res) => {
    const expressParams = req.params.page;
    if(expressParams === "about"){
        res.render("about");
    }else if(expressParams === "home"){
        res.redirect("/");
    }
});