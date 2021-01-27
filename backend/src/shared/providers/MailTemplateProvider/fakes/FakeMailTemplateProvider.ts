import IMailTemplateProvider from "@shared/providers/MailTemplateProvider/models/IMailTemplateProvider";

import IParseMailTemplateDTO from "@shared/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO";

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
