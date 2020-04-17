$(function()
{
    //监听输入内容
    $("body").on(" propertychange input",".text",function()
    {
        //判断按钮是否能点击
        if($(this).val().length>0)
        {
            $(".btn").prop("disabled",false);
            
           
        }
        else
        {
            $(".btn").prop("disabled",true);

        }

        
    })


    //内容发布
    $(".btn").on("click",function()
    {

        //获取用户发布内容和时间
        var $text=$(".text").val();
        var time=getTime();
        var $info=createEle($text,time);
        $(".info").prepend($info);
        //发布之后清除文本框内内容
        $(".text").val(null);
      
    })

    //内容删除
    $("body").on("click",".shanchu",function()
    {
        $(this).parents(".content").remove();
    })
    //顶
    $("body").on("click",".ding",function()
    {
        $(this).text(parseInt($(this).text())+1);
    })

    //踩
    $("body").on("click",".cai",function()
    {
        $(this).text(parseInt($(this).text())+1);
    })

    //创建节点函数
   function createEle(text,time)
   {
       var $weibo=$(    
       "<div class=\"content\">"+
               "<p class=\"contentText\">"+text+
               "</p>"+
               "<br>"+
              " <p class=\"contentTip\">"+
                   "<span class=\"time\">"+time+"</span>"+
                   "<span class=\"delay\">"+
                       "<a href=\"javascript:\" class=\"ding\">0</a>"+
                       "<a href=\"javascript:\" class=\"cai\">0</a>"+
                       "<a href=\"javascript:\" class=\"shanchu\">删除</a>"+
                  " </span>"+
              " </p>"+
      " </div>")
      return $weibo;
   }

   //获取时间函数
   function getTime()
   {
    var date=new Date();

    //时间变成两位数
    function two(num)
    {
        if(num<10)
        {
            var num="0"+num;
        }
        return num;
    }
    var str=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+two(date.getHours())+":"+two(date.getMinutes());
    return str;
   }
})