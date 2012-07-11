$("code").each(function(i,e){
  var codeHtml = $(e).html();
  codeHtml = codeHtml.replace(/</g,'&lt;');
  codeHtml = codeHtml.replace(/>/g,'&gt;');
  codeHtml = codeHtml.replace(/[\\]{1}([\S]+)[\\]{1}/g,'<$1>');
  $(e).html(codeHtml);
});
