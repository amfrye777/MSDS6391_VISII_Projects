#include "HypnoSwirl.h"

HypnoSwirl::HypnoSwirl()
{
}

HypnoSwirl::HypnoSwirl(int radius, int dir):
radius(radius), dir(dir)
{
	std::cout << "Object HypNoSwirl created with Radius: " << radius << std::endl;
}

void HypnoSwirl::update()
{
	
}

void HypnoSwirl::draw(float mapaAddMin, float mapaAddMax, float angleOffset)
{
	ofPushMatrix();
	ofTranslate(x, y);
	ofSetCircleResolution(100);
	c = 255;
	float rSub = ofMap(mouseX/5, 0, ofGetWidth(), radius/30, radius / 5);
	float aAdd = ofMap(mouseY, 0, ofGetHeight(), mapaAddMin, mapaAddMax);
	cic(radius, rSub, angle, aAdd);
	angle += (angleOffset) * dir;
	ofPopMatrix();
}

void HypnoSwirl::cic(float radius, float rSub, float angle, float aAdd) {
	ofPushMatrix();
	do {
        ofSetColor(c, 66, 66);
		ofFill();
		c = 255 - c;
		ofCircle(0, 0, radius / 2);
		radius -= rSub;
		angle += aAdd;
		float r = rSub * 0.6;
		float xOff = cos(angle + aAdd) * r;
		float yOff = sin(angle + aAdd) * r;
		ofTranslate(xOff, yOff);
	} while (radius >= 1);
	ofPopMatrix();
}

void HypnoSwirl::setLoc(float x, float y) {
	this->x = x;
	this->y = y;
}


void HypnoSwirl::updateMouse(int mouseX, int mouseY)
{
	this->mouseX = mouseX;
	this->mouseY = mouseY;
}

bool HypnoSwirl::checkWallHitX() {
	bool boolval;

	for (int i = 0; i < 10; i++) {
		if ((x - radius <0) | (x + radius >ofGetWidth())) {
			boolval = true;
		}
		else boolval = false;
	}

	return boolval;
}

bool HypnoSwirl::checkWallHitY() {
	bool boolval;

	for (int i = 0; i < 10; i++) {
		if ((y - radius <0) | (y + radius >ofGetHeight())) {
			boolval = true;
		}
		else boolval = false;
	}

	return boolval;
}