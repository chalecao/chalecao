function loadjs(c,d){var a=document.createElement("script");a.async=!0;a.type="text/javascript";a.src=c;a.charset=d||"gbk";(document.getElementsByTagName("HEAD")[0]||document.getElementsByTagName("BODY")[0]).appendChild(a)};
var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");

function load_random_posts(obj){
  if (!obj) return;
  var count = $(obj).attr('data-count') || 6;
  arr = site.posts.slice();
  for (var i, tmp, n = arr.length; n; i = Math.floor(Math.random() * n), tmp = arr[--n], arr[n] = arr[i], arr[i] = tmp);
  arr = arr.slice(0,count);
  var html = '<ul class="list-group">';
  $.each(arr,function(index,item){html += '<li class="list-group-item"><a href="'+site.BASE_URI+ item.uri + '">' + (item.title || item.uri) + '</a></li>';});
  $(obj).html(html + '</ul>');
}

jQuery(document).ready(function($){
//  $('body').on(
//    {mouseover:function(e){
//      this.myTitle = this.title || this.innerText;
//      this.myHref = decodeURI(this.href);
//      this.title = "";
//      var tooltip = "<div id='tooltip'><p>"+this.myTitle+"<em>"+this.myHref+"</em>"+"</p></div>";
//      $('body').append(tooltip);
//      $('#tooltip').css({"opacity":"0.8","top":(e.pageY+20)+"px","left":(e.pageX-10)+"px"}).show('fast');},
//    mouseout:function(){this.title = this.myTitle;$('#tooltip').remove();},
//    mousemove:function(e){$('#tooltip').css({"top":(e.pageY+20)+"px","left":(e.pageX-10)+"px"})}
//    },'a[href][href!="#"]');
  $('.content p:first-child').addClass("fp");
  $('.ajax_widgets').each(function(){var src=$(this).attr('data-src');if(src)$(this).load(site.BASE_URI + 'widgets/'+src+'.html');});
  $.each(_js2load,function(index,obj){loadjs(obj.src,obj.charset)});
  $('.hexo_random_posts').each(function(){
    var c=this;
    if (!site.posts || !site.posts.length) $.getJSON(site.BASE_URI + 'js/posts.js',function(json){site.posts = json;load_random_posts(c)});
    else load_random_posts(c);
  });
  $('.nav>li').click(function(){
    if ($(this).attr('id') == 'show_all_contents'){
      $('.tab-content div').removeClass();
    }else if ($('.nav-pills #show_all_contents').hasClass('active')){
      $('.tab-content div').addClass('tab-pane fade');
    }
  });
  $('#toc').on('activate.bs.scrollspy', function () {
    console.log('test');
  })
  $('#toc').addClass("nav nav-pills navbar-fixed-bottom navbar-inverse")//.affix({
//    offset: {top: 100, bottom: function () {this.bottom = $('.entry').outerHeight(true);console.log(this.bottom);return 4460;}}
//  });

    $(".hm-menu").click(function(){
        if($(".hm-menu-left-container").hasClass('zhankai')){
            $('.hm-menu-left-container').removeClass('zhankai').addClass("shouqi");
            $(".collapse").hide();
            $('#content').removeClass('zhankai_hou').removeClass('zhankai').addClass("shouqi");
            $('#headflash').removeClass('zhankai').addClass("shouqi");
            $('#footer').removeClass('zhankai').addClass("shouqi");
            $(".hm-menu").removeClass('fa-mail-reply-all').addClass('fa-bars');
            $('.hm-logo').removeClass('hm-logo-zhankai');
            setTimeout(function(){
                $('#content').removeClass('shouqi');
            },600);
        }else{
            $('.hm-menu-left-container').removeClass('shouqi').addClass('zhankai');
            $(".collapse").show();
            $('#content').removeClass('shouqi').addClass('zhankai');
            $('#headflash').removeClass('shouqi').addClass('zhankai');
            $('#footer').removeClass('shouqi').addClass('zhankai');
            $(".hm-menu").removeClass('fa-bars').addClass('fa-mail-reply-all');
            $('.hm-logo').addClass('hm-logo-zhankai');
            setTimeout(function(){
                $('#content').addClass('zhankai_hou');
                $('#content').removeClass('zhankai');
            },600);
        }

    });
    $(window).resize(function() {
        $("figure").each(function(j,k){$(k).find('.code pre').css({width:$(k).width()})});
    });
    $("figure").each(function(j,k){$(k).find('.code pre').css({width:$(k).width()})});

    var str = "<dl id='outline'></dl>";var ss = $(str);$('h3').each(function(a,b){ss.append('<dd class="sideCatalog-item2" id="sideToolbar-item--1_3"><span class="sideCatalog-index2">'+ a +'</span><a href="#'+ $(b).attr("id") +'" class="nslog:1026" title="'+ $(b).attr("id") +'" onclick="return false;">'+$(b).attr("id")+'</a><span class="sideCatalog-dot"></span></dd>');});$("#sidebar").append(ss);

    window.top_outline = $("#outline").offset().top;
    $(window).scroll(function () {
        if((window.top_outline +318 - $(window).scrollTop()) <=  ($(window).height()/2 - $("#outline").height()/2)){
            $("#outline").css({'position':'fixed'});
            $("#outline").css({'margin-top':'0px'});
        }else{
            $("#outline").css({'position':'relative'});
            $("#outline").css({'margin-top':'80px'});
        }
        $("#outline a").each(function(a,b){
            if($(window).scrollTop() > $($(b).attr("href")).offset().top){
                $(b).css({"color":"#fb6580"});
            }else{
                $(b).css({"color":"#67a9d2"});
            }

        })
    });
    $("#outline a").click(function(){
        $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $body.animate({scrollTop: $($(this).attr("href")).offset().top}, 1000);
    });
    $('.floatnone').each(function(){$(this).parent().css({"float":'none'})})
})
$(document).ready(function(){
    NProgress.start();
})
$(window).load(function(){
    NProgress.done();
})
$(function(){
    $("#taobao_group1").hide();
    $("#taobao_group2").fadeIn(500);
    setInterval(function(){
        if($("#taobao_group1").is(":visible")){
            $("#taobao_group1").hide();
            $("#taobao_group2").fadeIn(500);
        }else{
            $("#taobao_group2").hide();
            $("#taobao_group1").fadeIn(500);
        }

    },5000)
})