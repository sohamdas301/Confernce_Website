var {
  conferencedb,
  gallery,
  speaker,
  sponsor,
  cheifpatron,
  patron,
  internatad,
  naadcom,
  gencha,
  gencochair,
  ficha,
  teproch,
  orgch,
  pubch,
  publich,
  sponch,
} = require("../model/model");
var multer = require("multer");

var fs = require("fs");
const path = require("path");
const { Console } = require("console");

const validator = require("validator");
const User = require("../model/userModel.js");
const bcrypt = require("bcryptjs");

const passport = require("passport");

const flash = require("connect-flash");
const nodemailer = require("nodemailer");
var otpGenerator = require("otp-generator");
var otp = 0;
var forgototp = 0;

exports.confirmP = (req, res) => {
  var password = req.body.password;
  var cpassword = req.body.cpassword;
  const email = req.body.email;

  if (password === cpassword) {
    User.findOne({ email: email }).then((user) => {
      //password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          // set passowrd to hash
          user.password = hash;
          //save user
          user.save();
        });
      });
    });

    

    res.redirect("/login");
  } else {
    req.flash("error_msg", "Both Passwords are not same");
    res.redirect("/ConfirmPassword");
  }
};

exports.forgotpassword = (req, res) => {
  
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      forgototp = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
      });

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "lbsproject123456@gmail.com",
          pass: "projectlbs123",
        },
      });

      var mailOptions = {
        from: "lbsproject123456@gmail.com",
        to: req.body.email,
        subject: "Sending Email using Node.js",
        text: `Your OTP is ${forgototp}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.render("forgototp", { email: req.body.email });
    } else {
      req.flash("error_msg", "Please pass Registered mail");
      res.redirect("/forgotpassword");
    }
  });
};

var hj = {};

exports.otp = (req, res) => {
  

  if (req.body.otp === otp) {
    hj.save();

    res.redirect("/login");
  } else {
    req.flash("error", "Please Register again");
    res.redirect("/login");
  }
};

exports.loginotp = (req, res) => {
  

  if (req.body.otp === otp) {
    res.redirect("/admin");
  } else {
    req.flash("error", "Please Login again");
    res.redirect("/login");
  }
};

exports.forgototp = (req, res) => {
  if (req.body.otp === forgototp) {
    res.render("confirmP", { email: req.body.email });
  } else {
    res.redirect("/login");
  }
};

exports.afterlogin = (req, res) => {
  const { username, email, password, cpassword } = req.body;
  
  let errors = [];

  //check required fields
  if (!username || !email || !password || !cpassword) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //check  password
  if (password !== cpassword) {
    
    errors.push({ msg: "Passwords do not match" });
  }

  //check pass length
  if (password.length < 6) {
    
    errors.push({ msg: "Passwords Should at least 6 characters" });
  }
  if (errors.length > 0) {
    res.render("login", {
      errors,
      username,
      email,
      password,
      cpassword,
    });
  } else {
    //validation pass
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          //user exist
          errors.push({ msg: "Email is already Registered" });
          res.render("login", {
            errors,
            username,
            email,
            password,
            cpassword,
          });
        } else {
          const newUser = new User({
            username,
            email,
            password,
          });
          //password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              // set passowrd to hash
              newUser.password = hash;
              //save user
              hj = newUser;
            });
          });
        }
      })
      .then((user) => {
        otp = otpGenerator.generate(6, {
          upperCase: false,
          specialChars: false,
        });

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "lbsproject123456@gmail.com",
            pass: "projectlbs123",
          },
        });

        var mailOptions = {
          from: "lbsproject123456@gmail.com",
          to: req.body.email,
          subject: "Your One Time Password",
          html: `<h2> Your OTP is ${otp}</h2>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        res.render("otp", { email: req.body.email });
      })
      .catch((err) => console.log(err));
  }
};

