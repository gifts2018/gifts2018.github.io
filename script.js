var flip = document.querySelector(".flip-container");
var front = document.querySelector(".front");
var back = document.querySelector(".back");
var p = document.querySelector(".back p"); 
var gifts = document.querySelectorAll(".gifts li");
var audioPlay = document.querySelector(".audioPlay");
var audio = document.querySelector("audio");
var textCard = "";

function initial() {
  if(flip.classList.contains("initial")) {
    flip.classList.remove("initial")
    gifts.forEach(function(gift) { 
      setTimeout(() => {  
        gift.style.display = "flex";
        p.style.display = "block";
        audioPlay.style.display = "block";
        audioPlay.classList.add("play");
        audio.play();
      }, 3000);
      return;
    })
  };
}

function flipping() {
  flip.classList.toggle("flipping");
  if(flip.classList.contains("flipping")) {
    front.classList.remove("flip-front-out");
    back.classList.remove("flip-back-out");
    front.classList.add("flip-front");
    back.classList.add("flip-back");
  } else {
    front.classList.remove("flip-front");
    back.classList.remove("flip-back");
    front.classList.add("flip-front-out");
    back.classList.add("flip-back-out");    
  }    
}

flip.addEventListener("click", function() {
  initial();
  flipping();
  
});

for(var i = 0; i < gifts.length; i++) {
  gifts[i].addEventListener("click", function() {
    if(!this.classList.contains("sway") && !flip.classList.contains("flipping") && !flip.classList.contains("initial")) {
      this.classList.add("sway");
      textCard = this.dataset.text;
      p.innerHTML = textCard;
      flipping();
    }
  });
}

audioPlay.addEventListener("click", function() {   
  if(this.classList.contains("play")) {
    this.classList.remove("play");
    audioPlay.style.opacity = "0.4";
    audio.pause();     
  } else {
    this.classList.add("play");
    audio.currentTime = 0;
    audioPlay.style.opacity = "1";
    audio.play();
  } 
});





