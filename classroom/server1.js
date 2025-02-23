const express = require("express")
const app = express()
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")
const session = require("express-session")
const flash=require("connect-flash")
const path=require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions={
    secret: 'mysupersecretstring',
    resave : false,
    saveUninitialized : true
}
app.use(session(sessionOptions))
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errMsg=req.flash("error");
    next();
})

// app.get("/test",(req,res)=>{
//     res.send("test successful!")
// })

// app.get("/reqcount",(req,res)=>{
//     req.session.count=req.session.count?req.session.count+1:1
//     res.send(`You sent a request ${req.session.count} times`)
// })


app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    // console.log(req.session)
    // console.log(req.session.name)
    
    if(name==="anonymous"){
        req.flash("success","user not registered ")
    }else{
        req.flash("success","user registered successfully")
    }
    res.redirect("/hello");
})
app.get("/hello", (req, res) => {
   
    // res.locals.successMsg=req.flash("success");
    // res.locals.errMsg=req.flash("error");

    res.render("page.ejs",{name: req.session.name})
    // res.render('page.ejs',{name: req.session.name,msg:req.flash("success")});
})




app.listen(3000, () => {
    console.log("Server is running on port 3000")
})