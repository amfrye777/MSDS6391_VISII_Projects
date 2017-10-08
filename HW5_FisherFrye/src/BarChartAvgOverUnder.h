#pragma once
#include "ofMain.h"
#include "BarChartDataMgr.h"

class BarChartAvgOverUnder
{
public:
	BarChartAvgOverUnder();
	BarChartAvgOverUnder(std::string fileName);
	~BarChartAvgOverUnder();

	int totalCount = 0;
	int displayCount = 15;
	double maxDataVal = 0; // defined inside data pull loop for mapping function

	double xOffset;// = ofGetWidth() / 6;
	double yOffset;// = ofGetHeight() / 6;
	double xBarPad;// = (ofGetWidth() - xOffset*2) / 75;
	double barWidth;
	double maxBarHeight; 
	//ofColor colorCycle[9] = { '#81c784', '#fff176', '#ba68c8', '#f06292', '#4fc3f7', '#ff8a65', '#b2ebf2', '#ef5350', '#ffca28' };
	ofColor colorCycle[9];

	vector<BarChartDataMgr> BarData;

	void loadData(std::string fileName);
	void drawLines();
	void drawTicks();
	void drawBars();
	void setDisplayCount(int adj);

	void BarChartAvgOverUnder::hoverDisplay();
	void BarChartAvgOverUnder::displayValue(float rectX, float rectY, float barWidth, float rectHeight, std::string OCCFAMT, float AvgSalOverUnder);

	void setup();
	void update();
	void draw();
    
    void updateMouse(int mouseX, int mouseY);

private:
    int radius;
    int dir;
    float x= -1000;        // default off the screen. re-init in setup().
    float y= -1000;        // default off the screen. re-init in setup().
    int mouseX = 0;
    int mouseY = 0;
    
	float map(float value,
		float istart,
		float istop,
		float ostart,
		float ostop);
};

