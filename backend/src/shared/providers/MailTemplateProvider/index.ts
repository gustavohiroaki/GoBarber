import { container } from "tsyringe";

import HandlebarsMailTemplateProvider from "@shared/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";

import IMailTemplateProvider from "@shared/providers/MailTemplateProvider/models/IMailTemplateProvider";

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  HandlebarsMailTemplateProvider
);
