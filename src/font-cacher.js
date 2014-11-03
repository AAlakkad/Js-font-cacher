/*!
 * Font Cacher v0.1 By Ammar Alakkad <am.alakkad@gmail.com> - http://aalakkad.me
 * License: MIT
 */

(function() {

    var FontCacher = function (fontPath, fontName) {
        if(typeof fontName === "undefined") {
            fontName = fontPath.substring(fontPath.lastIndexOf('/') + 1);
        }
        return new Library(fontPath, fontName);
    };

    var Library = function (fontPath, fontName) {
        try {
            if(! fontExists(fontName)) {
                getFont(fontPath, fontName);
            }
            insertFont(fontName);
        }
        catch (ex) {
            fallback(fontPath);
        }

        return this;
    };

    var fontExists = function(fontName) {
        return localStorage.getItem(fontName) !== null;
    };

    var insertFont = function (fontName) {
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        document.head.appendChild(style);
        style.textContent = localStorage.getItem(fontName);
    };

    var getFont = function (fontPath, fontName) {
        var request = new XMLHttpRequest();
        request.open('GET', fontPath, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                localStorage.setItem(fontName, request.responseText);
                insertFont(fontName);
            }
        };

        request.send();
    };

    var fallback = function(fontPath) {
        var ss = window.document.createElement( "link" );
        var ref = window.document.getElementsByTagName( "script" )[ 0 ];
        ss.rel = "stylesheet";
        ss.href = fontPath;
        ss.media = "all";
        ref.parentNode.insertBefore( ss, ref );
    };

    if(!window.FontCacher) {
        window.FontCacher = FontCacher;
    }
})();
