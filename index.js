const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


app.get('/', ()=>{
    resizeBy.send('welcome to my form')
})

app.post('/api/forma', (req,res)=>{
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service: 'SendinBlue',
        port: '465',
        auth:{
            user:'bondarenko.alex.sergeevich@gmail.com',
            pass: 'qGSI2ykd4hL39zc5'
        }

    })

    let mailOptions ={
        from:data.email,
        to: 'bondarenko.alex.sergeevich@gmail.com',
        subject: `Message from ${data.name}`,
        html:`
        
        <h3>Information</h3>
        <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
        <li>Subject: ${data.subject}</li>
        </ul>
        <h3>Message</h3>
        <p>${data.message}</p>
        
        
        `
    }

    smtpTransport.sendMail(mailOptions, (error, response)=>{
        if(error){
            res.send(error)
        }
        else {
            res.send('Success')
        }
    })

    smtpTransport.close();
});

const PORT = process.env.PORT||3001;
app.listen(PORT, ()=>{
    console.log(`server starting at port ${PORT}`)
})