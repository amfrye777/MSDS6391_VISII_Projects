#pragma once

#include "ofMain.h"


class HypnoSwirl
{
public:
	HypnoSwirl();
	HypnoSwirl(int radius, int dir);
	
	void update();
	void draw(float mapaAddMin, float mapaAddMax, float angleOffset);
	void updateMouse(int mouseX, int mouseY);
	void setLoc(float x, float y);
	
	bool checkWallHitX();
	bool checkWallHitY();

	float x;
	float y;
	int radius;

	float speedX;
	float gravityY;

private:
	int dir;
	int mouseX = 0;
	int mouseY = 0;

	int c = 1000;
	float angle = 0;

	void cic(float radius, float rSub, float angle, float aAdd);

};

