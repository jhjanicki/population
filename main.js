const figure = d3.selectAll(".chart");

// console.log(figure.node().getBoundingClientRect())
let width = 1920 / 1.4;
//figure.node().getBoundingClientRect().width;
let height = 1080 / 1.4;
//figure.node().getBoundingClientRect().height;


const margin = {
    "top": (0+84)/1.4,
    "left": (70+84)/1.4,
    "bottom": (85+84)/1.4,
    "right": (0+84)/1.4
}


//svg
const svg = d3.select("#chart1").append("svg").attr("width", width).attr("height", height);
const bg = svg.append('rect')
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#E7E6E6")
    .attr("opacity", 0.3)


countries.forEach(function(d) {
    d.population = +d.population || 0;
    d.year = +d.year || 0;
    return d;
})

//World
const worldData = countries.filter(d => d.area == "WORLD" && d.year <= 2022);

//get high and low projections here

const high = world.filter(d => d.variant == "High")
const low = world.filter(d => d.variant == "Low")

//regions

const regionsProjected = d3.group(
    regions,
    d => d.area
)

//countries

const countriesEstimates = countries.filter(d => d.area !== "WORLD" && d.year <= 2022);
const countriesProjections = countries.filter(d => d.year > 2021); //medium projection

const countriesGroupedE = d3.group(
    countriesEstimates,
    d => d.area
)

const countriesGroupedP = d3.group(
    countriesProjections,
    d => d.area
)

// Africa

const africaE = countries.filter(d => d.region === "Africa" && d.year <= 2022);
const africaP = countries.filter(d => d.region === "Africa" && d.year > 2021);

const africaGroupedE = d3.group(
    africaE,
    d => d.area
)

const africaGroupedP = d3.group(
    africaP,
    d => d.area
)

const africaSubregions = subregions.filter(d => d.region === "Africa");

const africaSubregionsGrouped = d3.group(
    africaSubregions,
    d => d.area
)


// Europe

const europeE = countries.filter(d => d.region === "Europe" && d.year <= 2022);
const europeP = countries.filter(d => d.region === "Europe" && d.year > 2021);

const europeGroupedE = d3.group(
    europeE,
    d => d.area
)

const europeGroupedP = d3.group(
    europeP,
    d => d.area
)

const EUSubregions = subregions.filter(d => d.region === "Europe");

const EUSubregionsGrouped = d3.group(
    EUSubregions,
    d => d.area
)


let countriesList = countries.map(obj => obj.area);
countriesList = countriesList.filter((v, i) => countriesList.indexOf(v) == i);


const xScale = d3.scaleTime()
    .domain([1950, 2021])
    .rangeRound([0, width - margin.left - margin.right])

const yScale = d3.scaleLinear()
    .domain([0, 8000000])
    .range([height - margin.bottom, 0]);


let xAxis = d3.axisBottom(xScale).tickFormat(d => +d);
let yAxis = d3.axisLeft(yScale).ticks(5);


const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

g.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);


const mask = g.append("defs")
    .append("clipPath")
    .attr("id", "mask")
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width - margin.right - margin.left)
    .attr("height", height - margin.bottom)


const masked = g.append("g")
    .attr("clip-path", "url(#mask)")


    // masked.append("linearGradient")
    // .attr("id", "line-gradient")
    // .attr("gradientUnits", "userSpaceOnUse")
    // .attr("x1", 0)
    // .attr("y1", y(0))
    // .attr("x2", 0)
    // .attr("y2", y(max))
    // .selectAll("stop")
    //   .data([
    //     {offset: "0%", color: "blue"},
    //     {offset: "100%", color: "red"}
    //   ])
    // .enter().append("stop")
    //   .attr("offset", function(d) { return d.offset; })
    //   .attr("stop-color", function(d) { return d.color; });


masked.append("path")
    .datum(worldData)
    .attr("class", "worldE")
    .attr("fill", "none")
    .attr("stroke", "#636363")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
        .curve(d3.curveCardinal)
        .x(d => xScale(d.year))
        .y(d => yScale(d.population) || 0)
    )

masked.selectAll("path.lineE")
    .data(countriesGroupedE)
    .join("path")
    .attr("class", "lineE line")
    .attr("id", d => d[0]+"_E")
    .attr("opacity", 1)
    .attr("fill", "none")
    .attr("stroke", d => "#bdbdbd")
    .attr("stroke-width", 2)
    .attr("d", d => {
        return d3.line()
            .curve(d3.curveCardinal)
            .x(d => xScale(d.year))
            .y(d => yScale(d.population) || 0)
            .defined((d => d.population))
            (d[1])
    })

