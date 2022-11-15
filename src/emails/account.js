const mailgun = require("mailgun-js");
const mg = mailgun({apiKey:process.env.MAILGUN_API_KEY, domain:process.env.MAILGUN_DOMAIN});
const sendWelcomEmail = (email , name)=>{
    try{
        mg.messages().send({
            from: "Excited User <me@samples.mailgun.org>",
            to: email,
            subject: 'Thanks for joining in!',
            text: `Welcom to the app, ${name}. Let me know how you get along with the app.`
        })
    }catch(e){
        console.log(e)
    }
   
}
const sendDeleteEmail = (email , name)=>{
    mg.messages().send({
        from: "Excited User <me@samples.mailgun.org>",
        to: email,
        subject:` Goodbye,${name}!`,
        text: `Goodbye,${name}. We will miss you.`
    })
}
module.exports = {sendWelcomEmail , sendDeleteEmail}