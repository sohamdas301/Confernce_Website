var y = $(".form3").length;
var x = 2;
var z = 2;
var a = $(".form4").length;
var b = 2;
var c = $(".form5").length;
var pimg = 2;
var pdel = $(".form6").length;

var an = 2;
var andel = $(".form20").length;

// commitee
// cheif patron
var chpat = 2;
var chpatdel = $(".form7").length;

// patron
var pat = 2;
var patdel = $(".form8").length;

//international advisory
var internat = 2;
var internatdel = $(".form9").length;

//national advisory
var naadcom = 2;
var naadcomdel = $(".form10").length;

var gencha = 2;
var genchadel = $(".form11").length;


var gencochair = 2;
var gencochairdel = $(".form12").length;


var conchair = 2;
var conchairdel = $(".form13").length;


var ficha = 2;
var fichadel = $(".form14").length;


var teproch = 2;
var teprochdel = $(".form15").length;


var orgch = 2;
var orgchdel = $(".form16").length;


var pubch = 2;
var pubchdel = $(".form17").length;


var publich = 2;
var publichdel = $(".form18").length;


var sponch = 2;
var sponchdel = $(".form19").length;

function addAnnounce() {
  event.preventDefault();
  new_from = "<div class='form20 partannounce" +an+"'>"+
  "<label for='announce1'>Announcement:</label>"+
  "<div data-tip='Enter the announcements in the order that you want to be displayed '><input type='text' name='announce' /></div>"+
  "<hr />"+
"</div>"
 $(".announceeg").append(new_from);
  an++;
}






function deleteAnnounce() {
  event.preventDefault();
  var len = $(".form20").length;
  console.log(len);
  var partname = ".partannounce" + len;
  $(partname).remove();
  andel--;
}


function addDay() {
  event.preventDefault();
  new_from =
    "<div class='form3 partday" +
    x +
    "'><label for='day" +
    x +
    "'>Day no:</label>" +
    "<div data-tip='Enter the day number in the order that you want to be displayed '><input type='number' name='day' /></div>"
    +"<br><label for='timing'>Time:</label>" +
    "<div data-tip='Enter the time in  order and format for the day number entered before '><input type='text' name='time' /></div>"+
    "<label for='event-name'>Event Name:</label>" +
    "<div data-tip='Enter the name of event corresponding to the time entered before '><input type='text' name='eventname' /></div>"+
    "<label for='event-desc'>Event Description:</label>" +
     "<div data-tip='Enter the description of the event and please note that the first 30 characters would be displayed in the main page. So enter accordingly!'><textarea name='eventdesc' id='' cols='80' rows='4'></textarea></div><br>"+

    "<label for='plink'>Paper Link:</label>"+
    "<div data-tip='Enter the valid google drive link of the paper presenter corresponding to the event if available or else type NA '><input type='text' name='paperlink' /></div>"+

    "<input type='hidden' name='event-name' value='" +
    x +
    "' id='event-name'>" +
    "<br></div><hr>";

  $(".dayeg").append(new_from);
  x++;
}

function deleteDay() {
  event.preventDefault();
  var len = $(".form3").length;
  console.log(len);
  var partname = ".partday" + len;
  $(partname).remove();
  y--;
}

//Delete Speaker
function deleteSpeaker() {
  event.preventDefault();
  var len = $(".form4").length;
  console.log(len);
  var partname = ".partspeaker" + (len + 1);
  $(partname).remove();
  a--;
}

// Add speaker

function addSpeaker() {
  event.preventDefault();
  new_from =
    "<div class='form4 partspeaker" +
    z +
    "'><label for='speaker" +
    z +
    "'>Speaker Photo:</label>" +
    "<div data-tip='Enter the photo of the speaker in the order that you want to be displayed. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='fileToUpload' id='fileToUpload"+ 
 +
    z +
    "' multiple /></div>" +
    "<label for='speaker-name" +
    z +
    "'>Speaker Name:</label>" +
    "<div data-tip='Enter the name of the corresponding speaker '><input type='text' name='speakername' /></div>"
 +
    "<label for='speaker-desc" +
    z +
    "'>Speaker Description:</label>" +
    "<div data-tip='Enter the description of the corresponding speaker '><input type='text' name='speakerdesc' /></div>" +
    "<input type='hidden' name='speaker-name' value='" +
    z +
    "' id='speaker-name'>" +
    "<br></div><hr>";

  $(".speakereg").append(new_from);
  z++;
}

//Delete Sponsor
function deleteSponsor() {
  event.preventDefault();
  var len = $(".form5").length;
  console.log(len);
  var partname = ".partsponsor" + (len + 1);
  $(partname).remove();
  c--;
}
// Add sponsor

