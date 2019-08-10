var imaps = require('imap-simple');
const _ = require("lodash");
const simpleParser = require('mailparser').simpleParser;
const methods = {};
var config = {
    imap: {
        user: 'mohaimin95@hotmail.com',
        password: 'xxxxxxxxxxxx',
        host: 'imap-mail.outlook.com',
        port: 993,
        tls: true,
        authTimeout: 3000
    }
};
methods.getInbox = () => {
    return new Promise((resolve, reject) => {
        imaps.connect(config).then(function (connection) {
            return connection.openBox('INBOX').then(function () {
                var searchCriteria = ['ALL'];
                var fetchOptions = {
                    bodies: ['HEADER', 'TEXT', ''],
                };
                return connection.search(searchCriteria, fetchOptions).then(async function (messages) {
                    let promises = messages.map(item=>{
                        return new Promise((resolve,reject)=>{
                            var all = _.find(item.parts, { "which": "" })
                            var id = item.attributes.uid;
                            var idHeader = "Imap-Id: " + id + "\r\n";
                            simpleParser(idHeader + all.body, (err, mail) => {
                                resolve(mail);
                            });
                        });
                    });
                    Promise.all(promises).then(data=>{
                        let d = data.filter(obj=>obj.me).map(obj=>{
                            return {
                                from:obj.from.value.map(obj=>obj.address).join(','),
                                to:obj.to.value.map(obj=>obj.address).join(','),
                                subject:obj.subject,
                                attachments:obj.attachments,
                                message_id:obj.messageId,
                                date:obj.date

                            }
                        });
                        resolve(d);
                    })
                });
            });
        });
    });
} 
module.exports = methods;