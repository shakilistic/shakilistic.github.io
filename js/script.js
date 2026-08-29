/* =========================================================
   SHAKILSTIC PORTFOLIO CONTACT FORM
   GOOGLE APPS SCRIPT
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const OWNER_EMAIL = "tuku.co.bd@gmail.com";

const SHEET_NAME = "Website Enquiries";


/* =========================================================
   WEB APP TEST
========================================================= */

function doGet() {

  return ContentService
    .createTextOutput(
      "Portfolio contact form is running."
    )
    .setMimeType(
      ContentService.MimeType.TEXT
    );

}


/* =========================================================
   RECEIVE WEBSITE FORM
========================================================= */

function doPost(e) {

  try {

    const p = e.parameter || {};


    /* =====================================================
       SPAM / HONEYPOT CHECK
    ===================================================== */

    if (p.website) {

      return ContentService
        .createTextOutput("OK")
        .setMimeType(
          ContentService.MimeType.TEXT
        );

    }


    /* =====================================================
       GET FORM DATA
    ===================================================== */

    const name =
      clean(
        p.name,
        100
      );


    const email =
      clean(
        p.email,
        200
      );


    const projectType =
      clean(
        p.projectType,
        200
      );


    const budget =
      clean(
        p.budget,
        100
      );


    const message =
      clean(
        p.message,
        5000
      );


    const page =
      clean(
        p.page,
        500
      );


    /* =====================================================
       REQUIRED FIELD CHECK
    ===================================================== */

    if (
      !name ||
      !email ||
      !message
    ) {

      return ContentService
        .createTextOutput(
          "ERROR: Missing required fields."
        )
        .setMimeType(
          ContentService.MimeType.TEXT
        );

    }


    /* =====================================================
       EMAIL FORMAT CHECK
    ===================================================== */

    if (
      !isValidEmail(email)
    ) {

      return ContentService
        .createTextOutput(
          "ERROR: Invalid email."
        )
        .setMimeType(
          ContentService.MimeType.TEXT
        );

    }


    /* =====================================================
       GET GOOGLE SHEET
    ===================================================== */

    const ss =
      SpreadsheetApp
        .getActiveSpreadsheet();


    if (!ss) {

      throw new Error(
        "Google Sheet could not be found."
      );

    }


    /* =====================================================
       FIND / CREATE WEBSITE ENQUIRIES TAB
    ===================================================== */

    let sheet =
      ss.getSheetByName(
        SHEET_NAME
      );


    if (!sheet) {

      sheet =
        ss.insertSheet(
          SHEET_NAME
        );


      sheet.appendRow([

        "Timestamp",
        "Name",
        "Email",
        "Project Type",
        "Budget",
        "Message",
        "Page"

      ]);


      sheet
        .getRange(
          1,
          1,
          1,
          7
        )
        .setFontWeight(
          "bold"
        );


      sheet.setFrozenRows(1);

    }


    /* =====================================================
       SAVE FORM TO GOOGLE SHEET
    ===================================================== */

    sheet.appendRow([

      new Date(),

      safeSheetValue(
        name
      ),

      safeSheetValue(
        email
      ),

      safeSheetValue(
        projectType
      ),

      safeSheetValue(
        budget
      ),

      safeSheetValue(
        message
      ),

      safeSheetValue(
        page
      )

    ]);


    /* =====================================================
       EMAIL NOTIFICATION
       THIS GOES TO:
       tuku.co.bd@gmail.com
    ===================================================== */

    const emailSubject =
      "New Portfolio Enquiry — " +
      name;


    const emailBody =

      "You have received a new message from your portfolio website.\n\n" +

      "========================================\n" +

      "NEW PORTFOLIO ENQUIRY\n" +

      "========================================\n\n" +

      "Name:\n" +
      name +
      "\n\n" +

      "Email:\n" +
      email +
      "\n\n" +

      "Project Type:\n" +
      (
        projectType ||
        "Not selected"
      ) +
      "\n\n" +

      "Budget:\n" +
      (
        budget ||
        "Not specified"
      ) +
      "\n\n" +

      "Message:\n" +
      message +
      "\n\n" +

      "========================================\n\n" +

      "Submitted From:\n" +
      (
        page ||
        "Portfolio Website"
      ) +
      "\n\n" +

      "You can reply directly to this email to contact the client.";


    /* =====================================================
       SEND NOTIFICATION
    ===================================================== */

    MailApp.sendEmail({

      to:
        OWNER_EMAIL,

      subject:
        emailSubject,

      body:
        emailBody,

      replyTo:
        email,

      name:
        "SHAKIL R. Portfolio"

    });


    /* =====================================================
       LOG SUCCESS
    ===================================================== */

    console.log(
      "Form saved successfully."
    );


    console.log(
      "Notification sent to: " +
      OWNER_EMAIL
    );


    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return ContentService
      .createTextOutput(
        "OK"
      )
      .setMimeType(
        ContentService.MimeType.TEXT
      );


  }

  catch (error) {


    /* =====================================================
       ERROR LOG
    ===================================================== */

    console.error(
      "Portfolio form error:",
      error
    );


    return ContentService
      .createTextOutput(
        "ERROR: " +
        error.message
      )
      .setMimeType(
        ContentService.MimeType.TEXT
      );

  }

}


/* =========================================================
   DIRECT EMAIL TEST

   IMPORTANT:
   Run this function manually once from Apps Script.

   Function dropdown:
   testNotificationEmail

   Then click Run.
========================================================= */

function testNotificationEmail() {

  const remainingQuota =
    MailApp.getRemainingDailyQuota();


  console.log(
    "Remaining email quota: " +
    remainingQuota
  );


  MailApp.sendEmail({

    to:
      "tuku.co.bd@gmail.com",

    subject:
      "SHAKIL R. Portfolio — Notification Test",

    body:

      "Hello,\n\n" +

      "This is a test notification from your portfolio Google Apps Script.\n\n" +

      "If you received this email, your email notification system is working correctly.\n\n" +

      "Notification Email:\n" +
      "tuku.co.bd@gmail.com\n\n" +

      "— SHAKIL R. Portfolio",

    name:
      "SHAKIL R. Portfolio"

  });


  console.log(
    "Test notification sent successfully."
  );

}


/* =========================================================
   VALIDATE EMAIL FORMAT
========================================================= */

function isValidEmail(
  email
) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(
      String(email)
    );

}


/* =========================================================
   CLEAN USER INPUT
========================================================= */

function clean(
  value,
  limit
) {

  return String(
    value || ""
  )
    .trim()
    .slice(
      0,
      limit
    );

}


/* =========================================================
   PROTECT GOOGLE SHEET
   FROM FORMULA INJECTION
========================================================= */

function safeSheetValue(
  value
) {

  const text =
    String(
      value || ""
    );


  if (
    /^[=+\-@]/
      .test(text)
  ) {

    return "'" + text;

  }


  return text;

}
