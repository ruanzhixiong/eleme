<template>
	<div class="ratings">
		<!--<div>User {{ $route.fullPath }}</div>-->
		<div class="summary">
			<div class="left">
				<span class="score">{{seller.score}}</span>
				<span class="zonghe">综合评分</span>
				<span class="compare">高于周边商家{{seller.rankRate}}%</span>
			</div>
			<div class="right">
				<p>
					<span class="common">服务态度</span>
					<star :score="seller.serviceScore" :itemWidth="12" class="serviceScore"></star>
					<span class="scores">{{seller.serviceScore}}</span>
				</p>
				<p>
					<span class="common">食物评分</span>
					<star :score="seller.foodScore" :itemWidth="12" class="serviceScore"></star>
					<span class="scores">{{seller.foodScore}}</span>
				</p>
				<p>
					<span class="common">送达时间</span>

					<span class="delTime">{{seller.deliveryTime}}分钟</span>
				</p>
			</div>
		</div>
		<div class="lines"></div>
		<selects 
			:rating="ratings" 
			@seclectsType="types" 
			class="ratingSelect"></selects>
		<div class="ratings-wrap">
			<ul>
				<li v-for="item in ratingWrap" class="lists">
					<div class="top">
						<span class="vater">
							<img :src="item.avatar" width="28"/>
						</span>
						<div class="deliveryTime">
							<span class="name">{{item.username}}</span>
							<star :score="item.score" :itemWidth="8" class="namestar"></star>
							<span class="arriver" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
						</div>
						<span class="time">{{item.rateTime|formatDate}}</span>
					</div>
					<div class="texts">
						<p>{{item.text}}</p>
						<span :class="[item.rateType ? 'icon-thumb_down':'icon-thumb_up']"></span>
						<span v-for="good in item.recommend" class="recommend">{{good}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Bus from '../../assets/eventBus';
	import Shopcar from '../shopcar/shopcar';
	import star from '../star/star';
	import selects from '../ratingsSelect/ratingSelect';
	export default {
		name: 'ratings',
		props: ["seller"],
		data() {
			return {
				ratings: [],
				rateType: 2,
				ratingList: []
			}
		},
		components: {
			star,
			selects
		},
		computed: {
			ratingWrap() {
				if(this.rateType === 2) {
					this.ratingList = this.ratings
					return this.ratingList
				} else if(this.rateType === 0) {
					let result = [];
					this.ratings.forEach((item) => {
						if(item.rateType === 0) {
							result.push(item);
						}
					})
					this.ratingList = result;
					return this.ratingList
				} else {
					let result = [];
					this.ratings.forEach((item) => {
						if(item.rateType === 1) {
							result.push(item);
						}
					})
					this.ratingList = result;
					return this.ratingList
				}
			}
		},
		methods: {
			types(type) {
				this.rateType = type;
				console.log(this.rateType)
			}
		},
		created() {
			this.$http.get('/api/ratings').then((response) => {
				this.ratings = response.body.data;
				//					console.log(this.ratings)
			})
		},
		mounted() {
			var header = $(".header").height();
			var tab = $(".tab").height();
			$(".ratings").css({
				"top": header + tab + 1 + "px"
			})
		},
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
	.ratings {
		position: absolute;
		width: 100%;
		bottom: 0;
		overflow: auto;
	}
	
	.summary {
		display: flex;
	}
	
	.left {
		width: 135px;
		box-sizing: border-box;
		padding: 18px 0;
		text-align: center;
	}
	
	.left span {
		display: block;
	}
	
	.score {
		font-size: 24px;
		color: rgb(255, 153, 0);
		line-height: 28px;
		font-weight: 700;
	}
	
	.zonghe {
		line-height: 12px;
		font-size: 12px;
		color: rgba(7, 17, 27, 1);
		margin-top: 6px;
	}
	
	.compare {
		font-size: 10px;
		line-height: 10px;
		color: rgb(147, 153, 159);
		margin: 8px 0 6px 0;
	}
	
	.right {
		flex: 1;
		box-sizing: border-box;
		padding: 0 24px;
		margin: 18px 0;
		text-align: start;
		border-left: 1px solid rgba(147, 153, 159, .2);
	}
	
	.common {
		font-size: 12px;
		line-height: 18px;
		color: rgba(7, 17, 27, 1);
	}
	
	.serviceScore {
		height: 16px;
		vertical-align: middle;
	}
	
	.serviceScore span {
		height: 8px;
		width: 8px;
	}
	
	.scores {
		font-size: 12px;
		line-height: 18px;
		color: rgb(255, 153, 0);
	}
	
	.delTime {
		font-size: 12px;
		line-height: 18px;
		color: rgba(147, 153, 159, 1);
	}
	
	.ratings-wrap {
		width: 100%;
		box-sizing: border-box;
		padding: 0 18px;
	}
	
	.ratingSelect {
		padding: 0 18px;
	}
	
	.lines {
		height: 16px;
		width: 100%;
		background: #f3f5f7;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
		border-top: 1px solid rgba(7, 17, 27, .1);
	}
	
	.lists {
		padding: 18px 0;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
	}
	
	.top {
		width: 100%;
		font-size: 12px;
	}
	
	.vater {
		display: inline-block;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		overflow: hidden;
		vertical-align: top;
	}
	
	.deliveryTime {
		display: inline-block;
		margin-left: 12px;
	}
	
	.name {
		display: inline-block;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	
	.time {
		float: right;
		color: rgb(147, 153, 159);
	}
	
	.namestar {
		display: block;
	}
	
	.arriver {
		display: block;
		color: rgb(147, 153, 159);
	}
	
	.texts {
		margin-left: 40px;
		padding: 6px 0 8px 0;
		font-size: 12px;
		color: rgb(7, 17, 27);
		line-height: 16px;
	}
	
	.texts p {
		margin-bottom: 8px;
	}
	
	.icon-thumb_up {
		color: rgb(0, 160, 220);
	}
	
	.icon-thumb_down {
		color: rgba(147, 153, 159, 1);
	}
	
	.recommend {
		font-size: 8px;
		color: rgb(147, 153, 159);
		display: inline-block;
		line-height: 16px;
		padding: 0 6px;
		border: 1px solid rgb(147, 153, 159);
		margin-left: 4px;
		border-radius: 2px;
		margin-bottom: 4px;
	}
</style>