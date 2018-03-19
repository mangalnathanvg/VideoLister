/*eslint-disable strict */

var createClass = require('create-react-class');
var React = require('react');
var Header = require('./common/header');
var VideoList = require('./videos/videoList');
$ = jQuery = require('jquery');


var App = createClass({
    render: function () {
        return (
            <div>
                <div className="container">
                    <Header />
                </div>
                <VideoList />



            </div>
        );
    }
});

module.exports = App;