function showMonth(period){
d3.select("#my_dataviz").remove();
  let container = d3.select("body")
    .append("div")
    .attr("id","#my_dataviz");
let margin = {top: 80, right: 25, bottom: 30, left: 140};
let weight=+d3.select("#my_dataviz").style("width").slice(0,-2)-margin.left - margin.right;
let height=+d3.select("#my_dataviz").style("height").slice(0,-2)-margin.top - margin.bottom;
let svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width)
  .attr("height", height)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
let tooltip = d3.select("#tooltip");
d3.csv(`https://raw.githubusercontent.com/JBreitenbr/Bulma-Navbar/refs/heads/main/Data/${period.split(" ")[1]}/${period.split(" ")[0]}/heatmap.csv`).then(data => {
    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3.map(data, function(d){return d.group;}).keys()
  var myVars = d3.map(data, function(d){return d.variable;}).keys()

  // Build X scales and axis:
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.05);
  svg.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0)).style("font","8px arial")
    .select(".domain").remove()

  // Build Y scales and axis:
  var y = d3.scaleBand()
    .range([ 0,height ])
    .domain(myVars)
    .padding(0.05);
  svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0)).style("font","11px arial ").style("transform","scale(1)")
    .select(".domain").remove()

});
}
