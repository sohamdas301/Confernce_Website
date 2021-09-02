var y = 2;
var x = $(".form3").length + 1;
var z = $(".form4").length+1;
var a = 2;
var b = $(".form5").length + 1;
var c = 2;
var pimg = $(".form6").length + 1;
var pdel = 2;

// commitee
// cheif patron
var chpat = $(".form7").length + 1;
var chpatdel = 2;

// patron
var pat = $(".form8").length + 1;
var patdel = 2;

//international advisory
var internat = $(".form9").length + 1;
var internatdel = 2;

//national advisory
var naadcom = $(".form10").length + 1;
var naadcomdel = 2;

var gencha = $(".form11").length + 1;
var genchadel = 2;


var gencochair = $(".form12").length + 1;
var gencochairdel = 2;


var conchair = $(".form13").length + 1;
var conchairdel = 2;


var ficha = $(".form14").length + 1;
var fichadel = 2;


var teproch = $(".form15").length + 1;
var teprochdel = 2;


var orgch = $(".form16").length + 1;
var orgchdel = 2;


var pubch = $(".form17").length + 1;
var pubchdel = 2;


var publich = $(".form18").length + 1;
var publichdel = 2;


var sponch = $(".form19").length + 1;
var sponchdel = 2;

var an = $(".form20").length + 1;
var andel = 2;


function addAnnounce() {
  event.preventDefault();
  new_from = "<div class='form20 partannounce" +an+"'>"+
  "<label for='announce1'>Announcement:</label>"+
  "<input type='text' name='announce' />"+
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
    "<div data-tip='Enter the day number in the order that you want to be displayed '><input type='number' name='day' ></div><br><label for='timing'>Time:</label>" +
    "<div data-tip='Enter the time in  order and format for the day number entered before '><input type='text' name='time'></div>" +
    "<label for='event-name'>Event Name:</label>" +
    "<div data-tip='Enter the name of event corresponding to the time entered before '><input type='text' name='eventname'></div>" +
    "<label for='event-desc'>Event Description:</label>" +
    "<div data-tip='Enter the description of the event and please note that the first 30 characters would be displayed in the main page. So enter accordingly!'><textarea name='eventdesc' id='' cols='80' rows='4'></textarea></div>"+
    "<label for='plink'>Paper Link:</label>"+
    "<div data-tip='Enter the valid google drive link of the paper presenter corresponding to the event if available or else type NA '><input type='text' name='paperlink' /></div>" +
   
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
  x--;
}

//Delete Speaker
function deleteSpeaker() {
  event.preventDefault();
  var len = $(".form4").length;
  console.log(len);
  var partname = ".partspeaker" + (len);
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
    "<div data-tip='Enter the photo of the speaker in the order that you want to be displayed. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='fileToUpload' id='fileToUpload" +
    z +
    "' capture></div>" +
    "<label for='speaker-name" +
    z +
    "'>Speaker Name:</label>" +
    "<div data-tip='Enter the name of the corresponding speaker '><input type='text' name='speaker_name'></div>" +
    "<label for='speaker-desc" +
    z +
    "'>Speaker Description:</label>" +
    "<div data-tip='Enter the description of the corresponding speaker '><input type='text' name='speaker_desc'></div>" +
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
  var partname = ".partsponsor" + (len );
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
    "<div data-tip='Enter the photo of the sponsor in the order that you want to be displayed. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='sfileToUpload' id='sfileToUpload" +
    b +
    "' capture></div>" +
    "<label for='sponsor-name" +
    b +
    "'>Sponsor Name:</label>" +
    "<div data-tip='Enter the name of the corresponding sponsor '><input type='text' name='sponsor_name'></div>" +
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
            "<div data-tip='Enter the caption of the photo of the past conference if avilable in the order that you want to be displayed.'><input type='text' name='imgcap'/></div><label for='gallery_img' class='image'>Photos of conference: </label>"+
          "<div data-tip='Enter the corresponding photo of the past conference if available in the order that you want to be displayed. Enter in jpg/jpeg/png fotmat. File size should be less than 1 MB'><input type='file' name='gallery_img' id='gallery_img' multiple /></div>"+
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
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='ch_pat'/></div>"+
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
            "  <div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='patr'  /></div>"+
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
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='intern_at' /></div><label for='internat_img' class='image'>Corresponding Photo: </label>"+
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
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='naad_com' /></div><label for='naadcom_img' class='image'>Corresponding Photo: </label>"+
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
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='gen_cha' /></div><label for='gencha_img' class='image'>Corresponding Photo: </label>"+
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
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='genco_chair' /></div><label for='gencochair_img' class='image'>Corresponding Photo: </label>"+
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
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='con_chair' /></div><label for='conchair_img' class='image'>Corresponding Photo: </label>"+
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
            " <div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='fic_ha'  /></div><label for='ficha_img' class='image'>Corresponding Photo: </label>"+
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
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='te_proch' /></div><label for='teproch_img' class='image'>Corresponding Photo: </label>"+
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
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='org_ch' /></div><label for='orgch_img' class='image'>Corresponding Photo: </label>"+
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
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='pub_ch'  /></div><label for='pubch_img' class='image'>Corresponding Photo: </label>"+
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
            "<div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='publi_ch'  /></div><label for='publich_img' class='image'>Corresponding Photo: </label>"+
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
            " <div data-tip='Enter the name of the person in the order that you want to be displayed. '><input type='text' name='spon_ch'  /></div>"
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