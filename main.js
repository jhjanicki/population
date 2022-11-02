const figure = d3.selectAll(".chart");

// console.log(figure.node().getBoundingClientRect())
let width = 1920 / 1.4;
//figure.node().getBoundingClientRect().width;
let height = 1080 / 1.4;
//figure.node().getBoundingClientRect().height;


const margin = {
    "top": (0 + 84) / 1.4,
    "left": (70 + 84) / 1.4,
    "bottom": (85 + 84) / 1.4,
    "right": (0 + 84) / 1.4
}


//svg
const svg = d3.select("#chart1").append("svg").attr("width", width).attr("height", height);
const bg = svg.append('rect')
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "none")
    .attr("opacity", 0.3)


countries.forEach(function (d) {
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

const regionsE = regions.filter(d => d.year <= 2022);
const regionsP = regions.filter(d => d.year > 2021);

const regionsProjectedE = d3.group(
    regionsE,
    d => d.area
)

const regionsProjectedP = d3.group(
    regionsP,
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

const africaSubE = subregions.filter(d => d.region === "Africa" && d.year <= 2022);
const africaSubP = subregions.filter(d => d.region === "Africa" && d.year > 2021);


const africaSubregionsGrouped = d3.group(
    africaSubregions,
    d => d.area
)

const africaSubregionsGroupedE = d3.group(
    africaSubE,
    d => d.area
)

const africaSubregionsGroupedP = d3.group(
    africaSubP,
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


// N.America

const nAmericaE = countries.filter(d => d.region === "Northern America" && d.year <= 2022);
const nAmericaP = countries.filter(d => d.region === "Northern America" && d.year > 2021);

const nAmericaGroupedE = d3.group(
    nAmericaE,
    d => d.area
)

const nAmericaGroupedP = d3.group(
    nAmericaP,
    d => d.area
)


// Latin American and the Caribbean

const lAmericaE = countries.filter(d => d.region === "Latin American and the Caribbean" && d.year <= 2022);
const lAmericaP = countries.filter(d => d.region === "Latin American and the Caribbean" && d.year > 2021);

const lAmericaGroupedE = d3.group(
    lAmericaE,
    d => d.area
)

const lAmericaGroupedP = d3.group(
    lAmericaP,
    d => d.area
)


// Asia

const asiaE = countries.filter(d => d.region === "Asia" && d.year <= 2022);
const asiaP = countries.filter(d => d.region === "Asia" && d.year > 2021);

const asiaGroupedE = d3.group(
    asiaE,
    d => d.area
)

const asiaGroupedP = d3.group(
    asiaP,
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
    .attr("id", d => d[0] + "_E")
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
    return function (t) {
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


const regionEColorScale = d3.scaleOrdinal().domain("ASIA","AFRICA","LATIN AMERICA AND THE CARIBBEAN", "EUROPE", "NORTH AMERICA","OCEANIA").range(["#66c2a4","#8c96c6","#fc8d59","#7bccc4","#c994c7","#fe9929"]);
const regionPColorScale = d3.scaleOrdinal().domain("ASIA","AFRICA","LATIN AMERICA AND THE CARIBBEAN", "EUROPE", "NORTH AMERICA","OCEANIA").range(["#006d2c","#810f7c","#b30000","#0868ac","#dd1c77","#d95f0e"]);

let step = 0;

$("#button").on("click", function () {
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

        setTimeout(function () {
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
            .attr("id", d => d[0] + "_P")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", d => d[0] == "WORLD" ? "#de2d26" : "#fdbb84")
            .attr("stroke-width", 2)
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
            .attr("id", d => d[0] + "_E")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke","#bdbdbd")
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

        //this part is just here because there's a weird error with the projected lines when using transition,
        // they don't appear to reach the end of the y axis, so I added these lines behind
        masked.selectAll("path.lineP2")
            .data(countriesGroupedP)
            .join("path")
            .attr("class", "lineP2 line")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", d => d[0] == "WORLD" ? "#de2d26" : "#fdbb84")
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })

        masked.append("path")
            .datum(low)
            .attr("class", "lineLow line")
            .attr("fill", "none")
            .attr("stroke", "#fc9272")
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
            .attr("stroke", "#a50f15")
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

        setTimeout(function () {
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
            .attr("id", "circle1")
            .attr("opacity", 0)
            .attr("cx", xScale(2023))
            .attr("cy", yScale(1420000))
            .attr("r", 10)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", 3)
            .attr("fill", "none")

        setTimeout(function () {
            svg.select("#circle1")
                .transition().duration(100)
                .attr("opacity", 1)
        }, 1000);

        setTimeout(function () {

            svg.select("#label3")
                .attr("x", xScale(2023))
                .attr("y", yScale(1440000))
                .transition().duration(100)
                .attr("opacity", 1)
                .text("India surpasses China in 2023")
        }, 1500);

        //1422027


    }


    if (response == 4) {

        $("#text").html("Current and projected growth by region. Africa is projected to grow the fastest")

        yScale.domain([0, 5500000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        svg.select("#label1")
            .attr("opacity", 0)
            .attr("x", xScale(2100))
            .attr("y", yScale(3900000))
        svg.select("#label2").attr("opacity", 0);
        svg.select("#label3").attr("opacity", 0);
        svg.select("#circle1").attr("opacity", 0);


        svg.selectAll(".lineP2").attr("opacity", 0).remove();

        masked.selectAll(".line").attr("opacity", 0)

        masked.selectAll("path.lineRegionsE")
            .data(regionsProjectedE)
            .join("path")
            .attr("class", "lineRegionsE lineRegions")
            .attr("id", d => d[0].replaceAll(" ", "-")+"E")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", d=>regionEColorScale(d[0]))
            .attr("stroke-width", 2)
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

        setTimeout(function () {

            masked.selectAll("path.lineRegionsP")
                .data(regionsProjectedP)
                .join("path")
                .attr("class", "lineRegionsP lineRegions")
                .attr("id", d => d[0].replaceAll(" ", "-")+"P")
                .attr("opacity", 1)
                .attr("fill", "none")
                .attr("stroke", d=>regionPColorScale(d[0]))
                .attr("stroke-width", 2)
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

        }, 2500);


        setTimeout(function () {
            svg.select("#label1")
                .transition().duration(100)
                .attr("opacity", 1)
                .text("Africa")
            svg.selectAll(".lineRegions")
                .attr("stroke-width", 0.5);
            svg.select("#AFRICAE").attr("stroke-width", 2);
            svg.select("#AFRICAP").attr("stroke-width", 2);
        }, 6000);


        // how to create labels for regions?
        // masked.selectAll("text.textRegions")
        //     .data(regionsProjected)
        //     .join("text")
        //     .attr("class", "textRegions")
        //     .attr("y",d=>d

        // this part is to deal with the bug

        svg.selectAll(".lineP, .lineE").remove();

    }

    // if (response == 5) {
    //     //
    //     svg.selectAll(".lineRegions").attr("opacity", 0).remove();
    //     svg.select("#label1").attr("opacity", 0)

    //     $("#text").html("Subregions of Africa")

    //     yScale.domain([0, 1500000]);
    //     svg.select(".y-axis")
    //         .transition().duration(1000)
    //         .call(d3.axisLeft(yScale));


    //     masked.selectAll(".line").attr("opacity", 0)

    //     masked.selectAll("path.lineAfsubregionsE")
    //         .data(africaSubregionsGroupedE)
    //         .join("path")
    //         .attr("class", "lineAfsubregionsE")
    //         .attr("id", d => d[0].replaceAll(" ", "-"))
    //         .attr("opacity", 1)
    //         .attr("fill", "none")
    //         .attr("stroke", regionEColorScale("AFRICA"))
    //         .attr("stroke-width", 2)
    //         .attr("d", d => {
    //             return d3.line()
    //                 .curve(d3.curveCardinal)
    //                 .x(d => xScale(d.year))
    //                 .y(d => yScale(d.population) || 0)
    //                 .defined((d => d.population))
    //                 (d[1])
    //         })
    //         .on("mouseover", (e, d, i) => {
    //             console.log(d)
    //         })
    //         .call(transition);

    //     setTimeout(function () {

    //         masked.selectAll("path.lineAfsubregionsP")
    //             .data(africaSubregionsGroupedP)
    //             .join("path")
    //             .attr("class", "lineAfsubregionsP")
    //             .attr("id", d => d[0].replaceAll(" ", "-"))
    //             .attr("opacity", 1)
    //             .attr("fill", "none")
    //             .attr("stroke", regionPColorScale("AFRICA"))
    //             .attr("stroke-width", 2)
    //             .attr("d", d => {
    //                 return d3.line()
    //                     .curve(d3.curveCardinal)
    //                     .x(d => xScale(d.year))
    //                     .y(d => yScale(d.population) || 0)
    //                     .defined((d => d.population))
    //                     (d[1])
    //             })
    //             .on("mouseover", (e, d, i) => {
    //                 console.log(d)
    //             })
    //             .call(transition);

    //     }, 2500);





    // }

    if (response == 5) {

        svg.selectAll(".lineRegions").attr("opacity", 0).remove();
        svg.select("#label1").attr("opacity", 0)
        masked.selectAll("path.lineAfricaP")
            .data(africaGroupedP)
            .join("path")
            .attr("class", "lineAfricaP line")
            .attr("id", d => d[0] + "_P")
            .attr("opacity", 0)
            .attr("fill", "none")
            //.attr("stroke", d => d[0] == "WORLD" ? "#e34a33" : "#fdbb84")
            .attr("stroke", regionPColorScale("AFRICA"))
            .attr("stroke-width", 2)
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
            .attr("id", d => d[0] + "_E")
            .attr("opacity", 0)
            .attr("fill", "none")
            .attr("stroke", regionEColorScale("AFRICA"))
            // .attr("stroke", d => "#bdbdbd")
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
            .transition().duration(1000).attr("opacity", 0).remove()

        yScale.domain([0, 600000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        masked.selectAll(".line")
            .on("mouseover", (e, d) => console.log(d))
            .transition().duration(1000)
            .attr("opacity", 1)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            });

        setTimeout(function () {

            svg.selectAll(".line")
                .attr("stroke-width", 0.5);

            svg.selectAll("#Nigeria_E,#Nigeria_P")
                .attr("stroke-width", 3);

            svg.select("#label1")
                .attr("x", xScale(2100))
                .attr("y", yScale(550000))
                .attr("opacity", 1)
                .text("Nigeria")

        }, 500);


    }

    if (response == 6) {

        $("#text").html("Current and projected growth by region. Europe overall is declining.")

        svg.selectAll(".lineAfricaE, .lineAfricaP")
            .attr("opacity", 0)
            .remove();

        yScale.domain([0, 5500000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        svg.select("#label1")
            .attr("opacity", 0)
            .attr("x", xScale(2100))
            .attr("y", yScale(600000))
        svg.select("#label2").attr("opacity", 0);
        svg.select("#label3").attr("opacity", 0);
        svg.select("#circle1").attr("opacity", 0);

        masked.selectAll("path.lineRegionsE")
        .data(regionsProjectedE)
        .join("path")
        .attr("class", "lineRegionsE lineRegions")
        .attr("id", d => d[0].replaceAll(" ", "-")+"E")
        .transition().duration(1000)
        .attr("opacity", 1)
        .attr("fill", "none")
        .attr("stroke", d=>regionEColorScale(d[0]))
        .attr("stroke-width", 2)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })

        masked.selectAll("path.lineRegionsP")
            .data(regionsProjectedP)
            .join("path")
            .attr("class", "lineRegionsP lineRegions")
            .attr("id", d => d[0].replaceAll(" ", "-")+"P")
            .transition().duration(1000)
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", d=>regionPColorScale(d[0]))
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })


        setTimeout(function() {
            svg.select("#label1")
                .transition().duration(100)
                .attr("opacity", 1)
                .text("Europe")
            svg.selectAll(".lineRegions")
                .attr("stroke-width", 0.5);
            svg.select("#EUROPEE").attr("stroke-width", 2);
            svg.select("#EUROPEP").attr("stroke-width", 2);
        }, 1200);


    }

    if (response == 7) {

        svg.selectAll(".lineRegions").attr("opacity", 0).remove();
        svg.select("#label1").attr("opacity", 0)

        $("#text").html("Europe is delining, for example Bulgaria")

        masked.selectAll("path.lineEuropeP")
            .data(europeGroupedP)
            .join("path")
            .attr("class", "lineEuropeP line")
            .attr("id", d => d[0] + "_P")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", regionPColorScale("EUROPE"))
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
            .attr("id", d => d[0] + "_E")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", regionEColorScale("EUROPE"))
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
            .attr("opacity", 1)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            });



        $("#text").html("Most European countries are projected to decline, including Bulgaria")

        svg.select("#label1")
            .attr("opacity", 0)


        setTimeout(function () {

            svg.selectAll(".line")
                .attr("stroke-width", 0.5);

            svg.selectAll("#Bulgaria_E,#Bulgaria_P")
                .attr("stroke-width", 5);

            svg.select("#label1")

                .attr("x", xScale(2100))
                .attr("y", yScale(5000))
                .attr("opacity", 1)
                .text("Bulgaria")


        }, 500);



    }

    if (response == 8) {

        $("#text").html("Current and projected growth by region. North America is slowly plateauing.")

        svg.selectAll(".lineEuropeE, .lineEuropeP")
            .attr("opacity", 0)
            .remove();

        yScale.domain([0, 5500000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        svg.select("#label1")
            .attr("opacity", 0)
            .attr("x", xScale(2100))
            .attr("y", yScale(500000))
        svg.select("#label2").attr("opacity", 0);
        svg.select("#label3").attr("opacity", 0);
        svg.select("#circle1").attr("opacity", 0);

        masked.selectAll("path.lineRegionsE")
        .data(regionsProjectedE)
        .join("path")
        .attr("class", "lineRegionsE lineRegions")
        .attr("id", d => d[0].replaceAll(" ", "-")+"E")
        .transition().duration(1000)
        .attr("opacity", 1)
        .attr("fill", "none")
        .attr("stroke", d=>regionEColorScale(d[0]))
        .attr("stroke-width", 2)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })

        masked.selectAll("path.lineRegionsP")
            .data(regionsProjectedP)
            .join("path")
            .attr("class", "lineRegionsP lineRegions")
            .attr("id", d => d[0].replaceAll(" ", "-")+"P")
            .transition().duration(1000)
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", d=>regionPColorScale(d[0]))
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })


        setTimeout(function() {
            svg.select("#label1")
                .transition().duration(100)
                .attr("opacity", 1)
                .text("North America")
            svg.selectAll(".lineRegions")
                .attr("stroke-width", 0.5);
            svg.select("#NORTHERN-AMERICAE").attr("stroke-width", 2);
            svg.select("#NORTHERN-AMERICAP").attr("stroke-width", 2);
        }, 1200);


    }

    if (response == 9) {

        svg.selectAll(".lineRegions").attr("opacity", 0).remove();
        svg.select("#label1").attr("opacity", 0)

        $("#text").html("The US is projected to grow at a decreasing rate and plateau towards 2100")

        masked.selectAll("path.lineNAmericaP")
            .data(nAmericaGroupedP)
            .join("path")
            .attr("class", "lineNAmericaP line")
            .attr("id", d => d[0].replaceAll(" ","-")  + "_P")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", regionPColorScale("NORTHERN AMERICA"))
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })

        masked.selectAll("path.lineNAmericaE")
            .data(nAmericaGroupedE)
            .join("path")
            .attr("class", "lineNAmericaE line")
            .attr("id", d => d[0].replaceAll(" ","-") + "_E")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", regionEColorScale("NORTHERN AMERICA"))
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })


        yScale.domain([0, 400000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));


        masked.selectAll(".line")
            .transition().duration(1000)
            .attr("opacity", 1)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            });


        svg.select("#label1")
            .attr("opacity", 0)


        setTimeout(function () {

            svg.selectAll(".line")
                .attr("stroke-width", 0.5);

            svg.selectAll("#United-States-of-America_P,#United-States-of-America_E")
                .attr("stroke-width", 3);

            svg.select("#label1")

                .attr("x", xScale(2100))
                .attr("y", yScale(400000))
                .attr("opacity", 1)
                .text("USA")


        }, 500);



    }


    if (response == 10) {

        $("#text").html("Current and projected growth by region. Latin America is projected to grow but starts to decline towards 2060")

        svg.selectAll(".lineNAmericaE, .lineNAmericaP")
            .attr("opacity", 0)
            .remove();

        yScale.domain([0, 5500000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        svg.select("#label1")
            .attr("opacity", 0)
            .attr("x", xScale(2100))
            .attr("y", yScale(650000))
        svg.select("#label2").attr("opacity", 0);
        svg.select("#label3").attr("opacity", 0);
        svg.select("#circle1").attr("opacity", 0);

        masked.selectAll("path.lineRegionsE")
        .data(regionsProjectedE)
        .join("path")
        .attr("class", "lineRegionsE lineRegions")
        .attr("id", d => d[0].replaceAll(" ", "-")+"E")
        .transition().duration(1000)
        .attr("opacity", 1)
        .attr("fill", "none")
        .attr("stroke", d=>regionEColorScale(d[0]))
        .attr("stroke-width", 2)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })

        masked.selectAll("path.lineRegionsP")
            .data(regionsProjectedP)
            .join("path")
            .attr("class", "lineRegionsP lineRegions")
            .attr("id", d => d[0].replaceAll(" ", "-")+"P")
            .transition().duration(1000)
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", d=>regionPColorScale(d[0]))
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })


        setTimeout(function() {
            svg.select("#label1")
                .transition().duration(100)
                .attr("opacity", 1)
                .text("Latin America")
            svg.selectAll(".lineRegions")
                .attr("stroke-width", 0.5);
            svg.select("#LATIN-AMERICA-AND-THE-CARIBBEANE").attr("stroke-width", 2);
            svg.select("#LATIN-AMERICA-AND-THE-CARIBBEANP").attr("stroke-width", 2);
        }, 1200);


    }

    if (response == 11) {

        svg.selectAll(".lineRegions").attr("opacity", 0).remove();
        svg.select("#label1").attr("opacity", 0)

        $("#text").html("Brazil is projected to grow until 2045 then decline at a higher rate")

        masked.selectAll("path.lineLAmericaP")
            .data(lAmericaGroupedP)
            .join("path")
            .attr("class", "lineLAmericaP line")
            .attr("id", d => d[0].replaceAll(" ","-")  + "_P")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", regionPColorScale("LATIN AMERICA AND THE CARIBBEAN"))
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })

        masked.selectAll("path.lineLAmericaE")
            .data(lAmericaGroupedE)
            .join("path")
            .attr("class", "lineLAmericaE line")
            .attr("id", d => d[0].replaceAll(" ","-") + "_E")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", regionEColorScale("LATIN AMERICA AND THE CARIBBEAN"))
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })


        yScale.domain([0, 250000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));


        masked.selectAll(".line")
            .transition().duration(1000)
            .attr("opacity", 1)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            });


        svg.select("#label1")
            .attr("opacity", 0)


        setTimeout(function () {

            svg.selectAll(".line")
                .attr("stroke-width", 0.5);

            svg.selectAll("#Brazil_P,#Brazil_E")
                .attr("stroke-width", 3);

            svg.select("#label1")
                .attr("x", xScale(2100))
                .attr("y", yScale(200000))
                .attr("opacity", 1)
                .text("Brazil")

        }, 500);

    }

    if (response == 12) {

        $("#text").html("Current and projected growth by region. Asia is projected to grow towards 2060 then start declining")

        svg.selectAll(".lineLAmericaE, .lineLAmericaP")
            .attr("opacity", 0)
            .remove();

        yScale.domain([0, 5500000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        svg.select("#label1")
            .attr("opacity", 0)
            .attr("x", xScale(2100))
            .attr("y", yScale(4800000))

        masked.selectAll("path.lineRegionsE")
        .data(regionsProjectedE)
        .join("path")
        .attr("class", "lineRegionsE lineRegions")
        .attr("id", d => d[0].replaceAll(" ", "-")+"E")
        .transition().duration(1000)
        .attr("opacity", 1)
        .attr("fill", "none")
        .attr("stroke", d=>regionEColorScale(d[0]))
        .attr("stroke-width", 2)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })

        masked.selectAll("path.lineRegionsP")
            .data(regionsProjectedP)
            .join("path")
            .attr("class", "lineRegionsP lineRegions")
            .attr("id", d => d[0].replaceAll(" ", "-")+"P")
            .transition().duration(1000)
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", d=>regionPColorScale(d[0]))
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })


        setTimeout(function() {
            svg.select("#label1")
                .transition().duration(100)
                .attr("opacity", 1)
                .text("Asia")
            svg.selectAll(".lineRegions")
                .attr("stroke-width", 0.5);
            svg.select("#ASIAE").attr("stroke-width", 2);
            svg.select("#ASIAP").attr("stroke-width", 2);
        }, 1200);


    }

    if (response == 13) {

        svg.selectAll(".lineRegions").attr("opacity", 0).remove();
        svg.select("#label1").attr("opacity", 0)

        $("#text").html("Pakistan is projected to grow until 2100")

        masked.selectAll("path.lineAsiaP")
            .data(asiaGroupedP)
            .join("path")
            .attr("class", "lineAsiaP line")
            .attr("id", d => d[0].replaceAll(" ","-")  + "_P")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", regionPColorScale("ASIA"))
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })

        masked.selectAll("path.lineAsiaE")
            .data(asiaGroupedE)
            .join("path")
            .attr("class", "lineAsiaE line")
            .attr("id", d => d[0].replaceAll(" ","-") + "_E")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", regionEColorScale("ASIA"))
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })


        yScale.domain([0, 1800000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));


        masked.selectAll(".line")
            .transition().duration(1000)
            .attr("opacity", 1)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            });


        svg.select("#label1")
            .attr("opacity", 0)


        setTimeout(function () {

            svg.selectAll(".line")
                .attr("stroke-width", 0.5);

            svg.selectAll("#Pakistan_P,#Pakistan_E")
                .attr("stroke-width", 3);

            svg.select("#label1")
                .attr("x", xScale(2100))
                .attr("y", yScale(500000))
                .attr("opacity", 1)
                .text("Pakistan")

        }, 500);

    }

    if (response == 14) {

        $("#text").html("Indonesia is projected to start delining around 2500")
        svg.selectAll(".line")
        .transition().duration(500)
        .attr("stroke-width", 0.5).on("end",function(){
            svg.selectAll("#Indonesia_P,#Indonesia_E")
            .transition().duration(500)
                .attr("stroke-width", 3);

        })

            

            svg.select("#label1")
            .transition().duration(1000)
                .attr("x", xScale(2100))
                .attr("y", yScale(300000))
                .attr("opacity", 1)
                .text("Indonesia")

    }

}


function wrap(text, width) {
    console.log("wrap")
    text.each(function () {
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