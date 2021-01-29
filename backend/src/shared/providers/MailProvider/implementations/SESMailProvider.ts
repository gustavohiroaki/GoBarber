import nodemailer, { Transporter } from "nodemailer";
import aws from "aws-sdk";
import mailConfig from "@config/mail";

import { injectable, inject } from "tsyringe";

import ISendMailDTO from "@shared/providers/MailProvider/dtos/ISendMailDTO";
import IMailProvider from "@shared/providers/MailProvider/models/IMailProvider";

import IMailTemplateProvider from "@shared/providers/MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_SET_REGION || "sa-east-1",
        accessKeyId: process.env.AWS_SET_ACESS_KEY_ID || "defaultKey",
        secretAccessKey: process.env.AWS_SET_SECRET_ACCESS_KEY || "defaultKey",
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;

    console.log({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
    });

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
