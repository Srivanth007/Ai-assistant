import { google } from 'googleapis';

export async function GET() {
  const redirectUri = 'http://localhost:3000/api/callback/google';

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.readonly', 'profile', 'email'],
    prompt: 'consent',
  });

  return Response.redirect(url);
}
