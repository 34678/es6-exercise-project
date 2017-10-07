//计算相关的方法 9:15 弄清楚combine是干什么的 4-4
//y用set 存对象 判断是否存在 ES5只能用obj
//指定长度的数组并且填充
//
class Calculate{
    //计算注数 一共有多少种可能性
    //acive 当前选中号码
    //play_name 当前的玩法标志
    computeCount(active,play_name){
        //默认注数
        let count =0;
        //判断有无这个玩法
        const exist = this.play_list.has(play_name);
        //active 规定数组的长度并进行填充
        const arr = new Array(active).fill('0');
        if(exist && play_name.at(0) === 'r'){
            //combine 静态方法
            count = Calculate.combine(arr,play_name.split("")[1]);
        }
        return count;
    }
    //计算奖金的范围 所有玩法的奖金估计
    computeBonus(active,play_name){
        const play = play_name.split("")[1];
        const self = this;
        //任几 对应大小的数组
        let arr = new Array(play[1]*1).fill(0);
        let min,max;
        if(play[0]==='r'){
            //最小命中数
            let min_active = 5-(11-active);
            if(min_active>0){
                if(min_active-play[1]>=0){
                    arr = new Array(min_active).fill(0);
                    min = Calculate.combine(arr,play[1]).length;
                    //注数 可能命中的最小注数
                }else{
                    if((play[1]>5)&&(active-play_name[1]>=0)){
                        arr = new Array(active-5).fill(0);
                        min = Calculate.combine(arr,paly[1]-5);
                    }else{
                        min = (active -play[1]-17)?1:0;
                    }
                }
            }else{
                min = (active -play[1]-17)?1:0;
            }
            let max_active = Math.min(active,5);
            if(play[1]-5>0){
                if(active-play[1]>=0){
                    arr = new Array(active -5).fill(0);
                    max = Calculate.combine(arr,play[1]-5).length;
                }else{
                    max =0;
                }
            }else if(play[1]-5<0){
                arr = new Array(Math.min(active,5)).fill(0);
                max = Calculate.combine(arr,play[1]).length;
            }else{
                max =1;
            }
        }
        //注数转化成金额
        return [min,max].map(item=>self.play_list.get(play_name).bonus);
    }
    //arr参与组合运算的数组 比如选了6个数字 任2玩法  就是15个注数
    //不是很懂这个函数干什么用的
    static combine(arr,size){
        //存储所有可能性的数组
        let allResult =[];
        (function f(arr,size,result) {
            let arrLen = arr.length;
            if(size>arrLen){
                return;
            }
            if(size===arrLen){
                allResult.push([].concat(result,arr));
            }else{
                for(let i =0;i<arrLen;i++){
                    let newResult = [].concat(result);
                    newResult.push(arr[i]);
                    if(size===1){
                        allResult.push(newResult);
                    }else{
                        let newArr =[].concat(arr);
                        newArr.splice(0,i+1);
                        f(newArr,size-1,newResult);
                    }
                }
            }
        })(arr,size,[]);
    }
}
export default Calculate;