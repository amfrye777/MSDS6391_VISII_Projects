#pragma once

#include "ofMain.h"


class HypnoSwirl
{
public:
	HypnoSwirl();
	HypnoSwirl(int radius, int dir);
	
	void update();
	void draw();
	void updateMouse(int mouseX, int mouseY);
	void setLoc(float x, float y);

private:
	int radius;
	int dir;
	float x= -1000;		// default off the screen. re-init in setup().
	float y= -1000;		// default off the screen. re-init in setup().
	int mouseX = 0;
	int mouseY = 0;

	int c = 1000;
	float angle = 0;

	void cic(float radius, float rSub, float angle, float aAdd);

	float map(float value,
		float istart,
		float istop,
		float ostart,
		float ostop);
};

