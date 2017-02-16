var dom=document.getElementById("clock");
var ctx=dom.getContext("2d");
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;
var rem=width/200;

function drawBackground(){
	ctx.save();

	//外圆
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth=10*rem;
	ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);
	ctx.stroke();
	//字标
	var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font=18*rem+"px Arial";
	ctx.textAlign="center";
	ctx.textBaseline="middle";
	hourNumbers.forEach(function(number,i) {
		var rad=2*Math.PI/12*i;
		var x=Math.cos(rad)*(r-30*rem);
		var y=Math.sin(rad)*(r-30*rem);

		ctx.fillText(number,x,y);
	});
    //时间段
	for(var i=0;i<60;i++){
		var rad=2*Math.PI/60*i;
		var x=Math.cos(rad)*(r-18*rem);
		var y=Math.sin(rad)*(r-18*rem);
		ctx.beginPath();
		if(i%5===0){
			ctx.fillStyle="#000";
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}
		else{
			ctx.fillStyle="#ccc";
		    ctx.arc(x,y,2*rem,0,2*Math.PI,false);
	    }
		ctx.fill();
	}

}
function drawHour(hour,minute){
	ctx.save();
	ctx.beginPath();
	var rad=2*Math.PI/12*hour;
	var mrad=2*Math.PI/12/60*minute;
	ctx.rotate(rad+mrad);
	ctx.lineWidth=6*rem;
	ctx.lineCap="round";

	ctx.moveTo(0,10*rem);
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();
}

function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad=2*Math.PI/60*minute;
	ctx.rotate(rad);
	ctx.lineWidth=3*rem;
	ctx.lineCap="round";

	ctx.moveTo(0,10*rem);
	ctx.lineTo(0,-r+30*rem);
	ctx.stroke();
	ctx.restore();
}

function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle="#c14543"
	var rad=2*Math.PI/60*second;
	ctx.rotate(rad);
	

	ctx.moveTo(-2*rem,20*rem);
	ctx.lineTo(2*rem,20*rem);
	ctx.lineTo(1,-r+18*rem);
	ctx.lineTo(-1,-r+18*rem);
	ctx.fill();
	ctx.restore();
}

function drawDot(){
	ctx.beginPath();
	ctx.fillStyle="#fff";
	ctx.arc(0,0,3*rem,0,2*Math.PI,false);
	ctx.fill();
}
function time(hour){
	ctx.lineWidth=1*rem;
	ctx.strokeRect(20*rem,-7.5*rem,40*rem,15*rem);
	ctx.textAlign="center";
	ctx.textBaseline="middle";
	ctx.fillStyle="#000";
	ctx.font=8*rem+"px Arial";
	if(hour<12){
       ctx.fillText("上午",40*rem,-1.5*rem);
   }
   else{
   	   ctx.fillText("下午",40*rem,-1.5*rem);
   }
    
}

function draw(argument) {
	ctx.clearRect(0,0,width,height);
	var now=new Date();
	var hour=now.getHours();	//返回24小时制数
	var minute=now.getMinutes();
	var second=now.getSeconds();
	drawBackground();
	time(hour);
	drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
}
 setInterval(draw,1000);
