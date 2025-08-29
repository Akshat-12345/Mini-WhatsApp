const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
//   "/c/Program Files/MongoDB/Server/8.0/bin/mongod.exe" --dbpath="/c/data/db"

main().then(()=>{
        console.log("connection was succesful")
       })
      .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};



Chat.insertMany([
    {
        from: 'me',
        to: 'friend',
        msg: 'Hello bro!',
        created_at: new Date()

    },
   {
        from: 'vk18',
        to: 'pranshu',
        msg: 'How are YOU?',
        created_at: new Date()

    },
    {
        from: 'bumrah',
        to: 'akshat',
        msg: 'Aur sab badiya!',
        created_at: new Date()

    },
]);

Chat.find().then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err)
})