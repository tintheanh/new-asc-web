import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'nta6195@gmail.com',
		pass: 'jahxcdemeqbxthvv'
	}
});

const generateMakingTemplate = (data: any) => `
<html>

<head>
  <style>
    body {
      margin: 0 24px;
    }

    table,
    th,
    td {
      border: 1px solid black;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 5px;
      text-align: center;
      font-size: 16px;
    }

    table#t01 {
      width: 100%;
      background-color: rgba(188, 236, 237, 1);
    }

    p {
      font-size: 16px;
    }
  </style>
</head>

<body>
  <h4>Appointment is set for:</h4>
  <table id="t01">
    <tr>
      <th style="width: 20%">Tutor</th>
      <td colspan="2">${data.tutorName}</td>
    </tr>
    <tr>
      <th style="width: 20%">Subject</th>
      <td colspan="2">${data.subject}</td>
    </tr>
    <tr>
      <th style="width: 20%">Student</th>
      <td colspan="2">${data.studentName}</td>
    </tr>
    <tr>
    <tr>
      <th style="width: 20%">Date</th>
      <th style="width: 40%">From</th>
      <th>To</th>
    </tr>
    <tr>
      <td>${data.date}</td>
      <td>${data.timeFrom}</td>
      <td>${data.timeTo}</td>
    </tr>
  </table>
  <p>You have an appointment with a tutor and the schedule is listed above. The tutoring session will be held at the Tutoring Center, in room SEC-154 on the
    1st floor of the Student Engagement Center. Please sign in on the entrance computer and the AccuTrack Appointment system in the back room as well. You will need to arrive early
    before your
    appointment. Cancellation is acceptable at least 24 hours prior to the session.
    Please note that no shows are tracked and not showing up for your appointments may affect your ability to schedule future appointments. Thank you.
    <br />
    <br />
    Academic Support Center Tutoring Team
    <br />
    <br />
    This email address is unmonitored, please do not reply to it , your message will not reach anyone. </p>
</body>

</html>`;

const generateDeletingTemplate = (data: any) => {
	let reason;
	if (data.reason) reason = `Reason: ${data.reason}`;
	else reason = '';
	return `<html>

  <head>
    <style>
      body {
        margin: 0 24px;
      }
  
      table,
      th,
      td {
        border: 1px solid black;
        border-collapse: collapse;
      }
  
      th,
      td {
        padding: 5px;
        text-align: center;
        font-size: 16px;
      }
  
      table#t01 {
        width: 100%;
        background-color: rgba(226, 134, 131, 0.7);
      }
  
      p {
        font-size: 16px;
      }
    </style>
  </head>
  
  <body>
    <h4>Appointment is cancelled for:</h4>
    <table id="t01">
      <tr>
        <th style="width: 20%">Tutor</th>
        <td colspan="2">${data.tutorName}</td>
      </tr>
      <tr>
        <th style="width: 20%">Subject</th>
        <td colspan="2">${data.subject}</td>
      </tr>
      <tr>
        <th style="width: 20%">Student</th>
        <td colspan="2">${data.studentName}</td>
      </tr>
      <tr>
      <tr>
        <th style="width: 20%">Date</th>
        <th style="width: 40%">From</th>
        <th>To</th>
      </tr>
      <tr>
        <td>${data.date}</td>
        <td>${data.timeFrom}</td>
        <td>${data.timeTo}</td>
      </tr>
    </table>
    <p>
      ${reason}
      <br />
      <br />
      Academic Support Center Tutoring Team
      <br />
      <br />
      This email address is unmonitored, please do not reply to it , your message will not reach anyone. </p>
  </body>
  
  </html>`;
};

exports.sendMailForMakingAppointment = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		const { tutorEmail, studentEmail, ...dataForTemplate } = req.body;
		const listOfRecipients = [ tutorEmail, studentEmail ];

		for (const recipient of listOfRecipients) {
			const mailOptions = {
				from: 'Mission College Tutoring Center <nta6195@gmail.com>',
				to: recipient,
				subject: '**Tutoring Appointment Notification**',
				html: generateMakingTemplate(dataForTemplate)
			};

			transporter.sendMail(mailOptions, (error: Error, _: any) => {
				if (error) {
					res.send(error.toString());
				}
				res.send('Sended');
			});
		}
		return res.send('Done.');
	});
});

exports.sendMailForDeletingAppointment = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		const { tutorEmail, studentEmail, ...dataForTemplate } = req.body;
		const listOfRecipients = [ tutorEmail, studentEmail ];

		for (const recipient of listOfRecipients) {
			const mailOptions = {
				from: 'Mission College Tutoring Center <nta6195@gmail.com>',
				to: recipient,
				subject: '**Tutoring Cancellation Notification**',
				html: generateDeletingTemplate(dataForTemplate)
			};

			transporter.sendMail(mailOptions, (error: Error, _: any) => {
				if (error) {
					res.send(error.toString());
				}
				res.send('Sended');
			});
		}
		return res.send('Done.');
	});
});
