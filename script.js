var card = document.querySelector(".card");
var p = document.querySelector(".container button"); 
var gifts = document.querySelectorAll(".gifts li");
var audio = document.querySelector("audio");
var textCard = "";

card.addEventListener("click", function() {
  if(this.classList.contains("initial")) {
    this.classList.remove("initial")
    gifts.forEach(function(gift) {
      gift.style.display = "flex";
      gift.classList.add("scale");
      return;
    })
  }  
  
  card.classList.remove("flipOut");
  card.classList.add("flipped");
  p.classList.remove("scaleOut");
  setTimeout(() => {
    this.style.background = "url('img/bg2.png')";
    p.innerHTML = "С Новым годом";
    p.style.display = "block";
    p.classList.add("scale");
    audio.currentTime = 0;
    audio.play(); 
  }, 3000);
});

p.addEventListener("click", function() {
  card.classList.remove("fliped");
  card.classList.add("flipOut");
  p.classList.remove("scale");
  p.classList.add("scaleOut");
  setTimeout(() => {
    card.style.background = "url('img/bg1.png')";
    p.innerHTML = "";
    p.style.display = "none";    
    audio.pause();
  }, 1000);
})


for(var i = 0; i < gifts.length; i++) {
  gifts[i].addEventListener("click", function(){
    this.classList.remove("scale");
    if(card.classList.contains("flipOut") && !this.classList.contains("sway")) {
      card.classList.remove("flipOut");
      card.classList.add("flipped");
      this.classList.add("sway");
      p.classList.remove("scaleOut");
      setTimeout(() => {
        card.style.background = "url('img/bg2.png')";
        textCard = this.dataset.text;
        p.innerHTML = textCard + "";
        p.style.display = "block";
        p.classList.add("scale");
        audio.currentTime = 0;
        audio.play();
      }, 3000);      
    } 
  });
}