const nodemailer = require('nodemailer')

export default async function Contact(req, res) {
    console.log(req.body)
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'avasquez@wizchimp.com',
            pass: '2649749823',
        },
    })

    const mailData = {
        from: `"Ezequiel Reyna" <avasquez@wizchimp.com>`,
        to: ['alejandrovasqueez@gmail.com'],
        to: ['alejandrovasqueez@gmail.com', req.body.toemail],
        subject: `Message From Ezequiel Reyna Website`,
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