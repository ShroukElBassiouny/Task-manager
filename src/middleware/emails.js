const API_KEY = process.env.MAILGUN_API_KEY
const DOMAIN = process.env.MAILGUN_DOMAIN
const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
const client = mailgun.client({username: 'api', key: API_KEY})

const sendWelcomEmail = async(req,res,next)=>{
    try{
        const data = {
            from: "Excited User <me@samples.mailgun.org>",
            to: req.body.email,
            subject: 'Thanks for joining in!',
            text: `Welcom to the app, ${req.body.name}. Let me know how you get along with the app.`
        }
        await client.messages.create(DOMAIN,data)
        next()
    }
    catch(error){ 
        res.status(403).send('This mail is fake: Please enter a valid email!')
      }



}

const sendDeleteEmail = (email , name)=>{
    try{
const data = {
        from: "Excited User <me@samples.mailgun.org>",
        to: email,
        subject:` Goodbye,${name}!`,
        text: `Goodbye,${name}. We will miss you.`
    }
    client.messages.create(DOMAIN,data)
    }catch(error){
        return({error:'An Error occurred, please try again!'})
    }
    
}
module.exports = {sendWelcomEmail , sendDeleteEmail}