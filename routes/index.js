var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
const { exec } = require("child_process");
var convert = require("xml-js");
const fs = require("fs");
/* GET home page. */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/ifc2json", upload.single("file"), function (req, res, next) {
  // file is not getting correctly stored in files folder
  console.log(req.file);
  exec(
    `IfcConvert-win.exe ${req.file.path} output/${
      req.file.originalname.split(".")[0]
    }.xml`
  ).on("exit", () => {
    const xml = fs.readFileSync(
      `output/${req.file.originalname.split(".")[0]}.xml`,
      "utf8"
    );
    var result = convert.xml2json(xml, { compact: true, spaces: 4 });
    fs.unlinkSync(req.file.path);
    fs.unlinkSync(`output/${req.file.originalname.split(".")[0]}.xml`);
    res.json(JSON.parse(result));
  });
});

module.exports = router;
