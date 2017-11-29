var url = new URL(window.location.href);
var TechSkillsFile = "MiscFiles/" + url.searchParams.get("TechSkills") + ".csv";

d3.csv(TechSkillsFile, function(d) {
    return {
      Skill : d.Skill,
      PercentValue : +d.PercentValue,
      Description : d.Description
    };
  }, function(data) {
    console.log(data);
    console.log("Data Loaded Successfully. First row: {Skill - " + data[0].Skill + "; PercentValue - " + data[0].PercentValue + "; Description - " + data[0].Description+ "}");
        //Execute SkillsPi function, which contains Vis, such that the "data" attribute from our csv may proceed forward.
    SkillsPi(data);
  });


SkillsPi = function(data){

        //define hcl color scale range for the length of our data file
    var color = d3.scaleLinear().domain([1,data.length])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);

    for (var i = 0; i < data.length; i++) {
        console.log(color(i));
    }

    var VisSizeLength = window.innerWidth*.3

    var TechSkillsD3 = d3.select("section#main").select("div.inner").select("div#TechSkillsD3");

    var svg = TechSkillsD3
        .append("table").append("tr").append("td")
        .append("svg")
        .style("float", "left")
        .attr("width", VisSizeLength)    //Square the size of half the width of the screen
        .attr("height", VisSizeLength)   //Square the size of half the width of the screen
        //.style("vertical-align", "top")
        .append("g")
        .attr("transform", "translate(" + VisSizeLength/2 + "," + VisSizeLength/2 + ")");

    
    var SkillsCol2 = TechSkillsD3
                    .select("table").select("tr").append("td").style("vertical-align","top");

    var pie = d3.pie()
        .sort(null)
        .value(function(d){
            return d.PercentValue;
        })
        .padAngle(.07);

    var arc = d3.arc()
         .outerRadius(VisSizeLength*.4)
         .innerRadius(VisSizeLength*.3);
    
    var arcOver = d3.arc()
        .outerRadius(VisSizeLength*.475)
        .innerRadius(VisSizeLength*.3);

    var path = svg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d",arc)
        .style("fill", "#FFFFFF")
        .style("stroke", "#FFFFFF")
        .on("mouseover", function(d) {
            d3.select(this).transition().duration(500)
            .attr("d", arcOver);

            SkillsCol2.selectAll("#SelectedSkill").remove();

            SkillsCol2
            .append("h3")
            .attr("id", "SelectedSkill")
            .style("width", window.innerWidth*.4)
            .style("padding-left", "50%")
            .transition().duration(500)
            .style("display", "inline")
            .style("padding-left", "10%")
            .text(d.data.Skill);

            SkillsCol2.append("br").attr("id", "SelectedSkill")

            SkillsCol2
            .append("p")
            .attr("id", "SelectedSkill")
            .style("width", window.innerWidth*.4)
            .style("padding-left", "50%")
            
            .transition().duration(500)
            .attr("class", "content")
            .style("display", "inline")
            .style("padding-left", "0%")
            .text(d.data.Description);
            
        })
        .on("mouseout", function(d) {
            d3.select(this).transition().duration(500)
            .attr("d", arc);
            
            SkillsCol2.selectAll("#SelectedSkill")
            .transition().duration(500)
            .style("padding-left", "50%")
            .remove();

        })

        .transition().duration(1000)
        .style("fill", function(d,i){return color(i);})
        .style("stroke", "black")
        .style("stroke-width", 2);

        
        
        //.attr("fill", function(d,i){return color(i);})
    
    var legendRectSize = VisSizeLength/35,
        legendSpacing = VisSizeLength/70;

    var legend = svg.selectAll(".legend")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i){
            var height = legendRectSize + legendSpacing;
            var offset = height*color.domain.length/2;
            var horz = -3 * legendRectSize;
            var vert = (i * height - offset)-VisSizeLength*.15;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append("rect")
        .style("fill", "#FFFFFF")
        .style("stroke", "#FFFFFF")
        .transition().duration(1000)
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .style("fill", function(d,i){return color(i);})
        .style("stroke", function(d,i){return color(i);})

    legend.append("text")
        .style("font-size", 0)
        .transition().duration(1000)
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize)
        .text(function(d){return d.data.Skill;})
        .style("font-size", legendRectSize);
        
}