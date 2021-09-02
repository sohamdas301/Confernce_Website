const axios = require('axios');
const mongoose = require('mongoose');
var {conferencedb, gallery} = require("../model/model");
const User = require("../model/userModel.js")


exports.homeRoutes = (req,res) => {
    conferencedb.findOne({landingpage: true}, function(err, con){
        var infos=con.info;
        var info=infos.substring(0,1000);
        var sn = con.speaker;
        var spn = con.sponsor;
        const date1 = new Date(con.fromdate);
        const date2 = new Date(con.todate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        res.render("home", {con: con, sn: sn, spn: spn, diffDays: diffDays,info:info});
    });
}


exports.loginotp = (req , res) => {
  res.render('loginotp')
}
exports.archive = (req,res) => {
  var arr1 = [];
    var arr2 = [];
    conferencedb.find(function (err, con) {
    for(var i=0;i<con.length;i++)
    {
    var countDownDate = new Date(`${con[i].fromdate}`).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    if(distance < 0)
    arr1.push(con[i]);
    else
    arr2.push(con[i]);
    }
    // console.log(arr);
    res.render("archive", { con: con, arr1 : arr1, arr2 : arr2 });
    });


}


exports.forgotpassword = (req , res) => {
  res.render('forgotpass')
}
exports.forgototp = (req , res) => {
  if(!req.body.email)
  {
    res.redirect('/login')
  }
  res.render('forgototp')
}

exports.confirmP  = (req , res) =>{
  res.render('confirmP')
}

exports.otp = (req, res)=> {

console.log(req.body);


  res.render('otp')
}

exports.form = (req,res) => {
    res.render("form");
}

exports.login = (req,res) => {
    res.render("login");
}

exports.aboutcon = (req,res) => {
    var id = req.params.id;
    conferencedb.findOne({_id : id } , function(err, con){
        var sn = con.speaker;
        var spn = con.sponsor;
        const date1 = new Date(con.fromdate);
        const date2 = new Date(con.todate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        console.log(con.url);
        var s = con.url;
        var idx = s.indexOf("v=");
        var ans = s.substring(idx+2,idx+13);
        console.log(ans);

        res.render("aboutcon", {con: con, sn: sn, spn: spn, diffDays: diffDays,ans : ans});
    });
}

exports.updateform = (req,res) => {
    var id = req.params.id;

    conferencedb.findOne({_id: id}, function(err, confer){
        res.render("updateform", {confer: confer, id: id});
    });
}

exports.admin = (req,res) => {

var admins = [] ;
User.find({}, function(err, users) {
           admins = users;
        });





    conferencedb.find({}, function(err, confe){
        conferencedb.findOne({landingpage: true}, function(err, land){
            var landid = land._id;
            res.render("admin", {confe: confe, landid: landid , admins : admins });
        });
    });
}

exports.committeeform = (req,res) => {
    res.render("commiteeform");
}

exports.updatecommitteeform = (req,res) => {
    res.render("updatecommittee");
}

exports.track = (req,res) => {
    var id = req.params.id;
    conferencedb.findOne({_id:id},function(err,conf){
        if(err){
            console.log(err);
        }
        else{
            res.render("tracks",{conf:conf,id:id});
        }
    });
}

exports.updatetrack = (req,res) => {
    res.render("updatetrack");
}

exports.committee = (req,res) => {
    var id=req.params.id;
    conferencedb.findOne({_id: id}, function(err, con){
        if(err){
            console.log(err);
        }
        else{
            res.render("committee", {con, con});
        }
    });
}

exports.about = (req,res) => {
    res.render("about");
}

exports.contact=(req,res)=>{
    res.render("contact");
}

exports.faq=(req,res)=>{
    res.render("faq");
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
exports.callforpaper = (req,res) => {
    var id=req.params.id;
    conferencedb.findOne({_id: id}, function(err, con){
        if(err){
            console.log(err);
        }
        else{
            var trackno = con.tracks.trackno.filter(onlyUnique);
            var trackname = con.tracks.trackname.filter(onlyUnique);
            res.render("callforpaper", {con: con,trackname:trackname, trackno: trackno});
        }
    });
}
exports.attendee = (req,res) => {
    var id=req.params.id;
    var i = req.params.i;

    conferencedb.findOne({_id: id}, function(err, con){
        if(err){
            console.log(err);
        }
        else{
            var trackno = con.tracks.trackno.filter(onlyUnique);
            var trackname = con.tracks.trackname.filter(onlyUnique);

            let d=new Date(con.fromdate);
            d.setDate(d.getDate()+con.days.day[i]);
            d = d.toDateString();

            res.render("attendee", {con: con,trackname:trackname, trackno: trackno, i: i,d:d});
        }
    });
}

exports.error404 = (req, res) => {
    res.render("error404");
  };
