#include "loadData.h"

loadData::loadData()
{
}

loadData::loadData(std::string fileName)
{
		//print relative file path
	std::cout << "..\\data\\" + fileName << std::endl;

		//load file
	std::ifstream file("..\\data\\"+ fileName);

		//display Error text if file not good for any reason
	if (!file.good())	std::cout  << "ERROR" << '\n';
		
		//temp stack string created for overUnder, such that we can then convert todouble after reading.
	std::string OverUnderString;
	
	//skip header record
	std::string s;
	getline(file,s);

		//loop through to end of file
	int i = 0;
	while (!file.eof())
	{
			//parse comma delimited line first by comma then by line feed
		getline(file, AvgSalOverUnderByOCCFAMT[i].OCCFAMT,',');
		getline(file, OverUnderString, '\n');
		
			// convert OverUnder to double with "stod", if "" then 0
		if (OverUnderString!="") AvgSalOverUnderByOCCFAMT[i].OverUnderValue = std::stod(OverUnderString);
		else AvgSalOverUnderByOCCFAMT[i].OverUnderValue = 0;

			//print struct data for debug
		std::cout << i << "; "<<AvgSalOverUnderByOCCFAMT[i].OCCFAMT << ", " << AvgSalOverUnderByOCCFAMT[i].OverUnderValue << '\n';
		i++;
	}
	file.close();

}
