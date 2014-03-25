function draw_barchart(element, data) {
	// function draw_barchart(div, data) {
	var x = d3.scale.linear().domain([ 0, d3.max(data) ]).range(
			[ "0px", "420px" ]);

	var chart = d3.select(element);

	chart.selectAll("div").data(data).enter().append("div").style("width", x)
			.text(function(d) {
				return d;
			});
};

function draw_svg_barchart() {
	var data = [ 4, 8, 15, 16, 23, 42 ];

	var width = 420, barHeight = 20;

	var x = d3.scale.linear().domain([ 0, d3.max(data) ]).range([ 0, width ]);

	var chart = d3.select("#svgBarsGraph").attr("width", width).attr("height",
			barHeight * data.length);

	var bar = chart.selectAll("g").data(data).enter().append("g").attr(
			"transform", function(d, i) {
				return "translate(0," + i * barHeight + ")";
			});

	bar.append("rect").attr("width", x).attr("height", barHeight - 1);

	bar.append("text").attr("x", function(d) {
		return x(d) - 3;
	}).attr("y", barHeight / 2).attr("dy", ".35em").text(function(d) {
		return d;
	});
};

function draw_svg_rotated_barchart() {
	var data = [ 14, 1, 5, 6, 21, 23, 43, 42, 13, 34 ];
	var width = 960, height = 500;
	var barWidth = width / data.length;

	var y = d3.scale.linear().domain([ 0, d3.max(data) ]).range([ height, 0 ]);

	var chart = d3.select("#svgRotatedGraph").attr("width", width).attr(
			"height", height);

	var bar = chart.selectAll("g").data(data).enter().append("g").attr(
			"transform", function(d, i) {
				return "translate(" + i * barWidth + ",0)";
			});

	bar.append("rect").attr("y", function(d) {
		return y(d);
	}).attr("height", function(d) {
		return height - y(d);
	}).attr("width", barWidth - 1);

	bar.append("text").attr("x", barWidth / 2).attr("y", function(d) {
		return y(d) + 3;
	}).attr("dy", ".75em").text(function(d) {
		return d;
	});
}

function draw_svg_rotated_barchart_with_bars() {
	var data = [ {
		letter : "A",
		frequency : .08167
	}, {
		letter : "B",
		frequency : .01492
	}, {
		letter : "C",
		frequency : .02782
	}, {
		letter : "D",
		frequency : .04253
	}, {
		letter : "E",
		frequency : .12702
	}, {
		letter : "F",
		frequency : .02288
	}, {
		letter : "G",
		frequency : .02015
	}, {
		letter : "H",
		frequency : .06094
	}, {
		letter : "I",
		frequency : .06966
	} ];

	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 40
	}, width = 960 - margin.left - margin.right, height = 500 - margin.top
			- margin.bottom;

	var x = d3.scale.ordinal().rangeRoundBands([ 0, width ], .1);

	var y = d3.scale.linear().range([ height, 0 ]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");

	var svg = d3.select("#graphContainer").append("svg").attr("width",
			width + margin.left + margin.right).attr("height",
			height + margin.top + margin.bottom).append("g").attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	x.domain(data.map(function(d) {
		return d.letter;
	}));
	y.domain([ 0, d3.max(data, function(d) {
		return d.frequency;
	}) ]);

	svg.append("g").attr("class", "x axis").attr("transform",
			"translate(0," + height + ")").call(xAxis);

	svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr(
			"transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style(
			"text-anchor", "end").text("Frequency");

	svg.selectAll(".bar").data(data).enter().append("rect")
			.attr("class", "bar").attr("x", function(d) {
				return x(d.letter);
			}).attr("width", x.rangeBand()).attr("y", function(d) {
				return y(d.frequency);
			}).attr("height", function(d) {
				return height - y(d.frequency);
			});
}

