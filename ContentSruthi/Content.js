var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  // If n is greater than the number of slides, set slideIndex to 1
  if (n > slides.length) { 
    slideIndex = 1;
  }    
  // If n is less than 1, set slideIndex to the number of slides
  if (n < 1) { 
    slideIndex = slides.length;
  }
  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  // Remove the "active" class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  // Display the current slide
  slides[slideIndex-1].style.display = "block";  
  // Add the "active" class to the current dot
  dots[slideIndex-1].className += " active";
}

