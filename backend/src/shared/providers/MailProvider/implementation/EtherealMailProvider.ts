import nodemailer, { Transporter } from "nodemailer";
import IMailProvider from "@shared/providers/MailProvider/models/IMailProvider";

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: "Equipe GoBarber <equipe@gobarber.com>",
      to,
      subject: "Recuperação de Senha",
      text: body,
      // html: '<p><b>Hello</b> to myself!</p>'
    });

    console.log("Message sent: %s", message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
