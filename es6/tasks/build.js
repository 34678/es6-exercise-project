import gulp from 'gulp';
//处理任务之前的关联关系和先后顺序
import gulpSequence from 'gulp-sequence';
//注册一个任务
gulp.task('build',gulpSequence('clean','css','pages','scripts',['browser','serve']));
