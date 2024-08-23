const mongoose = require('mongoose');
const Chat=require("./models/chat.js");


main()
.then(()=>{
    console.log("Connection is established")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allChats=[
    {
        from:"Rohan",
        to:"Mohan",
        msg:"Where are you?",
        date:new Date()
    },
    {
        from:"Rohan",
        to:"Mohan",
        msg:"Where are you?",
        date:new Date()

    },
    {
        from:"Rohan",
        to:"Mohan",
        msg:"Where are you?",
        date:new Date()
    },
    {
        from:"Rohan",
        to:"Mohan",
        msg:"Where are you?",
        date:new Date()
    },
    {
        from:"Rohan",
        to:"Mohan",
        msg:"Where are you?",
        date:new Date()
    }
]
Chat.insertMany(allChats)
