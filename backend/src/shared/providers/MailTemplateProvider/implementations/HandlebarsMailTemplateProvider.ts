import handlebars from "handlebars";
import fs from "fs";

import IMailTemplateProvider from "@shared/providers/MailTemplateProvider/models/IMailTemplateProvider";
import IParseMailTemplateDTO from "@shared/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO";

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
