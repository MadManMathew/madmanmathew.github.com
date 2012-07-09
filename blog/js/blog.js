$("code").each(function(i,e){
  var codeHtml = $(e).html();
    alert(codeHtml);
  codeHtml = codeHtml.replace(/</g,'&lt;');
  codeHtml = codeHtml.replace(/>/g,'&gt;');
  $(e).html(codeHtml);
    alert(codeHtml);
});