function addSponsor() {
  event.preventDefault();
  new_from =
    "<div class='form5 partsponsor" +
    b +
    "'><label for='sponsor" +
    b +
    "'>Sponsor Photo:</label>" +
    "<div data-tip='Enter the photo of the sponsor in the order that you want to be displayed. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'>"+"<input type='file' name='sfileToUpload' id='sfileToUpload"+
    b +
    "'  multiple /></div>" +
    "<label for='sponsor-name" +
    b +
    "'>Sponsor Name:</label>" +
     "<div data-tip='Enter the name of the corresponding sponsor '><input type='text' name='sponsorname' /></div>" +
    "<input type='hidden' name='sponsor-name' value='" +
    b +
    "' id='speaker-name'>" +
    "<br></div><hr>";

  $(".sponsoreg").append(new_from);
  b++;
}
function addphotos(){
  event.preventDefault();
  new_form="<br><div class='form6 partgallery" +pimg+ "'><label for='img_cap'>Image Caption:</label>"+
  "<div data-tip='Enter the caption of the photo of the past conference if avilable in the order that you want to be displayed.'><input type='text' name='img_cap' /></div>"+
"<label for='gallery_img' class='image'>Photos of conference: </label>"+
          " <div data-tip='Enter the corresponding photo of the past conference if available in the order that you want to be displayed. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='gallery_img' id='gallery_img' multiple /></div>"+
          "</div>";
  $(".gallery_imgeg").append(new_form);
  pimg++;
}

function deletephotos(){
  event.preventDefault();
  var len = $(".form6").length;
  console.log(len);
  var partname = ".partgallery" + (len );
  $(partname).remove();
  pdel--;
}

// chief patron
function addchpatphotos(){
  event.preventDefault();
  new_form="<br><div class='form7 partchpat" +chpat+ "'><label for='chpart'>Chief Patron Name:</label>"+
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='chpat'/></div>"+
"<label for='ch_img' class='image'>Corresponding Photo: </label>"+
          "<div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='ch_img' id='ch_img' multiple /></div>"+
          "</div>";
  $(".chiefpatron").append(new_form);
  chpat++;
}

function deletechpatphotos(){
  event.preventDefault();
  var len = $(".form7").length;
  console.log(len);
  var partname = ".partchpat" + (len );
  $(partname).remove();
  chpatdel--;
}

// patrons

function addpatphotos(){
  event.preventDefault();
  new_form="<br><div class='form8 partpat" +pat+ "'><label for='pat'>Patron Name:</label>"+
            "  <div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='pat'  /></div>"+
"<label for='pat_img' class='image'>Corresponding Photo: </label>"+
          " <div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='pat_img' id='pat_img' multiple /></div>"+
          "</div>";
  $(".patrons").append(new_form);
  pat++;
}

function deletepatphotos(){
  event.preventDefault();
  var len = $(".form8").length;
  console.log(len);
  var partname = ".partpat" + (len );
  $(partname).remove();
  patdel--;
}

// intrern national advisory
function addinternatimgphotos(){
  event.preventDefault();
  new_form="<br><div class='form9 internatad" +internat+ "'><label for='internat'>International Advisory Committee Member Name:</label>"+
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='internat' /></div><label for='internat_img' class='image'>Corresponding Photo: </label>"+
          "<div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='internat_img' id='internat_img' multiple /></div>"+
          "</div>";
  $(".internatad").append(new_form);
  internat++;
}

function deleteinternatimgphotos(){
  event.preventDefault();
  var len = $(".form9").length;
  console.log(len);
  var partname = ".internatad" + (len );
  $(partname).remove();
  internatdel--;
}

// national advisory
function addnaadcomimgphotos(){
  event.preventDefault();
  new_form="<br><div class='form10 naadcom" +naadcom+ "'><label for='naadcom'>National Advisory Committee Member Name:</label>"+
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='naadcom' /></div><label for='naadcom_img' class='image'>Corresponding Photo: </label>"+
          "<div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='naadcom_img' id='naadcom_img' multiple /></div>"+
          "</div>";
  $(".naadcom").append(new_form);
  naadcom++;
}

function deletenaadcomimgphotos(){
  event.preventDefault();
  var len = $(".form10").length;
  console.log(len);
  var partname = ".naadcom" + (len );
  $(partname).remove();
  naadcomdel--;
}

function addgenchaimgphotos(){
  event.preventDefault();
  new_form="<br><div class='form11 gencha" +gencha+ "'><label for='gencha'>General Chair Name:</label>"+
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='gencha' /></div><label for='gencha_img' class='image'>Corresponding Photo: </label>"+
          "<div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='gencha_img' id='gencha_img' multiple /></div>"+
          "</div>";
  $(".gencha").append(new_form);
  gencha++;
}

function deletegenchaimgphotos(){
  event.preventDefault();
  var len = $(".form11").length;
  console.log(len);
  var partname = ".gencha" + (len );
  $(partname).remove();
  genchadel--;
}

function addgencochairimgphotos(){
  event.preventDefault();
  new_form="<br><div class='form12 gencochair" +gencochair+ "'><label for='gencochair'>General Co Chair Name:</label>"+
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='gencochair' /></div><label for='gencochair_img' class='image'>Corresponding Photo: </label>"+
          "<div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='gencochair_img' id='gencochair_img' multiple /></div>"+
          "</div>";
  $(".gencochair").append(new_form);
  gencochair++;
}

