(function (d3) {
  'use strict';

  var svg = d3.select('svg');
  var width = +svg.attr('width');
  var height = +svg.attr('height');

  // 2 different data arrays
  var dataArray1 = { name: 'DataSet 1', values: [30,35,45,55,70] };
  var dataArray2 = { name: 'DataSet 2', values: [50,55,45,35,20,25,25,40] };
              
  // globals
  var dataIndex = 1;
  var dataToShow;
  var xBuffer = 150;
  var yBuffer = 200;
  var lineLength = 400;
                     
  svg.append("text")
      .attr("x",xBuffer+(lineLength/2))
      .attr("y",50)
      .text("Dataset"+ dataIndex);
              
  //create axis line
  svg.append("line")
      .attr("x1",xBuffer)
      .attr("y1",yBuffer)
      .attr("x1",xBuffer+lineLength)
      .attr("y2",yBuffer);
              
  //create basic circles
  svg.append("g").selectAll("circle")
      .data(dataArray1.values)
      .enter()
      .append("circle")
      .attr("cx",function(d,i){
          var spacing = lineLength/dataArray1.values.length;
          return xBuffer+(i*spacing)
      })
      .attr("cy",yBuffer)
      .attr("r",function(d,i){return d});

  var clickHandler = function () {
    if (dataIndex === 1) {
      dataToShow = dataArray2;
      dataIndex = 2;
    } else {
      dataToShow = dataArray1;
      dataIndex = 1;
    }
    //rejoin data
    var circle = svg.select("g").selectAll("circle")
        .data(dataToShow.values);

    circle.exit().remove();//remove unneeded circles
    circle.enter().append("circle")
        .attr("r",0);//create any new circles needed

    //update all circles to new positions
    circle.transition()
        .duration(500)
        .attr("cx",function(d,i){
            var spacing = lineLength/dataToShow.values.length;
            return xBuffer+(i*spacing)
        })
        .attr("cy",yBuffer)
        .attr("r",function(d,i){return d});
    d3.select("text").text(dataToShow.name);
  };

  var button = d3.select('#button').append('button');
  button
    .text("change data")
    .on("click", clickHandler);

}(d3));
//# sourceMappingURL=bundle.js.map
