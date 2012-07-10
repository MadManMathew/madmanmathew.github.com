$("code").each(function(i,e){
  var codeHtml = $(e).html();
  codeHtml = codeHtml.replace(/([^\\])</g,'$1&lt;');
  codeHtml = codeHtml.replace(/([^\\]>/g,'$1&gt;');
  codeHtml = codeHtml.replace(/[\\]([\S]+)[\\]/g,'<$1>');
  $(e).html(codeHtml);
});
