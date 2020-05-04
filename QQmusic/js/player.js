(function(window)
{
    function Player($audio,audio)       //构造函数Player
    {
        return new Player.prototype.init($audio,audio);
    }
    Player.prototype=
    {
        constructor:Player,
        musicList:[],
        init:function($audio,audio)
        {
            this.$audio=$audio;
            this.audio=audio;
        },
        flageindex:-1,
        playMusic:function(index,music) //歌曲播放暂停
        {
            if(index==this.flageindex)
            {
                if(this.audio.paused)
                {
                    this.audio.play();
                }
                else
                {
                    this.audio.pause();
                }
            }
            else
            {
                this.$audio.attr("src",music.link_url);
                this.audio.play();
                this.flageindex=index;

            }
        },
        
        lastIndex:function()
        {
            var index=this.flageindex-1;
            if(index<0)
            {
                index=this.musicList.length-1;
            }
            return index;
        },
        
        nextIndex:function()
        {
            var index=this.flageindex+1;
            if(index>this.musicList.length-1)
            {
                index=0;
            }
            return index;
        },
        
        removeMusic:function(index)         
        {
            this.musicList.splice(index,1);
        },
        getMusicDuration:function()
        {
            return this.audio.duration;
        },
        getMusicCurrentTime:function()
        {
            return this.audio.currentTime;
        },
        timeUpdate:function(callBack)
        {
            var _this=this;
            this.$audio.on("timeupdate",function()
            {
                var Duration=_this.getMusicDuration();
                
                var CurrentTime=_this.getMusicCurrentTime();
                var MusicStr=_this.setTime(Duration,CurrentTime);
                
        
                callBack(Duration,CurrentTime,MusicStr);
            })
        },
        setTime:function(Duration,CurrentTime)
        {
            var endMin=parseInt(Duration/60);
            var endSec=parseInt(Duration%60);
            var starMin=parseInt(CurrentTime/60);
            var starSec=parseInt(CurrentTime%60);

            
            if(endMin<10)
            {
                endMin="0"+endMin;
            }
            if(endSec<10)
            {
                endSec="0"+endSec;
            }
            if(starMin<10)
            {
                starMin="0"+starMin;
            }
            if(starSec<10)
            {
                starSec="0"+starSec;
            }

            var str=starMin+":"+starSec+" / "+endMin+":"+endSec;
            
            return str;
        },
        setCurrent:function(value)
        {
            this.audio.currentTime=this.audio.duration*value;
        },
        setVoice:function(value)
        {
            this.audio.volume=value;
        }
        
    }
    Player.prototype.init.prototype=Player.prototype;       //init创建的对象可以使用Player里面的方法
    window.Player=Player;
})(window)