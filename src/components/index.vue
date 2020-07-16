<template>
    <div class='all'>
        <!-- 头部／手机顶部 -->
         <header>
             <div class='top'>
                 <div class='wifi' style="width:3.2rem;float: left;">
                     <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <span class="iconfont">&#xe622;</span>
                 </div>
                 <div class='time' style="width:3.2rem;float: left;text-align: center;">1:20PM</div>
                 <div class='blue_tooth' style="width:3.2rem;float:left;text-align: right;">
                     <span class="iconfont">&#xe627;</span>
                    77%
                    <span class="iconfont">&#xe673;</span>
                 </div>
             </div>
             <div class='title'>
                 <div style="width:2rem;float:left;padding-left:0.426667rem"><返回</div>
                 <div style="width:5rem;float:left; text-align: center;">临停缴费</div>
             </div>
        </header>

        <!-- 信息框 -->
        <section>
            <div class='bg' v-for='(item,index) in data' v-bind:key='index'>
                <div style="border-bottom:1px solid #fff;height: 1.066667rem;">
                    <div class='car_id'>{{id}}</div>
                    <div class='fee'>{{data.payment}}</div>                    
                </div>
                <div class="in_time" style="font-size:14px;font-weight:200">进场时间：<br/>
                {{data.time_in}}
                </div>
                <div class="out_time" style="font-size:14px;font-weight:200">出场时间：<br/>
                {{data.time_out}}
                </div>
                <i>¥</i>
                <span>{{data.cash}}</span>
            </div>           
        </section>

        <!-- 支付方式选择 -->
         <div class='pay' v-show='onShow'>
                <div class='circle'><i></i></div>
                <div class='radio'> 
                    <div class='pay_type'>微信支付</div> 
                    <p>推荐安装微信5.0及以上版本用户使用银行</p> 
                    <div class='circle_2'><i @click='choose_wx(0)' v-bind:class="{ changetheColor : wx}"></i></div>              
                </div>
                                  
        </div>  

        <div class='pay' v-show='onShow'>
                <div class='circle'><i></i></div>
                <div class='radio'> 
                    <div class='pay_type'>支付宝</div> 
                    <p>推荐有支付宝账号的用户使用</p>  
                    <div class='circle_2'><i @click='choose_zfb(1)' v-bind:class="{ changetheColor : zfb}"></i></div>             
                </div>
                                  
        </div>  

        <div class='pay' v-show='onShow'>
                <div class='circle'><i></i></div>
                <div class='radio'> 
                    <div class='pay_type'>浦发银行</div> 
                    <p>推荐有浦发银行账号的用户使用</p>  
                    <div class='circle_2'><i @click='choose_pf(2)' v-bind:class="{ changetheColor : pf}"></i></div>              
                </div>
                                 
        </div>  

        <div class='pay' v-show='onShow'>
                <div class='circle'><i></i></div>
                <div class='radio'> 
                    <div class='pay_type'>运达一卡通</div> 
                    <p>仅供运达一卡通的用户使用</p>  
                    <div class='circle_2'><i @click='choose_yd(3)' v-bind:class="{ changetheColor : yd}"></i></div>              
                </div>
                                 
        </div>  

        <div class='pay' v-show='onShow'>
                <div class='circle'><i></i></div>
                <div class='radio'> 
                    <div class='pay_type'>银行卡支付</div> 
                    <p>推荐有我家云钱包账号的用户使用</p> 
                    <div class='circle_2'><i @click='choose_yhk(4)' v-bind:class="{ changetheColor : yhk}"></i></div>                
                </div>
                                
        </div>  
        <!-- 支付按钮 -->
        <div @click='onPayment' v-show='onShow' class='pay_button'>支付</div>
        <div class='warn' v-show='onShow_1' ref='warn'></div>
    </div> 
</template>

