/******************************************************************************************
 Title         : Dynamic Memory Allocation
 Created By    : Alex Fisher, Alex Frye
 Create Date   : 10/8/2017
 Assignment    : MSDS6391 - HW 5
 Description   :
 Resources     :
 ******************************************************************************************/

#include "ofMain.h"
#include "ofApp.h"

//========================================================================
int main( ){
	ofSetupOpenGL(1024,768,OF_WINDOW);			// <-------- setup the GL context


	// this kicks off the running of my app
	// can be OF_WINDOW or OF_FULLSCREEN
	// pass in width and height too:
	ofRunApp(new ofApp());

}
