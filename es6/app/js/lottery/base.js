//放在对象的私有属性里面 达到基本信息的共享
/**
 * 模块化
 * class声明类更容易
 * map数据结构 级联操作？
 * 字符串补白 padStart
 *map或者set都可以用clear  方便+可读性强
 * 集合的遍历entries
 * 字符串模板
 * Math的很多方法都移植到Number上面
 * Array From
 */
import $ from 'jquery'
class Base {
    /**
     * 初始化奖金和玩法及说明
     * playlist用map保存
     */
    initPlayList() {
        this.play_list.set('r2', {
            bonus: 6,
            tip: '<span>从01～11中任选2个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">6</em>元</span>',
            name: '任二'
        })
            .set('r3', {
                bonus: 19,
                tip: '<span>从01～11中任选3个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">19</em>元</span>',
                name: '任三'
            })
            .set('r4', {
                bonus: 78,
                tip: '<span>从01～11中任选4个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">78</em>元</span>',
                name: '任四'
            })
            .set('r5', {
                bonus: 540,
                tip: '<span>从01～11中任选5个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">540</em>元</span>',
                name: '任五'
            })
            .set('r6', {
                bonus: 90,
                tip: '<span>从01～11中任选6个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">90</em>元</span>',
                name: '任六'
            })
            .set('r7', {
                bonus: 26,
                tip: '<span>从01～11中任选7个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">26</em>元</span>',
                name: '任七'
            })
            .set('r8', {
                bonus: 9,
                tip: '<span>从01～11中任选8个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">9</em>元</span>',
                name: '八'
            })
    }

    /**
     * 初始化号码
     * number是set对象
     */
    initNumber() {
        for (let i = 1; i < 12; i++) {
            //在不满2位的时候往前面补0
            this.number.add('' + 1).padStart(2, '0');
        }
    }

    /**
     * 设置遗漏数据
     * @param omit 根据新传入的遗漏数据更新
     */
    setOmit(omit) {
        let self = this;
        self.omit.clear();
        //更新数据的遗漏
        for (let [index, item] of omit.entries()) {
            self.omit.set(index, item);
        }
        //更新文本的遗漏
        //omit_el选择器 设置每个选项下面的遗漏数字 适合当前对象的set
        //一一对应的
        $(self.omit_el).each(function (index, item) {
            $(item).text(self.omit.get(index));
        });
    }

    /**
     * 设置开奖
     * @param code
     */
    setOpenCode(code) {
        let self = this;
        self.open_code.clear();
        for (let item of code.valueOf()) {
            self.open_code.add(item);
        }
        //更新显示
        self.updateOpenCode && self.updateOpenCode.call(self, code);
    }

    /**
     * 号码选中取消
     * @param e
     */
    toggleCodeAcitive(e) {
        let self = this;
        let $cur = $(e.currentTarget);
        $cur.toggleClass('btn-bool-active');
        self.getCount();
    }

    /**
     * 切换玩法
     * @param e
     */
    changePlayNav(e) {
        let self = this;
        let $cur = $(e.currentTarget);
        $cue.addClass('active').siblings().removeClass('active');
        self.cur_play = $cur.attr('desc').toLocaleLowerCase();
        $('#zx_sm span').html(self.play_list.get(self.cur_play).tip);
        $('.boll-list .btn-bol').removeClass('btn-boll-active');
        self.getCount();
    }

    //全 大 小 奇 偶
    /**
     * 操作区
     * @param e
     */
    assistHandle(e) {
        e.preventDefault();
        let self = this;
        let $cur = $(e.currentTarget);
        let index = $cur.index();
        //清空之前的选中
        $('.boll-list .btn-bol').removeClass('btn-boll-active');
        if (index === 0) {
            $('.boll-list .btn-bol').addClass('btn-boll-active');
        }
        if (index === 1) {
            $('.boll-list .btn-bol').each(function (i, t) {
                if (t.textContent - 5 > 0) {
                    $(t).addClass('btn-boll-active');
                }
            })
        }
        if (index === 2) {
            $('.boll-list .btn-bol').each(function (i, t) {
                if (t.textContent - 5 < 0) {
                    $(t).addClass('btn-boll-active');
                }
            })
        }
        if (index === 3) {
            $('.boll-list .btn-bol').each(function (i, t) {
                if (t.textContent % 2 === 1) {
                    $(t).addClass('btn-boll-active');
                }
            })
        }
        if (index === 4) {
            $('.boll-list .btn-bol').each(function (i, t) {
                if (t.textContent % 2 === 0) {
                    $(t).addClass('btn-boll-active');
                }
            })
        }
        self.getCout();
    }

