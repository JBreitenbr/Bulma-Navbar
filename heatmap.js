function showMonth(period) {
  var margin = { top: 80, right: 25, bottom: 30, left: 140 },
    width = 420 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
  d3.select("#my_dataviz").remove();
  let container = d3.select(".wrapped").append("div").attr("id", "my_dataviz");
  var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  //Read the data
  d3.csv(
    `https://raw.githubusercontent.com/JBreitenbr/Bulma-Navbar/refs/heads/main/Data/${
      period.split(" ")[1]
    }/${period.split(" ")[0]}/heatmap.csv`,
    function (data) {
      // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
      var myGroups = d3
        .map(data, function (d) {
          return d.group;
        })
        .keys();
      var myVars = d3
        .map(data, function (d) {
          return d.variable;
        })
        .keys();
      
      // Build X scales and axis:
      var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.05);
      svg
        .append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .style("font", "8px arial")
        .select(".domain")
        .remove();

      // Build Y scales and axis:
      var y = d3.scaleBand().range([0, height]).domain(myVars).padding(0.05);
      svg
        .append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .style("font", "11px arial ")
        .style("transform", "scale(1)")
        .select(".domain")
        .remove();

       // Build color scale

      let blues = [
        "#ffffff",
        "#deebf7",
        "#c6dbef",
        "#9ecae1",
        "#6baed6",
        "#4292c6",
        "#2171b3",
        "#08519c",
        "#08306b",
        "#000080"
      ];
      function colored(n) {
        return blues[n];
      }

      // create a tooltip
      var tooltip = d3
        .select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "2px")
        .style("padding", "2px");

       // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function (d) {
        tooltip.style("opacity", 1);
        d3.select(this).style("stroke", "black").style("opacity", 1);
      };
      var mousemove = function (d) {
        tooltip
          .html(
            "Artist: " +
              d.variable +
              "<br/> Day: " +
              d.group +
              "<br/> Duration: " +
              d.daily_dur +
              "<br/> Number of tracks: " +
              d.n_tracks +
              "<br/> Number of unique tracks: " +
              d.n_utracks
          )
          .style("left", d3.mouse(this)[0] + 70 + "px")
          .style("top", d3.mouse(this)[1] + "px");
      };

     var mouseleave = function (d) {
        tooltip.style("opacity", 0);
        d3.select(this).style("stroke", "none").style("opacity", 0.8);
      };

     // add the squares
      svg
        .selectAll()
        .data(data, function (d) {
          return d.group + ":" + d.variable;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.group);
        })
        .attr("y", function (d) {
          return y(d.variable);
        })
        /*  .attr("rx", 4)
      .attr("ry", 4)*/
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) {
          return colored(d.value);
        })
        .style("stroke-width", 0.5)
        .style("stroke", "grey")
        .style("opacity", 0.8)
        .style("transform", "scale(1)")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
    }
  );
}

showMonth("May 2026");
d3.select("#selectButton")
  .selectAll("myOptions")
  .data(["May 2026", "June 2026", "July 2026"])
  .enter()
  .append("option")
  .text(function (d) {
    return d;
  })
  .attr("value", function (d) {
    return d;
  });
function update(selectedGroup) {
  showMonth(selectedGroup);
}
d3.select("#selectButton").on("change", function (d) {
  let selectedOption = d3.select(this).property("value");
  update(selectedOption);
});
