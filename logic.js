//Declare Variables
let geoJSON;
let fillColor = {}

// Store our API as url
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(url).then(function(data)  {
    let earthquakes = data.features;
    console.log(earthquakes)


//Building Map
let myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
});

//Adding a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',  {
    attribution: '&copy; <a href="https://www.opens//treetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//Add GeoJSON layer
L.geoJSON(earthquakes).addTo(myMap);

//Adding marker to the map with color and radius
function style (feature) {
    if (feature.geometry.coordinates[2] > 250){
        fillColor = "#9B59B6"
    }   else if (feature.geometry.coordinates[2]  > 200){
        fillColor = "#3498DB"
    }   else if (feature.geometry.coordinates[2]  > 150){
        fillColor = "#48C9B0"
    }   else if (feature.geometry.coordinates[2]  > 100){
        fillColor = "#F5B041"
    }   else if (feature.geometry.coordinates[2]  > 50){
        fillColor = "#F7DC6F"
    };
    return {fillColor: fillColor, radius: feature.properties.mag * 5, color: fillColor
}}
L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
    }, style: style,
//Adding pop up to each earthquake
    onEachFeature: function(feature, layer) {
        layer.bindPopup("</strong><br /><br />Place of the Earthquake: "+ feature.properties.place + "<br /><br />Magnitude of the Earthquake: "+ feature.properties.mag)
 
    },


}).addTo(myMap);

});
