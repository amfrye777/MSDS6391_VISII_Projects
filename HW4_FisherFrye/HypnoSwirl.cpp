#include "HypnoSwirl.h"

HypnoSwirl::HypnoSwirl()
{
}

HypnoSwirl::HypnoSwirl(int radius):
radius(radius)
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
	ofCircle(0,0, radius);
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