(function(window)
{
    function Voice($voice_line,$voice_over,$voice_dot)
    {
        return new Voice.prototype.init($voice_line,$voice_over,$voice_dot);
    }
    Voice.prototype={
        constructor:Voice,
        init:function($voice_line,$voice_over,$voice_dot)
        {
            this.$voice_line=$voice_line;
            this.$voice_over=$voice_over;
            this.$voice_dot=$voice_dot;
        },
        
        voiceMove:function(callBack)
        {
            var _this=this;
            var lineLeft=this.$voice_line.offset().left;
            var eventLeft;
            this.$voice_dot.on("mousedown",function()
            {
                _this.isMove=true;
                
                $(document).on("mousemove",function()
                {
                    eventLeft=event.pageX;
                    _this.$voice_over.css("width",eventLeft-lineLeft);
                    _this.$voice_dot.css("left",eventLeft-lineLeft-10);
                    if(parseInt(_this.$voice_dot.css("left"))>80)
                    {
                        _this.$voice_dot.css("left",80);
                    }
                    if(parseInt(_this.$voice_dot.css("left"))<0)
                    {
                        _this.$voice_dot.css("left",0);
                    }

                    if(parseInt(_this.$voice_over.css("width"))>80)
                    {
                        _this.$voice_over.css("width",80);
                        
                    }
                    if(parseInt(_this.$voice_over.css("width"))<0)
                    {
                        _this.$voice_over.css("width",0);
                    }
                })
                $(document).on("mouseup",function()
                {
                    $(document).off("mousemove");
                    _this.isMove=false;
                    //进度条比例
                    var value=(eventLeft-lineLeft)/_this.$voice_line.width();
                     callBack(value);
                    
                })
            })
        },
        setvoiceProgress:function(value)
        {
            if(value<0||value>100)return;
            this.$voice_over.css("width",value+"%");
            this.$voice_dot.css("left",value+"%");
        }
        
        
    }

    Voice.prototype.init.prototype=Voice.prototype;
    window.Voice=Voice;
})(window)