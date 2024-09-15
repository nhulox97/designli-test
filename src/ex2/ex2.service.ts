import { BadRequestException, Injectable } from '@nestjs/common';
import { Attachment, simpleParser } from 'mailparser';
import { URL_REGULAR_EXPRESSION } from './constants';
import axios from 'axios';
import { UrlFileDownloadResult } from './types';

@Injectable()
export class Ex2Service {
  /**
   * Receives a buffer the parse it into string (utf-8) then that string is parsed to JSON
   * @param buffer Buffer to be parsed
   * @returns The parsed JSON
   */
  private parseJsonFromBuffer(buffer: Buffer): Record<string, any> {
    const stringContent = buffer.toString('utf-8');
    const jsonContent = JSON.parse(stringContent) as Record<string, any>;

    return jsonContent;
  }

  /**
   * Get JSON content from attachment if there is any JSON file attachment
   * @param attachments Email attachments
   * @returns The parsed JSON
   */
  private getjsonFromAttachments(
    attachments: Attachment[],
  ): Record<string, any> | undefined {
    const doesHaveAttachments = attachments?.length > 0;

    if (!doesHaveAttachments) return undefined;

    const jsonAttachment = attachments.find(
      (attachment) =>
        attachment.contentType === 'application/json' ||
        attachment.filename.endsWith('.json'),
    );

    if (!jsonAttachment) return undefined;

    return this.parseJsonFromBuffer(jsonAttachment.content);
  }

  /**
   * Receives an url then request to download its content.
   * @param url Url to download content
   * @returns The content and the contentType
   */
  private async downloadContentFromUrl(
    url: string,
  ): Promise<UrlFileDownloadResult | undefined> {
    try {
      const response = await axios({
        url: url,
        method: 'GET',
        responseType: 'arraybuffer',
      });

      const contentType = response.headers['content-type'] as string;
      const content = Buffer.from(response.data);

      return {
        content,
        contentType,
      };
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  /**
   * Executes a regular expression to get all urls from `<a>` tags from email body, downloads the
   * content from all urls, if some is content-type `application/json` then return its content as
   * the json. If not download the content from `application/html` contents and read the content of
   * each of them to see if there is any url, if some, download their content to check if there is any
   * `application/json` if some that will be the JSON response, if none return undefined.
   * @param emailBody Email content
   * @returns JSON content
   */
  private async getJsonFromContent(
    emailBody: string | false,
  ): Promise<Record<string, any> | undefined> {
    if (emailBody === false) return undefined;

    const urlsFromBody = [...emailBody.matchAll(URL_REGULAR_EXPRESSION)].map(
      (match) => match[1],
    );

    if (urlsFromBody.length <= 0) return undefined;

    const urlsContent = await Promise.all(
      urlsFromBody.map((url) => this.downloadContentFromUrl(url)),
    );
    const filteredUrlsContent = urlsContent.filter((content) => content);

    if (filteredUrlsContent.length === 0) return undefined;

    const jsonOnEmailBody = filteredUrlsContent.find((content) =>
      content.contentType.includes('application/json'),
    );

    if (jsonOnEmailBody)
      return this.parseJsonFromBuffer(jsonOnEmailBody.content);

    const htmlsContent = filteredUrlsContent.filter((content) =>
      content.content.includes('application/html'),
    );

    //TODO: implement logic for the last use-case when the url to download the json is inside another url
    if (htmlsContent.length > 0) {
      return undefined;
    }

    return undefined;
  }

  public async getJsonFromEmail(emailFile: Express.Multer.File) {
    const parsedEmail = await simpleParser(emailFile.buffer);

    const jsonFileFromAttachments = this.getjsonFromAttachments(
      parsedEmail.attachments,
    );

    if (jsonFileFromAttachments) return jsonFileFromAttachments;

    const jsonFromContent = await this.getJsonFromContent(parsedEmail.html);

    if (jsonFromContent) return jsonFromContent;

    throw new BadRequestException('The email does not have a json file');
  }
}
