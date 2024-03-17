import React, { useRef } from 'react';
import * as d3 from 'd3';
import "./CellVisualisation2.css"

const CellVisualisation = ({ color, data }) => {

  const svgRef = useRef();
  const colors = [
    '#F4538A', // Base color 1
    '#FAA300', // Base color 2
    '#F9B721', '#F8C042', '#F7CD63', '#F6D784', '#F5E3A5', '#F4EEC6', '#F3F9E7', '#EEFAEF', '#E9F8EA', '#E4F6E5', '#DFF4E0', // Interpolated colors between base color 2 and base color 3
    '#F5DD61', // Base color 3
    '#91CCBB', '#88C6B3', '#7FBFAB', '#76B9A3', '#6DB29B', '#64AC93', '#5BA68B', '#52A083', '#499A7B', '#409474', '#379E6C', // Interpolated colors between base color 3 and base color 4
    '#59D5E0' // Base color 4
  ]

  const svg = d3.select(svgRef.current);
  const circleSize = 10;
  const height = 200;
  const width = 200;

  const root = d3.hierarchy({ children: data })
    //.sum((d) => 50 + 20 * (d.children !== null ? d.children.length : 0))
    .sum((d) => circleSize + 4 * (d.children !== null ? d.children.length : 0))
    .sort((a, b) => b.value - a.value)
  const pack = d3.pack()
    .size([width, height])
    .padding(2); // Adjust padding here

  const packedData = pack(root).descendants();

  svg.selectAll('.circle').remove();
  svg.selectAll('.text').remove();



  packedData.forEach((d, i) => {
    if (i == 0 || isNaN(d.x) || isNaN(d.y) || isNaN(d.r)) { return; }
    svg.append('circle')
      .attr('class', 'circle')
      .attr('cx', d.x)
      .attr('cy', d.y)
      .attr('r', d.value)
      .attr('fill', colors[i % colors.length]) // Use one of the predefined colors


    svg.append('text') // Add text inside the circle
      .attr("text-anchor", "middle")

      .style("font", "10px sans-serif")
      .attr('x', d.x)
      .attr('y', (d.children) ? d.y - d.r + (d.children.length) * 2 : d.y)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .text(`value: ${d.value}`)
      //.text(`Cellule ${d.data.label.replace('Cell ', '')}`);
  });

  return (
    <svg className="visualization" ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      {data.map((circle, index) => (
        <circle
          key={index}
          className="circle"
          cx={circle.x}
          cy={circle.y}
          r={circle.r}
          fill={colors[index % colors.length]}
        />
      ))}
    </svg>
  );
};

export default CellVisualisation;
