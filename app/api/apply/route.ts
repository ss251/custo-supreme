import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const clientId = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN!;
const calendarId = process.env.GOOGLE_CALENDAR_ID!;

const oauth2Client = new OAuth2Client(clientId, clientSecret);
oauth2Client.setCredentials({ refresh_token: refreshToken });

const gmail = google.gmail({ version: 'v1', auth: oauth2Client as any });

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const resume = formData.get('resume') as File | null;

  try {
    console.log('Preparing email content...');
    let emailContent = `From: ${calendarId}
To: h.nelson@custosupreme.com, admin@custosupreme.com
Subject: New Job Application
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="boundary"

--boundary
Content-Type: text/plain; charset="UTF-8"

New Job Application Received

Name: ${name}
Email: ${email}
Phone: ${phone}

`;

    if (resume) {
      console.log('Preparing resume attachment...');
      const resumeBuffer = Buffer.from(await resume.arrayBuffer());
      const resumeBase64 = resumeBuffer.toString('base64');

      emailContent += `
--boundary
Content-Type: application/octet-stream
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="${resume.name}"

${resumeBase64}
`;
    }

    emailContent += '--boundary--';

    const encodedMessage = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    console.log('Sending email...');
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log('Email sent successfully:', res.data);

    return NextResponse.json({ message: 'Application submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Detailed error:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
    console.log('GOOGLE_CALENDAR_ID:', process.env.GOOGLE_CALENDAR_ID);
    return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 });
  }
}