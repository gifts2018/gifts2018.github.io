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

(function(){
  //Blowy Snow

  var flakeNum = 150;
  var pic = new Image(20,20);
  pic.src = "img/flake.png";
  var d = document;
  var deg = 180/3.14;
  var rad = 3.14/180;
  var idx = (typeof d.getElementsByTagName != "undefined")?d.getElementsByTagName('div').length:0;
  var f = {w:0,h:0,cx:0,cy:0,flake:[],x:[],y:[],cutRight:[],cutLeft:[],dst:[],size:[],vel:[],acc:[],blo:[],rate:[],rng:[],ang:[],counter:[]}

  var con = d.createElement('div');
  con.setAttribute('style','display:block;'
                   +'position:fixed;'
                   +'height:100%;width:100%;'
                   +'margin:auto;padding:0px;'
                   +'top:0;left:0;left:0;right:0;'
                   +'overflow:hidden;' 
                   +'visibility:hidden;');
  d.body.appendChild(con);

  for (var i = 0; i < flakeNum; i++) {
    f.counter[i] = 0;
    var img = d.createElement('img');
    img.setAttribute('id','flake'+(idx+i));
    img.setAttribute('src',pic.src);
    img.setAttribute('style','display:none;'
                     +'position:absolute;'
                     +'transform: translate3d(0px,0px,0)'
                     +'height:3vh;width:3vh;'
                     +'visibility:visible;');
    con.appendChild(img);
  }

  function win() {
    var ddw = d.documentElement.clientWidth;
    var ddh = d.documentElement.clientHeight;
    var scrollBarRight = (typeof ddw == 'number') ? window.innerWidth - ddw : 0;
    var scrollBarBottom = (typeof ddh == 'number') ? window.innerHeight - ddh : 0;
    f.h = window.innerHeight - scrollBarBottom -1;
    f.w = window.innerWidth - scrollBarRight -1;
    f.cy = f.h/2|0;
    f.cx = f.w/2|0;
  }

  function rsz() {
    win();
    for (var i = 0; i < flakeNum; i++) {
      f.flake[i].style.display = 'none';
      f.counter[i] = 0;
      rst(i);
    }
  }
  window.addEventListener("resize", rsz, false);

  function rst(s) {
    if (f.counter[s] > 1) {
      f.flake[s].style.display = 'block';
    }
    if (f.counter[s] < 2) {
      f.counter[s]++;
    }
    f.cutLeft[s] = 0 + Math.random() * f.cx/2;
    f.cutRight[s] = f.w - Math.random() * f.cx/2;
    f.y[s] = 0 + Math.random() * f.h;
    f.x[s] = (f.cx - f.cx/3) + Math.random() * f.cx/1.5;
    f.rng[s] = f.cx-100 + Math.random() * 200;
    var dy = (f.y[s] - f.cy/6);
    var dx = (f.x[s] - f.rng[s]);
    f.ang[s] = Math.atan2(dy,dx) * deg;
    f.dst[s] = 5 + (Math.sqrt(dy*dy + dx*dx));
    f.size[s] = 0.1;
    f.acc[s] = 0; 
    f.blo[s] = 0;
    f.vel[s] = (1.8 * (f.dst[s] / 2) / 100);             
    f.rate[s] = (-0.01 + Math.random() * 0.02);
  }

  function animate() {
    for (var i = 0; i < flakeNum; i++){
      f.y[i] += f.vel[i] * Math.sin((f.ang[i]) * rad);
      f.x[i] += f.vel[i] * Math.cos((f.ang[i]+=f.blo[i]) * rad);
      f.acc[i] = (f.vel[i] / (f.dst[i] + (400 * f.vel[i] / 100)) * f.vel[i]);
      f.vel[i] += f.acc[i];
      f.size[i] += ((f.vel[i] * 0.6) / (190 * f.dst[i] / 100));
      f.blo[i] += f.rate[i];
      if (f.y[i] < -f.cy/2) {
        f.ang[i]  *= -1;
      }
      if (f.x[i]+f.size[i] < f.cutLeft[i] || f.x[i] > f.cutRight[i] || f.y[i] > f.h || f.x[i] > f.w || f.x[i]+f.size[i] < 0){
        rst(i);
      }
      f.flake[i].style.transform = 'translate3d('+f.x[i]+'px, '+f.y[i]+'px,0) scale('+f.size[i]+')';
    }
  }

  function run() {
    requestAnimationFrame(run);
    animate();
  }

  function init() {
    win();
    for (var i = 0; i < flakeNum; i++){
      f.flake[i] = d.getElementById("flake"+(idx+i));
      rst(i);
    }
    run();
  }
  window.addEventListener("load",init,false);

})();