g.append("text")
    .attr("id", "label1")
    .attr("x", xScale(2021))
    .attr("y", yScale(7800000))
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("opacity", 0)
    .attr("font-size", 20)
    .attr("dy", -10)

g.append("text")
    .attr("id", "label2")
    .attr("x", xScale(2021))
    .attr("y", yScale(1400000))
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("opacity", 1)
    .attr("font-size", 20)
    .attr("dy", -10)
    .text("")

g.append("text")
    .attr("id", "label3")
    .attr("x", xScale(2021))
    .attr("y", yScale(1400000))
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("opacity", 0)
    .attr("font-size", 20)
    .attr("dy", -10)
    .text("")


svg.select("#label1")
    .transition().duration(100)
    .attr("opacity", 1)
    .text("World")

function transition(path, callback, duration = 3500) {
    path.transition()
        .duration(duration)
        .attrTween("stroke-dasharray", tweenDash)
        .on("end", callback);
}

function tweenDash() {
    // console.log(this)
    const l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) {
        return i(t)
    };
}




function setLabelStep1() {
    svg.select("#label1")
        .attr("x", xScale(2100))
        .attr("y", yScale(10500000))
        .attr("opacity", 1)
        .text("World, medium projection")

    svg.select("#label2")
        .attr("x", xScale(2100))
        .attr("y", yScale(1500000))
        .attr("opacity", 1)
        .text("Countries, medium projection")

    //2079 around 10.4 billion peak
}


let step = 0;

$("#button").on("click", function() {
    handleStepEnter(step);
    step++;
})

