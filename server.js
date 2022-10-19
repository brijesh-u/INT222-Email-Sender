let express = require('express')
var nodemailer = require('nodemailer')
var fs = require('fs')
require('dotenv').config()

const app = express()

app.use(express.urlencoded({extended:false}))
app.use('/profile', express.static("portfolio"))

let userEmail = '', userName = '', data=''

app.post('/get-info', function(req, res){
    userEmail = req.body.email
    userName = req.body.name
    data = req.body.data
    let obj = {userName, userEmail, data}
    sendEmailToUser(userEmail, obj)
    return res.redirect('/profile/#contact')
})

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'highcash69@gmail.com',
    pass: process.env.PASS
  }
})


function sendEmailToUser(userEmail, obj){
    var mailOptions = {
        from: 'highcash69@gmail.com',
        to: userEmail,
        subject: 'Thanks for visiting!❤️',
        text: 'HEY this is Brijesh Upadhyay! You can view my other works/Projects from my portfolio'       
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
            fs.appendFileSync('users.json', JSON.stringify(obj, null, 4), function(err){
                if(err)
                    console.log('Error: '+err)
            })
        }
    })
}

app.listen(8000, function(err){
    console.log('Runnin on port: 8000')
})
