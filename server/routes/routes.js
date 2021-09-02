const express = require('express');
const route = express.Router();
const passport = require('passport');


const services = require('../services/render');
const controller = require('../controller/controller');
const store = require('../middleware/multer');

const { ensureAuthenticated,forwardAuthenticated } = require('../middleware/auth');

route.get('/', services.homeRoutes);

route.get('/archive', services.archive);

route.get('/form', ensureAuthenticated, services.form);

route.post('/form', store.fields([{name: 'fileToUpload', maxCount: 20},{name: 'sfileToUpload', maxCount: 20},{name: 'gallery_img', maxCount: 20}]), controller.create);

route.get('/login',  services.login);

route.get('/aboutconference', services.aboutcon);

route.get('/aboutconference/:id', services.aboutcon);

route.get('/admin', services.admin);

route.post('/admin', controller.update);  //protected  //admin //updateform //form //

route.delete('/delete/:id', controller.condelete);

route.get('/updateform/:id', services.updateform); //update

route.get('/commiteeform', services.committeeform);

route.get('/updatecommiteeform',  services.updatecommitteeform);

route.get('/tracks', services.track);

route.post('/tracks', controller.track);

route.get('/updatetrack', services.updatetrack);

route.get('/committee/:id', services.committee);

route.get('/about', services.about);

route.post('/updateform/:id',store.fields([{name: 'fileToUpload', maxCount: 20},{name: 'sfileToUpload', maxCount: 20},{name: 'gallery_img', maxCount: 20}]), controller.updateformpost);

route.post('/committeeform', store.fields([{name: 'ch_img', maxCount: 20},{name: 'pat_img', maxCount: 20},{name: 'internat_img', maxCount: 20},{name: 'naadcom_img', maxCount: 20},{name: 'gencha_img', maxCount: 20},{name: 'gencochair_img', maxCount: 20},{name: 'conchair_img', maxCount: 20},{name: 'ficha_img', maxCount: 20},{name: 'teproch_img', maxCount: 20},{name: 'orgch_img', maxCount: 20},{name: 'pubch_img', maxCount: 20},{name: 'publich_img', maxCount: 20},{name: 'sponch_img', maxCount: 20}]), controller.committeecreate);

route.post('/updatecommitteeform', store.fields([{name: 'ch_img', maxCount: 20},{name: 'pat_img', maxCount: 20},{name: 'internat_img', maxCount: 20},{name: 'naadcom_img', maxCount: 20},{name: 'gencha_img', maxCount: 20},{name: 'gencochair_img', maxCount: 20},{name: 'conchair_img', maxCount: 20},{name: 'ficha_img', maxCount: 20},{name: 'teproch_img', maxCount: 20},{name: 'orgch_img', maxCount: 20},{name: 'pubch_img', maxCount: 20},{name: 'publich_img', maxCount: 20},{name: 'sponch_img', maxCount: 20}]), controller.updatecommitee)

route.get('/faq', services.faq);

route.get('/contact', services.contact);

route.get('/callforpaper/:id', services.callforpaper);

route.get('/attendee/:id/:i', services.attendee);


route.get('/login' ,  services.login);




route.delete('/delete/:id', controller.condelete);

route.get('/updateform/:id', services.updateform);


route.get('/signup' , services.login)
route.post('/signup' , controller.afterlogin)
route.post('/login' , controller.login)

route.post('/updateform/:id',store.fields([{name: 'fileToUpload', maxCount: 20},{name: 'sfileToUpload', maxCount: 20},{name: 'gallery_img', maxCount: 20}]), controller.updateformpost)

route.get('/otp' ,  services.otp)
route.post('/otp' , controller.otp)

route.post('/loginotp' , controller.loginotp)
route.get('/loginotp' , services.loginotp)

route.get('/forgototp' , services.forgototp)
route.post('/forgototp' , controller.forgototp)


route.get('/forgotpassword' , services.forgotpassword)
route.post('/forgotpassword' , controller.forgotpassword)

route.post('/admincheck' , controller.admincheck)

route.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
route.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log(req.user);
    const finduser = req.user;
    if(finduser.isAdmin === false || finduser.isAdmin === null )
    {
      req.flash('error_msg' , "You haven't been Approved as an Admin")
      req.logout()
      res.redirect('/login')
      return ;

    }
    else {
      console.log('Logged In');
      res.redirect('/admin')
    }

  }
)

// @desc    Logout user
// @route   /auth/logout
route.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})




// Logout
route.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('login');
});

route.get('/ConfirmPassword' , services.confirmP);
route.post('/ConfirmPassword' , controller.confirmP);
route.get("*", services.error404);


module.exports = route;
