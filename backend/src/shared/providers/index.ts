import { container } from "tsyringe";
import mailConfig from "@config/mail";

import IStorageProvider from "@shared/providers/StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "@shared/providers/StorageProvider/implementations/DiskStorageProvider";

import IMailProvider from "@shared/providers/MailProvider/models/IMailProvider";
import EtherealMailProvider from "@shared/providers/MailProvider/implementations/EtherealMailProvider";
import SESMailProvider from "@shared/providers/MailProvider/implementations/SESMailProvider";

import IMailTemplateProvider from "@shared/providers/MailTemplateProvider/models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "@shared/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  HandlebarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailConfig.driver === "ethereal"
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider)
);
