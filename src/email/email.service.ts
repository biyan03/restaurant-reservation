import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config'; 

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

  private transporter;

  constructor(private configService: ConfigService) {
    // Get email credentials from environment variables
    const emailUser = this.configService.get<string>('EMAIL_USER');
    const emailPass = this.configService.get<string>('EMAIL_PASS');

    // Configure the SMTP transporter using environment variables
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
  }

  // Send an email
  async sendReservationEmail(
    to: string,  // Customer's email address
    subject: string,  // Subject of the email
    text: string,  // Body of the email (plain text)
    html: string,  // Body of the email (HTML)
  ): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),  // Sender's email from .env file
      to,  // Customer's email address
      subject,
      text,
      html,
    };

    try {
      // Send the email
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Reservation email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send reservation email: ${error.message}`);
    }
  }
}
