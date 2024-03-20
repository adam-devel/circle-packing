import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import "./CellVisualisation2.css"


const CellVisualisation = ({ data, padding, margin }) => {

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
      .sum(_ => 1)
      .sort((a, b) => b.value - a.value)

    const packer = d3.pack()
    packer.size([size, size])
    packer.radius((d) => {
      return 1 + 4 ** (hierarchy.height - d.depth)
    })
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
        //const rect = gd3.append("rect")
        const text = gd3.append("text")
        text.attr("class", "text")
        text
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("clip-path", `circle(${node.parent.r})`)
          .style("font", `${Math.log(node.r + 16) * 2}pt sans-serif`)
          .text(node.data.label);
        //const bbox = text.node().getBBox()
        //const marginY = 4
        //const marginX = 6
        //rect.attr('width', bbox.width + marginX * 2)
        //  .attr('height', bbox.height + marginY * 2)
        //  .attr('x', bbox.x - marginX)
        //  .attr('y', bbox.y - marginY)
        //  .attr('rx', marginX)
        //  .attr("clip-path", `circle(${node.parent.r})`)
        //  .attr('fill', '#ffffff80')
        //  .attr('stroke', '#00000080')
      } else {
        const circle = gd3.append("circle");
        circle.attr("class", "circle")
        circle
          .attr("r", node.r)
          .attr("fill", colors[node.depth])
          .attr("stroke", "#0000004f")
          .attr("stroke-width", "1px")
          .attr("class", "circle")
          .on("mouseover", function() { circle.attr("stroke", "#000"); })
          .on("mouseout", function() { circle.attr("stroke", "#0000004f"); })
          .on("click", (event) => {
            if (focus !== circle) {
              zoom(event, circle);
              event.stopPropagation()
            }
          });
      }
    })

    // Create the zoom behavior and zoom immediately in to the initial focus node.
    d3Svg.on("click", (event) => zoom(event, root));
    let focus = root;
    let view;
    //zoomTo(focus);

    function zoomTo(v) {
      debugger
      view = v
      const { x, y, r } = v;
      const k = size / r;
      d3Svg
        .selectAll("g").data(root.descendants())
        .attr("transform", d => `translate(${(d.x - x) * k},${(d.y - y) * k})`)

      d3Svg
        .selectAll("circle")
        .data(root.descendants())
        .attr("r", d => { debugger; return d.r * k });
    }

    function zoom(event, d) {
      focus = d;

      const transition = d3Svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

      //labels_group
      //  .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      //  .transition(transition)
      //  .style("fill-opacity", d => d.parent === focus ? 1 : 0)
      //  .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
      //  .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
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
