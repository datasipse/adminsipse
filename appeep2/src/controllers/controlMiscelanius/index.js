
$("#backRequiere").click(function(event){
    window.location.href="/helpme";
});
$("#irmenu").click(function(event){
    window.location.href="/menu";
  
});
$("#backtoRequerimiento").click(function(event){

    window.location.href="/menu";
  
});
$("#irEstrategia").click(function(event){

    window.location.href="/estrategias";
  
});

$(function () {
    $('#datetimepicker1').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: true,
        minDate: '01/15/2019',
        maxDate: 'now'
     });
});
$(function () {
    $('#datetimepicker2').datetimepicker({
        format: 'LT'
    });
});
$(function () {
    $('#datetimepicker3').datetimepicker({
        format: 'LT'
    });
});


(function(document) {
	'use strict';
    var LightTableFilter = (function(Arr) {
    var _input;
    function _onInputEvent(e) {
      _input = e.target;
      var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
      Arr.forEach.call(tables, function(table) {
        Arr.forEach.call(table.tBodies, function(tbody) {
        Arr.forEach.call(tbody.rows, _filter);
      });
    });
  }
  
  function _filter(row) {
	  var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
	  row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
  }
  return {
	  init: function() {
	  var inputs = document.getElementsByClassName('light-table-filter');
	  Arr.forEach.call(inputs, function(input) {
	  input.oninput = _onInputEvent;
  });
	}
	};
	})(Array.prototype);
	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			LightTableFilter.init();
		}
	});
})(document);