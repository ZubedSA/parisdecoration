/**
 * Google Apps Script for Paris Decoration
 * Uploads images to Google Drive and returns direct preview/view URLs.
 * 
 * Deployment Instructions:
 * 1. Open Google Apps Script (script.google.com).
 * 2. Paste this code into Code.gs.
 * 3. Replace DRIVE_FOLDER_ID with your target Google Drive folder ID,
 *    or set it in Script Properties: DRIVE_FOLDER_ID.
 * 4. Set UPLOAD_SECRET in Script Properties: UPLOAD_SECRET (optional but recommended).
 * 5. Deploy as Web App:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Copy the Web App URL and set in your .env as GOOGLE_APPS_SCRIPT_URL.
 */

const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
const FOLDER_ID = SCRIPT_PROPERTIES.getProperty("DRIVE_FOLDER_ID") || "YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE";
const UPLOAD_SECRET = SCRIPT_PROPERTIES.getProperty("UPLOAD_SECRET") || "";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: "Empty request body" }, 400);
    }

    const payload = JSON.parse(e.postData.contents);
    const action = payload.action || "upload";

    // Validate security secret if configured
    if (UPLOAD_SECRET && payload.secret !== UPLOAD_SECRET) {
      return jsonResponse({ success: false, error: "Unauthorized access: Invalid secret token" }, 401);
    }

    if (action === "upload") {
      return handleUpload(payload);
    } else if (action === "delete") {
      return handleDelete(payload);
    } else {
      return jsonResponse({ success: false, error: "Invalid action" }, 400);
    }
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() }, 500);
  }
}

function doGet(e) {
  return jsonResponse({
    status: "ok",
    service: "Paris Decoration Google Drive Media Handler",
    timestamp: new Date().toISOString()
  });
}

function handleUpload(payload) {
  const { fileName, mimeType, base64 } = payload;

  if (!fileName || !base64) {
    return jsonResponse({ success: false, error: "fileName and base64 data are required" }, 400);
  }

  // Get target folder
  let folder;
  if (FOLDER_ID && FOLDER_ID !== "YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE") {
    folder = DriveApp.getFolderById(FOLDER_ID);
  } else {
    // Default to root or 'Paris Decoration Media' folder
    const folders = DriveApp.getFoldersByName("Paris Decoration Media");
    folder = folders.hasNext() ? folders.next() : DriveApp.createFolder("Paris Decoration Media");
  }

  // Clean base64 string if it contains data URI prefix
  let cleanBase64 = base64;
  if (cleanBase64.indexOf(",") > -1) {
    cleanBase64 = cleanBase64.split(",")[1];
  }

  const decodedBytes = Utilities.base64Decode(cleanBase64);
  const blob = Utilities.newBlob(decodedBytes, mimeType || "image/jpeg", fileName);

  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const fileId = file.getId();
  // Direct web-viewable Google Drive URL
  const driveUrl = "https://lh3.googleusercontent.com/d/" + fileId;
  const standardUrl = "https://drive.google.com/uc?export=view&id=" + fileId;

  return jsonResponse({
    success: true,
    fileId: fileId,
    fileName: file.getName(),
    url: driveUrl,
    fallbackUrl: standardUrl,
    size: file.getSize()
  });
}

function handleDelete(payload) {
  const { fileId } = payload;
  if (!fileId) {
    return jsonResponse({ success: false, error: "fileId is required" }, 400);
  }

  try {
    const file = DriveApp.getFileById(fileId);
    file.setTrashed(true);
    return jsonResponse({ success: true, message: "File successfully moved to trash" });
  } catch (err) {
    return jsonResponse({ success: false, error: "Failed to delete file: " + err.toString() }, 404);
  }
}

function jsonResponse(data, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
