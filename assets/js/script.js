
$(function(){
  var scroll = $(window).scrollTop();
  if(scroll == 0){
      $("#toTop").hide();
  }
  $("#toTop").on("click",function () {
      $("html, body").animate({scrollTop: 0}, 500);
  });
  $(window).scroll(function (event) {
      var scroll = $(window).scrollTop();
      if(scroll == 0){
          $("#toTop").fadeOut();
      }
      else{
          $("#toTop").fadeIn();
      }
  });
});

$("#content1").addClass("current");
$("#1").addClass("btncurrent");

const mobileBtn = document.getElementById("mobile-cta");
nav = document.querySelector("nav");
mobileBtnExit = document.getElementById("mobile-exit");

mobileBtn.addEventListener("click", () => {
  nav.classList.add("menu-btn");
});

mobileBtnExit.addEventListener("click", () => {
  nav.classList.remove("menu-btn");
});



$(".days").click(function () {
  $(".days").removeClass("btncurrent");
  $(".contents").removeClass("current");
  var t = $(this).attr("id");
  var a = '#' + t;
  console.log(a);
  var cont="content"+t;
  var id="#"+cont;
  console.log(id);
  $(id).addClass("current");
  $(a).addClass("btncurrent");
});

if(window.location.pathname == "/admin"){
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function(){
      var id = $(this).attr("data-id")

      var request = {
          "url" : `http://localhost:3000/delete/${id}`,
          "method" : "DELETE"
      }

      if(confirm("Do you really want to delete this conference?")){
          $.ajax(request).done(function(response){
              alert("Data Deleted Successfully!");
              location.reload();
          })
      }

  })
}