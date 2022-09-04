import sgMail from '@sendgrid/mail'

const sendWelcomeEmail = (email, name) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    sgMail
        .send({
            to: email,
            from: 'jarmo.jokela@gmail.com',
            subject: 'Thank you for joining in!',
            text: `Welcome to the app, ${name}! Let me know how to get along with the app.`
        })
}

export { sendWelcomeEmail }
