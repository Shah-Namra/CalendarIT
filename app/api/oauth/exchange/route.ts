import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { NextRequest, NextResponse } from "next/server"; // Add NextResponse import

const redirectUri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api/oauth/exchange'
  : nylasConfig.redirectUri;

export async function GET(req: NextRequest) {
  try {
    const session = await requireUser();
    if (!session.user?.id) {
      return Response.json("User session not found", { status: 401 });
    }

    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return Response.json("Authorization code not found", { status: 400 });
    }

    try {
      const response = await nylas.auth.exchangeCodeForToken({
        clientSecret: nylasConfig.apiKey,
        clientId: nylasConfig.clientId,
        redirectUri: redirectUri,
        code: code,
      });

      if (!response || !response.grantId || !response.email) {
        throw new Error("Invalid response from Nylas");
      }

      const { grantId, email } = response;

      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          grantId: grantId,
          grantEmail: email,
        },
      });

      // Replace redirect with NextResponse.redirect
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch (error) {
      console.error("Nylas token exchange error:", error);
      // Add more detailed error logging
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
      return Response.json(
        "Failed to exchange authorization code", 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("OAuth exchange error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return Response.json(
      "An error occurred during authentication", 
      { status: 500 }
    );
  }
}