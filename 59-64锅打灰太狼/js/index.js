$(function()
{
    //监听规则点击
    $(".rule").on("click",function()
    {
        $(".rules").stop().fadeIn(100);
    
        
    })

    //监听规则关闭点击
    $(".close").on("click",function()
    {
        $(".rules").stop().fadeOut(100);

    })

    //监听开始按钮点击
    $(".star").on("click",function()
    {
        $(this).stop().fadeOut(100);
        //调用进度条函数
        progressHandler();
        //调用灰太狼动画
        wolfAnimate();
    })  
    
    //监听重新开始点击
    $(".reStar").on("click",function()
    {
        $(".over").stop().fadeOut(100);
        //调用进度条函数
        progressHandler();
        wolfAnimate();
        $(".score").text(0);
        $(".qw").remove();
        
    })

    var pwidth=$(".progress").width();
    //进度条函数
    function progressHandler()
    {
        $(".progress").css({width: 180});
        //进度
        timer=setInterval(function(){
            pwidth=$(".progress").width();
            pwidth-=1;
            $(".progress").css({width: pwidth});

            //进入游戏结束界面
            if(pwidth<=0)
            {
                clearInterval(timer);
                $(".over").stop().fadeIn(100);
                var $yscore=$("<h2 class=\"qw\">你的得分是: "+$(".score").text()+" 分</h2>");
                $(".over").append($yscore);
            }
        },300)
        
    }

    //动画函数
    function wolfAnimate()
    {
        //定义图片数组
        var wolf_1=['images/h0.png','images/h1.png','images/h2.png',
        'images/h3.png','images/h4.png','images/h5.png','images/h6.png',
        'images/h7.png','images/h8.png','images/h9.png'];
        var wolf_2=['images/x0.png','images/x1.png','images/x2.png',
        'images/x3.png','images/x4.png','images/x5.png','images/x6.png',
        'images/x7.png','images/x8.png','images/x9.png'];
        //定义位置数组
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ]

        var $img=$("<img src=' ' class=\"wolfimg\">");
        //设置随机位置
        var imgindex=parseInt(Math.random()*8);
        $img.css({position:"absolute",
        left:arrPos[imgindex].left,
        top:arrPos[imgindex].top})
        $(".container").append($img);

        //设置随机种类
        var wolfType=parseInt(Math.random()*2)==0?wolf_1:wolf_2;
        window.a=0;
        window.b=5;

        //注意！！定时器和函数处理是异步的，所以函数处理完成之后才会开启定时器，append发生在定时器开启之前

        //动画
        wolfTimer=setInterval(function ()
        {
            if(a>=b)    
            {
                $img.remove();
                clearInterval(wolfTimer);
                wolfAnimate();
            }
            if(pwidth<=0)
            {
                $img.remove();
                clearInterval(wolfTimer);
            }
            $img.attr("src", wolfType[a]);
            a++;
        }      
    ,300) 
    
        //调用规则函数
        gameRuler($img);

    }

    //规则函数
   function gameRuler($img)
   {
        $img.one("click",function(){
            a=5;
            b=9;
            var $imgstr=$(this).attr("src");
            var flag=$imgstr.search("h");
            if(flag!==-1)
            {
               var x= parseInt( $(".score").text())+10;
               $(".score").text(x);
            }
            else
            {
                var x= parseInt( $(".score").text())-10;
               $(".score").text(x);
            }
            
        })
        
        
   };
}) 