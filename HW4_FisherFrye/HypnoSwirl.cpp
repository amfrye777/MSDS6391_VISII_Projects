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

void HypnoSwirl::draw()
{
	ofPushMatrix();
	ofTranslate(x, y);
	ofSetCircleResolution(100);
	c = 255;
	float rSub = map(mouseX, 0, ofGetWidth(), 5, 20);
	float aAdd = map(mouseY, 0, ofGetHeight(), PI / 22.0 , PI / 48.0);
	cic(radius, rSub, angle, aAdd);
	angle += (PI / 100.0) * dir;
	ofPopMatrix();
}

void HypnoSwirl::cic(float radius, float rSub, float angle, float aAdd) {
	ofPushMatrix();
	do {
		ofSetColor(c);
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

float HypnoSwirl::map(float value,
	float istart,
	float istop,
	float ostart,
	float ostop) {
	return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}