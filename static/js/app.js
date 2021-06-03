

  function init() {
    // Create function for event change on the dropdown
    var selectDropdown = d3.selectAll("#selDataset");
  
    // Populate the select options with the list of sample names
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
