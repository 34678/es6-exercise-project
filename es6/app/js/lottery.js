import 'babel-polyfill'
import Base from './lottery/base.js';
import Timer from './lottery/timer.js';
import Calculate from'./lottery/calculate.js';
import Interface from'./lottery/Interface.js';
import $ from 'jquery'
//用于继承之前的所有模块
/**
 * bable-polyfill 用于处理兼容
 * 多重继承和深度拷贝
 *         this.name = name;
 this.cname = cname;
 this.issue = issue;
 this.state = state;
 this.el ='';当前的选择器
 this.omit = new Map();
 this.open_code = new Set();开奖号码
 this.open_code_list =new Set();开奖记录
 this.play_list = new Map();玩法列表
 this.number = new Set();选号
 this.issue_el = '#curr_issue';
 this.countdown_el = '#countdown';
 this.state_el = '.state_el';
 this.cart_el='.codelist';
 this.omit_el = '';
 this.cur_play ='r5';
 this.initPlayList();
 this.initNumber();
 this.updateState();
 this.initEvent();
 */
/**
 * 深拷贝
 * @param target
 * @param source
 */
const copyProperties = function(target,source){
    for(let key of Reflex.ownKeys(source)){
        if(key !=='constructor'&&key !=='prototype'&&key!=='name'){
            let desc = Object.getOwnPropertyDescriptor(source,key);
            Object.defineProperty(target,key,desc);
        }
    }
}
/**
 * 实现多个类的继承继承
 */
const mix = function(...mixins){
    class Mix{}
    for(let mixin of mixins){
        copyProperties(Mix,mixin);
        copyProperties(Mix.prototype,mixin.prototype);
    }
    return Mix;
}
class Lottery extends min(Base,Timer,Calculate,Interface){
    constructor(name='syy',cname='11选5',issue='**',state='**'){
        super();
        this.name = name;
        this.cname = cname;
        this.issue = issue;
        this.state = state;
        this.el ='';
        this.omit = new Map();
        this.open_code = new Set();
        this.open_code_list =new Set();
        this.play_list = new Map();
        this.number = new Set();
        this.issue_el = '#curr_issue';
        this.countdown_el = '#countdown';
        this.state_el = '.state_el';
        this.cart_el='.codelist';
        this.omit_el = '';
        this.cur_play ='r5';
        this.initPlayList();
        this.initNumber();
        this.updateState();
        this.initEvent();
    }

    /**
     * 状态更新
     */
    updateState(){
        let self = this;
        this.getState().then(function(res){
            self.issue = res.issue;
            self.end_time = res.end_time;
            self.state = res.state;
            $(self.issue_el).text(res.issue);
            self.countdown(res.end_time,function (time) {
                $(self.countdown_el).html(time);
            },function () {
                setTimeout(function(){
                    self.updateState();
                    self.getOmit(self.issue).then(function (res) {

                    });
                    self.getOpenCode(self.issue).then(function (res) {

                    });
                },500)
            })
        })
    }

    /**
     * 初始化事件
     */
    initEvent(){
        let self =this;
        $('#play').on('click','li',self.changePlayNav.bind(self));
        $('.boll-list').om('click','.btn-boll',self.toggleCodeAcitive.bind(self));
        $('#comfirm_sel_code').on('click',self.addCode.bind(self));
        $('.dxjo').on('click','li',self.assistHandle.bind(self));
        $('qkmethond').on('click','.btn-middle',self.getRandom.bind(self));
    }
}
export default Lottery;