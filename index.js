const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require("method-override");
const Chat = require('./models/chat.js');
let app = express();
let port =  3000;

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


main().then(()=>{
        console.log("connection was succesful")
       })
      .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.listen(port,()=>{
    console.log('App is Listening....');
});

app.get("/",(req,res)=>{
    res.send('root is working !');
});

//index route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs",{ chats });
});

//new route
app.get("/chat/new",(req,res)=>{
    console.log("Write your Message...");
    res.render("new.ejs");
})
// create route
app.post("/chats",(req,res)=>{
    let {from , to , msg} = req.body
    console.log("Creating Message...");
    let newChat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date()
    })
    console.log(newChat);
    newChat.save().then(()=>{
           console.log("chat saved !");
    }).catch((err)=>{
        console.log("Error Occured While Creating Chat")
    })
    res.redirect("/chats");
});

// edit
app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
    console.log("Editing Your Message...");
    let detail = await Chat.findById(id)
    res.render("edit.ejs",{detail});
});

//update
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {newMsg} = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id,{msg : newMsg},{runValidators : true, new :true});
    console.log("Upating Your Message...");
    console.log(updateChat);
    res.redirect("/chats");
});

//delete
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats');
});
