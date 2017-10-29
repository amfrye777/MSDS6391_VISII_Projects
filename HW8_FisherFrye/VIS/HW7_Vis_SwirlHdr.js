var hypTinyMovers = []
hypTinyMovers.length = 30

function setup() {
	var swirlCanvas = createCanvas(window.innerWidth, window.innerHeight / 2.5); 
	swirlCanvas.parent('swirlCanvas');

	if(width<=height){
		hypCenter = new HypnoSwirl(width/3.33,1,1000,0);
		hypTopLeft = new HypnoSwirl(width/6.67,-1,1000,0);
		hypTopRight = new HypnoSwirl(width/6.67,-1,1000,0);
		hypBotLeft = new HypnoSwirl(width/6.67, -1,1000,0);
		hypBotRight = new HypnoSwirl(width/6.67, -1,1000,0);
	} else{
		hypCenter = new HypnoSwirl(height/3.33,1,1000,0);
		hypTopLeft = new HypnoSwirl(height/6.67,-1,1000,0);
		hypTopRight = new HypnoSwirl(height/6.67,-1,1000,0);
		hypBotLeft = new HypnoSwirl(height/6.67, -1,1000,0);
		hypBotRight = new HypnoSwirl(height/6.67, -1,1000,0);		
	}


	console.log(hypTinyMovers.length);
	
	if(width<=height){
		for (var i = 0; i < hypTinyMovers.length; i++) {
			hypTinyMovers[i] = new HypnoSwirl(width/20, 1,1000,0);
		}
	}
	else{
		for (var i = 0; i < hypTinyMovers.length; i++) {
			hypTinyMovers[i] = new HypnoSwirl(height/20, 1,1000,0);
		}	
	}
	
	hypCenter.updateMouse(0, 0);
	hypTopLeft.updateMouse(0, 0);
	hypTopRight.updateMouse(0, 0);
	hypBotLeft.updateMouse(0, 0);
	hypBotRight.updateMouse(0, 0);
	for (var i = 0; i < hypTinyMovers.length; i++) {
		hypTinyMovers[i].updateMouse(0, 0);
	}

	hypCenter.setLoc((width / 2),		(height / 2));
	hypTopLeft.setLoc((width / 5),		(height / 5));
	hypTopRight.setLoc((width / 5) * 4,	(height / 5));
	hypBotLeft.setLoc((width / 5),		(height / 5) * 4);
	hypBotRight.setLoc((width / 5) * 4,	(height / 5) * 4);
	for (var i = 0; i < hypTinyMovers.length; i++) {
		hypTinyMovers[i].setLoc(random(0,width), random(0,height));
	}
	
	tinyMoversChkLoc();

	/**********************************************
	*	Initialize Speed					      *
	**********************************************/

	for (var i = 0; i < hypTinyMovers.length; i++) {
		if (i % 2 == 0)	hypTinyMovers[i].speedX = ((random(0,width) % 5) + 1)/2.1;
		else		    hypTinyMovers[i].speedX = (((random(0,width) % 5) + 1)*-1)/2.1;

		if (i % 2 == 0)	hypTinyMovers[i].gravityY = ((random(0,height) % 3) + 1)/2.1;
		else		    hypTinyMovers[i].gravityY = (((random(0,height) % 3) + 1)*-1)/2.1;
	}
	
	background(0);
	noStroke();
	fill(102);
}

function update(){
		
	/**********************************************
	*	Move Tinys with speed and gravity	      *
	**********************************************/
	for (var i = 0; i < hypTinyMovers.length; i++) {
		hypTinyMovers[i].setLoc(hypTinyMovers[i].x + hypTinyMovers[i].speedX, hypTinyMovers[i].y + hypTinyMovers[i].gravityY);
	}

	/**********************************************
	*	Tinys Bounce & Overlaps				      *
	**********************************************/
		
	//wall checks
	for (var i = 0; i < hypTinyMovers.length; i++) {
		if (hypTinyMovers[i].checkWallHitX()) {		//x check flip x direction
			hypTinyMovers[i].speedX *= -1;
		}
		
		if (hypTinyMovers[i].checkWallHitY()) {		//y check flip y direction
			hypTinyMovers[i].gravityY *= -1;
		}
	}


	//Tiny ball checks - Both bounce diagnally
	for (var i = 0; i < hypTinyMovers.length; i++) {
		for (var j = 0; j < hypTinyMovers.length; j++) {
			if (i != j) {				// skip if balls are matches

				if (checkOverLaps(hypTinyMovers[i], hypTinyMovers[j])) {
					hypTinyMovers[i].speedX *= -1;
					hypTinyMovers[i].gravityY *= -1;

				}
			}
		}
	}

	// Large ball checks - tiny bounce diagnally
	for (var i = 0; i < hypTinyMovers.length; i++) {
		if (checkOverLaps(hypTinyMovers[i], hypCenter)) {
			hypTinyMovers[i].speedX *= -1;
			hypTinyMovers[i].gravityY *= -1;

		}
		if (checkOverLaps(hypTinyMovers[i], hypTopLeft)) {
			hypTinyMovers[i].speedX *= -1;
			hypTinyMovers[i].gravityY *= -1;
		}
		if (checkOverLaps(hypTinyMovers[i], hypTopRight)) {
			hypTinyMovers[i].speedX *= -1;
			hypTinyMovers[i].gravityY *= -1;
		}
		if (checkOverLaps(hypTinyMovers[i], hypBotLeft)) {
			hypTinyMovers[i].speedX *= -1;
			hypTinyMovers[i].gravityY *= -1;
		}
		if (checkOverLaps(hypTinyMovers[i], hypBotRight)) {
			hypTinyMovers[i].speedX *= -1;
			hypTinyMovers[i].gravityY *= -1;
		}

	}

	
}

