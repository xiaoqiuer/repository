
var can;
var ctx;
var w;
var h;
var girlPic=new Image();
var starPic=new Image();

var num=60;
var stars=[];//实例数组

var lastTime;
var deltaTime;
var switchy=false;
var life=0;

function init(){
	can=document.getElementById("canvas");
	ctx=can.getContext("2d");

	w=can.width;
	h=can.height;

	document.addEventListener("mousemove",mousemove,false);

	girlPic.src="image/starGirl/girl.jpg";
	starPic.src="image/starGirl/star.png";
	for(var i=0;i<num;i++){
		var obj=new strObj();
		stars.push(obj);
		stars[i].init();
	}
	lastTime=Date.now();

	gameloop();

	


}
document.body.onload=init;

function gameloop(){
	window.requestAnimFrame(gameloop);
	var now=Date.now();
	deltaTime= now-lastTime;
	lastTime=now;

	drawBackground ();
	
	drawGirl();
	drawStars();
	aliveUpdate();
}

function drawBackground () {
	ctx.fillStyle="#393550";
	ctx.fillRect(0,0,w,h);

}

function drawGirl(){
	ctx.drawImage(girlPic,100,150,600,300);
	
}

function drawStars(){

	for(var i=0;i<num;i++){

		stars[i].update();
		stars[i].draw();

	}
}
function aliveUpdate(argument) {
	if(switchy){
		life+=0.3*deltaTime*0.05;
		if(life>1){
			life=1;
		}
	}
	else
	{
		life-=0.3*deltaTime*0.05;
		if(life<0){
			life=0;
		}

	}
}
function mousemove(e) {
	if(e.offsetX||e.layerX){
		var px=e.offsetX==undefined?e.layerX:e.offsetX;
		var py=e.offsetY==undefined?e.layerY:e.offsetY;
		if(px>100&&px<700&&py>150&&py<450){
			switchy=true;
		}
		else{
			switchy=false;
		}
	}
}

//很多星星
var strObj=function () {
	this.x;
	this.y;
	this.picNo;
	this.timer;
	this.xSpd;
	this.ysPd;
}

strObj.prototype.init = function() {
	this.x=Math.random()*600+100;
	this.y=Math.random()*300+150;
	this.picNo=Math.floor(Math.random()*7);
	this.timer=0;
	this.xSpd=Math.random()*3-1.5;
	this.ySpd=Math.random()*3-1.5;
};
strObj.prototype.update=function () {
	
	this.x+=this.xSpd*deltaTime*0.004;
	this.y+=this.ySpd*deltaTime*0.004;
    if(this.x<100+7||this.x>700-7){
    	this.init();
    	return;
    }
     if(this.y<150+7||this.y>450-7){
    	this.init();
    	return;
    }
    this.timer+=deltaTime;
	
	if(this.timer>50){
		this.picNo+=1;
		this.timer=0
	}
	
}
strObj.prototype.draw=function () {
	
	ctx.save();
	ctx.globalAlpha=life;   //全局透明度
	ctx.drawImage(starPic,(this.picNo%7)*7,0,7,7,this.x,this.y,7,7);
	ctx.restore();
}

