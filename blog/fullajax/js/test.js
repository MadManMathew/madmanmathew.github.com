$("#jstest").append($("<div>/js/test.js JAVASCRIPT EXCUTED</div>"));

window.FullAjaxJS.onReady(function(){
$("#jstest").append($("<div>FullAjaxJS.onReady function 1 Works!</dvi>"));
});
window.FullAjaxJS.onReady(function(){
$("#jstest").append($("<div>FullAjaxJS.onReady funciton 2 Works!</dvi>"));
});


