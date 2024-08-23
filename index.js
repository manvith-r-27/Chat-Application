const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path =require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public/css")))
app.use(express.static(path.join(__dirname,"public/javascript")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    res.send("server is working");
})

main()
.then(()=>{
    console.log("Connection is established")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    
    res.render("index.ejs",{chats});
})

// new route

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})
// To add new data to database
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body
    let newChat= new Chat({
        from:from,
        to:to,
        msg:msg,
        date:new Date(),
        
    })
    newChat.save()
    .then((res)=>{
        console.log("chat was saved")
    })
    .catch((err)=>{
        console.log(err)
    })
    res.redirect("/chats")
})
// Edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat})
})
// Put method install npm method override
// Update route

app.put("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let {msg:newMsg}=req.body;
    let updatedChat= await Chat.findByIdAndUpdate(
        id,
        { msg:newMsg},
        {runValidators:true,new:true}
    )
    res.redirect("/chats")
})

app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let deleteChat= await Chat.findByIdAndDelete(id);
    res.redirect("/chats");

})


app.listen(8080,()=>{
    console.log("server is listening at port 8080");
})