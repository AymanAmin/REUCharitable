
// Get the modal
const myTimeout = setTimeout(loadImg, 500);
function loadImg() {
  if (document.getElementById('myModal')) {
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById('myImg');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");

    //console.log("img clicked");
    modal.style.display = "block";
  }
}

// When the user clicks on <span> (x), close the modal
function CloseModel() {
  if (document.getElementById('myModal')) {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
  }
}

window.onafterprint = function () {
  document.getElementById("HeaderPage").style.display = "block";
  document.getElementById("FooterPage").style.display = "block";
  document.getElementById("FooterPage2").style.display = "block";
  document.getElementById("MyReport").style.marginTop = "200px";
}

window.onbeforeprint = function () {
  document.getElementById("HeaderPage").style.display = "none";
  document.getElementById("FooterPage").style.display = "none";
  document.getElementById("FooterPage2").style.display = "none";
  document.getElementById("MyReport").style.marginTop = "-50px";
}
