const Services = require("../services/services");

class VerifyCodeController {
  async sendCode(req, res) {
    const { phoneNumber } = req.body;

    try {
      const code = Math.floor(100000 + Math.random() * 900000); // mã 6 chữ số
      console.log(code);

      // const text = `Mã xác minh của bạn là: ${code}`;
      await Services.CreateNewAccessCode(phoneNumber, code);

      res.json({ success: true, message: "SMS sent", code });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async verifyCode(req, res) {
    const { phoneNumber, code } = req.body;

    try {
      const userData = await Services.ValidateAccessCode(phoneNumber);
      if (!userData)
        return res
          .status(404)
          .json({ success: false, message: "Không tìm thấy người dùng" });

      const isMatch = userData.code === code;

      if (isMatch && !isExpired) {
        res.json({ success: true });
        // await Services.SetCode(phoneNumber); // Xóa mã sau khi xác minh thành công
      } else {
        res
          .status(400)
          .json({ success: false, message: "Mã sai hoặc hết hạn" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: "Lỗi xác minh" });
    }
  }

  // async savePhoneNumber(req, res) {
  //   const { phoneNumber } = req.body;

  //   if (!phoneNumber) {
  //     return res.status(400).json({ message: "Phone number is required" });
  //   }

  //   try {
      // await Services.savePhoneNumber(phoneNumber);
  //     res.status(200).json({ message: "Phone number saved successfully" });
  //   } catch (error) {
  //     console.error("Error saving phone number:", error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // }

  async saveGeneratedContent(req, res) {
    const { phoneNumber, captions } = req.body;
    console.log(phoneNumber, captions);

    if (!phoneNumber || !captions) {
      return res.status(400).json({ message: "Missing caption fields" });
    }
    try {
      await Services.saveGeneratedContent(phoneNumber, captions);
      res.status(200).json({ message: "Caption added" });
    } catch (error) {
      res.status(500).json({ message: "Error adding caption", error });
    }
  }

  async getUserGeneratedContents(req, res) {
    const phoneNumber = req.query.phoneNumber;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    try {
      const contents = await Services.GetUserGeneratedContents(phoneNumber);
      res.status(200).json(contents);
    } catch (error) {
      console.error("Error fetching user generated contents:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async UnSaveContent(req, res) {
    try {
      const { phoneNumber, captionId } = req.body;

      if (!phoneNumber || !captionId) {
        return res
          .status(400)
          .json({ message: "Thiếu phoneNumber hoặc captionId" });
      }

      const result = await Services.UnSaveContent(phoneNumber, captionId);
      res.status(200).json({ message: "Xóa caption thành công" });
      return result;
    } catch (error) {
      console.error("Lỗi xóa caption:", error);
      res.status(500).json({ message: error.message || "Lỗi server" });
    }
  }
}

module.exports = new VerifyCodeController();