function deletegencochairimgphotos(){
  event.preventDefault();
  var len = $(".form12").length;
  console.log(len);
  var partname = ".gencochair" + (len );
  $(partname).remove();
  gencochairdel--;
}

function addconchairimgphotos(){
  event.preventDefault();
  new_form="<br><div class='form13 conchair" +conchair+ "'><label for='conchair'>Conference Chair Name:</label>"+
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='conchair' /></div><label for='conchair_img' class='image'>Corresponding Photo: </label>"+
          "<div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='conchair_img' id='conchair_img' multiple /></div>"+
          "</div>";
  $(".conchair").append(new_form);
  conchair++;
}

function deleteconchairimgphotos(){
  event.preventDefault();
  var len = $(".form13").length;
  console.log(len);
  var partname = ".conchair" + (len );
  $(partname).remove();
  conchairdel--;
}

function addfichaimgphotos(){
  event.preventDefault();
  new_form="<br><div class='form14 ficha" +ficha+ "'><label for='ficha'>Finance Chair Name:</label>"+
            " <div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='ficha'  /></div><label for='ficha_img' class='image'>Corresponding Photo: </label>"+
          " <div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='ficha_img' id='ficha_img' multiple /></div>"+
          "</div>";
  $(".ficha").append(new_form);
  ficha++;
}

function deletefichaimgphotos(){
  event.preventDefault();
  var len = $(".form14").length;
  console.log(len);
  var partname = ".ficha" + (len );
  $(partname).remove();
  fichadel--;
}

function addteprochimgphotos(){
  event.preventDefault();
  new_form="<br><div class='form15 teproch" +teproch+ "'><label for='teproch'>Tech. Program Chair Name:</label>"+
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='teproch' /></div><label for='teproch_img' class='image'>Corresponding Photo: </label>"+
          " <div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='teproch_img' id='teproch_img' multiple /></div>"+
          "</div>";
  $(".teproch").append(new_form);
  teproch++;
}

function deleteteprochimgphotos(){
  event.preventDefault();
  var len = $(".form15").length;
  console.log(len);
  var partname = ".teproch" + (len );
  $(partname).remove();
  teprochdel--;
}

function addorgchimgphotos(){
  event.preventDefault();
  new_form="<br><div class='form16 orgch" +orgch+ "'><label for='orgch'>Organizing Chair Name:</label>"+
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='orgch' /></div><label for='orgch_img' class='image'>Corresponding Photo: </label>"+
          "<div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='orgch_img' id='orgch_img' multiple /></div>"+
          "</div>";
  $(".orgch").append(new_form);
  orgch++;
}

function deleteorgchimgphotos(){
  event.preventDefault();
  var len = $(".form16").length;
  console.log(len);
  var partname = ".orgch" + (len );
  $(partname).remove();
  orgchdel--;
}

function addpubchimgphotos(){
  event.preventDefault();
  new_form="<br><div class='form17 pubch" +pubch+ "'><label for='pubch'>Publication Chair Name:</label>"+
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='pubch'  /></div><label for='pubch_img' class='image'>Corresponding Photo: </label>"+
          " <div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='pubch_img' id='pubch_img' multiple /></div>"+
          "</div>";
  $(".pubch").append(new_form);
  pubch++;
}

function deletepubchimgphotos(){
  event.preventDefault();
  var len = $(".form17").length;
  console.log(len);
  var partname = ".pubch" + (len );
  $(partname).remove();
  pubchdel--;
}

function addpublichimgphotos(){
  event.preventDefault();
  new_form="<br><div class='form18 publich" +publich+ "'><label for='publich'>Publicity Chair Name:</label>"+
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='publich'  /></div><label for='publich_img' class='image'>Corresponding Photo: </label>"+
          "<div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='publich_img' id='publich_img' multiple /></div>"+
          "</div>";
  $(".publich").append(new_form);
  publich++;
}

function deletepublichimgphotos(){
  event.preventDefault();
  var len = $(".form18").length;
  console.log(len);
  var partname = ".publich" + (len );
  $(partname).remove();
  publichdel--;
}

function addsponchimgphotos(){
  event.preventDefault();
  new_form="<br><div class='form19 sponch" +sponch+ "'><label for='sponch'>Sponsorship Chair Name:</label>"+
            " <div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='sponch'  /></div>"
+"<label for='sponch_img' class='image'>Corresponding Photo: </label>"+
          "<div data-tip='Enter the corresponding photo. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='sponch_img' id='sponch_img' multiple /></div>"
+
          "</div>";
  $(".sponch").append(new_form);
  sponch++;
}

function deletesponchimgphotos(){
  event.preventDefault();
  var len = $(".form19").length;
  console.log(len);
  var partname = ".sponch" + (len );
  $(partname).remove();
  sponchdel--;
}