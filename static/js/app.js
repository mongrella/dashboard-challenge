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

    // Clear the existing data in the html
    panelData.html("");

    // Use Object.entries to get key/value pair to the panelData
    Object.entries(result).forEach(([key, value]) => {
      panelData.append("h5").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}



  function init() {
    // Create the function for event change on the dropdown
    var selectDropdown = d3.selectAll("#selDataset");
  
    // Populate the select options with sample names
    d3.json("Data/samples.json").then((data) => {
      var name = data.names;
  
      name.forEach((sample) => {
        selectDropdown
          .append("option")
          .text(sample)
          .property("value", sample);
      })
  

  
// Initialize the dashboard
  init()
//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//Similar to Greek god sort slice
