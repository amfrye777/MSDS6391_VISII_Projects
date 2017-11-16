var url = new URL(window.location.href);
var jobHistoryFile = "MiscFiles/" + url.searchParams.get("JobHistory") + ".json";

var margin = {top: 30, right: 20, bottom: 30, left: 20},
    width = 960,
    barHeight = 20,
    barWidth = (width - margin.left - margin.right) * 0.8;

var i = 0,
    duration = 400,
    root;

var diagonal = d3.linkHorizontal()
    .x(function(d) { return d.y; })
    .y(function(d) { return d.x; });

var svg = d3.select("section#main").select("div.inner").select("div#WorkExperienceD3").append("svg")
    .attr("width", width) // + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json(jobHistoryFile, function(error, job) {
  if (error) throw error;
  root = d3.hierarchy(job);
  root.x0 = 0;
  root.y0 = 0;
  update(root);
});

function update(source) {

  /* flattened node list computation */
  var nodes = root.descendants();

  var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);

  d3.select("svg").transition()
      .duration(duration)
      .attr("height", height);

  d3.select(self.frameElement).transition()
      .duration(duration)
      .style("height", height + "px");

  /* layout computation */
  var index = -1;
  root.eachBefore(function(n) {
    n.x = ++index * barHeight;
    n.y = n.depth * 20;
  });

  /* update nodes */
  var node = svg.selectAll(".node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });

  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .style("opacity", 0);

  /* insert new nodes at parent previous position */
  nodeEnter.append("rect")
      .attr("y", -barHeight / 2)
      .attr("height", barHeight)
      .attr("width", barWidth)
      .style("fill", color)
      .on("click", click);

  nodeEnter.append("text")
      .attr("dy", 3.5)
      .attr("dx", 5.5)
      .text(function(d) { return d.data.name; });

  /* move nodes to new position */
  nodeEnter.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1);

  node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1)
    .select("rect")
      .style("fill", color);

  /* move nodes exiting to parent new position */
  node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .style("opacity", 0)
      .remove();

  /* update links */
  var link = svg.selectAll(".link")
    .data(root.links(), function(d) { return d.target.id; });

  /* insert new links at parent previous position */
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })
    .transition()
      .duration(duration)
      .attr("d", diagonal);

  /* move links to new position */
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  /* move nodes exiting to parent new position */
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  /* store old positions for moves/transitions */
  root.each(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

/* toggle children by clicking mouse */
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

function color(d) {
// #fd8d3c
  return d._children ? "#02348c" : d.children ? "#6280BF" : "#e0f7ff";
}