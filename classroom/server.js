const express = require("express")
const app = express()
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")

const cookieParser = require("cookie-parser")
app.use(cookieParser("secretcode"))


app.get("/getsignedcookies",(req,res)=>{
  res.cookie("made-in","India",{signed:true})
  res.send("signed cookies sent")
})
app.get("/verify",(req,res)=>{
  console.log(req.signedCookies)
  res.send(req.signedCookies)
})


app.get("/getcookies", (req, res) => {
  res.cookie("greet","namaste")
  res.cookie("isha","20")
  res.cookie("color","red")
  res.cookie("name","Tulsi")
  res.cookie("greet","namaste")
  
  res.send('sent you some cookies')
})

app.get("/greet",(req,res)=>{
  let {name="anonymous"}=req.cookies
  res.send(`hello ${name}`)
})

app.get("/", (req, res) => {  
  // let {name="anonymous"} = req.cookies
  // console.dir(name)

  console.log(req.cookies)
    res.send("Hello World")
})

app.use("/users",userRoutes)
app.use("/posts",postRoutes)




app.listen(3000, () => {
    console.log("Server is running on port 3000")
})