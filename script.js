var card = document.getElementById("card");
var cardFront = document.querySelector(".front");
var cardBack = document.querySelector(".back");
var textCard = "";
var gifts = document.querySelectorAll(".gifts li");
var audio = document.querySelector("audio");

card.addEventListener("click", function() {
  card.classList.toggle("flipped");
  if(card.classList.contains("flipped")) {
    audio.currentTime = 0;
    audio.play();
  } else {
    audio.pause();
  }  
});

for(var i = 0; i < gifts.length; i++) {
  gifts[i].addEventListener("click", function(){
    if(!card.classList.contains("flipped")) {
      card.classList.add("flipped");
      this.classList.add("sway");
      textCard = this.dataset.text;
      cardBack.innerHTML = textCard + "";
      audio.currentTime = 0;
      audio.play();
    }    
  });
}