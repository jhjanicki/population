const figure = d3.selectAll(".chart");

// console.log(figure.node().getBoundingClientRect())
let width = 1920 / 1.7;
//figure.node().getBoundingClientRect().width;
let height = 1080 / 1.7;
//figure.node().getBoundingClientRect().height;


const margin = {
    "top": 60,
    "left": 100,
    "bottom": 85,
    "right": 40
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



countries.forEach(function (d) {
    d.population = +d.population || 0;
    d.year = +d.year || 0;
    return d;
})


const countriesEstimates = countries.filter(d => d.year <= 2022);
const countriesProjections = countries.filter(d => d.year >= 2022); //medium projection

console.log(countriesEstimates)
console.log(countriesProjections)

const countriesGrouped = d3.group(
    countries,
    d => d.area
)

const countriesGroupedE = d3.group(
    countriesEstimates,
    d => d.area
)

const countriesGroupedP = d3.group(
    countriesProjections,
    d => d.area
)


//get high and low projections here

const high = world.filter(d => d.variant == "High")
const low = world.filter(d => d.variant == "Low")

console.log(high)
console.log(low)

//regions

const regionsProjected = d3.group(
    regions,
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





// const bread2021 = bread.filter(d => d.timestamp > parseTime("2021-07"))
// const bread2021Grouped = d3.group(
//     bread2021,
//     d => d.country
// )


// const zScale = d3.scaleSequential()
//     .domain([0, countriesGrouped.size])
//     .interpolator(d3.interpolateRainbow);

// const mapCountryToIndex = d3.scaleOrdinal().domain(countriesList).range([...Array(countriesGrouped.size).keys()]);



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

masked.selectAll("path.lineE")
    .data(countriesGroupedE)
    .join("path")
    .attr("class", "lineE line")
    .attr("id", d => d[0])
    .attr("opacity", 1)
    .attr("fill", "none")
    .attr("stroke", d => d[0] == "WORLD" ? "#636363" : "#bdbdbd")
    .attr("stroke-width", 2)
    .attr("d", d => {
        return d3.line()
            .curve(d3.curveCardinal)
            .x(d => xScale(d.year))
            .y(d => yScale(d.population) || 0)
            .defined((d => d.population))
            (d[1])
    })
    // .call(transition)

    g.append("text")
    .attr("id", "label1")
    .attr("x", xScale(2021))
    .attr("y", yScale(7800000))
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("opacity", 1)
    .attr("font-size", 20)
    .attr("dy", -10)
    .text("World")

    g.append("text")
    .attr("id", "label2")
    .attr("x", xScale(2021))
    .attr("y", yScale(1400000))
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("opacity", 1)
    .attr("font-size", 20)
    .attr("dy", -10)
    .text("Countries")

    


function transition(path,callback) {
    path.transition()
        .duration(3000)
        .attrTween("stroke-dasharray", tweenDash)
    .on("end", callback);
}

function tweenDash() {
    const l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function (t) { return i(t) };
}


function setLabelStep1(){
    svg.select("#label1")
    .attr("x", xScale(2100))
    .attr("y", yScale(10500000))
    .attr("opacity",1)
    .text("World, medium projection")

    svg.select("#label2")
    .attr("x", xScale(2100))
    .attr("y", yScale(1500000))
    .attr("opacity",1)
    .text("Countries, medium projection")

    //2079 around 10.4 billion peak
}


let step = 0;

$("#button").on("click", function () {
    handleStepEnter(step);
    step++;
})

function handleStepEnter(response) {

    if (response == 0) {

        $("#button").html("Next")
        $("#text").html("Population of various countries")

        yScale.domain([0, 1500000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        svg.select("#label1")
            .attr("opacity",0)


        svg.select("#label2")
            .attr("x", xScale(2021))
            .attr("y", yScale(1250000))
            .attr("opacity",0)

            setTimeout(function () {
                svg.select("#label1")
                .transition().duration(1000)
                .attr("opacity",1)
                .text("China")
    
    
            svg.select("#label2")
                .transition().duration(1000)
                .attr("opacity",1)
                .text("India")
        }, 1200);

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




      


    }



    if (response == 1) {

        $("#text").html("Projected world / country population until 2100")

        yScale.domain([0, 15000000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));

        xScale.domain([1950, 2100]);
        svg.select(".x-axis")
            .transition().duration(1000)
            .call(d3.axisBottom(xScale).tickFormat(d => +d));

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

        svg.select("#label1").attr("opacity",0);
        svg.select("#label2").attr("opacity",0);
            

        masked.selectAll("path.lineP")
            .data(countriesGroupedP)
            .join("path")
            .attr("class", "lineP line")
            .attr("id", d => d[0])
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
            .on("mouseover", (e, d, i) => {
                console.log(d)
            })
            .call(transition,setLabelStep1); 


    }

    if (response == 2) {

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

        svg.select("#label1").attr("opacity",0);


        yScale.domain([0, 2000000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));


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




        // setTimeout(function () {
        //     console.log("test")
        //     g.select("#Hungary").raise();
        //     g.select("#Hungary")
        //         .transition().duration(1000)
        //         .attr("stroke", zScale(mapCountryToIndex("Hungary")))
        //         .attr("stroke-width", 5)
        //         .on("end", function () {
        //             d3.select("#label")
        //                 .text("Hungary, 226.59")
        //                 .transition().duration(1000)
        //                 .attr("opacity", 1)
        //                 .attr("y", yScale(226.59))
        //         })

        // }, 1200);


    }


    if (response == 4) {

        svg.select("#label1").attr("opacity",0);

        yScale.domain([0, 3500000]);
        svg.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(yScale));


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

        masked.selectAll("path.lineRegions")
            .data(regionsProjected)
            .join("path")
            .attr("class", "lineRegions line")
            .attr("id", d => d[0])
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
