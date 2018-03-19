"use strict";
var React = require('react');
var createReactClass = require('create-react-class');
var request = require('superagent');

var VideoList = createReactClass({

    display: function () {
        request.post('/getdata')
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.log('Oh no! err');
                } else {
                    var response = JSON.parse(res.text);
                    console.log(response);
                    var i;
                    var pathArr = [];
                    var nameArr = [];

                    for (i = 0; i < response.length; i++) {
                        pathArr[i] = response[i].videourl;
                        nameArr[i] = response[i].name;
                    }

                    var displayItem = "<div className=\"container\">";

                    for (var m in nameArr) {
                        var k = parseInt(m);
                        var n = k + 1;
                        displayItem += "<div class='text-center'><a href='#'><h3>" + n + ") " + nameArr[m].toString() + "</h3></a></div>";
                    }

                    displayItem += "</div>";
                    document.getElementById("vdlist").innerHTML = displayItem;
                }
            });
    },
    render: function () {
        return (
            <div className="container center-block vlsection1">
                {this.display()}
                <h1 className="text-center">Videos</h1>
                <div id="vdlist">

                </div>
            </div>
        );
    }

});


module.exports = VideoList;