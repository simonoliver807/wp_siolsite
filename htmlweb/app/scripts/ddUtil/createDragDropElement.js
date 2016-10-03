"use strict"

define([], function() {

	"use strict";

	return function () {
	    var e_id;
	    var droppedBool;
	    var elXYpos;
	    var labelXYpos;
	    var labelName;
	    var label_id;
	    var e_cont_id;
	    var setReset;
	    var isNew;
	    var labelReplacedBy;
	    return {
	        init: function (e_id, data, label_id, e_cont_id, isNew, labelReplacedBy, dragElements) {

	            if (e_id) { this.id = e_id; } else { this.id = label_id; }
	            this.e_id = e_id;
	            this.labelName = data.labelName;
	            this.label_id = label_id;
	            this.e_cont_id = e_cont_id;
	            this.isNew = isNew;
	            this.labelReplacedBy = labelReplacedBy;
	            this.setReset = false;
	            this.elXYpos = { x: data.x, y: data.y };
	            this.labelXYpos = { x: data.e_x, y: data.e_y };
	            this.makeDraggable();
	            this.setDragEl(dragElements);
	        },
	        makeDraggable: function () {
	        	var self = this;
	            $('#' + this.id)
	            .draggable({
	                cursor: 'default',
	                drag: function (event, ui) {
	                    var dragID = $(ui.helper).attr('id');
	                    var dragNumber = dragID.split('_');
	                    dragNumber = dragNumber[1];
	                    var labelElement = document.getElementById('label_' + dragNumber);
	                    if (labelElement) {
	                        self.drawLine(dragNumber, '', true);
	                    }
	                    $('.rightClickMenu').css('display', 'none');
	                },
	                stop: function (event, ui) {
	                	var dragElements = self.getDragEl();
	                    var dragID = $(ui.helper).attr('id');
	                    $(ui.target).removeClass('dragDropLabelHover');
	                    for (var i = 0; i < dragElements.length; i++) {
	                        if (dragElements[i].e_id == dragID) {
	                            droppedBool = dragElements[i].getDroppedBool();
	                            if (!droppedBool) {
	                                dragElements[i].resetLabel();
	                            }
	                        }
	                    }
	                }
	            });
	        },
	        setDroppedBool: function (bool) {
	            this.droppedBool = bool;
	        },
	        getDroppedBool: function () {
	            return this.droppedBool;
	        },
	        resetLabel: function () {
	            $('#' + this.label_id).remove()
	            var lineDiv_id = this.e_id.split('_');
	            lineDiv_id = lineDiv_id[1];
	            $('#lineDiv' + lineDiv_id).remove();
	            $('#' + this.e_id).remove();
	            if (this.isNew) {
	                $('#' + this.e_cont_id).append('<div id="' + this.e_id + '" class="dragDropLabelRed">' + this.labelName + '</div>');
	            }
	            else {
	                $('#' + this.e_cont_id).append('<div id="' + this.e_id + '" class="dragDropLabelBlack"><div>' + this.labelName + '</div><div class="labelReplacedBy">' + this.labelReplacedBy + '</div></div>');
	            }
	            this.makeDraggable();
	            this.setDroppedBool(false);
	            this.resetPostions();
	        },
	        setPositions: function (elXY, labelXY) {
	            this.elXYpos = elXY;
	            this.labelXYpos = labelXY;
	        },
	        resetPostions: function () {
	            this.elXYpos.x = -1;
	            this.elXYpos.y = -1;
	            this.labelXYpos.x = -1;
	            this.labelXYpos.y = -1;
	        },
	        drawLine: function (lineNumber, isNew, redraw) {
			    if (!redraw) {
			        if (isNew) { var lineClass = 'lineStyleRed'; }
			        else { var lineClass = 'lineStyleBlack'; }
			    }
			    var thickness = 1;
			    var off1 = $('#e_' + lineNumber).position();
			    var off2 = $('#label_' + lineNumber).position();
			    var x1 = off1.left;
			    var y1 = off1.top;
			    var x2 = off2.left;
			    var y2 = off2.top;
			    // distance
			    var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
			    // center
			    var cx = ((x1 + x2) / 2) - (length / 2);
			    var cy = ((y1 + y2) / 2) - (thickness / 2);
			    // angle
			    var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
			    // make hr
			    if (!redraw) {
			        var htmlLine = '<div id="lineDiv' + lineNumber + '" class="' + lineClass + '" style="left:' + cx + 'px; top:' + cy + 'px; width:' + length + 'px; -moz-transform:rotate(' + angle + 'deg); -webkit-transform:rotate(' + angle + 'deg); -o-transform:rotate(' + angle + 'deg); -ms-transform:rotate(' + angle + 'deg); transform:rotate(' + angle + 'deg);" />';
			        $('#dropWrapper').append(htmlLine);
			    }
			    else { $('#lineDiv' + lineNumber).css({ left: cx + 'px', top: cy + 'px', width: length + 'px', transform: 'rotate(' + angle + 'deg)' }); }
			},
			setDragEl: function(dragElements){
				this.dragElements = dragElements;
			},
			getDragEl: function(dragElements){
				return this.dragElements;
			}
    	}
    }
});