// @TODO: YOUR CODE HERE!
var svgWidth = 600;
var svgHeight = 400;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append an SVG group

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data) {
    console.log(data);

    // parse data
    data.forEach(function(data) {
        data.smokes = +data.smokes;
        data.age = +data.age;
      });
    // xLinearScale function above csv import
      var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.age)-1, d3.max(data, d => d.age)+1])
      .range([0, width]);

      
  // Create y scale function
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.smokes) - 1, d3.max(data, d => d.smokes) + 1])
      .range([height, 0]);

  // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

      // append y axis
    chartGroup.append("g")
      .call(leftAxis);

  // append plot
    plot = chartGroup.append("g")
    
  // append initial circles
    plot.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "12")
    .attr("fill", "red")
    .attr("opacity", "0.70")

      // append text in circles
    plot.selectAll('text')
    .data(data)
    .enter().append('text')
    .text(d => d.abbr)
    .attr('font-size',8)
    .attr('dx',  d => xLinearScale(d.age)-5)
    .attr('dy', d => yLinearScale(d.smokes)+3)

    // Create x and y labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 4)
      .attr("x", 0 - (height /1.5))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smokers (%)");

      chartGroup.append("text")
      .attr("transform", `translate(${width /3}, ${height + margin.top + 20})`)
      .attr("class", "axisText")
      .text("Age (Median");

  });