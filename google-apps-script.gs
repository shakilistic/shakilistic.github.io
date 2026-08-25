/*
  SHAKILSTIC PORTFOLIO — GOOGLE SHEETS CONTACT FORM
  1) Create a Google Sheet.
  2) Extensions → Apps Script.
  3) Paste this code.
  4) Change OWNER_EMAIL below to your email.
  5) Deploy → New deployment → Web app.
     Execute as: Me
     Who has access: Anyone
  6) Copy the Web App URL into js/script.js:
     const GOOGLE_SCRIPT_URL="YOUR_URL";
*/

const OWNER_EMAIL = "YOUR_EMAIL@example.com";
const SHEET_NAME = "Enquiries";

function doGet() {
  return ContentService.createTextOutput("Shakilstic contact endpoint is running.");
}

function doPost(e) {
  try {
    const p = e.parameter || {};
    if (p.website) {
      return ContentService.createTextOutput("OK");
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp","Name","Email","Service","Message","Page"]);
    }

    const timestamp = new Date();
    const name = String(p.name || "").trim();
    const email = String(p.email || "").trim();
    const service = String(p.service || "").trim();
    const message = String(p.message || "").trim();

    sheet.appendRow([
      timestamp,
      name,
      email,
      service,
      message,
      "shakilstic.github.io"
    ]);

    if (OWNER_EMAIL && !OWNER_EMAIL.includes("YOUR_EMAIL")) {
      MailApp.sendEmail({
        to: OWNER_EMAIL,
        subject: "New portfolio enquiry — " + (name || "New lead"),
        htmlBody:
          "<h2>New Shakilstic portfolio enquiry</h2>" +
          "<p><b>Name:</b> " + escapeHtml(name) + "</p>" +
          "<p><b>Email:</b> " + escapeHtml(email) + "</p>" +
          "<p><b>Service:</b> " + escapeHtml(service) + "</p>" +
          "<p><b>Message:</b><br>" + escapeHtml(message).replace(/\n/g,"<br>") + "</p>"
      });
    }

    return ContentService.createTextOutput("OK");
  } catch (error) {
    return ContentService.createTextOutput("ERROR: " + error.message);
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}
