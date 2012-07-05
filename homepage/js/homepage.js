initialNavigation("#navigationDiv",".specialNavDiv","assets/cloudsBackground.jpg","navButtonLeft","navButtonRight");
 
function on_doc_ready()
{   
    $.getJSON('js/testimonials.json',
        function(json) {
            $(json.testimonials).each(function (i,testimonial)
                 {
                     var testimonialDiv = $(".testimonialDiv:first");
                     if(i>0){
                        testimonialDiv.clone().appendTo(testimonialDiv.parent());   
                     }
                     testimonialDiv.find(".testimonialQuote").html(testimonial.quote);
                     testimonialDiv.find(".testimonialAuthor").html(testimonial.author);
                     testimonialDiv.find(".testimonialTitle").html(testimonial.title);
                 });
            if(json.testimonials.length == 0)
                $(".testimonialDiv:first").remove();
        });
    
$.get("https://api.twitter.com/1/statuses/user_timeline.rss?screen_name=MadManMathew", function(data)
      {
          alert(data);
      }
);

}
$(document).ready(on_doc_ready);

