#pragma once

#include "ofMain.h"


class HypnoSwirl
{
public:
	HypnoSwirl();
	HypnoSwirl(int radius);
	
	void update();
	void draw();
	void updateMouse(int mouseX, int mouseY);
	void setLoc(float x, float y);

private:
	int radius;
	float x= -1000;		// default off the screen. re-init in setup().
	float y= -1000;		// default off the screen. re-init in setup().
	int mouseX = 0;
	int mouseY = 0;

	float map(float value,
		float istart,
		float istop,
		float ostart,
		float ostop);
};

