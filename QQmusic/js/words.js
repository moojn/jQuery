(function(window)
{
    function Words(path)
    {
        return new Words.prototype.init(path);
    }
    Words.prototype=
    {
        constructor:Words,
        init:function(path)
        {
            this.path=path;
        },
        time:[],
        words:[],
        index:-1,
        getwords:function(callBack)         //获取歌词
        {
            var _this=this;
            $.ajax({
                url:_this.path,
                dataType:"text",
                success:function(date)
                {
                    _this.parseWords(date);
                    callBack();
                },
                error:function(e)
                {
                    console.log(e);
                }
            });
        },
        parseWords:function(date)       //解析歌词
        {
            //console.log(date)
            var _this=this;
             _this.time=[];
             _this.words=[];
            var array=date.split("\n");
            var timeReg=/\d*:\d*\.\d*/;
            $.each(array,function(index,value)
            {
                //console.log(value);
                //[00:00.92]
                //清空上一首歌词的信息
                var unwords=timeReg.exec(value);       //unwords存储了所有未格式化的歌词和时间
                if(unwords==null) return true;         //去除所有空字符串
                //歌词
                var words=value.split("]")[1];
                if(words.length<=1) return true;
                _this.words.push(words);
                
                //时间
                var time=unwords[0].split(":");
                var min=parseInt(time[0]*60);
                var sec=parseFloat(time[1]);
                var wordsTime=Number(parseFloat(min+sec).toFixed(2));
                _this.time.push(wordsTime);
                
            })
        },
        currentIndex:function(CurrentTime)
        {   //0.92, 3.79, 4.75, 6.4, 8.95,
            //console.log(CurrentTime);
           // console.log(this.time);
            if(CurrentTime>=this.time[0])
            {
                this.index++;
                this.time.shift();
                
            }
            return this.index;
        },
        
    }
    Words.prototype.init.prototype=Words.prototype;
    window.Words=Words;
})(window)