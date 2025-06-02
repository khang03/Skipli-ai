require("dotenv").config();
const db = require("../firebase");

const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

const CreateNewAccessCode = async (phoneNumber, code) => {
  try {
    await db.collection("phoneNumbers").doc(phoneNumber).set({
      code: code,
      codeCreatedAt: new Date(),
    });
    await new Promise((resolve, reject) => {
      vonage.sms.send(
        { to: phoneNumber, from: "Vonage", text: `Mã xác minh là ${code}` },
        (err, response) => {
          if (err) return reject(err);
          if (response.messages[0].status !== "0") {
            return reject(new Error(response.messages[0]["error-text"]));
          }
          resolve(response);
        }
      );
    });

    console.log("Lưu thành công");
  } catch (err) {
    console.error("Lỗi gửi mã:", err);
    res.status(500).json({ success: false });
  }
};

const ValidateAccessCode = async (phoneNumber) => {
  await db.collection("phoneNumbers").doc(phoneNumber).get();
};
const SetCode = async (phoneNumber) => {
  await db.collection("phoneNumbers").doc(phoneNumber).set(
    {
      code: "",
      codeCreatedAt: new Date(),
    },
    { merge: true }
  );
};
const saveGeneratedContent = async (phoneNumber, captionData) => {
  await db
    .collection("phoneNumbers")
    .doc(phoneNumber)
    .collection("generatedContents") // subcollection
    .add({
      captionData,
      createdAt: new Date(),
    });
};
const GetUserGeneratedContents = async (phoneNumber) => {
  const snapshot = await db
    .collection("phoneNumbers")
    .doc(phoneNumber)
    .collection("generatedContents")
    .get();

  const contents = [];
  snapshot.forEach((doc) => {
    contents.push({ id: doc.id, ...doc.data() });
  });
  return contents;
};

const UnSaveContent = async (phoneNumber, captionId) => {
  const captionRef = await db
    .collection("phoneNumbers")
    .doc(phoneNumber)
    .collection("generatedContents")
    .doc(captionId);

  await captionRef.delete();
  return;
};

module.exports = {
  CreateNewAccessCode,
  // savePhoneNumber,
  saveGeneratedContent,
  GetUserGeneratedContents,
  UnSaveContent,
  ValidateAccessCode,
  SetCode,
};
