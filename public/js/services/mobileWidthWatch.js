
/*
    This service implements the observer pattern so
    controllers can register callbacks for when the
    window width passes the mobile breakpoint.

    Callbacks will receive true or false as a parameter
    for whether the window width is mobile width or not, respectively.
*/


var $ = require("../../bower_components/jquery/dist/jquery.js");

module.exports = function() {

    var mobileBreakpoint = 768;

    var mobileCallbacks = [];

    // must have init value, gets overriden if necessary by setMobileWidth();
    var isMobileWidth = false;
    setMobileWidth();
    

    
    function notifyMobileCallbacks(mobileWidth) {
        mobileCallbacks.map(function(func) {
            func(mobileWidth);
        })
    }
    
    function findMobileCallback(callback) {
        mobileCallbacks.map(function(func, index) {
            if(callback === func) {
                return func;
            }
        })
        return false;
    }


    /*
        sets private variable and calls registered callbacks with either
        true or false.
    */
    function setMobileWidth() {
        if($(window).width() <= mobileBreakpoint) {
            if(isMobileWidth == false) {
                isMobileWidth = true;
                notifyMobileCallbacks(isMobileWidth);
            }
        } else {
            if(isMobileWidth == true) {
                isMobileWidth = false;
                notifyMobileCallbacks(isMobileWidth);
            }
        }
    }

    $(window).resize(function() {
        setMobileWidth();
    })
    
    return {
        isMobileWidth: function() {
            return isMobileWidth;
        },
        addMobileCallback: function(callback) {
            if(findMobileCallback(callback)) {
                console.log("ERROR: Mobile callback already registered!");
            } else {
                mobileCallbacks.push(callback);
            }
        },
        removeMobileCallback: function(callback) {
            // will return truthy if found
            if(findMobileCallback(callback)) {
                mobileCallbacks.splice(index, 1);
            }
        }
    }
}
