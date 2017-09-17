#include "ofApp.h"

BarChartAvgOverUnder barChartData("AvgSalOverUnderByOCCFAMT.csv");

//--------------------------------------------------------------
void ofApp::setup(){
	ofSetColor(125);
	ofFill();
	barChartData.setup();
}

//--------------------------------------------------------------
void ofApp::update(){
	barChartData.update();
}

//--------------------------------------------------------------
void ofApp::draw(){
	ofBackground(0);
	barChartData.draw();
	
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

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
