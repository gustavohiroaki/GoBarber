import handlebars from "handlebars";

import IMailTemplateProvider from "@shared/providers/MailTemplateProvider/models/IMailTemplateProvider";
import IParseMailTemplateDTO from "@shared/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO";

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
