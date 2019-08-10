const notifier = require('mail-notifier');
 
const imap = {
  user: 'mohaimin95@hotmail.com',
  password: '//////////////',
  host: 'imap-mail.outlook.com',
  port: 993,
  tls: true
};
 
notifier(imap)
  .on('mail', mail => {
    let conv = mail.map(data=>{
      return {
        from:Headers.re
      }
    })
  })
  .start();