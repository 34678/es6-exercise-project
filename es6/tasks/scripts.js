import gulp from 'gulp';
//在gulp 的语句中做if判断
import gulpif from 'gulp-if';
//处理文件拼接
import concat from 'gulp-concat';
//打包
import webpack from 'webpack';
//gulp处理的是文件流
import gulpWebpack from 'webpack-stream';
//对文件重命名做标志的
import named from 'vinyl-named';
//热更细
import livereload from 'gulp-livereload';
//文件信息流
import plumber from 'gulp-plumber';
//文件重命名
import rename from 'gulp-rename';
//js和css压缩
import uglify from 'gulp-uglify';
//命令行输出的包
import {log,colors} from 'gulp-util';
import args from './util/args';


//创建一个gulp任务
gulp.task('scripts',()=> {
    //打开文件
    return gulp.src(['app/js/index.js'])
        .pipe(plumber({
            errorHandle:function(){
               //错误处理
            }
        }))
        //重命名
        .pipe(named())
        //重新编译
        .pipe(gulpWebpack({
            module:{
                loaders:[{
                    test:/\.js$/,
                    loader:'babel-loader'
                }]
            }
        }),null,(err,stats)=>{
            log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
                chunks:false
            }))
        })
        //存放路径（编译好的文件） 最新的js房子服务端跑起来
        .pipe(gulp.dest('server/public/js'))
        //把编译过的文件重命名
        .pipe(rename({
            basename:'cp',
            extname:'.min.js'
        }))
       //压缩文件
        .pipe(uglify({compress:{properties:false},output:{'quote_keys':true}}))
        //压缩在存储
        .pipe(gulp.dest('server/public/js'))
        //文件变化后进行刷新 有watch选项就进行热更新
        .pipe(gulpif(args.watch,livereload()))
})