function draw() {
	background(0);

	update();
	
	hypCenter.draw(PI/2.0, PI/48.0, PI/100.0);
	hypTopLeft.draw(PI / 2.0, PI / 30.0, PI / 200.0);
	hypTopRight.draw(PI / 2.0, PI / 30.0, PI / 200.0);
	hypBotLeft.draw(PI / 2.0, PI / 30.0, PI / 200.0);
	hypBotRight.draw(PI / 2.0, PI / 30.0, PI / 200.0);

	for (var i = 0; i < hypTinyMovers.length; i++) {
		hypTinyMovers[i].draw(PI / 2.0, PI / 48.0, PI / 50);
	}	
}

function mouseMoved(event){
	//update x,y mouse locations within each object as the mouse moves
	
	if(event.clientX <=width & event.clientY <=height){
		hypCenter.updateMouse(event.clientX, event.clientY);
		hypTopLeft.updateMouse(event.clientX, event.clientY);
		hypTopRight.updateMouse(event.clientX, event.clientY);
		hypBotLeft.updateMouse(event.clientX, event.clientY);
		hypBotRight.updateMouse(event.clientX, event.clientY);

		for (var i = 0; i < hypTinyMovers.length; i++) {
			hypTinyMovers[i].updateMouse(event.clientX, event.clientY);
		}
	}
	return false;
}

function reSize() {
	resizeCanvas(window.innerWidth, window.innerHeight / 2.5);
	
	hypCenter.setLoc((width / 2),		(height / 2));
	hypTopLeft.setLoc((width / 5),		(height / 5));
	hypTopRight.setLoc((width / 5) * 4,	(height / 5));
	hypBotLeft.setLoc((width / 5),		(height / 5) * 4);
	hypBotRight.setLoc((width / 5) * 4,	(height / 5) * 4);
	
	tinyMoversChkLoc();
	
	if(width<=height){
		hypCenter.setRadius(width/3.33);
		hypTopLeft.setRadius(width/6.67);
		hypTopRight.setRadius(width/6.67);
		hypBotLeft.setRadius(width/6.67); 
		hypBotRight.setRadius(width/6.67);
	} else{
		hypCenter.setRadius(height/3.33);
		hypTopLeft.setRadius(height/6.67);
		hypTopRight.setRadius(height/6.67);
		hypBotLeft.setRadius(height/6.67); 
		hypBotRight.setRadius(height/6.67);		
	}
	
	if(width<=height){
		for (var i = 0; i < hypTinyMovers.length; i++) {
			hypTinyMovers[i].setRadius(width/20);
		}
	}
	else{
		for (var i = 0; i < hypTinyMovers.length; i++) {
			hypTinyMovers[i].setRadius(height/20);
		}	
	}
}

function tinyMoversChkLoc(){
	var cntErrors = 1; //forces into loop once

	while (cntErrors != 0) {
		cntErrors = 0; //resets errors to zero, such that if the conditions below are not met it will jump out of the loop

		//wall checks
		for (var i = 0; i < hypTinyMovers.length; i++) {
			if (hypTinyMovers[i].checkWallHitX() | hypTinyMovers[i].checkWallHitY()) {
				hypTinyMovers[i].setLoc(random(0,width), random(0,height));
				cntErrors++;
			}
		}


			//Tiny ball checks
		for (var i = 0; i < hypTinyMovers.length; i++) {
			for (var j = 0; j < hypTinyMovers.length; j++) {
				if (i != j) {				// skip if balls are matches
					
					if (checkOverLaps(hypTinyMovers[i], hypTinyMovers[j])) {
						hypTinyMovers[i].setLoc(random(0,width), random(0,height));
						cntErrors++;
					}
				}
			}
		}
		
			// Large ball checks
		for (var i = 0; i < hypTinyMovers.length; i++) {
			if (checkOverLaps(hypTinyMovers[i], hypCenter)) {
				hypTinyMovers[i].setLoc(random(0,width), random(0,height));
				cntErrors++;
			}
			if (checkOverLaps(hypTinyMovers[i], hypTopLeft)) {
				hypTinyMovers[i].setLoc(random(0,width), random(0,height));
				cntErrors++;
			}
			if (checkOverLaps(hypTinyMovers[i], hypTopRight)) {
				hypTinyMovers[i].setLoc(random(0,width), random(0,height));
				cntErrors++;
			}
			if (checkOverLaps(hypTinyMovers[i], hypBotLeft)) {
				hypTinyMovers[i].setLoc(random(0,width), random(0,height));
				cntErrors++;
			}
			if (checkOverLaps(hypTinyMovers[i], hypBotRight)) {
				hypTinyMovers[i].setLoc(random(0,width), random(0,height));
				cntErrors++;
			}
		}
	}
}

function checkOverLaps(hyp1, hyp2) {
	var boolval;
	var distancex = (hyp2.x - hyp1.x) * (hyp2.x - hyp1.x);
	var distancey = (hyp2.y - hyp1.y) * (hyp2.y - hyp1.y);

	var distance = sqrt(distancex + distancey);

	if (distance <= (hyp1.radius + hyp2.radius)/2) {
		boolval = true;
	}
	else boolval = false;

	return boolval;
}