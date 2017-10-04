import gulp from 'gulp';
import gulpif from 'gulp-if';
//gulp常用的工具 函数集合
import gutil from 'gulp-util';
import args from './util/args';

gulp.task('browser',(cb)=>{
    if(!args.watch) return cb();
    //app下面的文件发生变化 启动相应的构建脚本
    gulp.watch('app/**/*.js',['scripts']);
    gulp.watch('app/**/*.ejs',['pages']);
    //??? 编译完的文件需要拷贝
    gulp.watch('app/**/*.css',['css']);
});
