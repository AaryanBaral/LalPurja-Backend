const express = require("express");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const Dotenv = require("dotenv");
const multer = require("multer")
const connection = require("./User/server/database/connection");
const UserRoute = require("./User/server/routes/router")
var cors = require("cors");
const app = express();

app.use(cors({origin:["http://localhost:3000", "http://localhost:3001", "https://localhost:3000", "https://localhost:3001","https://lalpurjanepal.com.np","https://admin.lalpurjanepal.com.np","http://localhost:19006","http://admin.lalpurjanepal.com.np","http://lalpurjanepal.com.np"],credentials:true,methods:["GET","HEAD","PUT","PATCH","POST","DELETE"],preflightContinue:false}))

Dotenv.config({path: "config.env"});
const PORT = process.env.PORT || 3000;

app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const filefilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp" ||
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/mov" ||
      file.mimetype === "video/wvm" ||
      file.mimetype === "video/avi" ||
      file.mimetype === "video/avchd" ||
      file.mimetype === "video/webm" ||
      file.mimetype === "video/mkv" ||
      file.mimetype === "video/flv"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }; 

    
    app.use(express.static("public"));
    app.use(
      multer({ storage: fileStorage, fileFilter: filefilter,limits: { fileSize: 100000000 } }).fields([{
        name:"image",
        maxCount:10
      }])
  );
  
  
  
  
  
  connection.connectDB();
  
  // for routing the pages
  app.use("/", UserRoute);
  
  
  
  // running the app in the given port
const server = app.listen(PORT,()=>{
  console.log(`code running at http://localhost:${PORT}` );
})


