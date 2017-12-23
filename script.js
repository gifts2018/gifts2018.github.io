var card = document.getElementById("card");
var cardBack = document.querySelector(".back")
var textCard = "";
var gifts = document.querySelectorAll(".gifts li");
var audio = document.querySelector("audio");

card.addEventListener("click", function() {
  card.classList.toggle("flipped");
  audio.pause();
});

for(var i = 0; i < gifts.length; i++) {
  gifts[i].addEventListener("click", function(){
    card.classList.toggle("flipped");
    textCard = this.dataset.text;
    cardBack.innerHTML = textCard + "";
    audio.currentTime = 0;
    audio.play();
  });
}

for(var i = 0; i < gifts.length; i++) {
  gifts[i].addEventListener("click", function(){
    this.classList.add("sway");
  });
}