function dinamicData() {
	var t = 1297110663, // start time (seconds since epoch)
	v = 70, // start value (subscribers)
	data = d3.range(33).map(next); // starting dataset

	function next() {
		return {
			time : ++t,
			value : v = ~~Math.max(10, Math.min(90, v + 10
					* (Math.random() - .5)))
		};
	}

	setInterval(function() {
		data.shift();
		data.push(next());
		basicRedraw();
	}, 1500);

	function basicRedraw() {
		chart.selectAll("rect").data(data).transition().duration(1000).attr(
				"y", function(d) {
					return h - y(d.value) - .5;
				}).attr("height", function(d) {
			return y(d.value);
		});
	}

	var w = 20, h = 80;

	var x = d3.scale.linear().domain([ 0, 1 ]).range([ 0, w ]);

	var y = d3.scale.linear().domain([ 0, 100 ]).rangeRound([ 0, h ]);

	var chart = d3.select("#svgDinamicData").append("svg").attr("class",
			"chart").attr("width", w * data.length - 1).attr("height", h);

	chart.selectAll("rect").data(data).enter().append("rect").attr("x",
			function(d, i) {
				return x(i) - .5;
			}).attr("y", function(d) {
		return h - y(d.value) - .5;
	}).attr("width", w).attr("height", function(d) {
		return y(d.value);
	});

	chart.append("line").attr("x1", 0).attr("x2", w * data.length).attr("y1",
			h - .5).attr("y2", h - .5).style("stroke", "#000");
}

function dinamicData2() {
	var t = 1297110663, // start time (seconds since epoch)
	v = 70, // start value (subscribers)
	data = d3.range(33).map(next); // starting dataset

	function next() {
		return {
			time : ++t,
			value : v = ~~Math.max(10, Math.min(90, v + 10
					* (Math.random() - .5)))
		};
	}

	setInterval(function() {
		data.shift();
		data.push(next());
		redraw();
	}, 1500);

	function redraw() {

		var rect = chart.selectAll("rect").data(data, function(d) {
			return d.time;
		});

		rect.enter().insert("rect", "line").attr("x", function(d, i) {
			return x(i + 1) - .5;
		}).attr("y", function(d) {
			return h - y(d.value) - .5;
		}).attr("width", w).attr("height", function(d) {
			return y(d.value);
		}).transition().duration(1000).attr("x", function(d, i) {
			return x(i) - .5;
		});

		rect.transition().duration(1000).attr("x", function(d, i) {
			return x(i) - .5;
		});

		rect.exit().transition().duration(1000).attr("x", function(d, i) {
			return x(i - 1) - .5;
		}).remove();

	}

	var w = 20, h = 80;

	var x = d3.scale.linear().domain([ 0, 1 ]).range([ 0, w ]);

	var y = d3.scale.linear().domain([ 0, 100 ]).rangeRound([ 0, h ]);

	var chart = d3.select("#graphContainer").append("svg").attr("class",
			"chart").attr("width", w * data.length - 1).attr("height", h);

	chart.selectAll("rect").data(data).enter().append("rect").attr("x",
			function(d, i) {
				return x(i) - .5;
			}).attr("y", function(d) {
		return h - y(d.value) - .5;
	}).attr("width", w).attr("height", function(d) {
		return y(d.value);
	});

	chart.append("line").attr("x1", 0).attr("x2", w * data.length).attr("y1",
			h - .5).attr("y2", h - .5).style("stroke", "#000");
}

function drawDonut() {
	var cScale = d3.scale.linear().domain([ 0, 100 ]).range([ 0, 2 * Math.PI ]);

	data = [ [ 0, 50, "#AA8888" ], [ 50, 75, "#88BB88" ],
			[ 75, 100, "#8888CC" ] ]

	var vis = d3.select("#svgDonutChart");

	var arc = d3.svg.arc().innerRadius(50).outerRadius(100).startAngle(
			function(d) {
				return cScale(d[0]);
			}).endAngle(function(d) {
		return cScale(d[1]);
	});

	vis.selectAll("path").data(data).enter().append("path").attr("d", arc)
			.style("fill", function(d) {
				return d[2];
			}).attr("transform", "translate(300,200)");
}