/*
=============================================================
SHAKILSTIC PORTFOLIO
GOOGLE SHEETS CONTACT FORM
=============================================================


SETUP:

1. Create/Open your Google Sheet.

2. Extensions → Apps Script.

3. Paste this complete code.

4. Change OWNER_EMAIL below.

5. Save.

6. Deploy → New deployment.

7. Type:
   Web app

8. Execute as:
   Me

9. Who has access:
   Anyone

10. Deploy.

11. Copy the /exec URL.

12. Paste URL inside website js/script.js:

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/XXXXXXXX/exec";


=============================================================
*/


/*
=============================================================
YOUR EMAIL

Change only this.
=============================================================
*/

const OWNER_EMAIL =
    "YOUR_EMAIL@example.com";



/*
=============================================================
SHEET TAB NAME
=============================================================
*/

const SHEET_NAME =
    "Website Enquiries";



/* ==========================================================
   TEST ENDPOINT
========================================================== */

function doGet() {


    return ContentService
        .createTextOutput(
            "Shakilstic portfolio contact endpoint is running."
        )
        .setMimeType(
            ContentService.MimeType.TEXT
        );


}



/* ==========================================================
   RECEIVE FORM
========================================================== */

function doPost(e) {


    try {


        const parameters =
            e.parameter
            ||
            {};



        /*
        =====================================================
        HONEYPOT SPAM CHECK
        =====================================================
        */

        if (
            parameters.website
        ) {


            return ContentService
                .createTextOutput(
                    "OK"
                );


        }



        /* ==================================================
           CLEAN DATA
        ================================================== */

        const name =
            clean(
                parameters.name,
                100
            );


        const email =
            clean(
                parameters.email,
                200
            );


        const projectType =
            clean(
                parameters.projectType,
                200
            );


        const budget =
            clean(
                parameters.budget,
                100
            );


        const message =
            clean(
                parameters.message,
                5000
            );


        const page =
            clean(
                parameters.page,
                500
            );



        /* ==================================================
           BASIC SERVER VALIDATION
        ================================================== */

        if (
            !name
            ||
            !email
            ||
            !message
        ) {


            return ContentService
                .createTextOutput(
                    "ERROR: Required information missing."
                );


        }



        if (
            !isValidEmail(
                email
            )
        ) {


            return ContentService
                .createTextOutput(
                    "ERROR: Invalid email."
                );


        }



        /* ==================================================
           GET GOOGLE SHEET
        ================================================== */

        const spreadsheet =

            SpreadsheetApp
                .getActiveSpreadsheet();



        let sheet =

            spreadsheet
                .getSheetByName(
                    SHEET_NAME
                );



        /* ==================================================
           CREATE TAB IF NOT EXISTS
        ================================================== */

        if (
            !sheet
        ) {


            sheet =

                spreadsheet
                    .insertSheet(
                        SHEET_NAME
                    );



            sheet.appendRow(

                [

                    "Timestamp",

                    "Name",

                    "Email",

                    "Project Type",

                    "Budget",

                    "Message",

                    "Page"

                ]

            );



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



            sheet.setFrozenRows(
                1
            );


        }



        /* ==================================================
           SAVE ENQUIRY
        ================================================== */

        sheet.appendRow(

            [

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

            ]

        );



        /* ==================================================
           EMAIL NOTIFICATION
        ================================================== */

        if (

            OWNER_EMAIL

            &&

            !OWNER_EMAIL.includes(
                "YOUR_EMAIL"
            )

        ) {


            const subject =

                "New Portfolio Enquiry — "
                +
                (
                    name
                    ||
                    "New Client"
                );



            const htmlBody = `

                <div
                    style="
                        font-family:Arial,sans-serif;
                        max-width:680px;
                        margin:auto;
                        color:#222;
                    "
                >

                    <h2
                        style="
                            margin-bottom:20px;
                        "
                    >
                        New Shakilstic Portfolio Enquiry
                    </h2>


                    <p>
                        <strong>Name:</strong><br>
                        ${escapeHtml(name)}
                    </p>


                    <p>
                        <strong>Email:</strong><br>
                        ${escapeHtml(email)}
                    </p>


                    <p>
                        <strong>Project Type:</strong><br>
                        ${escapeHtml(projectType)}
                    </p>


                    <p>
                        <strong>Budget:</strong><br>
                        ${escapeHtml(budget)}
                    </p>


                    <p>
                        <strong>Message:</strong><br><br>

                        ${escapeHtml(message)
                            .replace(
                                /\n/g,
                                "<br>"
                            )
                        }

                    </p>


                    <hr
                        style="
                            border:0;
                            border-top:1px solid #ddd;
                            margin:25px 0;
                        "
                    >


                    <p
                        style="
                            color:#777;
                            font-size:12px;
                        "
                    >

                        Submitted from:

                        <br>

                        ${escapeHtml(page)}

                    </p>

                </div>

            `;



            MailApp.sendEmail(

                {

                    to:
                        OWNER_EMAIL,


                    subject:
                        subject,


                    htmlBody:
                        htmlBody,


                    body:

                        "New portfolio enquiry\n\n"

                        +

                        "Name: "
                        +
                        name
                        +
                        "\n"

                        +

                        "Email: "
                        +
                        email
                        +
                        "\n"

                        +

                        "Project Type: "
                        +
                        projectType
                        +
                        "\n"

                        +

                        "Budget: "
                        +
                        budget
                        +
                        "\n\n"

                        +

                        "Message:\n"
                        +
                        message,


                    replyTo:
                        email

                }

            );


        }



        /* ==================================================
           SUCCESS
        ================================================== */

        return ContentService

            .createTextOutput(
                "OK"
            )

            .setMimeType(
                ContentService.MimeType.TEXT
            );


    }



    catch (
        error
    ) {


        console.error(
            error
        );


        return ContentService

            .createTextOutput(

                "ERROR: "
                +
                error.message

            )

            .setMimeType(
                ContentService.MimeType.TEXT
            );


    }


}



/* ==========================================================
   EMAIL FORMAT
========================================================== */

function isValidEmail(
    email
) {


    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            String(
                email
            )
        );


}



/* ==========================================================
   CLEAN STRING
========================================================== */

function clean(
    value,
    maxLength
) {


    return String(
        value
        ||
        ""
    )

    .trim()

    .slice(
        0,
        maxLength
    );


}



/* ==========================================================
   PREVENT GOOGLE SHEET FORMULA INJECTION
========================================================== */

function safeSheetValue(
    value
) {


    const text =
        String(
            value
            ||
            ""
        );


    if (
        /^[=+\-@]/
            .test(
                text
            )
    ) {


        return "'"
            +
            text;


    }


    return text;


}



/* ==========================================================
   ESCAPE HTML FOR EMAIL
========================================================== */

function escapeHtml(
    string
) {


    return String(
        string
        ||
        ""
    )

    .replace(
        /&/g,
        "&amp;"
    )

    .replace(
        /</g,
        "&lt;"
    )

    .replace(
        />/g,
        "&gt;"
    )

    .replace(
        /"/g,
        "&quot;"
    )

    .replace(
        /'/g,
        "&#039;"
    );


}
