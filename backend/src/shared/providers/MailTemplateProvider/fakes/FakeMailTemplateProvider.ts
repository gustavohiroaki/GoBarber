import IMailTemplateProvider from "@shared/providers/MailTemplateProvider/models/IMailTemplateProvider";

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return "Mail Content";
  }
}
