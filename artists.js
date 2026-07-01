function showMonth(period){
d3.select("#spotify-list").remove();
  let container = d3.select("#conti")
    .append("div")
    .attr("id","spotify-list");
//let container = d3.select("#spotify-list");
const tooltip = d3.select("#tooltip");
d3.json(`https://raw.githubusercontent.com/JBreitenbr/Bulma-Navbar/refs/heads/main/Data/${period.split(" ")[1]}/${period.split(" ")[0]}/artists.json`).then(data => {
    const items = container.selectAll(".artist-item")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "artist-item");
items.append("img")
      .attr("src", d => d.artist_pic)
      .attr("alt", d => d.artist).on("mouseover", (event, d) => {
tooltip.transition()
.duration(200)
.style("opacity", 0.9);
  tooltip.html(`Artist: ${d.artist}<br/>Score: ${d.artist_score}<br/>Number of songs played: ${d.art_all_tracks}<br/> Unique songs played: ${d.art_unique_tracks}<br/>Played on: ${d.art_unique_days} days<br/>Minutes played: ${d.sum_dur_min}<br/>Longest streak: ${d.streak} days <br/>Top day: ${d.top_day}`)
.style("left", (event.pageX + 10) + "px")
.style("top", (event.pageY - 28) + "px");
}).on("mouseout", (d) => {
tooltip.transition()
.duration(500)
.style("opacity", 0);
});
  const details = items.append("div")
      .attr("class", "track-details");

    // Append Artist Name
    details.append("div")
      .attr("class", "artist-name")
      .text(d => d.artist);

    // Append Genres Name
    details.append("div")
      .attr("class", "genres-name")
      .text(d => d.genres);});
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
