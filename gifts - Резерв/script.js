var card = document.querySelector(".card");
var p = document.querySelector(".card p"); 
var gifts = document.querySelectorAll(".gifts li");
var audio = document.querySelector("audio");
var textCard = "";

card.addEventListener("click", function() {
  card.classList.toggle("flipped");
  if(card.classList.contains("flipped")) {
    audio.currentTime = 0;
    audio.play();
  } else {
    setTimeout(() => {
      p.innerHTML = "";       
    }, 1000);    
    audio.pause();    
  }  
});

for(var i = 0; i < gifts.length; i++) {
  gifts[i].addEventListener("click", function(){
    if(!card.classList.contains("flipped")) {
      card.classList.add("flipped");
      this.classList.add("sway");
      setTimeout(() => {
        textCard = this.dataset.text;
        p.innerHTML = textCard + "";       
      }, 1000);     
      audio.currentTime = 0;
      audio.play();
    } 
  });
}