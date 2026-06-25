function showMonth(period) {
  const margin = { top: 20, right: 25, bottom: 30, left: 140 };
  const outerWidth = 460;
  const outerHeight = 700;
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;

  d3.select("#my_dataviz").html("");

  const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("viewBox", `0 0 ${outerWidth} ${outerHeight}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "100%")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  d3.csv(`https://raw.githubusercontent.com/JBreitenbr/Bulma-Navbar/refs/heads/main/Data/${period.split(" ")[1]}/${period.split(" ")[0]}/heatmap.csv`, function(data) {

    const myGroups = d3.map(data, d => d.group).keys();
    const myVars = d3.map(data, d => d.variable).keys();

    const x = d3.scaleBand()
      .range([0, width])
      .domain(myGroups)
      .padding(0.05);

    const y = d3.scaleBand()
      .range([0, height])
      .domain(myVars)
      .padding(0.05);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .style("font", "12px arial")
      .select(".domain").remove();

    svg.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .style("font", "12px arial")
      .select(".domain").remove();

    const blues = ["#ffffff","#deebf7","#c6dbef",
      "#9ecae1","#6baed6","#4292c6","#2171b3",
      "#08519c","#08306b", "#000080"];

    svg.selectAll("rect")
      .data(data, d => d.group + ":" + d.variable)
      .enter()
      .append("rect")
      .attr("x", d => x(d.group))
      .attr("y", d => y(d.variable))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", d => blues[+d.value])
      .style("stroke-width", 0.5)
      .style("stroke", "grey")
      .style("opacity", 0.8);
  });
}
showMonth("May 2026");
d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(['May 2026','June 2026',"July 2026"])
      .enter()
    	.append('option')
      .text(function (d) { return d; }) 
      .attr("value", function (d) { return d; })
function update(selectedGroup) {   
   showMonth(selectedGroup);
}   
d3.select("#selectButton").on("change", function(d) {
        let selectedOption = d3.select(this).property("value")
        update(selectedOption)});
