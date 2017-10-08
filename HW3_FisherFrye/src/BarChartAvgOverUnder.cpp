#include "BarChartAvgOverUnder.h"



BarChartAvgOverUnder::BarChartAvgOverUnder()
{
}

BarChartAvgOverUnder::BarChartAvgOverUnder(std::string fileName)
{
	loadData(fileName);

}



void BarChartAvgOverUnder::setup() 
{
	xOffset = ofGetWidth() / 6;
	yOffset = ofGetHeight() / 6;
	xBarPad = (ofGetWidth() - xOffset*2) / 75;
	maxBarHeight = ofGetHeight() / 2 - yOffset;
	barWidth = ((ofGetWidth() - (xOffset*2)) - (displayCount * xBarPad)) / displayCount;
	
	colorCycle[0].r = 129;
	colorCycle[0].g = 199;
	colorCycle[0].b = 132;

	colorCycle[1].r = 255;
	colorCycle[1].g = 241;
	colorCycle[1].b = 118;

	colorCycle[2].r = 186;
	colorCycle[2].g = 104;
	colorCycle[2].b = 200;

	colorCycle[3].r = 240;
	colorCycle[3].g = 98;
	colorCycle[3].b = 146;

	colorCycle[4].r = 79;
	colorCycle[4].g = 195;
	colorCycle[4].b = 247;

	colorCycle[5].r = 255;
	colorCycle[5].g = 138;
	colorCycle[5].b = 101;

	colorCycle[6].r = 178;
	colorCycle[6].g = 235;
	colorCycle[6].b = 242;

	colorCycle[7].r = 239;
	colorCycle[7].g = 83;
	colorCycle[7].b = 80;

	colorCycle[8].r = 255;
	colorCycle[8].g = 202;
	colorCycle[8].b = 40;
}

void BarChartAvgOverUnder::update()
{

}

void BarChartAvgOverUnder::draw()
{
		//Print Title
	ofSetColor(125);
	ofFill();
	ofDrawBitmapString("Avg. Sal. Over/Under Ind. by OCCFAMT", ofGetWidth()/2-xOffset, yOffset);
	drawLines();
	drawTicks();
	drawBars();
	hoverDisplay();
}


void BarChartAvgOverUnder::drawLines()
{
	ofSetLineWidth(3);
	//draw Vertical Axis
	ofLine(xOffset, yOffset, xOffset, ofGetHeight() - yOffset);

	//draw Horizontal Axis
	ofLine(xOffset, ofGetHeight()/2, ofGetWidth() - xOffset, ofGetHeight()/2);

}

void BarChartAvgOverUnder::drawTicks()
{
	for (int i = -4; i<5; i++) {
		ofLine(xOffset - ofGetWidth() / 144, ofGetHeight() / 2 + (i * maxBarHeight / 4),xOffset - ofGetWidth() / 288,ofGetHeight() / 2 + (i * maxBarHeight / 4));
		ofDrawBitmapString(round(maxDataVal / 4.0 * i), xOffset - 55, ofGetHeight() / 2 - (i * maxBarHeight / 4) - ofGetWidth() / 600);
	}

}

void BarChartAvgOverUnder::drawBars()
{

	int colorPosition = 0;

	for (int i = 0; i<displayCount; i++) {
		float rectX = xOffset + (xBarPad*(i + 1)) + (barWidth*i);
		float rectY = ofGetHeight() / 2;
		float rectHeight;

		if (colorPosition>8) colorPosition = 0;
		ofSetColor(colorCycle[colorPosition]);
		ofFill();
		
		if (AvgSalOverUnderByOCCFAMT[i].OverUnderValue >= 0) {
			rectHeight = -map(AvgSalOverUnderByOCCFAMT[i].OverUnderValue, 0, maxDataVal, 0, maxBarHeight);
			ofRect(rectX, rectY, barWidth, rectHeight);
		}
		if (AvgSalOverUnderByOCCFAMT[i].OverUnderValue<0) {
			rectHeight = map(AvgSalOverUnderByOCCFAMT[i].OverUnderValue, 0, -maxDataVal, 0, maxBarHeight);
			ofRect(rectX, rectY, barWidth, rectHeight);
		}

		colorPosition++;
	}

}

