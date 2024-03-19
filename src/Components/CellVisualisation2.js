import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import "./CellVisualisation2.css"


const CellVisualisation = ({ data, padding, margin }) => {
  debugger;

  /*** @type React.MutableRefObject<SVGElement> */
  const svgRef = useRef();

  useEffect(() => {
    if (svgRef.current) {
      // Retrieve svg dimensions
      const box = svgRef.current.getBoundingClientRect();
      const size = Math.min(box.width, box.height)
      // Render
      render(svgRef.current, size);
    }
    return () => cleanup(svgRef);
  }, [data, padding])

  function render(svg, size) {
    // Construct a D3 hierarchy
    const hierarchy = d3.hierarchy(data);

    // Compute the layout for the hierarchy
    hierarchy
      .sum(d => d.label ? 100 : 0)
      .sort((a, b) => b.value - a.value)

    const packer = d3.pack()
    packer.size([size, size])
    packer.padding(padding)
    const root = packer(hierarchy);

    // Configure the SVG container.
    const d3Svg = d3.select(svg)
      .attr("viewBox", `0 0 ${size} ${size}`)
      .attr("height", size)
      .attr("width", size)
    //.attr("style", `background: ${color(0)}; cursor: pointer;`);

    // Append the nodes.
    const circles_group = d3Svg
    //  .append("g")
    //  .selectAll("circle")
    //  .data(root.descendants())
    //  .join("circle")
    //    .attr("fill", d => d.children ? color(d.depth) : "white")
    //    .attr("pointer-events", d => !d.children ? "none" : null)
    //    .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
    //    .on("mouseout", function() { d3.select(this).attr("stroke", null); })
    //    .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

    //// Append the text labels.
    const labels_group = d3Svg
    //  .append("g")
    //  .selectAll("text")
    //  .data(root)
    //  .join("text")
    //  .style("font", "12px sans-serif")
    //  .attr("pointer-events", "none")
    //  .attr("text-anchor", "middle")
    //  .style("fill-opacity", d => d.parent === root ? 1 : 0)
    //  .style("fill-opacity", d => d.parent === root ? 1 : 0)
    //  .style("display", d => d.parent === root ? "inline" : "none")
    //  .text(d => d.data.label);

    const colors = [
      '#ccd5ae',
      '#e9edc9',
      '#fefae0',
      '#faedcd',
      '#d4a373',
    ]

    // position
    root.descendants().forEach(node => {
      const { x, y } = node;
      const gd3 = d3Svg.append('g')
        .attr("transform", `translate(${x}, ${y})`)
      if (node.data.label) {
        //gd3.append("circle")
        //  .attr("r", node.r)
        //  .attr("fill", colors[node.depth])
        //  .attr("stroke", "#0000004f")
        //  .attr("stroke-width", "1px")
        //  .attr("class", "circle")
        const rect = gd3.append("rect")
        const text = gd3.append("text")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .style("font", "10px sans-serif")
          .attr("y", d.children ? d.y - d.r + d.children.length()*18 : d.y)
          .text(node.data.label);
        //const bbox = text.node().getBBox()
        //rect.attr('width', bbox.width)
        //  .attr('height', bbox.height)
        //  .attr('x', bbox.x)
        //  .attr('y', bbox.y)
        //  .attr('fill', 'red')
      } else {
        gd3.append("circle")
          .attr("r", node.r)
          .attr("fill", colors[node.depth])
          .attr("stroke", "#0000004f")
          .attr("stroke-width", "1px")
          .attr("class", "circle")
      }
    })

    // Create the zoom behavior and zoom immediately in to the initial focus node.
    d3Svg.on("click", (event) => zoom(event, root));
    let focus = root;
    let view;
    //zoomTo(focus);

    function zoomTo({ x, y, r }) {
      const k = size / r;

      //labels_group.attr("transform", d => `translate(${(d.x - x) * k},${(d.y - y) * k})`);
      //circles_group.attr("transform", d => `translate(${(d.x - x) * k},${(d.y - y) * k})`);
      //circles_group.attr("r", d => d.r * k);
    }

    function zoom(event, d) {

      focus = d;

      const transition = d3Svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

      labels_group
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }
  }
  /*** @param {SVGElement} svg */
  function cleanup(svgRef) {
    if (!svgRef.current) return;
    svgRef.current.querySelectorAll('*').forEach((n) => n.remove());
  }
  return (
    <svg className="visualization" ref={svgRef}> </svg>
  );
};

export default CellVisualisation;
