define([], function() {

    "use strict";

    return function () {
        var doughnutID;
        var doughnutObject;
        var chartStatus;
        var ordinalPosition;
        var totalScore;
        var data;
        return {
            setDoughnutID: function (doughnutID, ordinalPosition, data) {
                this.doughnutID = doughnutID;
                this.doughnutObject = {};
                this.chartStatus = true;
                this.ordialPosition = ordinalPosition;
                this.totalScore = 0;
                this.data = data;
            }
        }
    }
});