exports.login = (req, res, next) => {
  

  User.findOne({ email: req.body.email }).then((finduser) => {
    
    if (finduser.isAdmin === false || finduser.isAdmin === null) {
      req.flash("error_msg", "You haven't been Approved as an Admin");
      res.redirect("/login");
      return;
    }
    if (finduser) {
      

      bcrypt.compare(req.body.password, finduser.password, (err, isMatch) => {
        

        if (isMatch) {
          
          otp = otpGenerator.generate(6, {
            upperCase: false,
            specialChars: false,
          });

          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "lbsproject123456@gmail.com",
              pass: "projectlbs123",
            },
          });

          var mailOptions = {
            to: req.body.email,
            from: "lbsproject123456@gmail.com",
            subject: "Your One Time Password",
            html: `<h2> Your OTP : ${otp}</h2>`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      });
    }
  });

  passport.authenticate("local", {
    successRedirect: "/loginotp",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

exports.create = (req, res) => {
  var files = [];
  var filess = [];
  var galfile = [];

  files = req.files.fileToUpload;
  filess = req.files.sfileToUpload;
  galfile = req.files.gallery_img;

  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path);
    let finalimg = {
      data: img,
      contentType: "image/png",
    };
    let resultHandler = function (err) {
      if (err) {
        console.log("unlink failed", err);
      } else {
        console.log("file deleted");
      }
    };

    fs.unlink(file.path, resultHandler);
    return finalimg;
  });

  

  let speaobj = [];
  let speaob;

  if (!Array.isArray(req.body.speakername)) {
    for (i = 0; i < files.length; i++) {
      speaob = {
        img: imgArray[i],
        speakername: req.body.speakername,
        speakerdesc: req.body.speakerdesc,
      };
      speaobj.push(speaob);
    }
  } else if (Array.isArray(req.body.speakername)) {
    for (i = 0; i < files.length; i++) {
      speaob = {
        img: imgArray[i],
        speakername: req.body.speakername[i],
        speakerdesc: req.body.speakername[i],
      };
      speaobj.push(speaob);
    }
  }

  let imgsArray = filess.map((fil) => {
    let imgs = fs.readFileSync(fil.path);
    let finalimgs = {
      data: imgs,
      contentType: "image/png",
    };
    let resultHandler = function (err) {
      if (err) {
        console.log("unlink failed", err);
      } else {
        console.log("file deleted");
      }
    };

    fs.unlink(fil.path, resultHandler);
    return finalimgs;
  });

  

  let sponobj = [];
  let sponob;

  if (!Array.isArray(req.body.sponsorname)) {
    for (i = 0; i < filess.length; i++) {
      sponob = {
        img: imgsArray[i],
        sponsorname: req.body.sponsorname,
      };
      sponobj.push(sponob);
    }
  } else if (Array.isArray(req.body.sponsorname)) {
    for (i = 0; i < filess.length; i++) {
      sponob = {
        img: imgsArray[i],
        sponsorname: req.body.sponsorname[i],
      };
      sponobj.push(sponob);
    }
  }

  let imgsArrayfile = galfile.map((filee) => {
    let imgss = fs.readFileSync(filee.path);
    let finalimgss = {
      data: imgss,
      contentType: "image/png",
    };
    let resultHandler = function (err) {
      if (err) {
        console.log("unlink failed", err);
      } else {
        console.log("file deleted");
      }
    };
    fs.unlink(filee.path, resultHandler);
    return finalimgss;
  });

  

  let galleryobj = [];
  let galleryob;

  if (!Array.isArray(req.body.img_cap)) {
    for (i = 0; i < galfile.length; i++) {
      galleryob = {
        img: imgsArrayfile[i],
        caption: req.body.img_cap,
      };
      galleryobj.push(galleryob);
    }
  } else if (Array.isArray(req.body.img_cap)) {
    for (i = 0; i < galfile.length; i++) {
      galleryob = {
        img: imgsArrayfile[i],
        caption: req.body.img_cap[i],
      };
      galleryobj.push(galleryob);
    }
  }

  const conf = new conferencedb({
    landingpage: false,
    title: req.body.bigheading,
    fromdate: req.body.formdate,
    todate: req.body.todate,
    venue: req.body.venue,
    url: req.body.Link,
    info: req.body.infocon,
    days: {
      day: req.body.day,
      time: req.body.time,
      eventname: req.body.eventname,
      eventdesc: req.body.eventdesc,
      paperlink: req.body.paperlink,
    },
    speaker: speaobj,
    sponsor: sponobj,
    gallery: galleryobj,
    announce: req.body.announce,
  });
  conf
    .save(conf)
    .then((data) => {
      res.render("commiteeform", { head: req.body.bigheading });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

exports.committeecreate = (req, res) => {
  if (req.files) {
    var file1 = [];
    var file2 = [];
    var file3 = [];
    var file4 = [];
    var file5 = [];
    var file6 = [];
    var file7 = [];
    var file8 = [];
    var file9 = [];
    var file10 = [];
    var file11 = [];
    var file12 = [];
    var file13 = [];

    file1 = req.files.ch_img;
    file2 = req.files.pat_img;
    file3 = req.files.internat_img;
    file4 = req.files.naadcom_img;
    file5 = req.files.gencha_img;
    file6 = req.files.gencochair_img;
    file7 = req.files.conchair_img;
    file8 = req.files.ficha_img;
    file9 = req.files.teproch_img;
    file10 = req.files.orgch_img;
    file11 = req.files.pubch_img;
    file12 = req.files.publich_img;
    file13 = req.files.sponch_img;

    let imgArray1 = file1.map((file) => {
      let img1 = fs.readFileSync(file.path);
      let finalimg1 = {
        data: img1,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg1;
    });

    let imgArray2 = file2.map((file) => {
      let img2 = fs.readFileSync(file.path);
      let finalimg2 = {
        data: img2,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg2;
    });

    let imgArray3 = file3.map((file) => {
      let img3 = fs.readFileSync(file.path);
      let finalimg3 = {
        data: img3,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg3;
    });

    let imgArray4 = file4.map((file) => {
      let img4 = fs.readFileSync(file.path);
      let finalimg4 = {
        data: img4,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg4;
    });

    let imgArray5 = file5.map((file) => {
      let img5 = fs.readFileSync(file.path);
      let finalimg5 = {
        data: img5,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg5;
    });

    let imgArray6 = file6.map((file) => {
      let img6 = fs.readFileSync(file.path);
      let finalimg6 = {
        data: img6,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg6;
    });

    let imgArray7 = file7.map((file) => {
      let img7 = fs.readFileSync(file.path);
      let finalimg7 = {
        data: img7,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg7;
    });

    let imgArray8 = file8.map((file) => {
      let img8 = fs.readFileSync(file.path);
      let finalimg8 = {
        data: img8,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg8;
    });

    let imgArray9 = file9.map((file) => {
      let img9 = fs.readFileSync(file.path);
      let finalimg9 = {
        data: img9,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg9;
    });

    let imgArray10 = file10.map((file) => {
      let img10 = fs.readFileSync(file.path);
      let finalimg10 = {
        data: img10,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg10;
    });

    let imgArray11 = file11.map((file) => {
      let img11 = fs.readFileSync(file.path);
      let finalimg11 = {
        data: img11,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg11;
    });

    let imgArray12 = file12.map((file) => {
      let img12 = fs.readFileSync(file.path);
      let finalimg12 = {
        data: img12,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg12;
    });

    let imgArray13 = file13.map((file) => {
      let img13 = fs.readFileSync(file.path);
      let finalimg13 = {
        data: img13,
        contentType: "image/png",
      };
      let resultHandler = function (err) {
        if (err) {
          console.log("unlink failed", err);
        } else {
          console.log("file deleted");
        }
      };
      fs.unlink(file.path, resultHandler);
      return finalimg13;
    });

    let file1obj = [];
    let file1ob;

    let file2obj = [];
    let file2ob;

    let file3obj = [];
    let file3ob;

    let file4obj = [];
    let file4ob;

    let file5obj = [];
    let file5ob;

    let file6obj = [];
    let file6ob;

    let file7obj = [];
    let file7ob;

    let file8obj = [];
    let file8ob;

    let file9obj = [];
    let file9ob;

    let file10obj = [];
    let file10ob;

    let file11obj = [];
    let file11ob;

    let file12obj = [];
    let file12ob;

    let file13obj = [];
    let file13ob;

    if (!Array.isArray(req.body.chpat)) {
      for (i = 0; i < file1.length; i++) {
        file1ob = {
          img: imgArray1[i],
          name: req.body.chpat,
        };
        file1obj.push(file1ob);
      }
    } else if (Array.isArray(req.body.chpat)) {
      for (i = 0; i < file1.length; i++) {
        file1ob = {
          img: imgArray1[i],
          name: req.body.chpat[i],
        };
        file1obj.push(file1ob);
      }
    }

    if (!Array.isArray(req.body.pat)) {
      for (i = 0; i < file2.length; i++) {
        file2ob = {
          img: imgArray2[i],
          name: req.body.pat,
        };
        file2obj.push(file2ob);
      }
    } else if (Array.isArray(req.body.pat)) {
      for (i = 0; i < file2.length; i++) {
        file2ob = {
          img: imgArray2[i],
          name: req.body.pat[i],
        };
        file2obj.push(file2ob);
      }
    }

    if (!Array.isArray(req.body.internat)) {
      for (i = 0; i < file3.length; i++) {
        file3ob = {
          img: imgArray3[i],
          name: req.body.internat,
        };
        file3obj.push(file3ob);
      }
    } else if (Array.isArray(req.body.internat)) {
      for (i = 0; i < file3.length; i++) {
        file3ob = {
          img: imgArray3[i],
          name: req.body.internat[i],
        };
        file3obj.push(file3ob);
      }
    }

    if (!Array.isArray(req.body.naadcom)) {
      for (i = 0; i < file4.length; i++) {
        file4ob = {
          img: imgArray4[i],
          name: req.body.naadcom,
        };
        file4obj.push(file4ob);
      }
    } else if (Array.isArray(req.body.naadcom)) {
      for (i = 0; i < file4.length; i++) {
        file4ob = {
          img: imgArray4[i],
          name: req.body.naadcom[i],
        };
        file4obj.push(file4ob);
      }
    }

    if (!Array.isArray(req.body.gencha)) {
      for (i = 0; i < file5.length; i++) {
        file5ob = {
          img: imgArray5[i],
          name: req.body.gencha,
        };
        file5obj.push(file5ob);
      }
    } else if (Array.isArray(req.body.gencha)) {
      for (i = 0; i < file5.length; i++) {
        file5ob = {
          img: imgArray5[i],
          name: req.body.gencha[i],
        };
        file5obj.push(file5ob);
      }
    }

    if (!Array.isArray(req.body.gencochair)) {
      for (i = 0; i < file6.length; i++) {
        file6ob = {
          img: imgArray6[i],
          name: req.body.gencochair,
        };
        file6obj.push(file6ob);
      }
    } else if (Array.isArray(req.body.gencochair)) {
      for (i = 0; i < file6.length; i++) {
        file6ob = {
          img: imgArray6[i],
          name: req.body.gencochair[i],
        };
        file6obj.push(file6ob);
      }
    }

    if (!Array.isArray(req.body.conchair)) {
      for (i = 0; i < file7.length; i++) {
        file7ob = {
          img: imgArray7[i],
          name: req.body.conchair,
        };
        file7obj.push(file7ob);
      }
    } else if (Array.isArray(req.body.conchair)) {
      for (i = 0; i < file7.length; i++) {
        file7ob = {
          img: imgArray7[i],
          name: req.body.conchair[i],
        };
        file7obj.push(file7ob);
      }
    }

    if (!Array.isArray(req.body.ficha)) {
      for (i = 0; i < file8.length; i++) {
        file8ob = {
          img: imgArray8[i],
          name: req.body.ficha,
        };
        file8obj.push(file8ob);
      }
    } else if (Array.isArray(req.body.ficha)) {
      for (i = 0; i < file8.length; i++) {
        file8ob = {
          img: imgArray8[i],
          name: req.body.ficha[i],
        };
        file8obj.push(file8ob);
      }
    }

    if (!Array.isArray(req.body.teproch)) {
      for (i = 0; i < file9.length; i++) {
        file9ob = {
          img: imgArray9[i],
          name: req.body.teproch,
        };
        file9obj.push(file9ob);
      }
    } else if (Array.isArray(req.body.teproch)) {
      for (i = 0; i < file9.length; i++) {
        file9ob = {
          img: imgArray9[i],
          name: req.body.teproch[i],
        };
        file9obj.push(file9ob);
      }
    }

    if (!Array.isArray(req.body.orgch)) {
      for (i = 0; i < file10.length; i++) {
        file10ob = {
          img: imgArray10[i],
          name: req.body.orgch,
        };
        file10obj.push(file10ob);
      }
    } else if (Array.isArray(req.body.orgch)) {
      for (i = 0; i < file10.length; i++) {
        file10ob = {
          img: imgArray10[i],
          name: req.body.orgch[i],
        };
        file10obj.push(file10ob);
      }
    }

    if (!Array.isArray(req.body.pubch)) {
      for (i = 0; i < file11.length; i++) {
        file11ob = {
          img: imgArray11[i],
          name: req.body.pubch,
        };
        file11obj.push(file11ob);
      }
    } else if (Array.isArray(req.body.pubch)) {
      for (i = 0; i < file11.length; i++) {
        file11ob = {
          img: imgArray11[i],
          name: req.body.pubch[i],
        };
        file11obj.push(file11ob);
      }
    }

    if (!Array.isArray(req.body.publich)) {
      for (i = 0; i < file12.length; i++) {
        file12ob = {
          img: imgArray12[i],
          name: req.body.publich,
        };
        file12obj.push(file12ob);
      }
    } else if (Array.isArray(req.body.publich)) {
      for (i = 0; i < file12.length; i++) {
        file12ob = {
          img: imgArray12[i],
          name: req.body.publich[i],
        };
        file12obj.push(file12ob);
      }
    }

    if (!Array.isArray(req.body.sponch)) {
      for (i = 0; i < file13.length; i++) {
        file13ob = {
          img: imgArray13[i],
          name: req.body.sponch,
        };
        file13obj.push(file13ob);
      }
    } else if (Array.isArray(req.body.sponch)) {
      for (i = 0; i < file13.length; i++) {
        file13ob = {
          img: imgArray13[i],
          name: req.body.sponch[i],
        };
        file13obj.push(file13ob);
      }
    }

    let dayss = [];

    conferencedb.findOne({ title: req.body.bigheading }, function (err, postm) {
      dayss = postm.days;
      conferencedb.findOneAndUpdate(
        { title: req.body.bigheading },
        {
          days: dayss,
          cheifpatron: file1obj,
          patron: file2obj,
          internatad: file3obj,
          naadcom: file4obj,
          gencha: file5obj,
          gencochair: file6obj,
          conchair: file7obj,
          ficha: file8obj,
          teproch: file9obj,
          orgch: file10obj,
          pubch: file11obj,
          publich: file12obj,
          sponch: file13obj,
        },
        function (err, commi) {
          if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.send(err);
          } else if (err) {
            console.log(err);
          } else {
            console.log("Inserted some data");
            res.render("tracks", { title: req.body.bigheading });
          }
        }
      );
    });
  } else {
    res.redirect("/admin");
  }
};

exports.admincheck = (req, res) => {
  var courses = req.body;
  // convert object to key's array

  const keys = Object.keys(courses);

  // print all keys

  console.log(keys);

  console.log(courses);

  keys.forEach((key, index) => {
    if (courses[key] === "false") {
      console.log(courses[key]);
      User.remove({ _id: key }, function (err, users) {
        if (err) {
          console.log(err);
        }
      });
    } else if (courses[key] === "true") {
      User.findOneAndUpdate(
        { _id: key },
        { $set: { isAdmin: true } },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
        }
      );
    }
  });

  res.redirect("/admin");
};
exports.update = (req, res) => {
  conferencedb.updateMany(
    {},
    { landingpage: false },
    function (err, landfalse) {
      if (err) {
        console.log(err);
      }
      conferencedb.findOneAndUpdate(
        { _id: req.body.maincon },
        { landingpage: true },
        function (errr, landup) {
          if (!err) {
            landup.save();
            res.redirect("/admin");
          } else {
            console.log(errr);
          }
        }
      );
    }
  );
};

exports.condelete = (req, res) => {
  const id = req.params.id;

  conferencedb
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

exports.updateformpost = async (req, res) => {
  var id = req.params.id;
  let copy1 = [];
  let copy2 = [];
  let copy3 = [];
  let copy4 = [];
  let copy5 = [];
  let copy6 = [];
  let copy7 = [];
  let copy8 = [];
  let copy9 = [];
  let copy10 = [];
  let copy11 = [];
  let copy12 = [];
  let copy13 = [];
  var flag = false;
  console.log(req.body.imgcounts.length);
  console.log(req.body.sponimgcount);
  if (
    req.files.fileToUpload ||
    req.files.sfileToUpload ||
    req.files.gallery_img ||
    req.body.imgcount.length < req.body.speakimgcount ||
    req.body.imgcounts.length < req.body.sponimgcount ||
    req.body.imgcountss.length < req.body.galleryimgcount
  ) {
    let speakobj = [];
    let speaob;

    let sponobj = [];
    let sponb;

    let galleryobj = [];
    let galleryob;

    if (
      req.body.imgcount.length < req.body.speakimgcount ||
      req.body.imgcounts.length < req.body.sponimgcount ||
      req.body.imgcountss.length < req.body.galleryimgcount
    ) {
      console.log("In less wala part");
      let imgar = [];
      let imgars = [];
      let galim = [];
      let track = [];
      conferencedb.findOne({ _id: id }, async function (err, conimg) {
        imgar = conimg.speaker;
        imgars = conimg.sponsor;
        galim = conimg.gallery;
        track = conimg.tracks;
        if (req.body.imgcount.length < req.body.speakimgcount) {
          var count = req.body.speakimgcount - req.body.imgcount.length;
          for (var i = 0; i < count; i++) {
            imgar.pop();
          }
        }
        if (req.body.imgcounts.length < req.body.sponimgcount) {
          var counts = req.body.sponimgcount - req.body.imgcounts.length;
          for (var i = 0; i < counts; i++) {
            imgars.pop();
          }
        }
        if (req.body.imgcountss.length < req.body.galleryimgcount) {
          var countss = req.body.galleryimgcount - req.body.imgcountss.length;
          for (var i = 0; i < countss; i++) {
            galim.pop();
          }
        }

        conferencedb.findOneAndUpdate(
          { _id: id },
          {
            title: req.body.bigheading,
            fromdate: req.body.formdate,
            todate: req.body.todate,
            venue: req.body.venue,
            url: req.body.Link,
            info: req.body.infocon,
            days: {
              day: req.body.day,
              time: req.body.time,
              eventname: req.body.eventname,
              eventdesc: req.body.eventdesc,
              paperlink: req.body.paperlink,
            },
            speaker: imgar,
            sponsor: imgars,
            gallery: galim,
            tracks: track,
            announce: req.body.announce,
          },
          function (err, confen) {
            if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
              res.send(err);
            } else if (err) {
              console.log(err);
            } else {
              console.log("Deleted some data");
              copy1 = confen.cheifpatron;
              copy2 = confen.patron;
              copy3 = confen.internatad;
              copy4 = confen.naadcom;
              copy5 = confen.gencha;
              copy6 = confen.gencochair;
              copy7 = confen.conchair;
              copy8 = confen.ficha;
              copy9 = confen.teproch;
              copy10 = confen.orgch;
              copy11 = confen.pubch;
              copy12 = confen.publich;
              copy13 = confen.sponch;
              if (
                !req.files.fileToUpload &&
                !req.files.sfileToUpload &&
                !req.files.gallery_img
              ) {
                console.log("Redirecting by deleting");
                res.render("updatecommittee", {
                  title: req.body.bigheading,
                  chpat: copy1,
                  pat: copy2,
                  internatad: copy3,
                  naadcom: copy4,
                  gencha: copy5,
                  gencochair: copy6,
                  conchair: copy7,
                  ficha: copy8,
                  teproch: copy9,
                  orgch: copy10,
                  pubch: copy11,
                  publich: copy12,
                  sponch: copy13,
                });
              } else if (
                req.files.fileToUpload ||
                req.files.sfileToUpload ||
                req.files.gallery_img
              ) {
                var files = [];
                var filess = [];
                var galfile = [];

                if (req.files.fileToUpload) {
                  files = req.files.fileToUpload;

                  let imgArray = files.map((filee) => {
                    let img = fs.readFileSync(filee.path);
                    let finalimg = {
                      data: img,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(filee.path, resultHandler);
                    return finalimg;
                  });
                  if (!Array.isArray(req.body.speaker_name)) {
                    for (i = 0; i < files.length; i++) {
                      speaob = {
                        img: imgArray[i],
                        speakername: req.body.speaker_name,
                        speakerdesc: req.body.speaker_desc,
                      };
                      speakobj.push(speaob);
                    }
                  } else if (Array.isArray(req.body.speaker_name)) {
                    for (i = 0; i < files.length; i++) {
                      speaob = {
                        img: imgArray[i],
                        speakername: req.body.speaker_name[i],
                        speakerdesc: req.body.speaker_desc[i],
                      };
                      speakobj.push(speaob);
                    }
                  }
                }

                if (req.files.sfileToUpload) {
                  filess = req.files.sfileToUpload;

                  let imgsArray = filess.map((filee) => {
                    let imgs = fs.readFileSync(filee.path);
                    let finalimgss = {
                      data: imgs,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(filee.path, resultHandler);
                    return finalimgss;
                  });

                  if (!Array.isArray(req.body.sponsor_name)) {
                    for (i = 0; i < filess.length; i++) {
                      sponb = {
                        img: imgsArray[i],
                        sponsorname: req.body.sponsor_name,
                      };
                      sponobj.push(sponb);
                    }
                  } else if (Array.isArray(req.body.sponsor_name)) {
                    for (i = 0; i < filess.length; i++) {
                      sponb = {
                        img: imgsArray[i],
                        sponsorname: req.body.sponsor_name[i],
                      };
                      sponobj.push(sponb);
                    }
                  }
                }

                if (req.files.gallery_img) {
                  galfile = req.files.gallery_img;

                  let imgsArrayfile = galfile.map((filee) => {
                    let imgss = fs.readFileSync(filee.path);
                    let finalimgss = {
                      data: imgss,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(filee.path, resultHandler);
                    return finalimgss;
                  });

                  if (!Array.isArray(req.body.imgcap)) {
                    for (i = 0; i < galfile.length; i++) {
                      galleryob = {
                        img: imgsArrayfile[i],
                        caption: req.body.imgcap,
                      };
                      galleryobj.push(galleryob);
                    }
                  } else if (Array.isArray(req.body.imgcap)) {
                    for (i = 0; i < galfile.length; i++) {
                      galleryob = {
                        img: imgsArrayfile[i],
                        caption: req.body.imgcap[i],
                      };
                      galleryobj.push(galleryob);
                    }
                  }
                }

                conferencedb.findOne({ _id: id }, async function (err, conimg) {
                  if (req.files.fileToUpload) {
                    imgar.push(...speakobj);
                  }
                  if (req.files.sfileToUpload) {
                    imgars.push(...sponobj);
                  }
                  if (req.files.gallery_img) {
                    galim.push(...galleryobj);
                  }

                  let track = [];
                  track = conimg.tracks;
                  conferencedb.findOneAndUpdate(
                    { _id: id },
                    {
                      title: req.body.bigheading,
                      fromdate: req.body.formdate,
                      todate: req.body.todate,
                      venue: req.body.venue,
                      url: req.body.Link,
                      info: req.body.infocon,
                      days: {
                        day: req.body.day,
                        time: req.body.time,
                        eventname: req.body.eventname,
                        eventdesc: req.body.eventdesc,
                        paperlink: req.body.paperlink,
                      },
                      speaker: imgar,
                      sponsor: imgars,
                      gallery: galim,
                      tracks: track,
                      announce: req.body.announce,
                    },

                    function (err, confen) {
                      if (err instanceof multer.MulterError) {
                        // A Multer error occurred when uploading.
                        res.send(err);
                      } else if (err) {
                        console.log(err);
                      } else {
                        console.log("Inserted some data");
                        res.render("updatecommittee", {
                          title: req.body.bigheading,
                          chpat: confen.cheifpatron,
                          pat: confen.patron,
                          internatad: confen.internatad,
                          naadcom: confen.naadcom,
                          gencha: confen.gencha,
                          gencochair: confen.gencochair,
                          conchair: confen.conchair,
                          ficha: confen.ficha,
                          teproch: confen.teproch,
                          orgch: confen.orgch,
                          pubch: confen.pubch,
                          publich: confen.publich,
                          sponch: confen.sponch,
                        });
                      }
                    }
                  );
                });
              }
            }
          }
        );
      });
    } else if (
      req.files.fileToUpload ||
      req.files.sfileToUpload ||
      req.files.gallery_img
    ) {
      console.log("In Overall again file part");
      var files = [];
      var filess = [];
      var galfile = [];

      let speakobj = [];
      let speaob;

      let sponobj = [];
      let sponb;

      let galleryobj = [];
      let galleryob;

      if (await req.files.fileToUpload) {
        files = req.files.fileToUpload;

        let imgArray = files.map((filee) => {
          let img = fs.readFileSync(filee.path);
          let finalimg = {
            data: img,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(filee.path, resultHandler);
          return finalimg;
        });
        if (!Array.isArray(req.body.speaker_name)) {
          for (i = 0; i < files.length; i++) {
            speaob = {
              img: imgArray[i],
              speakername: req.body.speaker_name,
              speakerdesc: req.body.speaker_desc,
            };
            speakobj.push(speaob);
          }
        } else if (Array.isArray(req.body.speaker_name)) {
          for (i = 0; i < files.length; i++) {
            speaob = {
              img: imgArray[i],
              speakername: req.body.speaker_name[i],
              speakerdesc: req.body.speaker_desc[i],
            };
            speakobj.push(speaob);
          }
        }
      }

      if (await req.files.sfileToUpload) {
        filess = req.files.sfileToUpload;

        let imgsArray = filess.map((filee) => {
          let imgs = fs.readFileSync(filee.path);
          let finalimgss = {
            data: imgs,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(filee.path, resultHandler);
          return finalimgss;
        });

        if (!Array.isArray(req.body.sponsor_name)) {
          for (i = 0; i < filess.length; i++) {
            sponb = {
              img: imgsArray[i],
              sponsorname: req.body.sponsor_name,
            };
            sponobj.push(sponb);
          }
        } else if (Array.isArray(req.body.sponsor_name)) {
          for (i = 0; i < filess.length; i++) {
            sponb = {
              img: imgsArray[i],
              sponsorname: req.body.sponsor_name[i],
            };
            sponobj.push(sponb);
          }
        }
      }

      if (await req.files.gallery_img) {
        galfile = req.files.gallery_img;

        let imgsArrayfile = galfile.map((filee) => {
          let imgss = fs.readFileSync(filee.path);
          let finalimgss = {
            data: imgss,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(filee.path, resultHandler);
          return finalimgss;
        });

       

        if (!Array.isArray(req.body.imgcap)) {
          for (i = 0; i < galfile.length; i++) {
            galleryob = {
              img: imgsArrayfile[i],
              caption: req.body.imgcap,
            };
            galleryobj.push(galleryob);
          }
        } else if (Array.isArray(req.body.imgcap)) {
          for (i = 0; i < galfile.length; i++) {
            galleryob = {
              img: imgsArrayfile[i],
              caption: req.body.imgcap[i],
            };
            galleryobj.push(galleryob);
          }
        }
      }

      conferencedb.findOne({ _id: id }, async function (err, conimg) {
        imgar = conimg.speaker;
        imgars = conimg.sponsor;
        galim = conimg.gallery;
        if (req.files.fileToUpload) {
          imgar.push(...speakobj);
        }
        if (req.files.sfileToUpload) {
          imgars.push(...sponobj);
        }
        if (req.files.gallery_img) {
          galim.push(...galleryobj);
        }
        let track = [];
        track = conimg.tracks;
        conferencedb.findOneAndUpdate(
          { _id: id },
          {
            title: req.body.bigheading,
            fromdate: req.body.formdate,
            todate: req.body.todate,
            venue: req.body.venue,
            url: req.body.Link,
            info: req.body.infocon,
            tracks: track,
            days: {
              day: req.body.day,
              time: req.body.time,
              eventname: req.body.eventname,
              eventdesc: req.body.eventdesc,
              paperlink: req.body.paperlink,
            },
            speaker: imgar,
            sponsor: imgars,
            gallery: galim,
            announce: req.body.announce,
          },

          function (err, confen) {
            if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
              res.send(err);
            } else if (err) {
              console.log(err);
            } else {
              console.log("Inserted some data");
              res.render("updatecommittee", {
                title: req.body.bigheading,
                chpat: confen.cheifpatron,
                pat: confen.patron,
                internatad: confen.internatad,
                naadcom: confen.naadcom,
                gencha: confen.gencha,
                gencochair: confen.gencochair,
                conchair: confen.conchair,
                ficha: confen.ficha,
                teproch: confen.teproch,
                orgch: confen.orgch,
                pubch: confen.pubch,
                publich: confen.publich,
                sponch: confen.sponch,
              });
            }
          }
        );
      });
      console.log("Redirecting by inserting");
    }
  } else {
    let speakobj = [];
    let speaob;

    let sponobj = [];
    let sponb;

    let galleryobj = [];
    let galleryob;
    console.log("In else part");
    let imgar = [];
    let imgars = [];
    conferencedb.findOne({ _id: id }, async function (err, conimg) {
      imgar = conimg.speaker;
      imgars = conimg.sponsor;
      galim = conimg.gallery;
      let track = [];
      track = conimg.tracks;

      if (!Array.isArray(req.body.speakername)) {
        for (i = 0; i < imgar.length; i++) {
          speaob = {
            img: imgar[i].img,
            speakername: req.body.speakername,
            speakerdesc: req.body.speakerdesc,
          };
          speakobj.push(speaob);
        }
      } else if (Array.isArray(req.body.speakername)) {
        for (i = 0; i < imgar.length; i++) {
          speaob = {
            img: imgar[i].img,
            speakername: req.body.speakername[i],
            speakerdesc: req.body.speakerdesc[i],
          };
          speakobj.push(speaob);
        }
      }

      if (!Array.isArray(req.body.sponsorname)) {
        for (i = 0; i < imgars.length; i++) {
          sponb = {
            img: imgars[i].img,
            sponsorname: req.body.sponsorname,
          };
          sponobj.push(sponb);
        }
      } else if (Array.isArray(req.body.sponsorname)) {
        for (i = 0; i < imgars.length; i++) {
          sponb = {
            img: imgars[i].img,
            sponsorname: req.body.sponsorname[i],
          };
          sponobj.push(sponb);
        }
      }

      if (!Array.isArray(req.body.img_cap)) {
        for (i = 0; i < galim.length; i++) {
          galleryob = {
            img: galim[i].img,
            caption: req.body.img_cap,
          };
          galleryobj.push(galleryob);
        }
      } else if (Array.isArray(req.body.img_cap)) {
        for (i = 0; i < galim.length; i++) {
          galleryob = {
            img: galim[i].img,
            caption: req.body.img_cap[i],
          };
          galleryobj.push(galleryob);
        }
      }

      conferencedb.findOneAndUpdate(
        { _id: id },
        {
          title: req.body.bigheading,
          fromdate: req.body.formdate,
          todate: req.body.todate,
          venue: req.body.venue,
          url: req.body.Link,
          info: req.body.infocon,
          tracks: track,
          days: {
            day: req.body.day,
            time: req.body.time,
            eventname: req.body.eventname,
            eventdesc: req.body.eventdesc,
            paperlink: req.body.paperlink,
          },
          speaker: speakobj,
          sponsor: sponobj,
          gallery: galleryobj,
          announce: req.body.announce,
        },
        function (err, confen) {
          if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.send(err);
          } else if (err) {
            console.log(err);
          } else {
            console.log("Redirecting");
            res.render("updatecommittee", {
              title: req.body.bigheading,
              chpat: confen.cheifpatron,
              pat: confen.patron,
              internatad: confen.internatad,
              naadcom: confen.naadcom,
              gencha: confen.gencha,
              gencochair: confen.gencochair,
              conchair: confen.conchair,
              ficha: confen.ficha,
              teproch: confen.teproch,
              orgch: confen.orgch,
              pubch: confen.pubch,
              publich: confen.publich,
              sponch: confen.sponch,
            });
          }
        }
      );
    });
  }
};

exports.updatecommitee = async (req, res) => {
  var title = req.body.bigheading;

  var flag = false;
  if (
    req.files.ch_img ||
    req.files.pat_img ||
    req.files.internat_img ||
    req.files.naadcom_img ||
    req.files.gencha_img ||
    req.files.gencochair_img ||
    req.files.conchair_img ||
    req.files.ficha_img ||
    req.files.teproch_img ||
    req.files.orgch_img ||
    req.files.pubch_img ||
    req.files.publich_img ||
    req.files.sponch_img ||
    req.body.imgcount1.length < req.body.chpatimgcount ||
    req.body.imgcount2.length < req.body.patimgcount ||
    req.body.imgcount3.length < req.body.internatadimgcount ||
    req.body.imgcount4.length < req.body.naadcomimgcount ||
    req.body.imgcount5.length < req.body.genchaimgcount ||
    req.body.imgcount6.length < req.body.gencochairimgcount ||
    req.body.imgcount7.length < req.body.conchairimgcount ||
    req.body.imgcount8.length < req.body.fichaimgcount ||
    req.body.imgcount9.length < req.body.teprochimgcount ||
    req.body.imgcount10.length < req.body.orgchimgcount ||
    req.body.imgcount11.length < req.body.pubchimgcount ||
    req.body.imgcount12.length < req.body.publichimgcount ||
    req.body.imgcount13.length < req.body.sponchimgcount
  ) {
    let file1obj = [];
    let file1ob;

    let file2obj = [];
    let file2ob;

    let file3obj = [];
    let file3ob;

    let file4obj = [];
    let file4ob;

    let file5obj = [];
    let file5ob;

    let file6obj = [];
    let file6ob;

    let file7obj = [];
    let file7ob;

    let file8obj = [];
    let file8ob;

    let file9obj = [];
    let file9ob;

    let file10obj = [];
    let file10ob;

    let file11obj = [];
    let file11ob;

    let file12obj = [];
    let file12ob;

    let file13obj = [];
    let file13ob;
    if (
      req.body.imgcount1.length < req.body.chpatimgcount ||
      req.body.imgcount2.length < req.body.patimgcount ||
      req.body.imgcount3.length < req.body.internatadimgcount ||
      req.body.imgcount4.length < req.body.naadcomimgcount ||
      req.body.imgcount5.length < req.body.genchaimgcount ||
      req.body.imgcount6.length < req.body.gencochairimgcount ||
      req.body.imgcount7.length < req.body.conchairimgcount ||
      req.body.imgcount8.length < req.body.fichaimgcount ||
      req.body.imgcount9.length < req.body.teprochimgcount ||
      req.body.imgcount10.length < req.body.orgchimgcount ||
      req.body.imgcount11.length < req.body.pubchimgcount ||
      req.body.imgcount12.length < req.body.publichimgcount ||
      req.body.imgcount13.length < req.body.sponchimgcount
    ) {
      console.log("In less wala part");
      let imgar1 = [];
      let imgar2 = [];
      let imgar3 = [];
      let imgar4 = [];
      let imgar5 = [];
      let imgar6 = [];
      let imgar7 = [];
      let imgar8 = [];
      let imgar9 = [];
      let imgar10 = [];
      let imgar11 = [];
      let imgar12 = [];
      let imgar13 = [];
      conferencedb.findOne({ title: title }, async function (err, conimg) {
        imgar1 = conimg.cheifpatron;
        imgar2 = conimg.patron;
        imgar3 = conimg.internatad;
        imgar4 = conimg.naadcom;
        imgar5 = conimg.gencha;
        imgar6 = conimg.gencochair;
        imgar7 = conimg.conchair;
        imgar8 = conimg.ficha;
        imgar9 = conimg.teproch;
        imgar10 = conimg.orgch;
        imgar11 = conimg.pubch;
        imgar12 = conimg.publich;
        imgar13 = conimg.sponch;
        if (req.body.imgcount1.length < req.body.chpatimgcount) {
          var count1 = req.body.chpatimgcount - req.body.imgcount1.length;
          for (var i = 0; i < count1; i++) {
            imgar1.pop();
          }
        }
        if (req.body.imgcount2.length < req.body.patimgcount) {
          var count2 = req.body.patimgcount - req.body.imgcount2.length;
          for (var i = 0; i < count2; i++) {
            imgar2.pop();
          }
        }
        if (req.body.imgcount3.length < req.body.internatadimgcount) {
          var count3 = req.body.internatadimgcount - req.body.imgcount3.length;
          for (var i = 0; i < count3; i++) {
            imgar3.pop();
          }
        }
        if (req.body.imgcount4.length < req.body.naadcomimgcount) {
          var count4 = req.body.naadcomimgcount - req.body.imgcount4.length;
          for (var i = 0; i < count4; i++) {
            imgar4.pop();
          }
        }
        if (req.body.imgcount5.length < req.body.genchaimgcount) {
          var count5 = req.body.genchaimgcount - req.body.imgcount5.length;
          for (var i = 0; i < count5; i++) {
            imgar5.pop();
          }
        }
        if (req.body.imgcount6.length < req.body.gencochairimgcount) {
          var count6 = req.body.gencochairimgcount - req.body.imgcount6.length;
          for (var i = 0; i < count6; i++) {
            imgar6.pop();
          }
        }
        if (req.body.imgcount7.length < req.body.conchairimgcount) {
          var count7 = req.body.conchairimgcount - req.body.imgcount7.length;
          for (var i = 0; i < count7; i++) {
            imgar7.pop();
          }
        }
        if (req.body.imgcount8.length < req.body.fichaimgcount) {
          var count8 = req.body.fichaimgcount - req.body.imgcount8.length;
          for (var i = 0; i < count8; i++) {
            imgar8.pop();
          }
        }
        if (req.body.imgcount9.length < req.body.teprochimgcount) {
          var count9 = req.body.teprochimgcount - req.body.imgcount9.length;
          for (var i = 0; i < count9; i++) {
            imgar9.pop();
          }
        }
        if (req.body.imgcount10.length < req.body.orgchimgcount) {
          var count10 = req.body.orgchimgcount - req.body.imgcount10.length;
          for (var i = 0; i < count10; i++) {
            imgar10.pop();
          }
        }
        if (req.body.imgcount11.length < req.body.pubchimgcount) {
          var count11 = req.body.pubchimgcount - req.body.imgcount11.length;
          for (var i = 0; i < count11; i++) {
            imgar11.pop();
          }
        }
        if (req.body.imgcount12.length < req.body.publichimgcount) {
          var count12 = req.body.publichimgcount - req.body.imgcount12.length;
          for (var i = 0; i < count12; i++) {
            imgar12.pop();
          }
        }
        if (req.body.imgcount13.length < req.body.sponchimgcount) {
          var count13 = req.body.sponchimgcount - req.body.imgcount13.length;
          for (var i = 0; i < count13; i++) {
            imgar13.pop();
          }
        }
        let dayss = [];

        dayss = conimg.days;

        let track = [];
        track = conimg.tracks;

        conferencedb.findOneAndUpdate(
          { title: req.body.bigheading },
          {
            days: dayss,
            tracks: track,
            cheifpatron: imgar1,
            patron: imgar2,
            internatad: imgar3,
            naadcom: imgar4,
            gencha: imgar5,
            gencochair: imgar6,
            conchair: imgar7,
            ficha: imgar8,
            teproch: imgar9,
            orgch: imgar10,
            pubch: imgar11,
            publich: imgar12,
            sponch: imgar13,
          },
          function (err, confen) {
            if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
              res.send(err);
            } else if (err) {
              console.log(err);
            } else {
              if (
                !req.files.ch_img &&
                !req.files.pat_img &&
                !req.files.internat_img &&
                !req.files.naadcom_img &&
                !req.files.gencha_img &&
                !req.files.gencochair_img &&
                !req.files.conchair_img &&
                !req.files.ficha_img &&
                !req.files.teproch_img &&
                !req.files.orgch_img &&
                !req.files.pubch_img &&
                !req.files.publich_img &&
                !req.files.sponch_img
              ) {
                console.log("Redirecting by deleting");
                res.render("updatetrack", {
                  track: confen.tracks,
                  title: req.body.bigheading,
                });
              } else if (
                req.files.ch_img ||
                req.files.pat_img ||
                req.files.internat_img ||
                req.files.naadcom_img ||
                req.files.gencha_img ||
                req.files.gencochair_img ||
                req.files.conchair_img ||
                req.files.ficha_img ||
                req.files.teproch_img ||
                req.files.orgch_img ||
                req.files.pubch_img ||
                req.files.publich_img ||
                req.files.sponch_img
              ) {
                var file1 = [];
                var file2 = [];
                var file3 = [];
                var file4 = [];
                var file5 = [];
                var file6 = [];
                var file7 = [];
                var file8 = [];
                var file9 = [];
                var file10 = [];
                var file11 = [];
                var file12 = [];
                var file13 = [];

                if (req.files.ch_img) {
                  file1 = req.files.ch_img;

                  let imgArray1 = file1.map((file) => {
                    let img1 = fs.readFileSync(file.path);
                    let finalimg1 = {
                      data: img1,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg1;
                  });
                  if (!Array.isArray(req.body.ch_pat)) {
                    for (i = 0; i < file1.length; i++) {
                      file1ob = {
                        img: imgArray1[i],
                        name: req.body.ch_pat,
                      };
                      file1obj.push(file1ob);
                    }
                  } else if (Array.isArray(req.body.ch_pat)) {
                    for (i = 0; i < file1.length; i++) {
                      file1ob = {
                        img: imgArray1[i],
                        name: req.body.ch_pat[i],
                      };
                      file1obj.push(file1ob);
                    }
                  }
                }

                if (req.files.pat_img) {
                  file2 = req.files.pat_img;

                  let imgArray2 = file2.map((file) => {
                    let img2 = fs.readFileSync(file.path);
                    let finalimg2 = {
                      data: img2,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg2;
                  });
                  if (!Array.isArray(req.body.patr)) {
                    for (i = 0; i < file2.length; i++) {
                      file2ob = {
                        img: imgArray2[i],
                        name: req.body.patr,
                      };
                      file2obj.push(file2ob);
                    }
                  } else if (Array.isArray(req.body.patr)) {
                    for (i = 0; i < file2.length; i++) {
                      file2ob = {
                        img: imgArray2[i],
                        name: req.body.patr[i],
                      };
                      file2obj.push(file2ob);
                    }
                  }
                }

                if (req.files.internat_img) {
                  file3 = req.files.internat_img;

                  let imgArray3 = file3.map((file) => {
                    let img3 = fs.readFileSync(file.path);
                    let finalimg3 = {
                      data: img3,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg3;
                  });
                  if (!Array.isArray(req.body.intern_at)) {
                    for (i = 0; i < file3.length; i++) {
                      file3ob = {
                        img: imgArray3[i],
                        name: req.body.intern_at,
                      };
                      file3obj.push(file3ob);
                    }
                  } else if (Array.isArray(req.body.intern_at)) {
                    for (i = 0; i < file3.length; i++) {
                      file3ob = {
                        img: imgArray3[i],
                        name: req.body.intern_at[i],
                      };
                      file3obj.push(file3ob);
                    }
                  }
                }

                if (req.files.naadcom_img) {
                  file4 = req.files.naadcom_img;

                  let imgArray4 = file4.map((file) => {
                    let img4 = fs.readFileSync(file.path);
                    let finalimg4 = {
                      data: img4,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg4;
                  });
                  if (!Array.isArray(req.body.naad_com)) {
                    for (i = 0; i < file4.length; i++) {
                      file4ob = {
                        img: imgArray4[i],
                        name: req.body.naad_com,
                      };
                      file4obj.push(file4ob);
                    }
                  } else if (Array.isArray(req.body.naad_com)) {
                    for (i = 0; i < file4.length; i++) {
                      file4ob = {
                        img: imgArray4[i],
                        name: req.body.naad_com[i],
                      };
                      file4obj.push(file4ob);
                    }
                  }
                }
                if (req.files.gencha_img) {
                  file5 = req.files.gencha_img;

                  let imgArray5 = file5.map((file) => {
                    let img5 = fs.readFileSync(file.path);
                    let finalimg5 = {
                      data: img5,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg5;
                  });
                  if (!Array.isArray(req.body.gen_cha)) {
                    for (i = 0; i < file5.length; i++) {
                      file5ob = {
                        img: imgArray5[i],
                        name: req.body.gen_cha,
                      };
                      file5obj.push(file5ob);
                    }
                  } else if (Array.isArray(req.body.gen_cha)) {
                    for (i = 0; i < file5.length; i++) {
                      file5ob = {
                        img: imgArray5[i],
                        name: req.body.gen_cha[i],
                      };
                      file5obj.push(file5ob);
                    }
                  }
                }

                if (req.files.gencochair_img) {
                  file6 = req.files.gencochair_img;

                  let imgArray6 = file6.map((file) => {
                    let img6 = fs.readFileSync(file.path);
                    let finalimg6 = {
                      data: img6,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg6;
                  });
                  if (!Array.isArray(req.body.genco_chair)) {
                    for (i = 0; i < file6.length; i++) {
                      file6ob = {
                        img: imgArray6[i],
                        name: req.body.genco_chair,
                      };
                      file6obj.push(file6ob);
                    }
                  } else if (Array.isArray(req.body.genco_chair)) {
                    for (i = 0; i < file6.length; i++) {
                      file6ob = {
                        img: imgArray6[i],
                        name: req.body.genco_chair[i],
                      };
                      file6obj.push(file6ob);
                    }
                  }
                }

                if (req.files.conchair_img) {
                  file7 = req.files.conchair_img;

                  let imgArray7 = file7.map((file) => {
                    let img7 = fs.readFileSync(file.path);
                    let finalimg7 = {
                      data: img7,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg7;
                  });
                  if (!Array.isArray(req.body.con_chair)) {
                    for (i = 0; i < file7.length; i++) {
                      file7ob = {
                        img: imgArray7[i],
                        name: req.body.con_chair,
                      };
                      file7obj.push(file7ob);
                    }
                  } else if (Array.isArray(req.body.con_chair)) {
                    for (i = 0; i < file7.length; i++) {
                      file7ob = {
                        img: imgArray7[i],
                        name: req.body.con_chair[i],
                      };
                      file7obj.push(file7ob);
                    }
                  }
                }

                if (req.files.ficha_img) {
                  file8 = req.files.ficha_img;

                  let imgArray8 = file8.map((file) => {
                    let img8 = fs.readFileSync(file.path);
                    let finalimg8 = {
                      data: img8,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg8;
                  });
                  if (!Array.isArray(req.body.fic_ha)) {
                    for (i = 0; i < file8.length; i++) {
                      file8ob = {
                        img: imgArray8[i],
                        name: req.body.fic_ha,
                      };
                      file8obj.push(file8ob);
                    }
                  } else if (Array.isArray(req.body.fic_ha)) {
                    for (i = 0; i < file8.length; i++) {
                      file8ob = {
                        img: imgArray8[i],
                        name: req.body.fic_ha[i],
                      };
                      file8obj.push(file8ob);
                    }
                  }
                }

                if (req.files.teproch_img) {
                  file9 = req.files.teproch_img;

                  let imgArray9 = file9.map((file) => {
                    let img9 = fs.readFileSync(file.path);
                    let finalimg9 = {
                      data: img9,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg9;
                  });
                  if (!Array.isArray(req.body.te_proch)) {
                    for (i = 0; i < file9.length; i++) {
                      file9ob = {
                        img: imgArray9[i],
                        name: req.body.te_proch,
                      };
                      file9obj.push(file9ob);
                    }
                  } else if (Array.isArray(req.body.te_proch)) {
                    for (i = 0; i < file9.length; i++) {
                      file9ob = {
                        img: imgArray9[i],
                        name: req.body.te_proch[i],
                      };
                      file9obj.push(file9ob);
                    }
                  }
                }

                if (req.files.orgch_img) {
                  file10 = req.files.orgch_img;

                  let imgArray10 = file10.map((file) => {
                    let img10 = fs.readFileSync(file.path);
                    let finalimg10 = {
                      data: img10,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg10;
                  });
                  if (!Array.isArray(req.body.org_ch)) {
                    for (i = 0; i < file10.length; i++) {
                      file10ob = {
                        img: imgArray10[i],
                        name: req.body.org_ch,
                      };
                      file10obj.push(file10ob);
                    }
                  } else if (Array.isArray(req.body.org_ch)) {
                    for (i = 0; i < file10.length; i++) {
                      file10ob = {
                        img: imgArray10[i],
                        name: req.body.org_ch[i],
                      };
                      file10obj.push(file10ob);
                    }
                  }
                }

                if (req.files.pubch_img) {
                  file11 = req.files.pubch_img;

                  let imgArray11 = file11.map((file) => {
                    let img11 = fs.readFileSync(file.path);
                    let finalimg11 = {
                      data: img11,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg11;
                  });
                  if (!Array.isArray(req.body.pub_ch)) {
                    for (i = 0; i < file11.length; i++) {
                      file11ob = {
                        img: imgArray11[i],
                        name: req.body.pub_ch,
                      };
                      file11obj.push(file11ob);
                    }
                  } else if (Array.isArray(req.body.pub_ch)) {
                    for (i = 0; i < file11.length; i++) {
                      file11ob = {
                        img: imgArray11[i],
                        name: req.body.pub_ch[i],
                      };
                      file11obj.push(file11ob);
                    }
                  }
                }

                if (req.files.publich_img) {
                  file12 = req.files.publich_img;

                  let imgArray12 = file12.map((file) => {
                    let img12 = fs.readFileSync(file.path);
                    let finalimg12 = {
                      data: img12,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg12;
                  });
                  if (!Array.isArray(req.body.publi_ch)) {
                    for (i = 0; i < file12.length; i++) {
                      file12ob = {
                        img: imgArray12[i],
                        name: req.body.publi_ch,
                      };
                      file12obj.push(file12ob);
                    }
                  } else if (Array.isArray(req.body.publi_ch)) {
                    for (i = 0; i < file12.length; i++) {
                      file12ob = {
                        img: imgArray12[i],
                        name: req.body.publi_ch[i],
                      };
                      file12obj.push(file12ob);
                    }
                  }
                }

                if (req.files.sponch_img) {
                  file13 = req.files.sponch_img;

                  let imgArray13 = file13.map((file) => {
                    let img13 = fs.readFileSync(file.path);
                    let finalimg13 = {
                      data: img13,
                      contentType: "image/png",
                    };
                    let resultHandler = function (err) {
                      if (err) {
                        console.log("unlink failed", err);
                      } else {
                        console.log("file deleted");
                      }
                    };
                    fs.unlink(file.path, resultHandler);
                    return finalimg13;
                  });
                  if (!Array.isArray(req.body.spon_ch)) {
                    for (i = 0; i < file13.length; i++) {
                      file13ob = {
                        img: imgArray13[i],
                        name: req.body.spon_ch,
                      };
                      file13obj.push(file13ob);
                    }
                  } else if (Array.isArray(req.body.spon_ch)) {
                    for (i = 0; i < file13.length; i++) {
                      file13ob = {
                        img: imgArray13[i],
                        name: req.body.spon_ch[i],
                      };
                      file13obj.push(file13ob);
                    }
                  }
                }

                conferencedb.findOne(
                  { title: req.body.bigheading },
                  async function (err, conimg) {
                    if (req.files.ch_img) {
                      imgar1.push(...file1obj);
                    }

                    if (req.files.pat_img) {
                      imgar2.push(...file2obj);
                    }

                    if (req.files.internat_img) {
                      imgar3.push(...file3obj);
                    }

                    if (req.files.naadcom_img) {
                      imgar4.push(...file4obj);
                    }

                    if (req.files.gencha_img) {
                      imgar5.push(...file5obj);
                    }

                    if (req.files.gencochair_img) {
                      imgar6.push(...file6obj);
                    }

                    if (req.files.conchair_img) {
                      imgar7.push(...file7obj);
                    }

                    if (req.files.ficha_img) {
                      imgar8.push(...file8obj);
                    }

                    if (req.files.teproch_img) {
                      imgar9.push(...file9obj);
                    }

                    if (req.files.orgch_img) {
                      imgar10.push(...file10obj);
                    }

                    if (req.files.pubch_img) {
                      imgar11.push(...file11obj);
                    }

                    if (req.files.publich_img) {
                      imgar12.push(...file12obj);
                    }

                    if (req.files.sponch_img) {
                      imgar13.push(...file13obj);
                    }

                    let dayss = [];

                    dayss = conimg.days;

                    let track = [];
                    track = conimg.tracks;

                    conferencedb.findOneAndUpdate(
                      { title: req.body.bigheading },
                      {
                        days: dayss,
                        tracks: track,
                        cheifpatron: imgar1,
                        patron: imgar2,
                        internatad: imgar3,
                        naadcom: imgar4,
                        gencha: imgar5,
                        gencochair: imgar6,
                        conchair: imgar7,
                        ficha: imgar8,
                        teproch: imgar9,
                        orgch: imgar10,
                        pubch: imgar11,
                        publich: imgar12,
                        sponch: imgar13,
                      },

                      function (err, confen) {
                        if (err instanceof multer.MulterError) {
                          // A Multer error occurred when uploading.
                          res.send(err);
                        } else if (err) {
                          console.log(err);
                        } else {
                          console.log("Inserted some data");
                          res.render("updatetrack", {
                            track: confen.tracks,
                            title: req.body.bigheading,
                          });
                        }
                      }
                    );
                  }
                );
              }
            }
          }
        );
      });
    } else if (
      req.files.ch_img ||
      req.files.pat_img ||
      req.files.internat_img ||
      req.files.naadcom_img ||
      req.files.gencha_img ||
      req.files.gencochair_img ||
      req.files.conchair_img ||
      req.files.ficha_img ||
      req.files.teproch_img ||
      req.files.orgch_img ||
      req.files.pubch_img ||
      req.files.publich_img ||
      req.files.sponch_img
    ) {
      console.log("Overall again part");
      var file1 = [];
      var file2 = [];
      var file3 = [];
      var file4 = [];
      var file5 = [];
      var file6 = [];
      var file7 = [];
      var file8 = [];
      var file9 = [];
      var file10 = [];
      var file11 = [];
      var file12 = [];
      var file13 = [];

      let file1obj = [];
      let file1ob;

      let file2obj = [];
      let file2ob;

      let file3obj = [];
      let file3ob;

      let file4obj = [];
      let file4ob;

      let file5obj = [];
      let file5ob;

      let file6obj = [];
      let file6ob;

      let file7obj = [];
      let file7ob;

      let file8obj = [];
      let file8ob;

      let file9obj = [];
      let file9ob;

      let file10obj = [];
      let file10ob;

      let file11obj = [];
      let file11ob;

      let file12obj = [];
      let file12ob;

      let file13obj = [];
      let file13ob;

      if (await req.files.ch_img) {
        file1 = req.files.ch_img;

        let imgArray1 = file1.map((file) => {
          let img1 = fs.readFileSync(file.path);
          let finalimg1 = {
            data: img1,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg1;
        });
        if (!Array.isArray(req.body.ch_pat)) {
          for (i = 0; i < file1.length; i++) {
            file1ob = {
              img: imgArray1[i],
              name: req.body.ch_pat,
            };
            file1obj.push(file1ob);
          }
        } else if (Array.isArray(req.body.ch_pat)) {
          for (i = 0; i < file1.length; i++) {
            file1ob = {
              img: imgArray1[i],
              name: req.body.ch_pat[i],
            };
            file1obj.push(file1ob);
          }
        }
      }

      if (await req.files.pat_img) {
        file2 = req.files.pat_img;

        let imgArray2 = file2.map((file) => {
          let img2 = fs.readFileSync(file.path);
          let finalimg2 = {
            data: img2,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg2;
        });
        if (!Array.isArray(req.body.patr)) {
          for (i = 0; i < file2.length; i++) {
            file2ob = {
              img: imgArray2[i],
              name: req.body.patr,
            };
            file2obj.push(file2ob);
          }
        } else if (Array.isArray(req.body.patr)) {
          for (i = 0; i < file2.length; i++) {
            file2ob = {
              img: imgArray2[i],
              name: req.body.patr[i],
            };
            file2obj.push(file2ob);
          }
        }
      }

      if (await req.files.internat_img) {
        file3 = req.files.internat_img;

        let imgArray3 = file3.map((file) => {
          let img3 = fs.readFileSync(file.path);
          let finalimg3 = {
            data: img3,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg3;
        });
        if (!Array.isArray(req.body.intern_at)) {
          for (i = 0; i < file3.length; i++) {
            file3ob = {
              img: imgArray3[i],
              name: req.body.intern_at,
            };
            file3obj.push(file3ob);
          }
        } else if (Array.isArray(req.body.intern_at)) {
          for (i = 0; i < file3.length; i++) {
            file3ob = {
              img: imgArray3[i],
              name: req.body.intern_at[i],
            };
            file3obj.push(file3ob);
          }
        }
      }

      if (await req.files.naadcom_img) {
        file4 = req.files.naadcom_img;

        let imgArray4 = file4.map((file) => {
          let img4 = fs.readFileSync(file.path);
          let finalimg4 = {
            data: img4,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg4;
        });
        if (!Array.isArray(req.body.naad_com)) {
          for (i = 0; i < file4.length; i++) {
            file4ob = {
              img: imgArray4[i],
              name: req.body.naad_com,
            };
            file4obj.push(file4ob);
          }
        } else if (Array.isArray(req.body.naad_com)) {
          for (i = 0; i < file4.length; i++) {
            file4ob = {
              img: imgArray4[i],
              name: req.body.naad_com[i],
            };
            file4obj.push(file4ob);
          }
        }
      }

      if (await req.files.gencha_img) {
        file5 = req.files.gencha_img;

        let imgArray5 = file5.map((file) => {
          let img5 = fs.readFileSync(file.path);
          let finalimg5 = {
            data: img5,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg5;
        });
        if (!Array.isArray(req.body.gen_cha)) {
          for (i = 0; i < file5.length; i++) {
            file5ob = {
              img: imgArray5[i],
              name: req.body.gen_cha,
            };
            file5obj.push(file5ob);
          }
        } else if (Array.isArray(req.body.gen_cha)) {
          for (i = 0; i < file5.length; i++) {
            file5ob = {
              img: imgArray5[i],
              name: req.body.gen_cha[i],
            };
            file5obj.push(file5ob);
          }
        }
      }

      if (await req.files.gencochair_img) {
        file6 = req.files.gencochair_img;

        let imgArray6 = file6.map((file) => {
          let img6 = fs.readFileSync(file.path);
          let finalimg6 = {
            data: img6,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg6;
        });
        if (!Array.isArray(req.body.genco_chair)) {
          for (i = 0; i < file6.length; i++) {
            file6ob = {
              img: imgArray6[i],
              name: req.body.genco_chair,
            };
            file6obj.push(file6ob);
          }
        } else if (Array.isArray(req.body.genco_chair)) {
          for (i = 0; i < file6.length; i++) {
            file6ob = {
              img: imgArray6[i],
              name: req.body.genco_chair[i],
            };
            file6obj.push(file6ob);
          }
        }
      }

      if (await req.files.conchair_img) {
        file7 = req.files.conchair_img;

        let imgArray7 = file7.map((file) => {
          let img7 = fs.readFileSync(file.path);
          let finalimg7 = {
            data: img7,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg7;
        });
        if (!Array.isArray(req.body.con_chair)) {
          for (i = 0; i < file7.length; i++) {
            file7ob = {
              img: imgArray7[i],
              name: req.body.con_chair,
            };
            file7obj.push(file7ob);
          }
        } else if (Array.isArray(req.body.con_chair)) {
          for (i = 0; i < file7.length; i++) {
            file7ob = {
              img: imgArray7[i],
              name: req.body.con_chair[i],
            };
            file7obj.push(file7ob);
          }
        }
      }

      if (await req.files.ficha_img) {
        file8 = req.files.ficha_img;

        let imgArray8 = file8.map((file) => {
          let img8 = fs.readFileSync(file.path);
          let finalimg8 = {
            data: img8,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg8;
        });
        if (!Array.isArray(req.body.fic_ha)) {
          for (i = 0; i < file8.length; i++) {
            file8ob = {
              img: imgArray8[i],
              name: req.body.fic_ha,
            };
            file8obj.push(file8ob);
          }
        } else if (Array.isArray(req.body.fic_ha)) {
          for (i = 0; i < file8.length; i++) {
            file8ob = {
              img: imgArray8[i],
              name: req.body.fic_ha[i],
            };
            file8obj.push(file8ob);
          }
        }
      }

      if (await req.files.teproch_img) {
        file9 = req.files.teproch_img;

        let imgArray9 = file9.map((file) => {
          let img9 = fs.readFileSync(file.path);
          let finalimg9 = {
            data: img9,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg9;
        });
        if (!Array.isArray(req.body.te_proch)) {
          for (i = 0; i < file9.length; i++) {
            file9ob = {
              img: imgArray9[i],
              name: req.body.te_proch,
            };
            file9obj.push(file9ob);
          }
        } else if (Array.isArray(req.body.te_proch)) {
          for (i = 0; i < file9.length; i++) {
            file9ob = {
              img: imgArray9[i],
              name: req.body.te_proch[i],
            };
            file9obj.push(file9ob);
          }
        }
      }

      if (await req.files.orgch_img) {
        file10 = req.files.orgch_img;

        let imgArray10 = file10.map((file) => {
          let img10 = fs.readFileSync(file.path);
          let finalimg10 = {
            data: img10,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg10;
        });
        if (!Array.isArray(req.body.org_ch)) {
          for (i = 0; i < file10.length; i++) {
            file10ob = {
              img: imgArray10[i],
              name: req.body.org_ch,
            };
            file10obj.push(file10ob);
          }
        } else if (Array.isArray(req.body.org_ch)) {
          for (i = 0; i < file10.length; i++) {
            file10ob = {
              img: imgArray10[i],
              name: req.body.org_ch[i],
            };
            file10obj.push(file10ob);
          }
        }
      }

      if (await req.files.pubch_img) {
        file11 = req.files.pubch_img;

        let imgArray11 = file11.map((file) => {
          let img11 = fs.readFileSync(file.path);
          let finalimg11 = {
            data: img11,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg11;
        });
        if (!Array.isArray(req.body.pub_ch)) {
          for (i = 0; i < file11.length; i++) {
            file11ob = {
              img: imgArray11[i],
              name: req.body.pub_ch,
            };
            file11obj.push(file11ob);
          }
        } else if (Array.isArray(req.body.pub_ch)) {
          for (i = 0; i < file11.length; i++) {
            file11ob = {
              img: imgArray11[i],
              name: req.body.pub_ch[i],
            };
            file11obj.push(file11ob);
          }
        }
      }

      if (await req.files.publich_img) {
        file12 = req.files.publich_img;

        let imgArray12 = file12.map((file) => {
          let img12 = fs.readFileSync(file.path);
          let finalimg12 = {
            data: img12,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg12;
        });
        if (!Array.isArray(req.body.publi_ch)) {
          for (i = 0; i < file12.length; i++) {
            file12ob = {
              img: imgArray12[i],
              name: req.body.publi_ch,
            };
            file12obj.push(file12ob);
          }
        } else if (Array.isArray(req.body.publi_ch)) {
          for (i = 0; i < file12.length; i++) {
            file12ob = {
              img: imgArray12[i],
              name: req.body.publi_ch[i],
            };
            file12obj.push(file12ob);
          }
        }
      }

      if (await req.files.sponch_img) {
        file13 = req.files.sponch_img;

        let imgArray13 = file13.map((file) => {
          let img13 = fs.readFileSync(file.path);
          let finalimg13 = {
            data: img13,
            contentType: "image/png",
          };
          let resultHandler = function (err) {
            if (err) {
              console.log("unlink failed", err);
            } else {
              console.log("file deleted");
            }
          };
          fs.unlink(file.path, resultHandler);
          return finalimg13;
        });
        if (!Array.isArray(req.body.spon_ch)) {
          for (i = 0; i < file13.length; i++) {
            file13ob = {
              img: imgArray13[i],
              name: req.body.spon_ch,
            };
            file13obj.push(file13ob);
          }
        } else if (Array.isArray(req.body.spon_ch)) {
          for (i = 0; i < file13.length; i++) {
            file13ob = {
              img: imgArray13[i],
              name: req.body.spon_ch[i],
            };
            file13obj.push(file13ob);
          }
        }
      }

      conferencedb.findOne(
        { title: req.body.bigheading },
        async function (err, conimg) {
          imgar1 = conimg.cheifpatron;
          imgar2 = conimg.patron;
          imgar3 = conimg.internatad;
          imgar4 = conimg.naadcom;
          imgar5 = conimg.gencha;
          imgar6 = conimg.gencochair;
          imgar7 = conimg.conchair;
          imgar8 = conimg.ficha;
          imgar9 = conimg.teproch;
          imgar10 = conimg.orgch;
          imgar11 = conimg.pubch;
          imgar12 = conimg.publich;
          imgar13 = conimg.sponch;
          let track = [];
          track = conimg.tracks;
          if (req.files.ch_img) {
            imgar1.push(...file1obj);
          }

          if (req.files.pat_img) {
            imgar2.push(...file2obj);
          }

          if (req.files.internat_img) {
            imgar3.push(...file3obj);
          }

          if (req.files.naadcom_img) {
            imgar4.push(...file4obj);
          }

          if (req.files.gencha_img) {
            imgar5.push(...file5obj);
          }

          if (req.files.gencochair_img) {
            imgar6.push(...file6obj);
          }

          if (req.files.conchair_img) {
            imgar7.push(...file7obj);
          }

          if (req.files.ficha_img) {
            imgar8.push(...file8obj);
          }

          if (req.files.teproch_img) {
            imgar9.push(...file9obj);
          }

          if (req.files.orgch_img) {
            imgar10.push(...file10obj);
          }

          if (req.files.pubch_img) {
            imgar11.push(...file11obj);
          }

          if (req.files.publich_img) {
            imgar12.push(...file12obj);
          }

          if (req.files.sponch_img) {
            imgar13.push(...file13obj);
          }

          let dayss = [];

          dayss = conimg.days;

          conferencedb.findOneAndUpdate(
            { title: req.body.bigheading },
            {
              days: dayss,
              tracks: track,
              cheifpatron: imgar1,
              patron: imgar2,
              internatad: imgar3,
              naadcom: imgar4,
              gencha: imgar5,
              gencochair: imgar6,
              conchair: imgar7,
              ficha: imgar8,
              teproch: imgar9,
              orgch: imgar10,
              pubch: imgar11,
              publich: imgar12,
              sponch: imgar13,
            },

            function (err, confen) {
              if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                res.send(err);
              } else if (err) {
                console.log(err);
              } else {
                console.log("Inserted some data");
                res.render("updatetrack", {
                  track: confen.tracks,
                  title: req.body.bigheading,
                });
              }
            }
          );
        }
      );
    }
  } else if (
    !req.files.ch_img &&
    !req.files.pat_img &&
    !req.files.internat_img &&
    !req.files.naadcom_img &&
    !req.files.gencha_img &&
    !req.files.gencochair_img &&
    !req.files.conchair_img &&
    !req.files.ficha_img &&
    !req.files.teproch_img &&
    !req.files.orgch_img &&
    !req.files.pubch_img &&
    !req.files.publich_img &&
    !req.files.sponch_img &&
    req.body.imgcount1.length == req.body.chpatimgcount &&
    req.body.imgcount2.length == req.body.patimgcount &&
    req.body.imgcount3.length == req.body.internatadimgcount &&
    req.body.imgcount4.length == req.body.naadcomimgcount &&
    req.body.imgcount5.length == req.body.genchaimgcount &&
    req.body.imgcount6.length == req.body.gencochairimgcount &&
    req.body.imgcount7.length == req.body.conchairimgcount &&
    req.body.imgcount8.length == req.body.fichaimgcount &&
    req.body.imgcount9.length == req.body.teprochimgcount &&
    req.body.imgcount10.length == req.body.orgchimgcount &&
    req.body.imgcount11.length == req.body.pubchimgcount &&
    req.body.imgcount12.length == req.body.publichimgcount &&
    req.body.imgcount13.length == req.body.sponchimgcount
  ) {
    console.log("In else commitee");
    conferencedb.findOne(
      { title: req.body.bigheading },
      function (err, conupcom) {
        let track = [];
        track = conupcom.tracks;
        let dayss = [];
        dayss = conupcom.days;
        res.render("updatetrack", {
          track: conupcom.tracks,
          title: req.body.bigheading,
        });
      }
    );
  }
};
exports.track = (req, res) => {
  let dayss = [];
  conferencedb.findOne({ title: req.body.bigheading }, function (err, conday) {
    dayss = conday.days;
    conferencedb.findOneAndUpdate(
      { title: req.body.bigheading },
      {
        days: dayss,
        tracks: {
          trackno: req.body.trackno,
          trackname: req.body.trackname,
          sessionname: req.body.sessionname,
        },
      },
      function (err, con) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/admin");
        }
      }
    );
  });
};
