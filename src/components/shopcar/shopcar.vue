<template>
	<div class="shopcar-wrapper">
		<div class="shopcar-button" @click="toggleList">
			<span class="totalNum" v-show="totalCount>0">{{totalCount}}</span>
			<span class="shopcar-icon" :class="[(totalCount>0)?'shopcar-icon-active':'']"><i class="icon-shopping_cart"></i></span>
		</div>
		<div class="total-price">
			<span class="money">￥{{totalPrice}}</span>
		</div>
		<div class="packeage">
			<span>另需配送费￥{{seller.deliveryPrice}}</span>
		</div>
		<div class="total-crash">
			<span class="minPrice" v-show="totalPrice<=0">￥{{seller.minPrice}}起送</span>
			<span class="minPrice" v-show="0<totalPrice&&totalPrice<seller.minPrice">还差￥{{seller.minPrice - totalPrice }}起送</span>
			<span class="delivery" v-show="totalPrice>=seller.minPrice" @click.stop="pay()">去结算</span>
		</div>
		<transition name="slide" >
			<div class="shopcar-list" v-show="fold">
				<div class="list-header">
					<h3>购物车</h3>
					<span class="clean" @click="clean">清空</span>
				</div>
				<div class="content-wrap">
					<div class="list-content">
						<transition-group name="slide" tag="ul">
							<li v-for="(item ,index) in selectFoods" class="list" v-show="item.count>0" :key='index'>
								<div class="list-name">
									{{item.name}}
								</div>
								<span class="list-price">￥{{item.price*item.count}}</span>
								<addfood :food="item" class="list-add"></addfood>
							</li>
						</transition-group>

					</div>
				</div>
				
			</div>
		</transition>
		<div class="hide" v-show="fold"></div>
	</div>
</template>
<script type="text/javascript">
	import addfood from "../addfood/addfood";
	export default {
		name: 'shopcar',
		props: ["seller", "goods", "selectFoods"],
		data() {
			return {
				fold: false,
			}
		},
		components: {
			addfood
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				//    		console.log(count)
				if(count<1){
					this.fold = false;
				}
				return count;
			},
			listShow() {
				if(!this.totalCount) {
					this.fold = false;
					return false;
				}
				this.fold = !this.fold;
				return this.fold;
			}
		},
		methods: {
			toggleList() {
				if(!this.totalCount) {
					return;
				}
				this.fold = !this.fold;
			},
			clean() {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				});
			},
			pay(){
				 window.alert(`支付${this.totalPrice}元`);
			}
		}
	}
</script>
<style type="text/css">
	.shopcar-wrapper {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #141d27;
		height: 48px;
		font-size: 0;
		z-index: 50;
	}
	
	.shopcar-button {
		display: inline-block;
		box-sizing: border-box;
		padding: 6px;
		width: 44px;
		height: 44px;
		border-radius: 100%;
		background: #141d27;
		position: relative;
		top: -10px;
		left: 12px;
	}
	
	.totalNum {
		position: absolute;
		width: 24px;
		line-height: 16px;
		font-size: 10px;
		text-align: center;
		color: white;
		background: red;
		border-radius: 8px;
		right: -4px;
		top: -4px;
		font-weight: 700;
	}
	
	.shopcar-icon {
		display: inline-block;
		width: 100%;
		height: 100%;
		border-radius: 100%;
		background: rgba(255, 255, 255, .4);
		text-align: center;
		font-size: 24px;
		line-height: 38px;
	}
	
	.shopcar-icon-active {
		background: dodgerblue;
		color: white;
	}
	
	.total-price {
		display: inline-block;
		vertical-align: top;
		line-height: 26px;
		font-size: 16px;
		font-weight: 700;
		color: rgba(255, 255, 255, .4);
		margin-top: 12px;
		padding: 0 12px 0 18px;
		border-right: 1px solid rgba(255, 255, 255, .1);
	}
	
	.packeage {
		display: inline-block;
		vertical-align: top;
		line-height: 48px;
		margin-left: 12px;
		font-size: 12px;
		color: rgba(255, 255, 255, .4);
	}
	
	.total-crash {
		position: absolute;
		width: 105px;
		right: 0;
		top: 0;
		height: 48px;
		background: rgba(255, 255, 255, .4);
		display: table;
	}
	
	.total-crash span {
		display: table-cell;
		/*vertical-align: middle;*/
		font-size: 12px;
		font-weight: 700;
		line-height: 48px;
		text-align: center;
		color: rgba(255, 255, 255, .4);
	}
	
	.delivery {
		background: dodgerblue;
		color: white;
	}
	
	.shopcar-list {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transform: translate3d(0, -100%, 0);
		background: #fff;
		box-sizing: border-box;
		z-index: -1;
		overflow: hidden;
	}
	
	.list-header {
		box-sizing: border-box;
		padding: 0 18px;
		background: #f3f5f7;
		width: 100%;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
	}
	
	.list-header h3 {
		margin: 0;
		display: inline-block;
		font-size: 14px;
		line-height: 40px;
		font-weight: 200px;
		color: rgb(7, 17, 27);
	}
	
	.list-header span {
		display: inline-block;
		font-size: 12px;
		line-height: 40px;
		color: rgb(0, 160, 220);
		position: absolute;
		right: 18px;
		top: 0;
	}
	
	.content-wrap {
		max-height: 218px;
		overflow: auto;
	}
	
	.list-content {
		padding: 0 18px;
		/*margin-top: 40px;*/
		font-size: 14px;
	}
	
	.list {
		position: relative;
		height: 43px;
		/*line-height: 43px;*/
		border-bottom: 1px solid rgba(7, 17, 27, .1);
	}
	
	.list:last-child {
		border-bottom: transparent;
	}
	
	.list-name {
		display: inline-block;
		line-height: 24px;
		margin-top: 12px;
	}
	
	.list-add {
		top: 12px;
	}
	
	.slide-enter-active,
	.slide-leave-active {
		transition: all .5s;
	}
	
	.slide-enter,
	.slide-leave-to {
		height: 0;
		opacity: 0;
	}
	.hide{
		position: fixed;
		top: 0;
		height: 100%;
		width: 100%;
		background: rgba(7, 17, 27, .8);
		z-index: -2;
	}
</style>