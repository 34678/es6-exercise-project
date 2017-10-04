import gulp from 'gulp';
//在gulp 的语句中做if判断
import gulpif from 'gulp-if';
//热更细
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('pages',()=>{
    return gulp.src('app/**/*.ejs')
        //模板文件原封不动的拷贝
        .pipe(gulp.dest('server'))
        .pipe(gulpif(args.watch,livereload()))
})