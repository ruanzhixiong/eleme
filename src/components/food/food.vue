<template>
	<transition name="foods">
		<div class="food" v-show="showFlag">
			<div class="foodWraper">
				<div class="foodheader">
					<span class="icon-arrow_lift" @click="hide">
					</span>
				</div>
				<div class="pic">
					<img :src="food.image" width="100%" />
				</div>
				<div class="foodcontent">
					<div class="foodbase">
						<h2 class="foodname">{{food.name}}</h2>
						<div class="sell-rate">
							<span>月销量{{food.sellCount}}份</span>
							<span>好评率{{food.rating}}%</span>
						</div>
						<div class="foodprice">
							<span>￥{{food.price}}</span>
							<span v-if="food.oldPrice"><del>￥{{food.oldPrice}}</del></span>
						</div>
						<div class="jioncar" 
							v-if="hasjoin"
							@click="addfoods">加入购物车</div>
						<addfood 
							v-else 
							:food="food" 
							class="addcars"></addfood>
					</div>
					<div class="lines"></div>
					<div class="foodintro" v-if="food.info">
						<h3 class="title">商品介绍</h3>
						<p class="conts">{{food.info}}</p>
					</div>
					<div class="lines" v-if="food.info"></div>
					<div class="foodrate">
						<h3 class="title">商品评价</h3>
						<div class="rate-title">
							<span class="all" @click="all">全部</span>
							<span class="good">推荐</span>
							<span class="bad">吐槽</span>
						</div>
					</div>
					<div class="choose" @click="onlyCon()">
						<span class="icon-check_circle" :class="{hasacitive:hasRate}"></span>
						<span>选择有内容的评论</span>
					</div>
					<ul class="ratelist">
						<li v-for="item in foodList.ratings" v-show="onShow(item.text)">
							<div class="time">
								<span>{{item.rateTime | formatDate}}</span>
								<div class="user">
									<span class="username">{{item.username}}</span>
									<span class="vater"><img :src="item.avatar" width="100%"/></span>
								</div>
							</div>
							<p class="rating">
								<span :class="[item.rateType ? 'icon-thumb_down':'icon-thumb_up']"></span> 
								{{item.text}}
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import Vue from 'vue';
	import addfood from "../addfood/addfood";
	export default {
		name: "food",
		props: ['food'],
		data() {
			return {
			  showFlag: false,
			  hasRate: false,
			  foodList:{}			  
			}
		},
		components:{
			addfood
		},
		methods: {
			show() {
				this.showFlag = true;
			},
			hide() {
				this.showFlag = false;
			},
			onlyCon() {
				this.hasRate = !this.hasRate;

			},
			onShow(text) {
				if(this.hasRate && !text) {
					return false;;
				} else {
					return true;
				}
			},
			all(){
				this.foodList = this.food;
				
			},
			addfoods(){
				if(!this.food.count){
					Vue.set(this.food, 'count', 1);
				}
			}
		},
		computed:{
			hasjoin(){
				let addF = true;
				if(this.food.count){
					addF = false;
					return addF
				}else{
					addF = true;
					return addF
				}
			}
		},
		//自定义过滤器
		filters: {
			formatDate(obj) {
				var date = new Date(obj);
				var y = 1900 + date.getYear();
				var m = "0" + (date.getMonth() + 1);
				var d = "0" + date.getDate();
				var h = date.getHours();
				return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
			}
		}
	}
