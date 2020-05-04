(function(window)
{
    function Progess($progess_line,$progess_over,$progess_dot)
    {
        return new Progess.prototype.init($progess_line,$progess_over,$progess_dot);
    }
    Progess.prototype=
    {
        constructor:Progess,
        init:function($progess_line,$progess_over,$progess_dot)
        {
            this.$progess_line=$progess_line;
            this.$progess_over=$progess_over;
            this.$progess_dot=$progess_dot;
        },
        isMove:false,
        progressClick:function(callBack)
        {
            var _this=this;
            this.$progess_line.on("click",function()
            {
                var lineLeft=$(this).offset().left;
                var eventLeft=event.pageX;
                
                _this.$progess_over.css("width",eventLeft-lineLeft);
                _this.$progess_dot.css("left",eventLeft-lineLeft);
                //进度条比例
                var value=(eventLeft-lineLeft)/$(this).width();
                callBack(value);
            })
            
        },
        progressMove:function(callBack)
        {
            var _this=this;
            var lineLeft=this.$progess_line.offset().left;
            var eventLeft;
            this.$progess_dot.on("mousedown",function()
            {
                _this.isMove=true;
                
                $(document).on("mousemove",function()
                {
                    eventLeft=event.pageX;
                    _this.$progess_over.css("width",eventLeft-lineLeft);
                    _this.$progess_dot.css("left",eventLeft-lineLeft-10);
                    if(parseInt(_this.$progess_dot.css("left"))>620)
                    {
                        _this.$progess_dot.css("left",620);
                    }
                    if(parseInt(_this.$progess_dot.css("left"))<0)
                    {
                        _this.$progess_dot.css("left",0);
                    }

                    if(parseInt(_this.$progess_over.css("width"))>620)
                    {
                        _this.$progess_over.css("width",620);
                        
                    }
                    if(parseInt(_this.$progess_over.css("width"))<0)
                    {
                        _this.$progess_over.css("width",0);
                    }
                })
                $(document).on("mouseup",function()
                {
                    //进度条比例
                    var value=(eventLeft-lineLeft)/_this.$progess_line.width();
                     callBack(value);
                    $(document).off("mousemove");
                    _this.isMove=false;
                    
                })
            })
        },
        setProgess:function(value)
        {
            if(this.isMove)return;
            if(value<0||value>100)return;
            this.$progess_over.css("width",value+"%");
            this.$progess_dot.css("left",value+"%");
        },
        
        

    }

    
    Progess.prototype.init.prototype=Progess.prototype;
    window.Progess=Progess;
})(window)