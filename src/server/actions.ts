"use server"
import { lucia } from "src/server/lucia";  // Ensure you import your configured Lucia instance
import { google } from "googleapis";

export default async function createSpreadsheet(req, res) {
  // Retrieve the JWT token from cookies (assuming it's stored in cookies)
  const token = req.cookies['lucia_auth_token'];

  if (!token) {
    res.status(401).json({ error: "No access token provided" });
    return;
  }

  // Verify the JWT token using Lucia
  let userId;
  try {
    const user = await lucia.auth.authenticateUser("jwt", token);
    userId = user.user_id;  // or any other user identifier you need
  } catch (error) {
    res.status(401).json({ error: "Authentication failed: " + error.message });
    return;
  }

  // Setup Google OAuth client
  const client = new google.auth.OAuth2();

  // Set credentials using the token directly (if it’s a JWT suitable for Google)
  client.setCredentials({
    access_token: token,
  });

  // Initialize Google Sheets API
  const service = google.sheets({ version: "v4", auth: client });

  try {
    // Create a new spreadsheet
    const response = await service.spreadsheets.create({
      requestBody: {
        properties: {
          title: "New Spreadsheet",
        },
      },
      fields: "spreadsheetId",
    });

    res.status(200).json(response.data);  // Send back the spreadsheet details
  } catch (err) {
    console.error("Error creating Google Spreadsheet", err);
    res.status(500).json({ error: "Google Spreadsheet creation failed"
