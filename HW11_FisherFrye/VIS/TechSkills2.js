var url = new URL(window.location.href);
var TechSkillsFile = "MiscFiles/" + url.searchParams.get("TechSkills") + ".csv";

d3.csv(TechSkillsFile, function(d) {
    return {
      Skill : d.Skill,
      PercentValue : +d.PercentValue,
      Description : d.Description
    };
  }, function(data) {
    //console.log(data);
    console.log("Data Loaded Successfully. First row: {Skill - " + data[0].Skill + "; PercentValue - " + data[0].PercentValue + "; Description - " + data[0].Description+ "}");
        //Execute SkillsPi function, which contains Vis, such that the "data" attribute from our csv may proceed forward.
    SkillsBars(data);
  });


SkillsBars = function(data){

        //define hcl color scale range for the length of our data file
    var color = d3.scaleLinear().domain([1,data.length])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);

    for (var i = 0; i < data.length; i++) {
        console.log(color(i));
    }

    var VisSizeLength = window.innerWidth*.3

    var TechSkillsD3 = d3.select("section#main").select("div.inner").select("div#TechSkillsD3");

/*    var anchor = TechSkillsD3
        .append("svg")
        .style("float", "left")
        .attr("width", VisSizeLength)    //Square the size of half the width of the screen
        .attr("height", VisSizeLength*2)   //Square the size of half the width of the screen
        .append("g")
*/

    var anchor = d3.select("section#main").select("div.inner").select("div#TechSkillsD3")
                .append("table").append("tr").append("td");
    
    var anchor2Col = d3.select("section#main").select("div.inner").select("div#TechSkillsD3")
    .select("table").select("tr").append("td").style("vertical-align","top");

    var div = anchor.selectAll("div")
    .data(data);


    //Add the class bar to the divs
    div.enter().append("div")
    .attr("class", "bar");
    
    //Add the pattern for the bars
    d3.select("body").selectAll(".bar")
    .append("div")
    .attr("class","pattern");

    //Starting percentage value
    var start_val = 0;

    //add the percentage to the progress bar and transition the number
    anchor.selectAll(".pattern")
    .append("div")
    .text(function(d){return d.Skill;})
    .attr("class", "percentage")

            .on("mouseover", function(d) {
                d3.select(this).transition().duration(500)

                anchor2Col.selectAll("#SelectedSkill").remove();
                
                anchor2Col
                .append("h3")
                .attr("id", "SelectedSkill")
                .style("width", window.innerWidth)
                .style("padding-left", "50%")
                .transition().duration(500)
                .style("display", "inline")
                .style("padding-left", "10%")
                .text(d.Skill);

                anchor2Col.append("br").attr("id", "SelectedSkill")

                anchor2Col
                .append("p")
                .attr("id", "SelectedSkill")
                .style("width", window.innerWidth)
                .style("padding-left", "50%")
                
                .transition().duration(500)
                .attr("class", "content")
                .style("display", "inline")
                .style("padding-left", "0%")
                .text(d.Description);
                
            })
            .on("mouseout", function(d) {
                d3.select(this).transition().duration(500)
                
                anchor2Col.selectAll("#SelectedSkill")
                .transition().duration(500)
                .style("padding-left", "50%")
                .remove();

            })

    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(1000)
    // .style("min-width", function(d, i) {
    //     return (d.PercentValue*3)/2 + "px"; 
    //     console.log(1);
    // })
    // .tween(".percentage", function(d) {
    //     var i = d3.interpolate(this.textContent, d.PercentValue),
    //         prec = (d.PercentValue + "").split("."),
    //         round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

    //     return function(t) {
    //         this.textContent = Math.round(i(t) * round) / round + "%";
    //     };
    // })
    ;

    //transition the width of the path
    d3.select("body").selectAll(".bar")
    .transition()
    .delay(function(d, i) {
    return i * 200;
    })
    .duration(1000)
    .style("width", function(d, i) {
    return d.PercentValue*3 + "px"; 
    });


//transition between the different colors depending on the value
d3.select("body").selectAll(".pattern")
//transition to first color
.transition()
.delay(function(d, i) {
   return i * 200;
})
.duration(250)
.style("background-color", function(d) {
   if(d.PercentValue < 40) {
      //Red
      return "#FB7457";
   }
   else {
      //Orange
      return "#FBB272";
   }
})
//transition to second color
.transition()
.delay(function(d, i) {
   return (i * 200) + 250;
})
.duration(250)
.style("background-color", function(d) {
   if(d.PercentValue < 40) {
      //Red
      return "#FB7457";
   }
   else if (d.PercentValue < 60) {
      //Orange
      return "#FBB272";
   }
   else {
      //Yellow
      return "#FFE584";
   }
})
//transition to third color
.transition()
.delay(function(d, i) {
   return (i * 200) + 500;
})
.duration(250)
.style("background-color", function(d) {
   if(d.PercentValue < 40) {
      //Red
      return "#FB7457";
   }
   else if (d.PercentValue < 60) {
      //Orange
      return "#FBB272";
   }
   else if (d.PercentValue < 80) {
      //Yellow
      return "#FFE584";
   }
   else {
      //Light green
      return "#C9D790";
   }
})
//transition to fourth color
.transition()
.delay(function(d, i) {
   return (i * 200) + 750;
})
.duration(250)
.style("background-color", function(d) {
   if(d.PercentValue < 40) {
      //Red
      return "#FB7457";
   }
   else if (d.PercentValue < 60) {
      //Orange
      return "#FBB272";
   }
   else if (d.PercentValue < 80) {
      //Yellow
      return "#FFE584";
   }
   else if (d.PercentValue < 100) {
      //Light green 
      return "#C9D790";
   }
   else {
      //Dark green
      return "#7AC191";
   }
});

}



