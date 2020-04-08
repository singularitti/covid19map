'use strict';

const states = require('./us-states.js').states;
const misc = require('./misc.js');

const chart = document.getElementById('chart');

function getData(jsonData, date, prop) {
    date = misc.prepareDate(date);
    let data = misc.groupByDate(jsonData);
    if (data.hasOwnProperty(date)) {
        let todayData = data[date];
        return todayData.map(x => misc.nullToNaN(x[prop]));
    }
    return null;  // TODO: This is not fixed
}

function newChart(dateYouWant, property) {
    Plotly.d3.json('https://covidtracking.com/api/states/daily', function (jsonData) {
        let data = [{
            x: states,
            y: getData(jsonData, dateYouWant, property),
            type: 'bar'
        }];
        let layout = {
            xaxis: {
                tickangle: -35,
            }
        };
        Plotly.newPlot(chart, data, layout);
    });
}

function updateChart(jsonData, date, prop) {
    let data = getData(jsonData, date, prop);
    if (data !== null) {
        chart.data[0].y = getData(jsonData, date, prop);
        Plotly.redraw(chart);
    }
}

exports.newChart = newChart;
exports.updateChart = updateChart;
exports.getData = getData;
