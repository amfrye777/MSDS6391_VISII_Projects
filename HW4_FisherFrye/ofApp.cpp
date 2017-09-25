#include "ofApp.h"

HypnoSwirl hypCenter(300,1);
HypnoSwirl hypTopLeft(150,-1);
HypnoSwirl hypTopRight(150,-1);
HypnoSwirl hypBotLeft(150, -1);
HypnoSwirl hypBotRight(150, -1);

std::vector<HypnoSwirl> hypTinyMovers(10, HypnoSwirl(30, 1));

//--------------------------------------------------------------
void ofApp::setup(){

	/**********************************************
	*	Initial Placement, with Overlap Handling  *
	**********************************************/

	hypCenter.setLoc((ofGetWidth() / 2),		(ofGetHeight() / 2));
	hypTopLeft.setLoc((ofGetWidth() / 5),		(ofGetHeight() / 5));
	hypTopRight.setLoc((ofGetWidth() / 5) * 4,	(ofGetHeight() / 5));
	hypBotLeft.setLoc((ofGetWidth() / 5),		(ofGetHeight() / 5) * 4);
	hypBotRight.setLoc((ofGetWidth() / 5) * 4,	(ofGetHeight() / 5) * 4);

	for (int i = 0; i < 10; i++) {
		hypTinyMovers[i].setLoc(rand()%ofGetWidth(),rand()%ofGetHeight());
	}

	int cntErrors = 1; //forces into loop once

	while (cntErrors != 0) {
		cntErrors = 0; //resets errors to zero, such that if the conditions below are not met it will jump out of the loop

		//wall checks
		for (int i = 0; i < 10; i++) {
			if (hypTinyMovers[i].checkWallHitX() | hypTinyMovers[i].checkWallHitY()) {
				hypTinyMovers[i].setLoc(rand() % ofGetWidth(), rand() % ofGetHeight());
				cntErrors++;
			}
		}


			//Tiny ball checks
		for (int i = 0; i < 10; i++) {
			for (int j = 0; j < 10; j++) {
				if (i != j) {				// skip if balls are matches
					
					if (checkOverLaps(hypTinyMovers[i], hypTinyMovers[j])) {
						hypTinyMovers[i].setLoc(rand() % ofGetWidth(), rand() % ofGetHeight());
						cntErrors++;
					}
				}
			}
		}
		
			// Large ball checks
		for (int i = 0; i < 10; i++) {
			if (checkOverLaps(hypTinyMovers[i], hypCenter)) {
				hypTinyMovers[i].setLoc(rand() % ofGetWidth(), rand() % ofGetHeight());
				cntErrors++;
			}
			if (checkOverLaps(hypTinyMovers[i], hypTopLeft)) {
				hypTinyMovers[i].setLoc(rand() % ofGetWidth(), rand() % ofGetHeight());
				cntErrors++;
			}
			if (checkOverLaps(hypTinyMovers[i], hypTopRight)) {
				hypTinyMovers[i].setLoc(rand() % ofGetWidth(), rand() % ofGetHeight());
				cntErrors++;
			}
			if (checkOverLaps(hypTinyMovers[i], hypBotLeft)) {
				hypTinyMovers[i].setLoc(rand() % ofGetWidth(), rand() % ofGetHeight());
				cntErrors++;
			}
			if (checkOverLaps(hypTinyMovers[i], hypBotRight)) {
				hypTinyMovers[i].setLoc(rand() % ofGetWidth(), rand() % ofGetHeight());
				cntErrors++;
			}
		}

		for (int i = 0; i < 10; i++) {
			std::cout << cntErrors << ", " << hypTinyMovers[i].x << ", " << hypTinyMovers[i].y << std::endl;
		}

	}

	/**********************************************
	*	Initialize Speed					      *
	**********************************************/

	for (int i = 0; i < 10; i++) {
		if (i % 2 == 0)	hypTinyMovers[i].speedX = ((rand() % 5) + 1)/2.1;
		else		    hypTinyMovers[i].speedX = (((rand() % 5) + 1)*-1)/2.1;

		if (i % 2 == 0)	hypTinyMovers[i].gravityY = ((rand() % 3) + 1)/2.1;
		else		    hypTinyMovers[i].gravityY = (((rand() % 3) + 1)*-1)/2.1;
	}
}

//--------------------------------------------------------------
void ofApp::update(){
		
	/**********************************************
	*	Move Tinys with speed and gravity	      *
	**********************************************/
	for (int i = 0; i < 10; i++) {
		hypTinyMovers[i].setLoc(hypTinyMovers[i].x + hypTinyMovers[i].speedX, hypTinyMovers[i].y + hypTinyMovers[i].gravityY);
	}

	/**********************************************
	*	Tinys Bounce & Overlaps				      *
	**********************************************/
		
	//wall checks
	for (int i = 0; i < 10; i++) {
		if (hypTinyMovers[i].checkWallHitX()) {		//x check flip x direction
			hypTinyMovers[i].speedX *= -1;
		}
		
		if (hypTinyMovers[i].checkWallHitY()) {		//y check flip y direction
			hypTinyMovers[i].gravityY *= -1;
		}
	}


	//Tiny ball checks - Both bounce diagnally
	for (int i = 0; i < 10; i++) {
		for (int j = 0; j < 10; j++) {
			if (i != j) {				// skip if balls are matches

				if (checkOverLaps(hypTinyMovers[i], hypTinyMovers[j])) {
					hypTinyMovers[i].speedX *= -1;
					hypTinyMovers[i].gravityY *= -1;

				}
			}
		}
	}

	// Large ball checks - tiny bounce diagnally
	for (int i = 0; i < 10; i++) {
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

//--------------------------------------------------------------
void ofApp::draw(){
	ofBackground(0);
	hypCenter.draw(PI/2.0, PI/48.0, PI/100.0);
	hypTopLeft.draw(PI / 2.0, PI / 30.0, PI / 200.0);
	hypTopRight.draw(PI / 2.0, PI / 30.0, PI / 200.0);
	hypBotLeft.draw(PI / 2.0, PI / 30.0, PI / 200.0);
	hypBotRight.draw(PI / 2.0, PI / 30.0, PI / 200.0);
	
	for (int i = 0; i < 10; i++) {
		hypTinyMovers[i].draw(PI / 2.0, PI / 48.0, PI / 50);
	}
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){
	//update x,y mouse locations within each object as the mouse moves
	hypCenter.updateMouse(x, y);
	hypTopLeft.updateMouse(x, y);
	hypTopRight.updateMouse(x, y);
	hypBotLeft.updateMouse(x, y);
	hypBotRight.updateMouse(x, y);

	for (int i = 0; i < 10; i++) {
		hypTinyMovers[i].updateMouse(x, y);
	}
}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}




bool ofApp::checkOverLaps(HypnoSwirl hyp1, HypnoSwirl hyp2) {
	bool boolval;
	float distancex = (hyp2.x - hyp1.x) * (hyp2.x - hyp1.x);
	float distancey = (hyp2.y - hyp1.y) * (hyp2.y - hyp1.y);

	float distance = sqrt(distancex + distancey);

	//check tiny ball x,y range
	if (distance <= (hyp1.radius + hyp2.radius)/2) {
		boolval = true;
	}
	else boolval = false;

	return boolval;
}