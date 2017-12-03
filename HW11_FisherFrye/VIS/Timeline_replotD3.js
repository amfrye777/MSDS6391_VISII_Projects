var url = new URL(window.location.href);

var getUrl = 'MiscFiles/'+url.searchParams.get("JobHistory")+'.json?V1';
$.getJSON(getUrl, function(data) {
    console.log(data);
    //console.log("Data Loaded Successfully. First row: {Skill - " + data[0].Skill + "; PercentValue - " + data[0].PercentValue + "; Description - " + data[0].Description+ "}");
    TimeLine(data);
});



TimeLine = function(data){
    var dataLength = data.length;
    var VisSizeWidth = window.innerWidth*.65;
    var VisSizeHeight = 150;
    var CirclePad = VisSizeWidth/12;
    var CircleRadius = VisSizeHeight*.2;

    var JobHistoryD3 = d3.select("section#main").select("div.inner").select("div#WorkExperienceD3");

    var svg = JobHistoryD3
            .append("table").append("tr").append("td")
            .append("svg")
            .style("float", "left")
            .attr("width", VisSizeWidth)    //Square the size of half the width of the screen
            .attr("height", VisSizeHeight)   //Square the size of half the width of the screen
            //.style("vertical-align", "top")
            .append("g")
            .attr("transform", "translate(0," + VisSizeHeight/2 + ")");

    
    var Table = JobHistoryD3
                .select("table").append("tr").attr("id", "content").style("vertical-align","top");    

        //Create horizontal Line
    var line = svg.append("line")
        .style("stroke", "#6A80AF")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", VisSizeWidth)
        .attr("y2", 0)

    var Circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("id", "circle")
        .attr("cx", function (d,i) { 
                                    return (CirclePad + CircleRadius) + (i * (((VisSizeWidth-(CirclePad))/dataLength)));
                                   })
        .attr("cy", 0)
        .attr("r", CircleRadius)
        .style("fill", "#FFFFFF")
        .style("stroke", "#6A80AF")
        .on("mouseover", function(d) {
            d3.select(this).transition().duration(300)
            .attr("r", CircleRadius*1.5)
            .style("fill", "#6A80AF");
            
            //svg.selectAll.selectAll("text").attr("fill", "#FFFFFF");
        })
        .on("mouseout", function(d) {
            d3.select(this).transition().duration(300)
            .attr("r", CircleRadius)
            .style("fill", "#FFFFFF");
        })
        .on("click",function(d){
            
            if(d3.select(this).on("mouseout")){
                    //reset mouseout
                d3.select(this.parentNode).selectAll("#circle").on("mouseout", function(d) {
                    d3.select(this).transition().duration(300)
                    .attr("r", CircleRadius)
                    .style("fill", "#FFFFFF");
                });

                    //mouseout transition once
                d3.select(this.parentNode).selectAll("#circle").transition().duration(300)
                .attr("r", CircleRadius)
                .style("fill", "#FFFFFF");

                    //mouseover Transition for current node
                d3.select(this).transition().duration(300)
                .attr("r", CircleRadius*1.5)
                .style("fill", "#6A80AF");

                    //remove mouseout for clicked node
                d3.select(this).on("mouseout", null);
            } else {
                d3.select(this).on("mouseout", function(){
                    d3.select(this).transition().duration(300)
                    .attr("r", CircleRadius)
                    .style("fill", "#FFFFFF");}
                );
            }

            Table.selectAll("#JobDetails").remove();
            
            Table
            .append("h3")
            .attr("id", "JobDetails")
            .style("width", window.innerWidth*.4)
            .style("padding-left", "50%")
            .transition().duration(500)
            .style("display", "inline")
            .style("padding-left", "10%")
            .text(d["Job Title"]);
            
            Table.append("br").attr("id", "JobDetails")

            Table
            .append("h4")
            .attr("id", "JobDetails")
            .style("width", window.innerWidth*.4)
            .style("padding-left", "50%")
            .transition().duration(500)
            .style("display", "inline")
            .style("padding-left", "10%")
            .text(d["Start Date"]+` To `+ d["End Date"]);

            Table.append("br").attr("id", "JobDetails")
            
            if(d["Job Description"] != null){
                if(d["Job Title"] == "Business Analyst II"){
                    
                var SubLabel = Table.selectAll("p")
                    .attr("id", "JobDetails")
                    .data(d["Job Description"])
                    .enter()
                    .append("p")
                    .attr("id", "JobDetails")
                
                SubLabel.append("u")
                    .attr("id", "JobDetails")
                    .style("width", window.innerWidth*.4)
                    .style("padding-left", "50%")
                    .transition().duration(500)
                    .style("display", "inline")
                    .style("padding-left", "5%")
                    .text(function(d){return d.SubLabel});

                SubLabel.append("ul")
                    .attr("id", "JobDetails")
                    .selectAll("li")
                    .data(function(d){return d.SubDesc})
                    .enter()
                    .append("li")
                    .attr("id", "JobDetails")
                    .style("list-style-position", "inside")
                    .style("width", window.innerWidth*.4)
                    .style("padding-left", "50%")
                    .transition().duration(500)
                    .style("padding-left", "5%")
                    .text(function(d){return d});
                }
                else{
                    Table.append("ul")
                    .attr("id", "JobDetails")
                    .selectAll("li")
                    .data(d["Job Description"])
                    .enter()
                    .append("li")
                    .attr("id", "JobDetails")
                    .style("list-style-position", "inside")
                    .style("width", window.innerWidth*.4)
                    .style("padding-left", "50%")
                    .transition().duration(500)
                    .style("padding-left", "5%")
                    .text(function(d){return d})
                }
            }
        })
        ;

    svg.select("circle").on("click");

    var StartDate = svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("id", "content")
            .attr("fill", "#6A80AF")
            .style("font-size", 0)
            .text(function (d) { 
                                return d["Start Date"];
                                })
            .attr("x", function (d,i) { 
                return (CirclePad + CircleRadius) + (i * (((VisSizeWidth-(CirclePad))/dataLength)));
                })
            .attr("y", -VisSizeHeight*.4)
            .transition().duration(500)
            .style("font-size", 15).attr("x", function (d,i) { 
                return (CirclePad + CircleRadius*.15) + (i * (((VisSizeWidth-(CirclePad))/dataLength)));
                })

}