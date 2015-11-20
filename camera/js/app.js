
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia 
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia 
                            || navigator.msGetUserMedia;

    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var snapshot = document.querySelector('img');
    var ctx = canvas.getContext('2d');
    var videoStream;

    navigator.getUserMedia({video: {width: 500, height:500}}, function(stream) {
        videoStream = stream;
        video.src = window.URL.createObjectURL(stream);
    }, function(err) {
        console.error(err);
    });

    video.addEventListener('click', function() {
       if (videoStream) {
           canvas.width = video.clientWidth;
           canvas.height = video.clientHeight;
           ctx.drawImage(video, 0, 0);
       }
    });

    var truth = false;

    document.addEventListener('mousedown', function(evt) {
        var canvasY = evt.clientY - canvas.offsetTop;
        //properties evt.clientX evt.clientY

        ctx.beginPath();
        ctx.moveTo(evt.clientX,canvasY);
        ctx.stroke();
        truth = true;

        document.addEventListener('mouseup', function(evt) {
            truth = false;
            snapshot.src = canvas.toDataURL();
        });

        document.addEventListener('mousemove', function(evt) {
            var canvasY = evt.clientY - canvas.offsetTop;
            if (truth) {
                ctx.strokeStyle = (document.getElementById('line-color-inp')).value;
                ctx.lineTo(evt.clientX,canvasY);
                ctx.stroke();
            }
        });
    });

    document.querySelector('#btnSnapshot').addEventListener('click', function() {
        snapshot.src = canvas.toDataURL();
    })
});

