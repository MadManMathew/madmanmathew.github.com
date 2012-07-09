$("code").each(function(i,e){
  var codeHtml = $(e).html();
  codeHtml = codeHtml.replace(/</g,'&lt;');
  codeHtml = codeHtml.replace(/>/g,'&gt;');
  $(e).html(codeHtml);
});
