const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv").config();
const PORT = process.env.PORT;
const mailHelper = require("./helpers/nodemailer");
const mailListeners = require("./helpers/mailhooks");
const imapHelpers = require("./helpers/mailhooks");
// const imap = require("./helpers/imap");
// const imap = require("./helpers/notifier");
app.use(cors());
app.use(express.json());
app.post('/send-test-mail',(req,res)=>{
    mailHelper.sendMail({
        provider:req.body.provider,
        username:req.body.username,
        password:req.body.password,
        from:req.body.from,
        to:req.body.to,
        subject:req.body.subject,
        text:req.body.text,
    }).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(501).status(err);
    })
})
app.post("/verify-smtp",(req,res)=>{
    let smtpOptions = {
        provider:req.body.provider,
        username:req.body.username,
        password:req.body.password
    }
    mailHelper.verifySMTP(smtpOptions).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(501).send(err);
    })
});

app.get("/get",(req,res)=>{
    imapHelpers.getInbox().then(data=>{
        res.send(data)
    })
})
app.listen(PORT,(err)=>{
    if(err) console.log("Error in connection ",err);
    else console.log(`Connected to ${PORT}.`);
});




