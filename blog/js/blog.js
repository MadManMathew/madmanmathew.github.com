$("code").each(function(i,e){
  var codeHtml = $(e).html();
  codeHtml = codeHtml.replace(/([^\\]{1})</g,'$1&lt;');
  codeHtml = codeHtml.replace(/([^\\]{1})>/g,'$1&gt;');
  codeHtml = codeHtml.replace(/[\\]{1}</g,'<');
  codeHtml = codeHtml.replace(/[\\]{1}>/g,'>');
  $(e).html(codeHtml);
});
