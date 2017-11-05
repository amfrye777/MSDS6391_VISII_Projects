
var HypnoSwirl = function(radius, dir, c, angle){
		
	this.radius = radius;
	this.dir = dir
	this.c = c;
	this.angle = angle;
	
	console.log( "Object HypNoSwirl created with Radius: " + radius);
	
	var x;
	var y;

	var speedX;
	var gravityY;

	var dir;
	var mouseX;
	var mouseY;

}	

HypnoSwirl.prototype.draw = function(mapaaddmin, mapaaddmax,  angleoffset){
	push();
	translate(this.x, this.y);
	c = 255;
	var rsub = map(this.mouseX/5, 0, width, this.radius/30, this.radius / 5);
	var aadd = map(this.mouseY, 0, height, mapaaddmin, mapaaddmax);
	this.cic(this.radius, rsub, this.angle, aadd);
	this.angle += (angleoffset) * this.dir;
	pop();
	
}

HypnoSwirl.prototype.cic = function(radius, rSub, angle, aAdd){
	push();
	do {
		fill(c, 66, 66);
		c = 255 - c;
		ellipse(0, 0, radius, radius); //*2
		radius -= rSub;
		angle += aAdd;
		var r = rSub * 0.6;
		var xOff = cos(angle + aAdd) * r;
		var yOff = sin(angle + aAdd) * r;
		translate(xOff, yOff);
	} while (radius >= 1);
	pop();
}

HypnoSwirl.prototype.setRadius = function(radius){
	this.radius = radius;
}

HypnoSwirl.prototype.updateMouse = function(mouseX, mouseY){
	this.mouseX = mouseX;
	this.mouseY = mouseY;	
}

HypnoSwirl.prototype.setLoc = function(x, y){
	this.x = x;
	this.y = y;
}

HypnoSwirl.prototype.checkWallHitX = function(){
	var boolval;

	for (var i = 0; i < 10; i++) {
		if ((this.x - this.radius <0) | (this.x + this.radius >width)) {
			boolval = true;
		}
		else boolval = false;
	}

	return boolval;		
}

HypnoSwirl.prototype.checkWallHitY = function(){
	var boolval;

	for (var i = 0; i < 10; i++) {
		if ((this.y - this.radius <0) | (this.y + this.radius >height)) {
			boolval = true;
		}
		else boolval = false;
	}

	return boolval;	
}
