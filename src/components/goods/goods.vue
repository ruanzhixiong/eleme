<template>
  <div class="goods">
    <div class="menu-wraper" ref="goodleft">
    		<ul>
    			<li v-for="(item,index) in goods" class="meun-list" 
    				:class="{'current':currentIndex===index}"
    				@click = "selectMenu(index)"
    				>
    				<span class="meun-name">{{item.name}}</span>
    			</li>
    		</ul>
    </div>
    <div class="foods-wraper" ref="foods">
    	<ul>
    		<li class="foods-list foods-list-hook" v-for="item in goods" ref="foodList">
    			<h1 class="foods-name">{{item.name}}</h1>
    			<ul>
    				<li class="foods-item" 
    					v-for="food in item.foods"
    					v-on:click = "seclectFood(food)"
    					>
    					<div class="foods-image">
    						<img :src="food.icon"  width="57" height="57"/>
    					</div>
    					<div class="foods-content">
    						<h2 class="foods-title">{{food.name}}</h2>
    						<span class="foods-description aa" v-if="food.description">{{food.description}}</span>
    						<p class="foods-description">
    							<span class="sellCount">月售{{food.sellCount}}份</span>
    							<span class="food-rate">100%</span>
    						</p>
    						<p class="food-price">
    							<span class="price">￥{{food.price}}</span>
    							<span class="oldprice" v-if="food.oldPrice"><del>￥{{food.price}}</del></span>
    						</p>
    					</div>
    					<addfood :food = "food"></addfood>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </div>
    <Shopcar 
    	:seller="seller" 
    	:goods="goods"
    	:select-foods="selectFoods"
    	></Shopcar>
    <food :food="clickFood" ref="food"></food>  	
  </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll';
import Shopcar from '../shopcar/shopcar';
import Bus from '../../assets/eventBus';
import addfood from '../addfood/addfood';
import food from '../food/food';
export default {
	name: 'goods',
	props:["seller"],
	data() {
		return {
			goods:[],
			listHeight:[],
			scrollY:0,			
			clickFood:{}
		}
	},
	components:{
   	 Shopcar,
  	 addfood,
   	 food
  },
	created() {
		this.$http.get('/api/goods').then((response) => {
//			console.log(response.body); //response.body返回数据源
			if(response.body.errno === 0) {
				this.goods = response.body.data;
				console.log(typeof this.goods);
				this.$nextTick(()=>{
					this.initScroll();	
					this.calculateHeight();
				})				
			}
		})
	},
	computed:{
		//滚动高度与list距离顶部高度的判断，关联index
		currentIndex () {		
			for(let i = 0;i<this.listHeight.length;i++){
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i +1];
				if(!height2||this.scrollY>=height1&&this.scrollY<height2){
						return i;
				}
			}
			return 0;
		},
		//addfood添加的count，把选中的师傅添加到数组
		//获取所有食物分类，参考数据结构
		//count存在，说明食物被选中
		//把选中的食物放到数组，shopcar子组件获取数组
		selectFoods() {
			let foods = [];
			this.goods.forEach((good)=>{
				good.foods.forEach((food)=>{
					if(food.count){
						foods.push(food)
					}
				})
			})
			return foods;
		}
	},
	methods:{
		initScroll(){
			this.meunScroll = new BScroll(this.$refs.goodleft,{
				//插件默认阻止了click事件
				click:true
			});
			this.foodsScroll = new BScroll(this.$refs.foods,{
				probeType:3,
				click:true
			});
			//插件监听滚动时间，记录滚动距离scrollY，相当于scrollTop
			this.foodsScroll.on('scroll',(pos)=>{
				this.scrollY =Math.abs( Math.round(pos.y));
			})
		},
		//记录每个lit距离foodswraper顶部的距离，相当于offsettop
		calculateHeight(){
			let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
//    console.log(this.listHeight);
		},
		selectMenu (index){
			console.log(index);
			let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
		},
		seclectFood(food){
			this.clickFood = food;
			this.$refs.food.show();
		}
	},
	mounted (){
		Bus.$on("fromSeller",(msg)=>{
					this.seller = msg;
					console.log("同级组件传递的数据")
					console.log(this.seller)
		})
		var header = $(".header").height();
		var tab = $(".tab").height();
		$(".goods").css({"top":header+tab+1+"px"})
	}
	
}</script>
<style type="text/css">
.goods {
	position: absolute;
	bottom: 48px;
	width: 100%;
	display: flex;
	overflow: hidden;
	flex-direction: row;
}
.menu-wraper {
	width: 80px;
	background: #f3f5f7;
}

.foods-wraper {
	flex: 1;
}
.meun-list{
	display: table;	
	height: 54px;
	width: 56px;
	font-size: 12px;
	line-height: 14px;
	padding: 0 12px;
}
.current{
	background: white;
	font-weight: 700;
}
.meun-name{
	display: table-cell;
	vertical-align: middle;
}
.foods-name{
	margin: 0;
	font-size: 12px;
	background:#f3f5f7;
	height: 26px;
	line-height: 26px;
	text-indent:14px;
	box-sizing: border-box;
	border-left: 2px solid #d9dde1;
	color: rgb(147,153,159);
}
.foods-item{
	position: relative;
	box-sizing:border-box;
	margin: 0 18px;
	padding: 18px 0;
	border-bottom: 1px solid rgba(7,17,27,.1);
}
.foods-item:last-child{
	border-bottom: transparent;
}
.foods-image{
	display: inline-block;
	overflow: hidden;
	border-radius: 3px;
	vertical-align: top;
}
.foods-image img{
	display: block;
}
.foods-content{
	display: inline-block;
	box-sizing: border-box;
	padding-left: 10px;
}
.foods-title{
	margin: 0;
	font-size: 14px;
	line-height: 14px;
	color: rgb(7,17,27);
}
.aa{
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	width: 150px;
	text-overflow: ellipsis;
}
.foods-description{
	font-size: 10px;
	line-height: 10px;
	color:rgb(147,153,159);
	margin-top: 8px;
	
}
.sellCount{
	margin-right: 12px;
}
.food-price{
		margin-top: 8px;
}
.food-price .price{
	font-size: 14px;
	color: red;
	font-weight: 700;
	line-height: 24px;

	margin-right:8px ;
}
.oldprice{
	color:rgb(147,153,159);
	font-size: 10px;
}

</style>