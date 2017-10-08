#pragma once
#include "ofMain.h"

	class BarChartDataMgr
	{

	public:
		BarChartDataMgr();

		BarChartDataMgr(std::string TextValue, double NumValue);


		std::string TextValue;
		double NumValue;
	};