function handleStepEnter(response) {



    if (response == 0) {

        $("#button").html("Next")
        $("#text").html("Population of various countries")

        d3.select(".worldE").attr("opacity", 0)

        yScale.domain([0, 1500000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        svg.select("#label1")
            .attr("opacity", 0)

        svg.select("#label2")
            .attr("opacity", 0)
            .attr("x", xScale(2021))
            .attr("y", yScale(1250000))

        setTimeout(function() {
            svg.select("#label1")
                .transition().duration(100)
                .attr("opacity", 1)
                .text("China")
            svg.select("#label2")
                .transition().duration(100)
                .attr("opacity", 1)
                .text("India")
        }, 500);

        masked.selectAll(".lineE")
            .transition().duration(1000)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })

    }



    if (response == 1) {

        $("#text").html("Projected world / country population until 2100 (medium-level)")

        yScale.domain([0, 15000000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        xScale.domain([1950, 2100]);
        svg.select(".x-axis")
            .transition().duration(1000)
            .call(d3.axisBottom(xScale).tickFormat(d => +d));

        masked.select(".worldE")
            .transition().duration(1000)
            .attr("d", d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
            )
            .attr("opacity", 1)

        masked.selectAll(".lineE")
            .transition().duration(1000)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])

            });

        svg.select("#label1").attr("opacity", 0);
        svg.select("#label2").attr("opacity", 0);


        masked.selectAll("path.lineP")
            .data(countriesGroupedP)
            .join("path")
            .attr("class", "lineP line")
            .attr("id", d => d[0]+"_P")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", d => d[0] == "WORLD" ? "#e34a33" : "#fdbb84")
            .attr("stroke-width", 2)
            // .attr("stroke-dasharray",5)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })
            .call(transition, setLabelStep1);

            masked.selectAll("path.lineE")
    .data(countriesGroupedE)
    .join("path")
    .attr("class", "lineE line")
    .attr("id", d => d[0]+"_E")
    .attr("opacity", 1)
    .attr("fill", "none")
    .attr("stroke", d => "#bdbdbd")
    .attr("stroke-width", 2)
    .attr("d", d => {
        return d3.line()
            .curve(d3.curveCardinal)
            .x(d => xScale(d.year))
            .y(d => yScale(d.population) || 0)
            .defined((d => d.population))
            (d[1])
    })


    }

    if (response == 2) {

        $("#text").html("High and low projections for world")

        masked.append("path")
            .datum(low)
            .attr("class", "lineLow line")
            .attr("fill", "none")
            .attr("stroke", "#67a9cf")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
            ).call(transition);

        masked.append("path")
            .datum(high)
            .attr("class", "lineHigh line")
            .attr("fill", "none")
            .attr("stroke", "#016c59")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
            ).call(transition);




    }


    if (response == 3) {

        $("#text").html("India is projected to surpass China in 2023 to become the world's most populous country")

        svg.select("#label1")
            .attr("opacity", 0)
            .attr("x", xScale(2100))
            .attr("y", yScale(6000000))


        svg.select("#label2")
            .attr("opacity", 0)
            .attr("x", xScale(2100))
            .attr("y", yScale(11500000))

        setTimeout(function() {
            svg.select("#label1")
                .transition().duration(100)
                .attr("opacity", 1)
                .text("China")
            svg.select("#label2")
                .transition().duration(100)
                .attr("opacity", 1)
                .text("India")
        }, 500);

        yScale.domain([0, 2000000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));


        masked.select(".worldE")
            .transition().duration(1000)
            .attr("d", d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
            )
        masked.selectAll(".line")
            .transition().duration(1000)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            });

        masked.append("circle")
        .attr("id","circle1")
        .attr("opacity",0)
        .attr("cx",xScale(2023))
        .attr("cy",yScale(1420000))
        .attr("r",10)
        .attr("stroke","black")
        .attr("stroke-width",1)
        .attr("stroke-dasharray",3)
        .attr("fill","none")

        setTimeout(function() {
            svg.select("#circle1")
                .transition().duration(100)
                .attr("opacity", 1)
        }, 1000);

        setTimeout(function() {

                svg.select("#label3")
                .attr("x",xScale(2023))
                .attr("y",yScale(1440000))
                .transition().duration(100)
                .attr("opacity", 1)
                .text("India surpasses China")
        }, 1500);

        //1422027


    }


    if (response == 4) {

        $("#text").html("Current and projected growth by region. Africa is projected to grow the fastest")

        yScale.domain([0, 6000000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        svg.select("#label1")
        .attr("opacity", 0)
        .attr("x", xScale(2100))
        .attr("y", yScale(3500000))
        svg.select("#label2").attr("opacity", 0);
        svg.select("#label3").attr("opacity", 0);
        svg.select("#circle1").attr("opacity", 0);



        masked.selectAll(".line")
            .transition().duration(1000).attr("opacity",0)

        masked.selectAll("path.lineRegions")
            .data(regionsProjected)
            .join("path")
            .attr("class", "lineRegions")
            .attr("id", d => d[0].replaceAll(" ","-"))
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", "#c51b8a")
            .attr("stroke-width", 2)
            // .attr("stroke-dasharray",5)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })
            .on("mouseover", (e, d, i) => {
                console.log(d)
            })
            .call(transition);


            setTimeout(function() {
                svg.select("#label1")
                    .transition().duration(100)
                    .attr("opacity", 1)
                    .text("Africa")
                svg.selectAll(".lineRegions")
                .attr("stroke-width",0.5);
                svg.select("#AFRICA").attr("stroke-width",2);
            }, 3500);
            

        // how to create labels for regions?
        // masked.selectAll("text.textRegions")
        //     .data(regionsProjected)
        //     .join("text")
        //     .attr("class", "textRegions")
        //     .attr("y",d=>d

             // this part is to deal with the bug

        svg.selectAll(".lineP, .lineE").remove();

    }

    if (response == 5) {
//
        svg.selectAll(".lineRegions").attr("opacity",0).remove();
        svg.select("#label1").attr("opacity", 0)

        $("#text").html("Subregions of Africa")

        yScale.domain([0, 1500000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));


        masked.selectAll(".line")
            .transition().duration(1000).attr("opacity",0)

        masked.selectAll("path.lineAfsubregions")
            .data(africaSubregionsGrouped)
            .join("path")
            .attr("class", "lineAfsubregions")
            .attr("id", d => d[0].replaceAll(" ","-"))
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", "#c51b8a")
            .attr("stroke-width", 2)
            // .attr("stroke-dasharray",5)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })
            .on("mouseover", (e, d, i) => {
                console.log(d)
            })
            .call(transition);


    }

    if (response == 6) {

        svg.selectAll(".lineAfsubregions").attr("opacity",0).remove();
        masked.selectAll("path.lineAfricaP")
        .data(africaGroupedP)
        .join("path")
        .attr("class", "lineAfricaP line")
        .attr("id", d => d[0]+"_P")
        .attr("opacity", 0)
        .attr("fill", "none")
        .attr("stroke", d => d[0] == "WORLD" ? "#e34a33" : "#fdbb84")
        .attr("stroke-width", 2)
        // .attr("stroke-dasharray",5)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })

        masked.selectAll("path.lineAfricaE")
        .data(africaGroupedE)
        .join("path")
        .attr("class", "lineAfricaE line")
        .attr("id", d => d[0]+"_E")
        .attr("opacity", 0)
        .attr("fill", "none")
        .attr("stroke", d => "#bdbdbd")
        .attr("stroke-width", 2)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })

        $("#text").html("Nigeria is the most populous country in Africa, its population will grow until 2050")
        
        svg.select("#label1")
        .attr("opacity", 0)

        masked.selectAll(".lineRegions")
            .transition().duration(1000).attr("opacity",0).remove()

        yScale.domain([0, 600000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        masked.selectAll(".line")
            .on("mouseover",(e,d)=>console.log(d))
            .transition().duration(1000)
            .attr("opacity",1)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            });

        setTimeout(function() {

            svg.selectAll(".line")
                .attr("stroke-width",0.5);

            svg.selectAll("#Nigeria_E,#Nigeria_P")
                .attr("stroke-width",3);

            svg.select("#label1")
                .attr("x",xScale(2100))
                .attr("y",yScale(550000))
                .attr("opacity", 1)
                .text("Nigeria")
            
        }, 500);


    }

    if (response == 7) {

        $("#text").html("Current and projected growth by region. Europe is declining.")

        svg.selectAll(".lineAfricaE, .lineAfricaP")
        .attr("opacity",0)
        .remove();

        yScale.domain([0, 6000000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        svg.select("#label1")
        .attr("opacity", 0)
        .attr("x", xScale(2100))
        .attr("y", yScale(3500000))
        svg.select("#label2").attr("opacity", 0);
        svg.select("#label3").attr("opacity", 0);
        svg.select("#circle1").attr("opacity", 0);


        masked.selectAll("path.lineRegions")
            .data(regionsProjected)
            .join("path")
            .attr("class", "lineRegions")
            .attr("id", d => d[0].replaceAll(" ","-"))
            .attr("opacity", 0)
            .attr("fill", "none")
            .attr("stroke", "#c51b8a")
            .attr("stroke-width", 2)
            // .attr("stroke-dasharray",5)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })
            .on("mouseover", (e, d, i) => {
                console.log(d)
            })
            .transition().duration(1000)
            .attr("opacity", 1)
            


            // setTimeout(function() {
            //     svg.select("#label1")
            //         .transition().duration(100)
            //         .attr("opacity", 1)
            //         .text("Africa")
            //     svg.selectAll(".lineRegions")
            //     .attr("stroke-width",0.5);
            //     svg.select("#AFRICA").attr("stroke-width",2);
            // }, 3500);
        

    }

    if (response == 8) {

        $("#text").html("Europe is delining, for example Bulgaria")

        masked.selectAll("path.lineEuropeP")
        .data(europeGroupedP)
        .join("path")
        .attr("class", "lineEuropeP line")
        .attr("id", d => d[0]+"_P")
        .attr("opacity", 1)
        .attr("fill", "none")
        .attr("stroke", d => d[0] == "WORLD" ? "#e34a33" : "#fdbb84")
        .attr("stroke-width", 2)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })

        masked.selectAll("path.lineEuropeE")
        .data(europeGroupedE)
        .join("path")
        .attr("class", "lineEuropeE line")
        .attr("id", d => d[0]+"_E")
        .attr("opacity", 1)
        .attr("fill", "none")
        .attr("stroke", d => "#bdbdbd")
        .attr("stroke-width", 2)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })


        yScale.domain([0, 150000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));


            masked.selectAll(".line")
            .transition().duration(1000)
            .attr("opacity",1)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            });



        $("#text").html("Europe")
        
        svg.select("#label1")
        .attr("opacity", 0)


        setTimeout(function() {

            svg.selectAll(".line")
                .attr("stroke-width",0.5);

            svg.selectAll("#Bulgaria_E,#Bulgaria_P")
                .attr("stroke-width",5);

            svg.select("#label1")

                .attr("x",xScale(2100))
                .attr("y",yScale(5000))
                .attr("opacity", 1)
                .text("Bulgaria")

            
        }, 500);



    }

}


function wrap(text, width) {
    console.log("wrap")
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0.72, //<-- 0!
            lineHeight = 1.4, // ems
            x = text.attr("x"), //<-- include the x!
            y = text.attr("y"),
            dy = text.attr("dy") ? text.attr("dy") : 0; //<-- null check
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}