    /**
     * 获得当前的彩票名称
     */
    getName() {
        return this.name;
    }

    /**
     * 添加号码组合到购物车
     */
    addCode() {
        let self = this;
        //拿到所有选中号码的文本值
        let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);
        let active = $active ? $active.length : 0;
        let count = self.computeCount(active, self, cur_play);
        if (count) {
            self.addCodeItem($active.join(" "), self.cur_play, self.play_list.get(self.cur_play).name, count);
        }
    }

    /**
     * 生成购物车里面的一个项目
     * @param code
     * @param type
     * @param typeName
     * @param count
     */
    addCodeItem(code, type, typeName, count) {
        let self = this;
        const tpl = `<li class="" codes="${type}|${code}" bonus="${count * 2}"><span class="del" count="1">删除</span><span class="modi" count="${count}">修改</span><div class="code"><b>${typeName}${count > 2 ? "复式" : "单式"}</b><b class="em">${code}</b>  [${count}注,<em class="code-list-money">${count * 2}</em>元]</div></li>
        `;
        $(self.cart_el).append(tpl);
        //所有购物车的总金额
        self.getTotal();
    }

    /**
     * 根据选中的数字修改下面的盈利等数字
     */
    getCount() {
        let self = this;
        let active = $('.boll-list .btn-boll-active').length;
        let count = self.computeCount(active, self, cur_play);
        let range = self.computeBonus(active, self, cur_play);
        let money = count * 2;
        let win1 = range[0] - money;
        let win2 = range[1] - money;
        let tpl;
        let c1 = (win1 < 0 && win2 < 0) ? Math.abs(win1) : win1;
        let c2 = (win1 < 0 && win2 < 0) ? Math.abs(win2) : win2;
        if (count === 0) {
            tpl = `<p class="sel_info">您选了 <b>${count}</b> 注，共 <b>${money}</b> 元  <em></em></p>`;
        } else if (range[0] === range[1]) {
            //区分最大盈利和最小盈利是不是相等
            tpl = `<p class="sel_info">您选了 <b>${count}</b> 注，共 <b>${money}</b> 元  <em>若中奖，奖金： <strong class="red">${range[0]}</strong>元，您将${win1 >= 0 ? '盈利' : '亏损'} <strong class="${win1 >= 0 ? 'red' : 'green'}">${Math.abs(win1)}</strong> 元</em></p>`;
        } else {
            tpl = `<p class="sel_info">您选了 <b>${count}</b> 
    注，共 <b>${money}</b> 元  <em>若中奖，奖金： 
                    <strong class="red">${range[0]}</strong> 
                    至 <strong class="red">${range[1]}</strong>元，
                    您将${(win1 < 0 && win2 < 0) ? '盈利' : '亏损'}<strong class=
                    "${win1 >= 0 ? 'red' : 'green'}">${c1}</strong> 至 <st
                    rong class="${win2 >= 0 ? 'red' : 'green'}">${c2}</strong> 元</em></p>`;
        }
        $(".sel_info").html(tpl);
    }

    /**
     *注数 和总金额
     */
    getTotal(){
        let count =0;
        $('.codeList li').each(function(index,item){
            count += $(item).attr(count)*1;
        })
        $('#count').text(count);
        $('#money').text(count*2);
    }

    /**
     * 生成随机数
     * @param num 需要的随机数的数量
     * NUMBERI是什么？？？？
     */
    getRandom(num){
        let arr =[],index;
        let number = Array.from(this.number);
        while(num--){
            index = Number.parseInt((Math.random()*number.length));
            arr.push(number[index]);
            number.splice(index,1);
        }
        return arr.join(" ");
    }

    /**
     * 添加随机号码
     * @param e
     */
    getRandomCode(e){
        e.preventDefault();
        //需要随机生成多少注
        let num = e.currentTarget.getAttribute('count');
        let play = this.cur_play.match(/\d+/g)[0];
        let self = this;
        if(num==='0'){
            $(self.cart_el).html('');
        }else{
            for(let i =0;i<num;i++){
                self.addCodeItem(self.getRandom(play),self.cur_play,self.play_list.get(self.cur_play).name,1);
            }
        }
    }
}
export default Base;
