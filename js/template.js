function on_doc_ready()
 {
    addTemplate();
    resize_template();
}

function addTemplate()
 {
    $('body').append('<div id="bod">\
			<div id="headerPanel">\
				<div id="codeFoo">\
					<a href="index.html" style="text-decoration:none;">\
						<p style="text-align:center;margin:0;">\
							<span id="codeText">Code</span>\
							<span id="fooText">FOO</span>\
						</p>\
					</a>\
				</div>\
			</div>\
			<div id="menu">\
				<table width="80%" style="height:inherit;margin:auto;text-align:center">\
					<tr id="menuTr">\
					</tr>\
				</table>\
			</div>\
			<div id="midborder">\
				<div id="mid">\
					<div id="leftPanel">\
					</div>\
					<div id="mainContent">\
					</div>\
				</div>\
			</div>\
		</div>');
	for(i = 1; i <= 5; i++)
	{
		$('#menuTr').append('<td ><a class="menua" href="'+(i<=3?'question'+i:'bonus'+(i-3)) + '.html" class="menua">'+(i<=3?'Question'+i:'Bonus'+(i-3)) + '</a></td>');
	}
	$('.menua').each(function (i,e)
	{
		if(window.location.pathname.indexOf($(e).attr('href'))>-1)
			$(e).css('color','#FFFFFF');
	}); 
    $('#answer').appendTo('#mainContent');
    $('#question').appendTo('#leftPanel');



}

function resize_template()
 {
    var bodyHeight = $(window).height() * .95;
    bodyHeight = bodyHeight > 600 ? bodyHeight: 600;
    $('#bod').height(bodyHeight);
    $('#midborder').height(bodyHeight * .78);
    $('#headerPanel').height(bodyHeight * .16);
    $('#menu').height(bodyHeight * .06);

    $('#codeText, #fooText').css("font-size", ($('#headerPanel').height() * .8) + 'px');

}
$(document).ready(on_doc_ready);
$(window).resize(resize_template);
