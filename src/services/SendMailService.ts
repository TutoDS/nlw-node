import nodemailer, { Transporter } from 'nodemailer';
class SendMailService {
	private transporter: Transporter;

	constructor() {
		nodemailer
			.createTestAccount()
			.then((account) => {
				this.transporter = nodemailer.createTransport({
					host: account.smtp.host,
					port: account.smtp.port,
					secure: account.smtp.secure,
					auth: {
						user: account.user,
						pass: account.pass,
					},
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async execute(to: string, subject: string, body: string) {
		const message = await this.transporter.sendMail({
			from: `NPS <noreplay@nps.test>`,
			to,
			subject,
			html: body,
		});

		console.log(nodemailer.getTestMessageUrl(message));
	}
}

export default new SendMailService();