<script>
import data from '../../static/data.json'
import { setTimeout } from 'timers';
export default {
    methods: {
    onClickLeft() {
        this.$toast({
        message:'无法返回',
      });
    },
    onPayment(){
        for(let i in this.radio){
            if(this.radio[i]){
                this.sum++
                this.end_radio=i
            }
        }
        if(this.sum>1){
            this.sum=0
            this.$refs.warn.innerHTML='只能选择一种'
            this.onShow_1=true
            setTimeout(function(){
                location.reload()
                },1000)
            return 0
        }
        if(this.sum==0){
            this.$refs.warn.innerHTML='您还未选择'
            this.onShow_1=true
            setTimeout(function(){
                this.onShow_1=false
                },1000)
            return 0
        }
        this.sum=0
        if(this.end_radio==0){
            this.$refs.warn.innerHTML='支付成功'
            this.onShow_1=true   
            let _this=this        
            setTimeout(function(){
                _this.onShow_1=false
                _this.onShow=false
                _this.data.payment='已缴费'
                },1000)
        }
        if(this.end_radio==1){
            this.$refs.warn.innerHTML='无法支付'
            this.onShow_1=true 
            setTimeout(function(){
                location.reload()
                },1000)
        }
        if(this.end_radio>1){
            this.$refs.warn.innerHTML='您未开通此方式'
            this.onShow_1=true
            setTimeout(function(){
                location.reload()
                },1000)
        }
    },
    showData(){
        this.id = this.$route.query.id   
            for(let i in data){
                if(i==this.id){
                    if(this.data.payment=='已缴费'){
                        this.onShow=false
                    }
                    this.data=data[i]
                }         
            }
        },
    choose_wx(i){
        this.radio[i]=!this.radio[i]
        this.wx=!this.wx
        console.log(this.radio);
    },
    choose_zfb(i){
        this.radio[i]=!this.radio[i]
        this.zfb=!this.zfb
    },
    choose_pf(i){
        this.radio[i]=!this.radio[i]
        this.pf=!this.pf
    },
    choose_yd(i){
        this.radio[i]=!this.radio[i]
        this.yd=!this.yd
    },
    choose_yhk(i){
        this.radio[i]=!this.radio[i]
        this.yhk=!this.yhk
    }
    },
    
    data(){
        return{
            radio:[false,false,false,false,false],
            sum:0,
            end_radio:null,
            onShow:true,
            onShow_1:false,
            onShow_2:false,
            onShow_3:false,
            onShow_4:false,
            onShow_5:false,
            data:{},
            id:'',
            wx:false,
            zfb:false,
            pf:false,
            yd:false,
            yhk:false
        }
    },
    created(){
        this.showData()       
    },    
}
</script>

<style scoped>
.changetheColor{
    background-color: #07c160!important;
}
h3{
    display: block;
    margin: 10px 0;
    text-align: center;
}
header {
    height: 64px;
    font-size: 13px;
}
.top {
    width: 9.733333rem;
    margin: .08rem .106667rem 0 .16rem;
    height: 15px;
}
.top  ul {
    margin-right: 5px;
}
.top  ul li {
    display: block;
    float: left;
    height: 4px;
    width: 4px;
    margin: 6px 1px 0 0 ;
    border-radius: 50%;
    border: 1px solid black;
    background-color: black;
    margin-left: 1px;
}
.top  ul :nth-child(4),.top  ul :nth-child(5){
    background-color: #fff;
}
.title {
    margin: 12px .08rem 0 .08rem;
    font-size: 18px
}
section {
    padding: 10px 0;
    background-color: #f1f3f5;
    height: 200px;
}
.bg{
    font-size: 14px;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    background-image: url('../assets/bg.png');
    background-size:100% 100%; 
    background-repeat: no-repeat;  
    width: 90%;
    height: 200px; 
    color: #ffffff;
}
.fee {
    margin: .32rem 0.1rem 0 4.5rem;
    float: left;
    width: 1.333333rem;
    height: 20px;
    border-radius: 10px;
    background-color: #d7effd ;
    font-weight:200;
    text-align: center;
    color: #1890FF;
}
.in_time,.out_time {
    font-size: .493333rem;
    width:100%;
    margin: 20px 15px;
    float: left;
}
.bg i {
    position: absolute;
    display: block;
    top: 123px;
    right:150px;
    margin-top: 30px;
    margin-left: -15px;
    font-size: .573333rem;
}
.bg span {
    position: absolute;
    display: block;
    top: 30px;
    right:20px;
    margin: 100px 0 0 100px;
    font-size: 47px;
}
.car_id {
    float:left;
    width:2rem;
    margin: .32rem 0 20px .426667rem;
}
.pay_button{
    transform: translate(5%,0);
    padding-top: 5px;
    width: 90%;
    height: 44px;
    font-size: 25px;
    text-align: center;
    color: #fff;
    background-color: #21C4B3;
    margin-top: 5px;
}
.circle i{
    float: left;
    display: block;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: #D8D8D8;
}
.circle_2 i{
    float: left;
    display: block;
    height: 21px;
    width: 21px;
    border-radius: 50%;
    border: 1px solid #D8D8D8;
    background-color: #fff;
}
.pay {
    height: 70px;  
}
.pay span {
    padding-left: 20px;
}
.circle,.circle_2{
    float: left;
    margin: .32rem 0 0 .426667rem;
    width:1.2rem;
    height:50px
}
.circle_2 {
    float: right;
    position: absolute;
    top: 0;
    right: 0;
}
.radio{
    position: relative;
    width: 8.2rem;
    height: 64px;
    float: left;
    border-bottom: 1px solid #D8D8D8; 
}
.pay_type{
    margin-top: 10px;
    font-size: 18px
}
.radio p{
    margin: 0;
    font-size: 12px
}
.warn {
    padding-top: 10px;
    font-size: 16px;
    position: absolute;
    width: 130px;
    height: 30px;
    background-color: #aaa6a6;
    color: #fff;
    text-align: center;
    top: 250px;
    left: 50%;
    transform: translate(-50%,0);
    border-radius: 15px
}
</style>