void BarChartAvgOverUnder::hoverDisplay() {
	for (int i = 0; i < displayCount; i++) {
		float rectX = xOffset + (xBarPad*(i + 1)) + (barWidth*i);
		float rectY = ofGetHeight() / 2;
		float rectHeight;

		if (AvgSalOverUnderByOCCFAMT[i].OverUnderValue >= 0) {
			rectHeight = -map(AvgSalOverUnderByOCCFAMT[i].OverUnderValue, 0, maxDataVal, 0, maxBarHeight);
			displayValue(rectX, rectY, barWidth, rectHeight, AvgSalOverUnderByOCCFAMT[i].OCCFAMT, AvgSalOverUnderByOCCFAMT[i].OverUnderValue);
		}
		if (AvgSalOverUnderByOCCFAMT[i].OverUnderValue < 0) {
			rectHeight = map(AvgSalOverUnderByOCCFAMT[i].OverUnderValue, 0, -maxDataVal, 0, maxBarHeight);
			displayValue(rectX, rectY, barWidth, rectHeight, AvgSalOverUnderByOCCFAMT[i].OCCFAMT, AvgSalOverUnderByOCCFAMT[i].OverUnderValue);
		}
	}
}

void BarChartAvgOverUnder::displayValue(float rectX, float rectY, float barWidth, float rectHeight, std::string OCCFAMT, float AvgSalOverUnder) {
	ofSetColor(255);
	ofFill();

	std::string text = OCCFAMT + "\n" + std::to_string(AvgSalOverUnder);

	{
		//debug print x,y
		//std::cout << p.x << ", " << p.y << std::endl;

		if (AvgSalOverUnder >= 0) {
			if ((mouseX >= rectX) & (mouseX <= rectX + barWidth)     &
				(mouseY <= rectY) & (mouseY >= rectY + rectHeight)
				) {

				ofDrawBitmapString(text, mouseX, mouseY);
			}
		}
		if (AvgSalOverUnder<0) {
			if ((mouseX >= rectX) & (mouseX <= rectX + barWidth)     &
				(mouseY >= rectY) & (mouseY <= rectY + rectHeight)
				) {
				ofDrawBitmapString(text, mouseX, mouseY);
			}
		}
	}
}

void BarChartAvgOverUnder::loadData(std::string fileName)
{

	//print relative file path for debug
	std::cout << "..\\bin\\data\\" + fileName << std::endl;

	//load file
	std::ifstream file("..\\bin\\data\\" + fileName);

	//display Error text if file not good for any reason
	if (!file.good())	std::cout << "ERROR" << '\n';
	else
	{
		//temp stack string created for overUnder, such that we can then convert todouble after reading.
		std::string OverUnderString;

		//skip header record
		std::string s;
		getline(file, s);

		//loop through to end of file
		int i = 0;
		while (!file.eof())
		{
			//parse comma delimited line first by comma then by line feed
			getline(file, AvgSalOverUnderByOCCFAMT[i].OCCFAMT, ',');
			getline(file, OverUnderString, '\n');

			// convert OverUnder to double with "stod", if "" then 0
			if (OverUnderString != "") AvgSalOverUnderByOCCFAMT[i].OverUnderValue = std::stod(OverUnderString);
			else AvgSalOverUnderByOCCFAMT[i].OverUnderValue = 0;

			if (maxDataVal < abs(AvgSalOverUnderByOCCFAMT[i].OverUnderValue)) maxDataVal = abs(AvgSalOverUnderByOCCFAMT[i].OverUnderValue);

			//print struct data for debug
			std::cout << i << "; " << AvgSalOverUnderByOCCFAMT[i].OCCFAMT << ", " << AvgSalOverUnderByOCCFAMT[i].OverUnderValue << '\n';
			i++;
		}
		file.close();
	}
}

void BarChartAvgOverUnder::setDisplayCount(int adj) {
	if ((displayCount + adj)<=62 & (displayCount + adj) >0) displayCount += adj;
	barWidth = ((ofGetWidth() - (xOffset * 2)) - (displayCount * xBarPad)) / displayCount;
}

float BarChartAvgOverUnder::map(float value,
	float istart,
	float istop,
	float ostart,
	float ostop) {
	return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}
