
////////////////////////////////
// DATA FOR PROGRESS BARS
////////////////////////////////

//Data
var data = [100, 80, 60, 40, 20];

anchor = d3.select(".progress-bars");

//Bind data to the bars
var div = anchor.selectAll(".progress-bars div")
.data(data);

//Add the class bar to the divs
div.enter().append("div")
.attr("class", "bar");

//Add the pattern for the bars
d3.select("body").selectAll(".bar")
.append("div")
.attr("class","pattern");