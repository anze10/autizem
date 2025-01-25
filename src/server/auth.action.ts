"use server";

// import { z } from "zod"

// import { prisma } from "src/server/prisma"
// import { Argon2id } from 'oslo/password'
import { lucia } from "src/server/lucia";
import { cookies } from "next/headers";
//import { signInSchema } from "./SignInForm"
<<<<<<< HEAD
import { NextResponse } from 'next/server';
import { generateCodeVerifier, generateState } from "arctic"
import { googleOAuthClient } from "src/server/googleOauth"
=======
//import { redirect } from "next/navigation"
import { generateCodeVerifier, generateState } from "arctic";
import { google } from "src/server/googleOauth";
// import { signInSchema } from "~/validators/auth_due";


>>>>>>> test

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})
// export const signUpSchema = z.object({
//     name: z.string().min(5),
//     email: z.string().email(),
//     password: z.string().min(8),
//     confirmPassword: z.string().min(8),
// }).refine(data => data.password === data.confirmPassword, {
//     message: 'Passwords do not match',
//     path: ['confirmPassword']
// })

// export const signUp = async (values: z.infer<typeof signUpSchema>) => {
//     try {
//         // if user already exists, throw an error
//         const existingUser = await prisma.user.findUnique({
//             where: {
//                 email: values.email
//             }
//         })
//         if (existingUser) {
//             return { error: 'User already exists', success: false }
//         }

//         const hashedPassword = await new Argon2id().hash(values.password)

//         const user = await prisma.user.create({
//             data: {
//                 email: values.email.toLowerCase(),
//                 name: values.name,
//                 hashedPassword
//             }
//         })
//         const session = await lucia.createSession(user.id, {})
//         const sessionCookie = await lucia.createSessionCookie(session.id)
//             ; (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
//         return { success: true }
//     } catch {
//         return { error: 'Something went wrong', success: false }
//     }
// }

<<<<<<< HEAD
export async function  signIn  (values: z.infer<typeof signInSchema>) {
    const user = await prisma.user.findUnique({
        where: {
            email: values.email
        }
    })
    if (!user || !user.hashedPassword) {
        return { success: false, error: "Invalid Credentials!" }
    }
    const passwordMatch = await new Argon2id().verify(user.hashedPassword, values.password)
    if (!passwordMatch) {
        return { success: false, error: "Invalid Credentials!" }
    }
    // successfully login
    const session = await lucia.createSession(user.id, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
        ; (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return { success: true }
}
export async function logOut() {
    const sessionCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return NextResponse.redirect('http://localhost:3000');
}

export async function  getGoogleOauthConsentUrl () {
    try {
        const state = generateState()
        const codeVerifier = generateCodeVerifier()
=======

export async function logOut() {
  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return { success: true }; // Plain object
}

// export async function getGoogleOauthConsentUrl() {
//   try {
//     const state = generateState();
//     const codeVerifier = generateCodeVerifier();

//     (await cookies()).set("codeVerifier", codeVerifier, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//     });
//     (await cookies()).set("state", state, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//     });

//     const authUrl = googleOAuthClient.createAuthorizationURL(
//       state,
//       codeVerifier,
//       ["email", "profile"]
//     );
//     return { success: true, url: authUrl.toString() };
//   } catch (error: unknown) {
//     return { success: false, error };
//   }
// }



export async function getGoogleOauthConsentUrl() {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    // Store state and codeVerifier in cookies securely
    (await cookies()).set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    (await cookies()).set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Customize the scope and add additional OAuth parameters
    const scopes = [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];

    // Create authorization URL with the necessary parameters
    const authUrl = google.createAuthorizationURL(
      state,
      codeVerifier,
      scopes
    );

    return { success: true, url: authUrl.toString() };
  } catch (error: unknown) {
    return { success: false, error };
  }
}
>>>>>>> test


<<<<<<< HEAD
        const authUrl = googleOAuthClient.createAuthorizationURL(state, codeVerifier, ['email', 'profile'])
        return { success: true, url: authUrl.toString() }

    } catch {
        return { success: false, error: 'Something went wrong' }
    }
}
=======

>>>>>>> test
