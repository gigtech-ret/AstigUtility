(function(){
    'use strict';

    angular
        .module('lbNgUtilities')
        .run([function(){

            //To Title Case
            String.prototype.toTitleCase = function(){
                return this.replace(/\w\S/g, function(t) { return t.toUpperCase() });
            }

            //To Sentence Case
            String.prototype.toSentenceCase = function(){
                return this.replace(/[a-z]/i, function (letter) {
                    return letter.toUpperCase();
                }).trim();
            }
        }])
})();