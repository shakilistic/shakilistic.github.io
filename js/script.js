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
   TEST WEB APP
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
   RECEIVE FORM SUBMISSION
========================================================= */

function doPost(e) {

  try {

    const p = e.parameter || {};


    /*
    SPAM / HONEYPOT CHECK
    */

    if (p.website) {

      return ContentService
        .createTextOutput("OK");

    }


    /*
    GET FORM DATA
    */

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


    /*
    REQUIRED FIELD CHECK
    */

    if (
      !name ||
      !email ||
      !message
    ) {

      return ContentService
        .createTextOutput(
          "ERROR: Missing required fields."
        );

    }


    /*
    EMAIL FORMAT CHECK
    */

    if (
      !isValidEmail(email)
    ) {

      return ContentService
        .createTextOutput(
          "ERROR: Invalid email."
        );

    }


    /*
    GET GOOGLE SHEET
    */

    const ss =
      SpreadsheetApp
        .getActiveSpreadsheet();


    if (!ss) {

      throw new Error(
        "Google Sheet could not be found."
      );

    }


    /*
    FIND OR CREATE SHEET TAB
    */

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


    /*
    SAVE TO GOOGLE SHEET
    */

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


    /*
    SEND EMAIL NOTIFICATION
    */

    MailApp.sendEmail({

      to:
        OWNER_EMAIL,

      subject:
        "New Portfolio Enquiry — " +
        name,

      body:

        "You have received a new enquiry from your portfolio website.\n\n" +

        "----------------------------------------\n" +

        "Name: " +
        name +
        "\n\n" +

        "Email: " +
        email +
        "\n\n" +

        "Project Type: " +
        (
          projectType ||
          "Not selected"
        ) +
        "\n\n" +

        "Budget: " +
        (
          budget ||
          "Not specified"
        ) +
        "\n\n" +

        "Message:\n" +
        message +
        "\n\n" +

        "----------------------------------------\n" +

        "Submitted from:\n" +
        (
          page ||
          "Portfolio website"
        ) +
        "\n\n" +

        "You can reply directly to this email to contact the client.",

      replyTo:
        email

    });


    /*
    SUCCESS RESPONSE
    */

    return ContentService
      .createTextOutput(
        "OK"
      )
      .setMimeType(
        ContentService.MimeType.TEXT
      );


  }

  catch (error) {

    console.error(
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
   VALIDATE EMAIL
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
   CLEAN INPUT
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
