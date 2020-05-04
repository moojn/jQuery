// / <reference path="jquery/jquery.d.ts" />
$(function()
{
    //滚动条
    $(".left_list").mCustomScrollbar();
    var $audio=$("audio");
    var audio=$audio.get(0);
    var player=new Player($audio,audio);
    var $progess_line=$(".progess_line");
    var $progess_over=$(".progess_line_over");
    var $progess_dot=$(".progess_dot");
    var progess=new Progess($progess_line,$progess_over,$progess_dot);
    var $voice_line=$(".voice_line");
    var $voice_over=$(".voice_line_over");
    var $voice_dot=$(".voice_dot");
    var voice=new Voice($voice_line,$voice_over,$voice_dot);
    var words;
    
    //获取创建音乐列表函数
    creatMusic();
    function creatMusic ()
    {
        $.ajax({
            url:"source/musiclist.json",
            dateType:"json",
            success:
             //遍历数组，创建音乐
            function(date)
            {
                 player.musicList=date;
                $.each(date,function(index,element){
                   var $music=$('<li class="list_contain" >'+
                    '<div class="list_check "><i></i></div>'+
                    '<div class="list_number">'+(index+1)+'</div>'+
                    '<div class="list_name">'+element.name+'<div class="list_menu">'+
                        '<a href="javascript:;" title="播放" class="list_play"></a>'+
                        '<a href="javascript:;" title="添加"></a>'+
                        '<a href="javascript:;" title="下载"></a>'+
                        '<a href="javascript:;" title="分享"></a>'+
                        '</div>'+
                    '</div>'+
                    '<div class="list_singer"><a href="javascript:;">'+element.singer+'</a></div>'+
                    '<div class="list_time"><span>'+element.time+'</span>'+
                    '<a href="javascript:;" title="删除" class="list_deletel"></a></div></li>'
                    )
                    //给li绑定index和music
                    $music.get(0).index=index;
                    $music.get(0).music=element;
                $(".left_list ul").append($music);
                })

                //全选复选框
                $(".list_title_check i"). click(function(){
                    $(this).toggleClass("list_checkin");
                    if($(this).attr("class")=="list_checkin")
                    {
                        $(".list_check i").addClass("list_checkin");
                    }
                    else
                    {
                        $(".list_check i").removeClass("list_checkin");
                    }
                    
                })
                //设置歌曲信息
                initMusicInfo(date[0]);
                //设置歌词信息
                initWordsInfo(date[0]);

            },
            error:function(e){
            console.log(e);
            }
        })
    }


     //设置歌曲信息
     function initMusicInfo(music)
     {
         var $songImg=$(".song_img a")
         var $songName=$(".song_name a");
         var $singerName=$(".singer_name a");
         var $ablumName=$(".ablum_name a");
         var $groupName=$(".foot_progress_name");
         var $groupTime=$(".foot_progress_time");
         var $maskBg=$(".mask_bg");
 
         $songImg.css("background",'url('+music.cover+')');
         $songName.text(music.name);
         $singerName.text(music.singer);
         $ablumName.text(music.album);
         $groupName.text(music.name+" / "+music.singer);
         $groupTime.text("00:00 / "+music.time);
         $maskBg.css("background",'url('+music.cover+')');

     };
 
     //设置歌词信息
     function initWordsInfo(path)
     {
         var $wordsUl=$(".song_words ul");
         words=new Words(path.link_lrc);
         $wordsUl.html("");
         words.getwords(function(){
            $.each(words.words,function(index,value)
            {
                $item=$("<li>"+value+"</li>");
                $wordsUl.append($item);
            })
            });

        //纯净模式歌词信息
        var $cleanWordsUl=$(".clean_song_words ul");
         $cleanWordsUl.html("");
         words.getwords(function(){
            $.each(words.words,function(index,value)
            {
                $item=$("<li>"+value+"</li>");
                $cleanWordsUl.append($item);
            })
            });
     }
    initEvents();
    //事件函数
    function initEvents()
    {
        //移入歌曲列表
        $("html").on("mouseenter",".list_contain",
        function()
            {  
                
                $(this).find(".list_menu").stop().show();
                $(this).find(".list_time a").stop().show();
                $(this).find(".list_time span").stop().hide();
            })

        //移出歌曲列表 
        $("html").on("mouseleave",".list_contain",
        function()
            {
                $(this).find(".list_menu").stop().hide();
                $(this).find(".list_time a").stop().hide();
                $(this).find(".list_time span").stop().show();

            })
    
        //复选框
        $("html").on("click",".list_check i",function()
        {
            $(this).toggleClass("list_checkin"); 
            $(".list_title_check i").removeClass("list_checkin");
        })
        // $(".list_title_check i"). click(function(){
        //     $(this).toggleClass("list_checkin");
        // })
        //播放暂停
        var $musicPlay=$(".music_play");
        $("html").on("click",".list_play",function()
        {
            $(".song_words ul").stop().animate({marginTop:0},1,"swing");
            $(".clean_song_words ul").stop().animate({marginTop:0},1,"swing");
            //切换播放暂停按
            $(this).toggleClass("list_play2");
            $(this).parents(".list_contain").siblings().find(".list_menu a").removeClass("list_play2");
            if($(this).hasClass("list_play2"))
            {
                $musicPlay.addClass("music_play2");
                //当前播放高亮,其他不高亮
                $(this).parents(".list_contain").find("div").css({"color":"white"});
                $(this).parents(".list_contain").find(".list_singer a").css({"opacity":"1"});
                $(this).parents(".list_contain").siblings().find("div").css({"color":"rgba(255,255,255,0.5)"});
                $(this).parents(".list_contain").siblings().find(".list_singer a").css({"opacity":"0.5"});
                //数字变为波浪
                $(this).parents(".list_contain").find(".list_number").addClass("list_number2");
                $(this).parents(".list_contain").siblings().find(".list_number").removeClass("list_number2");
            }
            else
            {
                $musicPlay.removeClass("music_play2");
                //高亮再次点击之后变为不高亮
                $(this).parents(".list_contain").find("div").css({"color":"rgba(255,255,255,0.5)"});
                $(this).parents(".list_contain").find(".list_singer a").css({"opacity":"0.5"});
                $(this).parents(".list_contain").find(".list_number").removeClass("list_number2");
            }

        //播放音乐
        player.playMusic($(this).parents(".list_contain").get(0).index,
        $(this).parents(".list_contain").get(0).music);
        initMusicInfo($(this).parents(".list_contain").get(0).music);   
        initWordsInfo($(this).parents(".list_contain").get(0).music);   //获取当前播放的音乐赋值对应的歌词
    });

        /*底部事件*/
        //上一首
        $(".music_last").on("click",function()
        {
            $(".list_contain").eq(player.lastIndex()).find(".list_play").trigger("click");
        })

        //开始暂停
        $(".music_play").on("click",function()
        {
            if(player.flageindex==-1)
            {
                $(".list_contain").eq(0).find(".list_play").trigger("click");
                        
            }
            else
            {
                $(".list_contain").eq(player.flageindex).find(".list_play").trigger("click");
            }
            
        })

        //下一首
        $(".music_next").on("click",function()
        {
            $(".list_contain").eq(player.nextIndex()).find(".list_play").trigger("click");
            
        })

        //删除歌曲
        $("html").on("click",".list_deletel",function()
        {
             var $item= $(this).parents(".list_contain");
             if($item.get(0).index==player.flageindex)
             {
                 $(".music_next").trigger("click");
             }
             if($item.get(0).index<player.flageindex)
            {
                player.flageindex-=1;
            }
            //移除li
            $item.remove();
            //重新排序
            $(".list_contain").each(function(index,val)
            {  
                $(val).get(0).index=index;          
                $(val).find(".list_number").text(index+1);
                
            })
            player.removeMusic($item.get(0).index);    
        })

        //声音
        if($(".voice_line_over").css("width")==0)
        {
            $(".voice_icon").addClass("voice_icon2");
        }
        $(".voice_icon").on("click",function()
        {
            $(this).toggleClass("voice_icon2");

            if($(this).attr("class").search("2")!==-1)
            {
                
                player.setVoice(0);
                $(".voice_line_over").css("width",0);
                $(".voice_dot").css("left",0);

            }
            else{
                player.setVoice(0.5);
                $(".voice_line_over").css("width",10);
                $(".voice_dot").css("left",10);
            }
        })

        //纯净模式
        $(".music_only").on("click",function()
        {
            $(this).toggleClass("music_only2");
            $(".contain").toggleClass("contain1");
            $(".clean").toggleClass("clean1");
        })

        //喜欢
        $(".music_fav").on("click",function()
        {
            $(".music_fav").toggleClass("music_fav2");
        })
        
    }

   
  
    //歌曲进度条拖拽
    progess.progressMove(function(value)
    {
        // player.setCurrent(value);
    });
    progess.progressClick(function(value){
        player.setCurrent(value);
    });

    //时间同步
    player.timeUpdate(function (Duration,CurrentTime,MusicStr)
    {
        $(".foot_progress_time").text(MusicStr);
        //进度条同步
        var value=CurrentTime/Duration*100;
        progess.setProgess(value);
        
        if(CurrentTime==Duration)
        {
            $(".music_next").trigger("click")
        }
        //歌词滚动
        var index=words.currentIndex(CurrentTime);
        $(".song_words li").eq(index).addClass("cur");
        $(".song_words li").eq(index).siblings().removeClass("cur");
        if(index<=1)return;
        $(".song_words ul").stop().animate({marginTop:(1-index)*30},"swing");
        // css({
        //     marginTop:(1-index)*30,
        // })
        
        //纯净模式歌词滚动
        $(".clean_song_words li").eq(index).addClass("cur");
        $(".clean_song_words li").eq(index).siblings().removeClass("cur");
        if(index<=1)return;
        $(".clean_song_words ul").stop().animate({marginTop:(2-index)*60},"swing");
        
    });
    //声音拖拽
    voice.voiceMove(function(value)
    {
        player.setVoice(value);
    })
    
})