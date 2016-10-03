define([], function() {
    return function () {
        var opValue;
        var totalValue;
        var scorerID;
        var disabledBool;
        var tooltipBool;
        var timesValue;
        //var setscorerValue;
        return {
            setscorerID: function (scorerID, numberOfElements) {
                this.opValue = 0;
                this.totalValue = 0;
                this.scorerID = scorerID;
                this.disabledBool = false;
                this.tooltipBool = false;
                this.overscrollStatus = false;
                this.setScorerValue = 0;
                this.timesValue = 100 / numberOfElements;
            },
            setValues: function (scorerValue, buttonValue) {
                //this.setScorerValue = this.setScorerValue * this.timesValue;
                var tmpTotal = this.setScorerValue * this.timesValue;
                this.totalValue = buttonValue * tmpTotal;
            }
        };
    }
});