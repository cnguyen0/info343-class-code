/*
    app.js
    main script file for this mapping application
    source data URL: https://data.seattle.gov/resource/65fc-btcc.json
*/

$(function() { /* Document Ready Event */
    'use strict';

	var map = L.map('map').setView([47.6097, -122.3331], 12);
	var cameraGroup = L.layerGroup([]).addTo(map);

	L.tileLayer('https://api.tiles.mapbox.com/v4/cnguyen0.np5mbh4f/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY25ndXllbjAiLCJhIjoiY2lmeWtyZ3lrNTZpNHRnbHl2dzNwdzJheSJ9.fjYALbp2AU6sWkGJ0wXFEA#3/47.6097/-122.3331', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18
	}).addTo(map);
	// Creating the markers

	$.getJSON("https://data.seattle.gov/resource/65fc-btcc.json", function(data) {
		var washington = new L.layerGroup();
		var seattle = new L.layerGroup();

		placeMarkers(data);

		function placeMarkers(data) {
			seattle.clearLayers();
			washington.clearLayers();
			data.forEach(function(cam) {
		  		if (cam.ownershipcd == 'SDOT') {
			  		L.circleMarker([cam.location.latitude, cam.location.longitude], {
			  			color: '#4CA64C',
			  			opacity: 1
			  		})
					.addTo(map)
					.addTo(seattle)
					.bindPopup("<p>" + cam.cameralabel + "</p><img src="+cam.imageurl.url+">"),
					document.getElementById("SDOT").textContent = "" + seattle.getLayers().length + " by SDOT";
				} else {
			  		L.circleMarker([cam.location.latitude, cam.location.longitude], {
			  			color: '#9999FF',
			  			opacity: 1
			  		})
					.addTo(map)
					.addTo(washington)
					.bindPopup("<p>" + cam.cameralabel + "</p><img src="+cam.imageurl.url+">"),
					document.getElementById("WSDOT").textContent = washington.getLayers().length + " by WSDOT";
				}
	  		});
	  	}

	    var camFilter = document.getElementById('cam-filter');
	    camFilter.addEventListener('keyup', function() {
	    	$('g').html('');
	        var filter = this.value.toLowerCase();
	        var filteredCam = data.filter(function(camLocation) {
	            return camLocation.cameralabel.toLowerCase().indexOf(filter) >= 0;
	        });
	        placeMarkers(filteredCam);
	    });
	});
});