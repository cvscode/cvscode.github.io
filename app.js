var particleBackground = {
  snowHeight: 26,
  snowWidth: 26,
  snowflakes1: [],
  snowflakes2: [],
  snowImage1: 'heart-128.webp',
  snowImage2: 'heart-128.webp',
  maxSnow: 50, 
  snowScale: 0.2,
  heartHeight: 40,
  heartWidth: 40,
  hearts: [],
  heartImage: 'heart-128.webp',
  maxHearts: 14,
  minScale: 0.4,
  draw: function() {
    this.setCanvasSize();
    this.ctx.clearRect(0, 0, this.w, this.h);
    for (var i = 0; i < this.hearts.length; i++) {
      var heart = this.hearts[i];
      heart.image = new Image();
      heart.image.style.height = heart.height;
      heart.image.src = this.heartImage;
      this.ctx.globalAlpha = heart.opacity;
      this.ctx.drawImage (heart.image, heart.x, heart.y, heart.width, heart.height);
    }
    for (var i = 0; i < this.snowflakes1.length; i++) {
      var snow = this.snowflakes1[i];
      snow.image = new Image();
      snow.image.style.height = snow.height;
      snow.image.src = this.snowImage1;
      this.ctx.globalAlpha = snow.opacity;
      this.ctx.drawImage (snow.image, snow.x, snow.y, snow.width, snow.height);
    }
    for (var i = 0; i < this.snowflakes2.length; i++) {
      var snow = this.snowflakes2[i];
      snow.image = new Image();
      snow.image.style.height = snow.height;
      snow.image.src = this.snowImage1;
      this.ctx.globalAlpha = snow.opacity;
      this.ctx.drawImage (snow.image, snow.x, snow.y, snow.width, snow.height);
    }
    this.move();
  },
  move: function() {
    for(var b = 0; b < this.hearts.length; b++) {
      var heart = this.hearts[b];
      heart.y += heart.ys;
      if(heart.y > this.h) {
        heart.x = Math.random() * this.w;
        heart.y = -1 * this.heartHeight;
      }
    }
    for(var b = 0; b < this.snowflakes1.length; b++) {
      var snow = this.snowflakes1[b];
      snow.y += snow.ys;
      if(snow.y > this.h) {
        snow.x = Math.random() * this.w;
        snow.y = -1 * this.snowHeight;
      }
    }
    
    for(var b = 0; b < this.snowflakes2.length; b++) {
      var snow = this.snowflakes2[b];
      snow.y += snow.ys;
      if(snow.y > this.h) {
        snow.x = Math.random() * this.w;
        snow.y = -1 * this.snowHeight;
      }
    }
  },
  setCanvasSize: function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
  },
  initialize: function() {
    this.canvas = $('#particleCanvas')[0];

    if(!this.canvas.getContext)
      return;

    this.setCanvasSize();
    this.ctx = this.canvas.getContext('2d');

    for(var a = 0; a < this.maxHearts; a++) {
      var scale = (Math.random() * (1 - this.minScale)) + this.minScale;
      this.hearts.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        ys: Math.random() + 1,
        height: scale * this.heartHeight,
        width: scale * this.heartWidth,
        opacity: scale
      });
    }
    
    for(var a = 0; a < this.maxSnow; a++) {
      var scale = (Math.random() * (1 - this.snowScale)) + this.snowScale;
      this.snowflakes1.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        ys: Math.random() + .5,
        height: scale * this.snowHeight,
        width: scale * this.snowWidth,
        opacity: scale
      });
    }
    for(var a = 0; a < (this.maxSnow*2); a++) {
      var scale = (Math.random() * (1 - this.snowScale)) + this.snowScale;
      this.snowflakes2.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        ys: Math.random() + 2,
        height: scale * this.snowHeight,
        width: scale * this.snowWidth,
        opacity: scale
      });
    }

    setInterval($.proxy(this.draw, this), 30);
  }
};


$(document).ready(function(){
  particleBackground.initialize();
});


window.addEventListener('resize', particleBackground.setCanvasSize());
