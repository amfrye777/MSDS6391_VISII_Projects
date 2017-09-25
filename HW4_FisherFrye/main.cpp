/******************************************************************************************
Title         : Hypnosis
Created By    : Alex Fisher, Alex Frye
Create Date   : 9/24/2017
Assignment    : MSDS6391 - HW 4
Description   : We have reproduced and modified a visualization, inspired by an openProcessing Sketch by Jacob Joaquin.

				Move your mouse to manipulate this hypnotic visualization

				Changes to original include:
					1)OOP design
					2)5 Hypnotic Swirls vs 1
					3)Multiple Swirl Directions

Resources     : https://www.openprocessing.org/sketch/164071
******************************************************************************************/

#include "ofMain.h"
#include "ofApp.h"

//========================================================================
int main( ){
	ofSetupOpenGL(750, 750,OF_WINDOW);			// <-------- setup the GL context

	// this kicks off the running of my app
	// can be OF_WINDOW or OF_FULLSCREEN
	// pass in width and height too:
	ofRunApp(new ofApp());

}
