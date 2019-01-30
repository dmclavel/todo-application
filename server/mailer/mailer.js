const sgMail = require('@sendgrid/mail');

const mailer = (emailRecipient, token) => {
    return new Promise((resolve, reject) => {
        sgMail.setApiKey('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');
        const msg = {
            to: emailRecipient,
            from: 'dmcbusinessapps@gmail.com',
            subject: 'Todo App Signup Notification',
            text: 'Don\'t forget to star the official github repository!',
            html: `
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
                    <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
                    <!--[if (gte mso 9)|(IE)]>
                    <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    <!--[if (gte mso 9)|(IE)]>
                    <style type="text/css">
                    body {width: 600px;margin: 0 auto;}
                    table {border-collapse: collapse;}
                    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
                    img {-ms-interpolation-mode: bicubic;}
                    </style>
                    <![endif]-->
                
                    <style type="text/css">
                    body, p, div {
                        font-family: arial;
                        font-size: 14px;
                    }
                    body {
                        color: #ffffff;
                    }
                    body a {
                        color: #1188E6;
                        text-decoration: none;
                    }
                    p { margin: 0; padding: 0; }
                    table.wrapper {
                        width:100% !important;
                        table-layout: fixed;
                        -webkit-font-smoothing: antialiased;
                        -webkit-text-size-adjust: 100%;
                        -moz-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
                    img.max-width {
                        max-width: 100% !important;
                    }
                    .column.of-2 {
                        width: 50%;
                    }
                    .column.of-3 {
                        width: 33.333%;
                    }
                    .column.of-4 {
                        width: 25%;
                    }
                    @media screen and (max-width:480px) {
                        .preheader .rightColumnContent,
                        .footer .rightColumnContent {
                            text-align: left !important;
                        }
                        .preheader .rightColumnContent div,
                        .preheader .rightColumnContent span,
                        .footer .rightColumnContent div,
                        .footer .rightColumnContent span {
                        text-align: left !important;
                        }
                        .preheader .rightColumnContent,
                        .preheader .leftColumnContent {
                        font-size: 80% !important;
                        padding: 5px 0;
                        }
                        table.wrapper-mobile {
                        width: 100% !important;
                        table-layout: fixed;
                        }
                        img.max-width {
                        height: auto !important;
                        max-width: 480px !important;
                        }
                        a.bulletproof-button {
                        display: block !important;
                        width: auto !important;
                        font-size: 80%;
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                        }
                        .columns {
                        width: 100% !important;
                        }
                        .column {
                        display: block !important;
                        width: 100% !important;
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        }
                    }
                    </style>
                    <!--user entered Head Start-->
                    <meta name="theme-color" content="#000000" />
                    <!--End Head user entered-->
                </head>
                <body>
                    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: arial; color: #ffffff; background-color: #ffffff;">
                    <div class="webkit">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
                        <tr>
                            <td valign="top" bgcolor="#ffffff" width="100%">
                            <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                <td width="100%">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <td>
                                        <!--[if mso]>
                                        <center>
                                        <table><tr><td width="600">
                                        <![endif]-->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                                            <tr>
                                            <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #ffffff; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
                                                
                    <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
                        style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                    <tr>
                        <td role="module-content">
                        <p></p>
                        </td>
                    </tr>
                    </table>
                
                    <table  border="0"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                            width="100%"
                            role="module"
                            data-type="columns"
                            data-version="2"
                            style="padding:0px 0px 0px 0px;background-color:#b18643;box-sizing:border-box;"
                            bgcolor="#b18643">
                    <tr role='module-content'>
                        <td height="100%" valign="top">
                            <!--[if (gte mso 9)|(IE)]>
                            <center>
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing:0;border-collapse:collapse;table-layout: fixed;" >
                                <tr>
                            <![endif]-->
                        
                    <!--[if (gte mso 9)|(IE)]>
                    <td width="300.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
                    <![endif]-->
                
                    <table  width="300.000"
                            style="width:300.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
                            cellpadding="0"
                            cellspacing="0"
                            align="left"
                            border="0"
                            bgcolor="#b18643"
                            class="column column-0 of-2
                                empty"
                    >
                    <tr>
                        <td style="padding:0px;margin:0px;border-spacing:0;">
                            
                    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                    <tr>
                        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
                        <a href="https://dmc-todo-app.herokuapp.com/"><img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;border-radius:50%;max-width:35% !important;width:35%;height:auto !important;" src="https://marketing-image-production.s3.amazonaws.com/uploads/05c4a29265b8fc0481c4a2f83ca05929678f45574186a09107080643f743f46b86883e636b8236541b52a872aba388170d9fe701d74e02fd54f294161c14917c.png" alt="" width="105"></a>
                        </td>
                    </tr>
                    </table>
                
                    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                    <tr>
                        <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
                            height="100%"
                            valign="top"
                            bgcolor="">
                            <h1 style="text-align: center;">DMC - Todo App  </h1>
                        </td>
                    </tr>
                    </table>
                
                        </td>
                    </tr>
                    </table>
                
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    <![endif]-->
                    <!--[if (gte mso 9)|(IE)]>
                    <td width="300.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
                    <![endif]-->
                
                    <table  width="300.000"
                            style="width:300.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
                            cellpadding="0"
                            cellspacing="0"
                            align="left"
                            border="0"
                            bgcolor="#b18643"
                            class="column column-1 of-2
                                empty"
                    >
                    <tr>
                        <td style="padding:0px;margin:0px;border-spacing:0;">
                            <table class="module" role="module" data-type="code" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                    <tr>
                        <td height="100%" valign="top">
                        <div style="margin: 10px;">
                <h3> Thank you for registering! </h3>
                <p>
                    This is a simple to do application which promises a fast response time and accurate data!
                    Please take some time discovering what the application can do for you! Happy multitasking!
                </p>
                <br>
                <br>
                <p> DMC - Todo App Developer, </p>
                <br>
                <span> DM Clavel</span>
                </div>
                        </td>
                    </tr>
                    </table>
                        </td>
                    </tr>
                    </table>
                
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    <![endif]-->
                            <!--[if (gte mso 9)|(IE)]>
                                <tr>
                                </table>
                            </center>
                            <![endif]-->
                        </td>
                    </tr>
                    </table>
                
                                            </td>
                                            </tr>
                                        </table>
                                        <!--[if mso]>
                                        </td></tr></table>
                                        </center>
                                        <![endif]-->
                                        </td>
                                    </tr>
                                    </table>
                                </td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                        </table>
                    </div>
                    </center>
                </body>
                </html>
            `,
        };
        sgMail.send(msg)
            .then(() => resolve(token))
            .catch(err => reject(err));
    });
};

module.exports = {
    mailer
}
