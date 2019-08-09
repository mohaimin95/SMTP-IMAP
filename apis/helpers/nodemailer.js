const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
let methods = {};

methods.initTransort = (smtpOptions) => {
    let options = methods.getSMTPSettings(smtpOptions.provider);
    options.auth = {
        user:smtpOptions.username,
        pass:smtpOptions.password
    };
    let transporter = nodemailer.createTransport(smtpTransport(options));
    return transporter;
}
methods.getSMTPSettings = (provider) => {
    let options = {
        service: provider
    };
    switch (provider.toLowerCase()) {
        case 'gmail':
            options = {
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
            }
            break;
        
        case 'yahoo':
            options = {
                host: "smtp.mail.yahoo.com",
                port: 465,
                secure: true,
            }
            break;
        
    }
    return options;
}
methods.verifySMTP = (options) => {
    return new Promise((resolve,reject) => {
        let smtpOptions = {
            provider:options.provider,
            username:options.username,
            password:options.password
        }
        let transport = methods.initTransort(smtpOptions);
        transport.verify((err,success)=>{
            if(err) reject({success:false,error:err});
            else resolve({success,error:null});
        });
    });
}
methods.sendMail = (options) => {
    return new Promise((resolve,reject)=>{
        var mailOptions = {
            from: options.from, 
            to:options.to, 
            subject: options.subject,
            html: options.html || options.text,
            attachments:options.attachments || []
        }
        let transport = methods.initTransort({
            provider:options.provider,
            username:options.username,
            password:options.password,

        });
        transport.sendMail(mailOptions,(err,msg)=>{
            if(err) reject({success:false,error:err,body:null});
            else resolve({success:true,error:null,body:msg})
        });
    });
}
module.exports = methods;