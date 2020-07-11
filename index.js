import { select } from 'd3';

const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

// 2 different data arrays
const dataArray1 = { name: 'DataSet 1', values: [30,35,45,55,70] };
const dataArray2 = { name: 'DataSet 2', values: [50,55,45,35,20,25,25,40] };
            
// globals
let dataIndex = 1;
let dataToShow;
const xBuffer = 150;
const yBuffer = 200;
const lineLength = 400;
                   
svg.append("text")
    .attr("x",xBuffer+(lineLength/2))
    .attr("y",50)
    .text("dataset"+ dataIndex);
            
//create axis line
svg.append("line")
    .attr("x1",xBuffer)
    .attr("y1",yBuffer)
    .attr("x1",xBuffer+lineLength)
    .attr("y2",yBuffer)
            
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

const clickHandler = () => {
  if (dataIndex === 1) {
    dataToShow = dataArray2;
    dataIndex = 2;
  } else {
    dataToShow = dataArray1;
    dataIndex = 1;
  }
  //rejoin data
  const circle = svg.select("g").selectAll("circle")
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
  select("text").text(dataToShow.name);
};

const button = select('#button').append('button');
button
  .text("change data")
  .on("click", clickHandler)


