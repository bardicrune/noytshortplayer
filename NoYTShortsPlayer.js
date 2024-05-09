// ==UserScript==
// @name         Youtube shorts in normal player
// @namespace    http://www.w3.org/1999/xhtml
// @version      0.3
// @description  Watch youtube shorts in normal player
// @author       Bardicrune
// @match        *://youtube.com/*
// @match        *://*.youtube.com/*
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    function main(){
      var links,thisLink;
      links = document.evaluate("//a[@href]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

      for (var i=0;i<links.snapshotLength;i++) {
        thisLink = links.snapshotItem(i);
        //console.log(thisLink.href);
        thisLink.href = thisLink.href.replace(RegExp('/shorts/(.*)'),'/watch\?v=$1');
        //console.log(thisLink.href);
      };
    };
    function findScroller(element) {
      element.onscroll = function() {
        if (sH !== undefined) {
            var prev_sH = sH;
            };
        var sH = element.parentNode.scrollHeight;
        //console.log('sH = ' + sH)
        //console.log(element.parentNode);

        if (prev_sH !== undefined) {
          if (sH > prev_sH ) { main() };
        } else { main() };
    };

    Array.from(element.children).forEach(findScroller);
    };

    findScroller(document.body);
    setTimeout(main, 1000);
})();
