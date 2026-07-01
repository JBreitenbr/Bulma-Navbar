function showMonth(period){
d3.select("#spotify-list").remove();
let container = d3.select("#conti")
.append("div")
.attr("id","spotify-list");
//let container = d3.select("#spotify-list");
const tooltip = d3.select("#tooltip");
d3.json(`https://raw.githubusercontent.com/JBreitenbr/Bulma-Navbar/refs/heads/main/Data/${period.split(" ")[1]}/${period.split(" ")[0]}/tracks.json`).then(data => {
const items = container.selectAll(".album-item")
.data(data)
.enter()
.append("div")
.attr("class", "track-item");
items.append("img")
.attr("src", d => d.album_pic)
.attr("alt", d => d.track).on("mouseover", (event, d) => {
tooltip.transition()
.duration(200)
.style("opacity", 0.9);
tooltip.html(`Track: ${d.track}<br/>Album: ${d.album_name}<br/>Duration: ${d.dur_min} min<br/>Score: ${d.track_score}<br/>Times played: ${d.plays}<br/>Played on: ${d.track_unique_days} days`)
.style("left", (event.pageX + 10) + "px")
.style("top", (event.pageY - 28) + "px");
}).on("mouseout", (d) => {
tooltip.transition()
.duration(500)
.style("opacity", 0);
});
const details = items.append("div")
.attr("class", "track-details");

// Append Track Name
details.append("div")
.attr("class", "track-name")
.text(d => d.track);

// Append Artist Name
details.append("div")
.attr("class", "artist-name")
.text(d => d.artist);});
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
