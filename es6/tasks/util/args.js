import yargs from 'yargs';
const args = yargs
    //查看是否有这个参数 进而区分是不是线上项目
    .option('production',{
        boolean:true,
        default:false,
        describe:'min all scripts'
    })
    //需不需要监听开发环境修改的文件
    .option('watch',{
        boolean:true,
        default:false,
        describe:'watch all files'
    })
   //需不要详细输出命令行执行的日志
    .option('verbose',{
        boolean:true,
        default:false,
        describe:'log'
    })
     //JS压缩以后的map
    .option('sourcemaps',{
        describe:'force the creation of sroucemaps'
    })
    //设置服务器的端口
    .option('port',{
        string:true,
        default:8080,
        describe:'server port'
    })
    //以上内容用字符串解析
    .argv
//脚本需要处理命令行参数
export default args;