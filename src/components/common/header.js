"use strict";

var React = require('react');
var createClass = require('create-react-class');


var Header = createClass({
    render: function () {
        return (
            <div className="container head" >
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img className="logoimage" src="images/newlogo.png" />
                        </a>
                        
                            <ul className="nav navbar-nav navbar-center">
                                <li className="nav home">Home</li>
                                <li className="nav about">About</li>
                            </ul>
                    
                    </div>
                </nav>
            </div>
        );
    }
});

module.exports = Header;