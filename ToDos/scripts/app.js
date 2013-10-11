(function (global) {
    var mobileSkin = "",
        app = global.app = global.app || {};

    document.addEventListener("deviceready", function () {
        app.application = new kendo.mobile.Application(document.body, { layout: "lists-template" });
        bindCompassEvents();
    }, false);

    app.changeSkin = function (e) {
        if (e.sender.element.text() === "Flat") {
            e.sender.element.text("Native");
            mobileSkin = "flat";
        }
        else {
            e.sender.element.text("Flat");
            mobileSkin = "";
        }

        app.application.skin(mobileSkin);
    };
    
     document.addEventListener("online", onOnline, false);
    
     document.addEventListener("offline", onOffline, false);
    
     function onOffline() {
        navigator.notification.vibrate(3000);
    }
    
    function onOnline() {
        navigator.notification.vibrate(1000);
    }
    
    function bindCompassEvents() {
    navigator.compass.watchHeading(
        compassHeadingRetrieved,
        null, {
            frequency: 1000
        });
    }

    function compassHeadingRetrieved(heading) {
        console.log(heading.magneticHeading);
        var colorStr = "hsl("+heading.magneticHeading+",96%, 45%)";
        $('div').css('background', colorStr);
        console.log($('div').css('background'));
    }

})(window);