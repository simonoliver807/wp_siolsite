define([], function () {

    "use strict";

    return function () {
    	var buttonValue;
        var buttonID;
        var buttonUpdateID;
        var disabledBool;
        return {
            setButtonID: function (buttonID) {
                this.buttonID = buttonID;
                this.buttonUpdateID = buttonID;
                this.disabledBool = false;
                this.buttonValue = 1;
            },
            //getButtonID: function (){
            //    return this.buttonID;
            //},
            setButtonValue: function () {
                if (this.buttonValue === 5) { this.buttonValue = 1; }
                else { this.buttonValue += 1; }
            }
        };
    }
});