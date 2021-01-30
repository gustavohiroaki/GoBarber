import fs from "fs";
import mime from "mime";
import path from "path";
import aws, { S3 } from "aws-sdk";

import IStorageProvider from "@shared/providers/StorageProvider/models/IStorageProvider";

import uploadConfig from "@config/upload";

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_SET_REGION_S3 || "us-east-1",
      accessKeyId: process.env.AWS_SET_ACESS_KEY_ID || "defaultKey",
      secretAccessKey: process.env.AWS_SET_SECRET_ACCESS_KEY || "defaultKey",
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new Error("File not found");
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default DiskStorageProvider;
