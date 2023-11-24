const { generarJWTemail } = require('./jwt');
require('dotenv').config();
const EmailService = require('../services/email-services');



const sendEmailLink = async (email) => {

    const sendEmail = new EmailService();
    const token = await generarJWTemail(email);
    if (!token) {
        return false;
    }

    // const url = `${ process.env.URL_FRONTEND }/auth/reset-password/${ token }`;

    const url = `${process.env.URL_FRONTEND}/validate-email/validate/${token}`;

    const htmlBody = `
        <h1>Correo de verificación</h1>
        <p>Por favor, confirma tu correo electrónico haciendo click en el siguiente enlace:</p>
        <a href="${url}">Confirmar correo</a>
    `;
    const subject = 'Correo de verificación';
    const to = email;

    const sent = await sendEmail.sendEmail(to, subject, htmlBody);
    if (!sent) {
        return false;
    }
    return sent;
}


module.exports = {
    sendEmailLink
}


