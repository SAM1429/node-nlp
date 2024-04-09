const { NlpManager } = require("node-nlp");
const express = require('express');
const manager = new NlpManager({ languages: ["en"] });
const app = express();

//documents
manager.addDocument("en", "hello", "greeting");
manager.addDocument("en", "hi", "greeting");
manager.addDocument("en", "hey you", "greeting");
manager.addDocument("en", "yo", "greeting");
manager.addDocument("en", "good morning", "greeting");
manager.addDocument("en", "good afternoon", "greeting");
manager.addDocument("en", "good day", "greeting");

manager.addAnswer("en", "greeting", "hello");
manager.addAnswer("en", "greeting", "hi");
manager.addAnswer("en", "greeting", "hey you");
manager.addAnswer("en", "greeting", "yo");
manager.addAnswer("en", "greeting", "good morning");
manager.addAnswer("en", "greeting", "good afternoon");
manager.addAnswer("en", "greeting", "good day");

manager.train().then(async ()=>{
    manager.save();
    //route to send and receive messages
    app.get('/bot',async (req,res)=>{
        let response = await manager.process('en', req.query.message)
        res.send(response||'please rephrase');
    })
  app.listen(3000);
})
