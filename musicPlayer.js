var app = new Vue({
    el: '#app',
    data: {
        //歌曲搜索
        serach: '',
        //歌曲列表
        musiclist: [],
        //歌曲播放地址
        musicurl: '',
        //歌曲封面
        picUrl: '',
        //热门评论
        hotComments: [],
        //用户头像地址
        avatarUrl: '',
        //播放转态
        isPlaying: false,
        //mv地址
        mvurl: '',
        isShow: false
        
        


    },
    methods: {
         //歌曲搜索
        serachmusic: function () {
            let that = this;
             //获取歌曲列表
            axios.get('https://autumnfish.cn/search?keywords='
                + this.serach)
                .then(function (response) {
                    // console.log(response);
                    // console.log(response.data.result.songs);
                    that.musiclist = response.data.result.songs
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        playmusic: function (musicid) {
            let that = this;
            
            //获取歌曲播放地址
            axios.get('https://autumnfish.cn/song/url?id='
                + musicid)
                .then(function (response) {
                    // console.log(response);
                    // console.log(response.data.data[0].url);
                    that.musicurl = response.data.data[0].url
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            //获取用户头像
            axios.get('https://autumnfish.cn/song/detail?ids=' + musicid
            )
                .then(function (response) {
                    // console.log(response);
                    // console.log(response.data.songs[0].al.picUrl);
                    that.picUrl = response.data.songs[0].al.picUrl
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
           //获取热门评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicid
            )
                
                .then(function (response) {
                    // console.log(response.data.hotComments);
                    that.hotComments = response.data.hotComments;
                    // console.log(response.data.hotComments[0].user.avatarUrl);
                    
                    that.avatarUrl = response.data.hotComments.user.avatarUrl
                    
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            
        
        },
        //获取歌曲mv
        playmv: function (mvid) {
            let that = this;
              axios.get('https://autumnfish.cn/mv/url?id=' + mvid
            )
                
                 .then(function (response) {
                   
                     that.mvurl = response.data.data.url;
                     that.isShow = true;
     
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        hide: function () {
            this.isShow = false;
            this.mvurl = '';
        },
        play:function () {
           
            this.isPlaying = true;
            
        },
        pause: function () {
            this.isPlaying = false;
            
        }
    }
});
 