</script>
<style type="text/css" scoped>
	.food {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		width: 100%;
		z-index: 0;
		background: #FFFFFF;
	}
	
	.foods-enter-active,
	.foods-leave-active {
		transition: all .5s;
	}
	
	.foods-enter,
	.foods-leave-to {
		opacity: 0;
		transform: translate3D(100%, 0, 0);
	}
	
	.foodWraper {
		max-height: 100%;
		overflow: auto;
	}
	
	.foodheader {
		position: fixed;
		top: 0;
		width: 100%;
		background: transparent;
		box-sizing: border-box;
		padding: 12px;
	}
	
	.foodheader span {
		display: inline-block;
		font-size: 20px;
		line-height: 36px;
		text-align: center;
		height: 36px;
		width: 36px;
		border-radius: 100%;
		background: rgba(7, 17, 27, .4);
		color: whitesmoke;
	}
	
	.pic {
		max-height: 280px;
		width: 100%;
		overflow: hidden;
	}
	
	.foodbase {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		padding: 18px;
	}
	
	.foodname {
		margin: 0;
		font-size: 14px;
		line-height: 28px;
		color: rgb(7, 17, 27);
		font-weight: 700;
	}
	
	.sell-rate {
		font-size: 10px;
		line-height: 20px;
		color: rgb(147, 153, 159);
		margin-top: 8px;
	}
	
	.sell-rate span:first-child {
		margin-right: 12px;
	}
	
	.foodprice {
		margin-top: 18px;
	}
	
	.foodprice span {
		display: inline-block;
		line-height: 48px;
		color: rgb(147, 153, 159);
		font-size: 14px;
	}
	
	.foodprice span:first-child {
		color: rgb(240, 20, 20);
		font-weight: 700;
		margin-right: 12px;
		font-size: 16px;
	}
	
	.jioncar {
		width: 74px;
		height: 24px;
		border-radius: 12px;
		background: dodgerblue;
		position: absolute;
		bottom: 18px;
		right: 18px;
		color: #FFFFFF;
		font-size: 10px;
		text-align: center;
		line-height: 24px;
	}
	.addcars{
		bottom: 18px;
		right: 18px;
	}
	.lines {
		height: 16px;
		width: 100%;
		background: #f3f5f7;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
		border-top: 1px solid rgba(7, 17, 27, .1);
	}
	
	.foodintro {
		padding: 18px;
	}
	
	.title {
		margin: 0;
		font-size: 16px;
	}
	
	.conts {
		padding: 6px 8px;
		font-size: 12px;
		color: rgb(77, 85, 93);
		line-height: 24px;
	}
	
	.foodrate {
		padding: 18px 0;
		margin: 0 18px;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
	}
	
	.rate-title {
		padding-top: 18px;
	}
	
	.rate-title span {
		display: inline-block;
		width: 36px;
		height: 24px;
		line-height: 24px;
		font-size: 12px;
		text-align: center;
		border-radius: 2px;
	}
	
	.all {
		background: rgb(0, 160, 220);
		color: #fff;
	}
	
	.good {
		background: rgba(0, 160, 220, .2);
		color: rgb(77, 85, 93);
	}
	
	.bad {
		background: rgba(77, 85, 93, .1);
		color: rgb(77, 85, 93);
	}
	
	.choose {
		padding: 18px;
		line-height: 24px;
		color: rgb(147, 153, 159);
		font-size: 12px;
		border-bottom: 1px solid rgba(7, 17, 27, .2);
	}
	
	.choose span:first-child {
		font-size: 24px;
		vertical-align: middle;
	}
	
	.ratelist {
		font-size: 12px;
		padding: 0 18px;
	}
	
	.ratelist li {
		padding: 16px 0;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
	}
	
	.time {
		line-height: 14px;
		color: rgba(147, 153, 159, 1);
	}
	
	.rating {
		font-size: 14px;
		line-height: 16px;
		color: rgb(7, 17, 27);
	}
	
	.icon-thumb_up,
	.icon-thumb_down {
		line-height: 24px;
		vertical-align: middle;
		color: rgb(0, 160, 220);
	}
	
	.hasacitive {
		color: rgb(0, 160, 220);
	}
	
	.icon-thumb_down {
		color: rgba(147, 153, 159, 1);
	}
	
	.user {
		float: right;
	}
	
	.username {
		display: inline-block;
	}
	
	.vater {
		display: inline-block;
		overflow: hidden;
		width: 12px;
		height: 12px;
		margin-left: 6px;
		border-radius: 50%;
		vertical-align: bottom;
	}
</style>