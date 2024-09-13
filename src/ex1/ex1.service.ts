import { Injectable } from '@nestjs/common';
import { SnsEventDto } from './dto/sns-event.dto';
import { VerdictDto } from './dto/verdict.dto';
import { VerdicStatus } from './enums/verdict-status.enum';
import { ReceiptDto } from './dto/receipt.dto';
import { SnsResponseDoc } from './doc/sns-response.doc';

@Injectable()
export class Ex1Service {
  /**
   *
   * Receives a SNS-SES event to transform it into the proposed shape based on the values
   * within the event
   *
   * @param data SNS-SES event
   */
  public parseSnsSesEvent(data: SnsEventDto): SnsResponseDoc[] {
    const transformedRecords = data.Records.map((record) => {
      const { receipt, mail } = record.ses;
      const spam = this.didVerdictPass(receipt.spamVerdict);
      const virus = this.didVerdictPass(receipt.virusVerdict);
      const dns = this.didDnsVerdictPass(receipt);
      const retrasado = receipt.processingTimeMillis > 1000;
      const month = mail.timestamp.toLocaleString('default', { month: 'long' });
      const emisor = this.extractUsernameFromEmail(mail.source);
      const receptor = mail.destination.map((email) =>
        this.extractUsernameFromEmail(email),
      );

      return { spam, dns, month, virus, retrasado, emisor, receptor };
    });

    return transformedRecords;
  }

  private didDnsVerdictPass(receipt: ReceiptDto): boolean {
    return [
      this.didVerdictPass(receipt.spfVerdict),
      this.didVerdictPass(receipt.dkimVerdict),
      this.didVerdictPass(receipt.dmarcVerdict),
    ].every((didVerdictPass) => didVerdictPass);
  }

  /**
   * Evaluates if the verdict status is `PASS`
   *
   * @param verdict Verdict to evaluate
   * @returns Truthy when the status === `PASS`
   */
  private didVerdictPass(verdict: VerdictDto): boolean {
    return verdict.status === VerdicStatus.PASS;
  }

  /**
   * Validates if `email` contains the `@` char, if yes it will split the string by `@` and return
   * the first value of the array, if not, then return `email` itself
   *
   * @param email Destination email
   * @returns The username
   */
  private extractUsernameFromEmail(email: string) {
    return email.includes('@') ? email.split('@')[0] : email;
  }
}
