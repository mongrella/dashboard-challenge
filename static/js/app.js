// Build metadata side panel
function buildPanelData(sample) {
    d3.json("Data/samples.json").then((data) => {
      var metadata = data.metadata;
      console.log(metadata);

    // Filter metadata
    var buildingArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = buildingArray[0];
    // Use d3.select to grab value
    var panelData = d3.select("#sample-metadata");

    // Clear the existing data
    panelData.html("");

    // Use Object.entries to get key/value pair to the panelData
    Object.entries(result).forEach(([key, value]) => {
      panelData.append("h5").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

function buildCharts(sample) {
    d3.json("Data/samples.json").then((data) => {
      var sampleData = data.samples;
      var buildArray = sampleData.filter(sampleObj => sampleObj.id == sample);
      var result = buildArray[0];
  
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;

    //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    //Similar to Greek god sort slice
    
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
      //Define layout
      var chartLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 25, l: 150 }
      };
      // Plot the chart to a div tag with id "bar"
      Plotly.newPlot("bar", barData, chartLayout);

      // Create a bubble chart that displays each sample.
      //Define layout
    var bubbleChart = {
        title: "Bacteria Cultures Per Sample",
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
      };
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ];
      // Plot the chart to a div tag with id "bubble"
      Plotly.newPlot("bubble", bubbleData, bubbleChart);
      
    });
  };

  function init() {
    // Create the function for event change on the dropdown
    var selectDropdown = d3.selectAll("#selDataset");
  
    // Populate the select options with sample names
    // Create drop down men
    d3.json("Data/samples.json").then((data) => {
      var name = data.names;
  
      name.forEach((sample) => {
        selectDropdown
          .append("option")
          .text(sample)
          .property("value", sample);
      })
  
      // Use the sample data from the list to generate charts and side panel
      var sampleData = name[0];
      buildCharts(sampleData);
      buildPanelData(sampleData);
    });
  };
  
  function optionChanged(newSample) {
    // Generate new data each time a new sample is selected
    buildCharts(newSample);
    buildPanelData(newSample);
  };

  
// Initialize the dashboard
  init()
