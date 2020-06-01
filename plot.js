function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
    }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text("ID: " + result.id);
      PANEL.append("h6").text("Enthicity: " + result.ethinicity);
      PANEL.append("h6").text("Gender: " + result.gender);
      PANEL.append("h6").text("Age: " + result.age);
      PANEL.append("h6").text("Location: " + result.location);
      PANEL.append("h6").text("BBType: " + result.bbtype);
      PANEL.append("h6").text("wfreq: " + result.wfreq);
    });
  }



  function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var SampleResponse = samples.filter(sample_data => sample_data.id == sample);
        var otu_labels=SampleResponse[0].otu_labels;
        var sample_values=SampleResponse[0].sample_values;
        var sample_id=SampleResponse[0].otu_ids;

console.log(samples)

        var new_array=[];
        
        for (let j = 0; j < sample_id.length; j++) {
        var dict = {
            id: 'OTU ' + sample_id[j],
            otu_label: otu_labels[j],
            sample_values: sample_values[j]
        };

        new_array.push(dict);
                }

        sorted_array=new_array.sort((a,b) => a.sample_values - b.sample_values).reverse(); 
        var topTenSamples = sorted_array.slice(0,10);            
        
  
        
        
        var topTenLabels = topTenSamples.map(sample => sample.otu_label);
        var topTenValues = topTenSamples.map(sample => parseInt(sample.sample_values));
        var topTenIds = topTenSamples.map(sample => sample.id);
            
      
console.log(topTenSamples)

        
        var bar_trace = {
            x: topTenValues.reverse(),
            y: topTenIds.reverse(),
            text: topTenLabels.reverse(),
            type: "bar",
            orientation: "h"
          };
          var bar_data = [bar_trace];
          var bar_layout = {
            title: "Top Samples",
            xaxis: { title: "Sample" },
            yaxis: { title: "Value"}
            
          };
          Plotly.newPlot("bar", bar_data, bar_layout);


          var trace1 = {
            x: sample_id,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              color: sample_id,
                size: sample_values
            }
          };
          
          var bubblue_data = [trace1];
          
          var bubblue_layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('bubble', bubblue_data, bubblue_layout);


           });
  }


  init();
 buildMetadata(940);
 buildCharts(940);
