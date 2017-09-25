#include "ofApp.h"

HypnoSwirl hypCenter(400,1);
HypnoSwirl hypTopLeft(150,-1);
HypnoSwirl hypTopRight(150,-1);
HypnoSwirl hypBotLeft(150, -1);
HypnoSwirl hypBotRight(150, -1);

//--------------------------------------------------------------
void ofApp::setup(){

		hypCenter.setLoc((ofGetWidth() / 2),		(ofGetHeight() / 2));
		hypTopLeft.setLoc((ofGetWidth() / 5),		(ofGetHeight() / 5));
		hypTopRight.setLoc((ofGetWidth() / 5) * 4,	(ofGetHeight() / 5));
		hypBotLeft.setLoc((ofGetWidth() / 5),		(ofGetHeight() / 5) * 4);
		hypBotRight.setLoc((ofGetWidth() / 5) * 4,	(ofGetHeight() / 5) * 4);
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
	ofBackground(0);
	hypCenter.draw();
	hypTopLeft.draw();
	hypTopRight.draw();
	hypBotLeft.draw();
	hypBotRight.draw();
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
