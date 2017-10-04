import gulp from 'gulp';
import gulpif from 'gulp-if';
//启动一个脚本作为服务器
import liveserver from 'gulp-live-server';
import args from './util/args';

gulp.task('serve',(cb)=>{
    //不是监听状态
    if(!args.watch) return cb();
    //创建一个服务器
    var server = liveserver.new(['--harmony','server/bin/www']);
    server.start();
    //监听server下面的文件变化
    gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'],function(file){
        //通知服务器发生改变
        server.notify.apply(server,[file]);
    })
//监听需要重启服务的文件
    gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
        server.start.bind(server)()
    });
})