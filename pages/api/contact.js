const nodemailer = require('nodemailer')

export default async function Contact(req, res) {
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USER,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
        },
    })

    const mailData = {
        from: `"Sitio Web de ER1010" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
        to: ['avasquez@wizchimp.com', req.body.toemail],
        subject: `Nuevo mensaje en el formulario de ER1010`,
        html: `<div>
            <p><b>Name: </b> ${req.body.name}</p>
            <p><b>Email: </b> ${req.body.email}</p>
            <p><b>Phone: </b> ${req.body.phone}</p>
            <p><b>Route: </b> ${req.body.route}</p>
            <p><b>Message: </b> ${req.body.message || "-"}</p>
        </div>`
    }

    transporter.sendMail(mailData, function (err, info) {
        if (err) {
            console.log(err);
            res.status(400).send()
        }
        console.log(info);
        res.status(200).send()
    })

}




// transporter.sendMail(mailData, function (err, info) {
//     if (err)
//         console.log(err)
//     else
//         console.log(info)
// })

// const response = await transporter.sendMail({
//     from: `"Xinerlink" <${email_user}>`,
//     to: to,
//     subject: subject,
//     html: html
// }).then(response => {
//     console.log('Email enviado con éxito a: ' + to);
//     return { message: 'Email enviado con éxito', response: response };
// }).catch(err => {
//     return { error: err }
// })