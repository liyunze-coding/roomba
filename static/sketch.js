let x;
let y;

let xspeed;
let yspeed;

let img;
let audio;

var angle = 0;
var audio2 = '';
var value = 0;

var dirt_x;
var dirt_y;

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}

function preload() {
	img = loadImage("static/roomba.png");
	dirt = loadImage("static/white_dust.png");
	fuck1 = loadSound("static/audio/fuck1.mp3");
	fuck2 = loadSound("static/audio/fuck2.mp3");
	gfd = loadSound("static/audio/godfuckindammit.mp3");
	motherfucker = loadSound("static/audio/motherfucker.mp3");
	rufs = loadSound("static/audio/rufs.mp3");

	fuck1.setVolume(0.1);
	fuck2.setVolume(0.1);
	gfd.setVolume(0.1);
	motherfucker.setVolume(0.1);
	rufs.setVolume(0.1);

	// bust_nut = loadSound("static/audio/bust_a_nut.mp3");
	// big_tiddies = loadSound("static/audio/big_tiddies.mp3");
	// small_tiddies = loadSound("static/audio/small_tiddies.mp3");

	sounds = [fuck1, fuck2, gfd, motherfucker, rufs];
	loop();
}
function setup() {
	createCanvas(windowWidth, windowHeight);
	document.body.style.overflow = "hidden";
	
	img.resize(img.width, img.height);
	x = random(width/2);
	y = random(height/2);
	dirt_x = random(windowWidth/2);
	dirt_y = random(windowHeight/2);

	xspeed = 4;
	yspeed = 4;

	angleMode(DEGREES);
}

function playSound(){
	var audio = sounds[Math.floor(Math.random() * sounds.length)];
	while (audio === audio2){
		var audio = sounds[Math.floor(Math.random() * sounds.length)];
	}
	audio.play();
	sleep(audio.duration()*1000);
	audio2 = audio;
}

function rotate_and_draw_image(img_x, img_y, img_width, img_height, img_angle){
	imageMode(CENTER);
	translate(img_x+img_width/2, img_y+img_width/2);
	rotate(img_angle);
	image(img, 0, 0, img_width, img_height);
	imageMode(CORNER);
}

function draw() {
	background(0);
	image(dirt, dirt_x, dirt_y, dirt.width, dirt.height);
	rotate_and_draw_image(x,y,img.width, img.height, angle);
	
	
	x = x + xspeed;
	y = y + yspeed;
	
	if (Math.sqrt((x-dirt_x)**2 + (y-dirt_y)**2) <= 150){
		dirt_x = random(width/2);
		dirt_y = random(height/2);
	}

	if (x + img.width >= width) {
		xspeed = -xspeed;
		x = width - img.width;
		playSound();
	} else if (x <= 0) {
		xspeed = -xspeed;
		x = 0;
		playSound();
	}

	if (y + img.height >= height) {
		yspeed = -yspeed;
		y = height - img.height;
		playSound();
	} else if (y <= 0) {
		yspeed = -yspeed;
		y = 0;
		playSound();
	}
	
	if (yspeed>0){
		if (xspeed>0){
			angle = 0;
		} else {
			angle = 90;
		}
	}
	else{
		if (xspeed>0){
			angle = 270;
		} else {
			angle = 180;
		}
	}
}

function touchStarted() {
  	getAudioContext().resume()
}

function mouseClicked() {
	if (value === 0){
		loop();
		value = 1;
	} else{
		noLoop();
		value = 0;
	}
}
