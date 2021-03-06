#include "ofApp.h"



//--------------------------------------------------------------
void ofApp::setup(){
	ofSetColor(125);
	ofFill();
	barChartData = BarChartAvgOverUnder("Random300Values.csv"); //Random300Values.csv //AvgSalOverUnderByOCCFAMT.csv
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
	
		//print instructions
	ofSetColor(125);
	ofFill(); 
	ofDrawBitmapString("Arrow Key Up/Down: Add/Minus 1 Bar\nArrow Key Right/Left: Add/Minus 5 Bars", 
						ofGetWidth() - 400, 
						ofGetHeight() - 100);
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
	if ((key == OF_KEY_UP) & (barChartData.barWidth > 1))			barChartData.setDisplayCount(1);
	else if (key == OF_KEY_DOWN)									barChartData.setDisplayCount(-1);
	else if ((key == OF_KEY_RIGHT) & (barChartData.barWidth > 1))	barChartData.setDisplayCount(5);
	else if (key == OF_KEY_LEFT)									barChartData.setDisplayCount(-5);
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){
    //update x,y mouse locations within each object as the mouse moves
    barChartData.updateMouse(x, y);
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
