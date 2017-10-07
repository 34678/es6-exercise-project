import $ from 'jquery';

//所有接口放在一个文件 方便修改和调用 和服务端通信的一些接口
class Interface{
    //获取遗漏 获取之后需要进行下一步操作 所以返回一个promise
    //issue 期号
    getOmit(issue){
        let self = this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'/get/omit',
                data:{
                    issue:issue
                },
                dataType:'json',
                success:function (res) {
                    //继承的其他类的方法
                    self.setOmit(res,data);
                    resolve.call(self,res);
                },
                error:function (err) {
                    reject.call(err);
                }
            })
        })
    }
    //获取开奖号码
    getOpenCode(issue){
        let self = this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'/get/opencode',
                data:{
                    issue:issue
                },
                dataType:'json',
                success:function (res) {
                    self.setOpenCode(res,data);
                    resolve.call(self,res);
                },
                error:function (err) {
                    reject.call(err);
                }
            })
        })
    }
    //获得状态
    getState(issue){
        let self = this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'/get/state',
                data:{
                    issue:issue
                },
                dataType:'json',
                success:function (res) {
                    resolve.call(self,res);
                },
                error:function (err) {
                    reject.call(err);
                }
            })
        })
    }
}
export default Interface;