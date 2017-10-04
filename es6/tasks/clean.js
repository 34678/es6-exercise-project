import gulp from 'gulp';
//删除用
import del from 'del';
import args from './util/args';

gulp.task('clean',()=>{
    return del(['server/public','server/views'])
})
