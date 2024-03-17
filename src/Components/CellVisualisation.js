import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const CellVisualisation = ({ width, height, data, setData }) => {
  const svgRef = useRef();
  const [oldCircles, setOldCircles] = useState([]);

  const colors = ['#F17300', '#DBE4EE', '#3E7CB1', '#054A91']; // Define the four colors

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const svg = d3.select(svgRef.current);

    const updateChart = (newData) => {
      const root = d3.hierarchy({ children: newData })
        .sum((d) => d.r || 0); // Sum based on radius for packing, default to 0 if no radius provided

      const pack = d3.pack()
        .size([width, height])
        .padding(10); // Adjust padding here

      const packedData = pack(root).descendants();

      svg.selectAll('.circle').remove();
      svg.selectAll('.text').remove();

      packedData.forEach((d, i) => {
        if (i !== 0 && !isNaN(d.x) && !isNaN(d.y) && !isNaN(d.r)) { // Check for valid values
          svg.append('circle')
            .attr('class', 'circle')
            .attr('cx', d.x)
            .attr('cy', d.y)
            .attr('r', d.r)
            .attr('fill', colors[i % colors.length]) // Use one of the predefined colors

          svg.append('text') // Add text inside the circle
            .attr('class', 'text')
            .attr('x', d.x)
            .attr('y', d.y)
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .text(`Cellule ${d.data.label.replace('Cell ', '')}`);
        }
      });

      setOldCircles(packedData.slice(1));
    };


  }, [data, height, width]);

  return (
    <svg ref={svgRef} width={width} height={height}>
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
