# H5弹幕视频播放器

播放器部分源码源于：https://github.com/chiruom/DanmuPlayer

把弹幕文件（目前只针对BiliBili格式进行开发）放到koa-backend/xml目录中即可

## 使用教程

1. 进入koa-backend目录，使用npm start启动弹幕API服务器；
2. 修改index.html中video_name以更换播放视频源，并保证视频文件名与弹幕文件名相同（当然，文件后缀可以不同）
3. 用浏览器打开index.html即可进行弹幕视频的观看

## 目前H5的<video>元素支持的三种视频格式：

1. Ogg：Theora视频编码和Vorbis音频编码
2. MPEG4：H.264视频编码和AAC音频编码
3. WebM：VP8视频编码和Vorbis音频编码