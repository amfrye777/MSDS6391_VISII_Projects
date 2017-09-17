#pragma once
#include "ofMain.h"

class BarChartAvgOverUnder
{
public:
	BarChartAvgOverUnder();
	BarChartAvgOverUnder(std::string fileName);

	int displayCount = 15;
	double maxDataVal = 0;
	


	double xOffset;// = ofGetWidth() / 6;
	double yOffset;// = ofGetHeight() / 6;
	double xBarPad;// = (ofGetWidth() - xOffset*2) / 75;
	double barWidth;
	double maxBarHeight = 0; // defined inside data pull loop for mapping function
	//ofColor colorCycle[9] = { '#81c784', '#fff176', '#ba68c8', '#f06292', '#4fc3f7', '#ff8a65', '#b2ebf2', '#ef5350', '#ffca28' };
	ofColor colorCycle[9];



	struct AvgSalOverUnderByOCCFAMT {
		std::string OCCFAMT;
		double OverUnderValue;
	} AvgSalOverUnderByOCCFAMT[62];

	void loadData(std::string fileName);
	void drawLines();

	void setup();
	void update();
	void draw();
};

