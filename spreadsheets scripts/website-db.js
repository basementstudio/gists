var TO_ADDRESS = "info@basement.studio"

function formatMailBody(obj) {
  var result = {
    internalEmail: "",
    subscriberEmail: "",
  }

  result.internalEmail +=
    "<h4 style='text-transform: capitalize; margin-bottom: 0'>Name: </h4><div>" +
    sanitizeInput(obj["name"]) +
    "</div><h4 style='text-transform: capitalize; margin-bottom: 0'>Email: </h4><div>" +
    sanitizeInput(obj["email"]) +
    "</div><h4 style='text-transform: capitalize; margin-bottom: 0'>Message: </h4><p>" +
    sanitizeInput(obj["message"]) +
    "</p>"
  result.subscriberEmail +=
    "<div>Hi " +
    sanitizeInput(obj["name"]) +
    "!,</div><div> We've received your email and someone from the team will get in touch soon.</div></div>Thanks for the interest and have a great day!</div>"
  return result
}

function sanitizeInput(rawInput) {
  var placeholder = HtmlService.createHtmlOutput(" ")
  placeholder.appendUntrusted(rawInput)

  return placeholder.getContent()
}

function doPost(e) {
  var PARSED_DATA = JSON.parse(e.postData.contents)

  try {
    Logger.log(e)
    record_data(PARSED_DATA)

    var mailData = PARSED_DATA

    var sendEmailTo =
      typeof TO_ADDRESS !== "undefined"
        ? TO_ADDRESS
        : mailData.formGoogleSendEmail

    if (sendEmailTo) {
      var email = formatMailBody(mailData)

      MailApp.sendEmail({
        to: String(sendEmailTo),
        subject: "A New person has sent an email through the website",
        htmlBody: email.internalEmail,
      })

      MailApp.sendEmail({
        to: String(sanitizeInput(mailData["email"])),
        subject: "Hi!",
        htmlBody: email.subscriberEmail,
      })
    }

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", data: JSON.stringify(e) })
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    Logger.log(error)
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error })
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

function record_data(e) {
  var lock = LockService.getDocumentLock()
  lock.waitLock(30000)

  try {
    Logger.log(e)

    var doc = SpreadsheetApp.getActiveSpreadsheet()

    // this is the name of the specific page to use as database
    var sheetName = "Website DB"

    var sheet = doc.getSheetByName(sheetName)
    var newEmail = e.email
    var row = [new Date(), newEmail]

    var nextRow = sheet.getLastRow() + 1
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row])
  } catch (error) {
    Logger.log(error)
  } finally {
    lock.releaseLock()
    return
  }
}
