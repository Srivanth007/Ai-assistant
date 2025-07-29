

import axios from "axios";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  try {
   
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, refresh_token, expires_in, id_token } = tokenRes.data;

    
    const profileRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const profile = profileRes.data;

    
    const user = await prisma.user.upsert({
      where: { email: profile.email },
      update: {
        name: profile.name,
        image: profile.picture,
      },
      create: {
        email: profile.email,
        name: profile.name,
        image: profile.picture,
      },
    });

    const expiresAt = new Date(Date.now() + expires_in * 1000);
    await prisma.token.upsert({
      where: {
        userId_provider: {
          userId: user.id,
          provider: "google",
        },
      },
      update: {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt,
      },
      create: {
        userId: user.id,
        provider: "google",
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt,
      },
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/chat`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    return new NextResponse("OAuth callback error", { status: 500 });
  }
}
