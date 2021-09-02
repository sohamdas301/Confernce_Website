var y = 2;
var x = $(".form3").length + 1;
function addTrack() {
  event.preventDefault();
  new_from =
    "<div class='form3 parttrack" +
    x +
    "'><label for='track1'" +
    "'>Track No:</label>" +
    "<div data-tip='Enter the track number in the order that you want to be displayed '><input type='number' name='trackno' />" +
    "</div>" +
    " <label for='trackname'>Track Name:</label>" +
    "<div data-tip='Enter the name of track corresponding to the track number entered before .Please enter consistent track names throughout.'><input type='text' name='trackname'  />" +
    " </div>" +
    
    "<label for='sessionname'>Session Name:</label>" +
    "<div data-tip='Enter the name of session corresponding to the track entered before '><input type='text' name='sessionname'/>"
    + " </div><hr />";

  $(".trackeg").append(new_from);
  x++;
}

function deleteTrack() {
  event.preventDefault();
  var len = $(".form3").length;
  console.log(len);
  var partname = ".parttrack" + len;
  $(partname).remove();
  y--;
}