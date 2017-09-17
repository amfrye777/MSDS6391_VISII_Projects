#pragma once
#include <iostream>
#include <fstream>
#include <string>

class loadData
{
private:
	std::string fileName;
public:
	loadData();
	loadData(std::string fileName);

	struct AvgSalOverUnderByOCCFAMT {
		std::string OCCFAMT;
		double OverUnderValue;
	} AvgSalOverUnderByOCCFAMT[62];
};

