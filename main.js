var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth - 100;
  canvas.height = window.innerHeight - 100;

  // ctx.fillStyle = 'green';
  // ctx.fillRect(10,10, 100,100)

  var img2 = new Image();
  img2.src = 'cat.svg';

  var cat = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
      ctx.fillStyle = 'green';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(img2, this.x, this.y, 50, 50)
    }
  }

  var img1 = new Image();
  img1.src = 'car_1.svg';


  class Car {
    constructor() {
      this.x = 500;
      this.y = 200;
      this.width = 100;
      this.height = 100;
    }
    draw(){
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(img1, this.x, this.y, 100, 100)
    }
  }
  var car = new Car();
  car.draw()

  var timer = 0;
  var car여러개 = [];
  var 점프timer = 0;
  var animation;

  function 프레임마다실행할거 () {
    animation = requestAnimationFrame(프레임마다실행할거);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height);

    if (timer % 200 === 0){
      var car = new Car();
      car여러개.push(car)
    }

    car여러개.forEach((a, i, o)=>{
      if (a.x < 0){
        o.splice(i, 1)
      }
      a.x--;

      충돌하냐(cat, a);

      a.draw();
    })

    if (점프중 == true){
      cat.y--;
      점프timer++;
    }
    if (점프중 == false){
      if (cat.y <200){
     cat.y++;
      }
    }
    if ( 점프timer > 100){
      점프중 = false;
      점프timer = 0;
    }
    
    cat.draw()
  }

  프레임마다실행할거();

  function 충돌하냐 (cat, car) {
    var x축차이 = car.x - (cat.x + cat.width);
    var y축차이 = car.y - (cat.y + cat.height);

    if (x축차이 < 0 && y축차이 < 0){
     ctx.clearRect(0,0, canvas.width, canvas.height);
     cancelAnimationFrame(animation)
     게임오버 = true;

     ctx.font = "50px Arial";
     ctx.fillStyle = "black";
     ctx.fillText("GAME OVER", canvas.width/2 - 150, canvas.height/2);
     ctx.font = "20px Arial";
     ctx.fillText("Press SPACE to restart", canvas.width/2 - 130, canvas.height/2 + 40);
    }
  }


  
  var 점프중 = false;
  var 게임오버 = false;

  document.addEventListener('keydown', function(e){
    if (e.code === 'Space'){
      if (게임오버) {
        다시시작();
      } else {
      점프중 = true;
    }
  }
  });

  function 다시시작() {
    timer = 0;
    car여러개 = [];
    점프timer = 0;
    cat.y = 200;
    게임오버 = false;

    프레임마다실행할거();
  }