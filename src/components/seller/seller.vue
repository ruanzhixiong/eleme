<template>
	<div class="seller">
		<div class="sellerName">
			<h3 class="name">{{seller.name}}</h3>
			<p>
				<star :score="seller.score" :itemWidth="14" class="selleScore"></star>
				<span class="sellCount">月售{{seller.sellCount}}单</span>
			</p>
			<div class="like">
				<span class="icon-favorite"></span>
				<span>已收藏</span>
			</div>
		</div>
		<div class="sellerOther">
			<div class="nums">
				<p>起送价</p>
				<p class="deliverys">{{seller.minPrice}}<span>元</span></p>
			</div>
			<div class="nums">
				<p>配送费</p>
				<p class="deliverys">{{seller.deliveryPrice}}<span>元</span></p>
			</div>
			<div class="nums">
				<p>平均配送时间</p>
				<p class="deliverys">{{seller.deliveryTime}}<span>分钟</span></p>
			</div>
		</div>
		<div class="lines"></div>
		<div class="actives">
			<h3>活动公告</h3>
			<p>{{seller.bulletin}}</p>
		</div>
		<ul class="supports">
			<li v-for="(item,index) in seller.supports">
				<span class="bb" :class="'bb'+index"></span>
				{{item.description}}
			</li>
		</ul>
		<div class="lines"></div>
		<div class="pics">
			<h3>商家实景</h3>
			<ul>
				<li v-for="item in seller.pics" 
					class="pics-item"
					@click="clickPic(item)">
					<img :src="item" width="100%" height="100%"/>
				</li>
			</ul>
		</div>
		<div class="sellerInfos">
			<h3>商家信息</h3>
			<ul>
				<li  v-for="item in seller.infos">
					{{item}}
				</li>
			</ul>
		</div>
		<transition name="picHide">
			<div class="picHide" 
				v-show="show"
				@click="clickPic(picSrc)">
				<img :src="picSrc" width="100%" />
			</div>
		</transition>
	</div>
</template>
<script type="text/javascript">
import star from '../star/star';
	export default {
		name: 'seller',
		props:['seller'],
		data(){
			return{
				show:false,
				picSrc:""
			}
		},
		components:{
			star
		},
		mounted(){
			var header = $(".header").height();
			var tab = $(".tab").height();
			$(".seller").css({"top":header+tab+1+"px"})
		},
		methods:{
			clickPic(pic){
				this.show=!this.show;
				this.picSrc = pic;
			}
		}
	}
</script>
<style type="text/css" scoped>
h3{
	margin: 0;
}
.seller{
	position: absolute;
		width: 100%;
		bottom: 0;
		overflow: auto;
}
	.sellerName{
		margin: 0 18px;
		padding: 18px 0;
		position: relative;
		border-bottom: 1px solid rgba(147, 153, 159,.1);
	}
	.sellerName .name{
		font-size: 14px;
		line-height: 14px;
		color: rgba(7, 17, 27, 1);
		margin: 0;
	}
	.selleScore{
		vertical-align: middle;
	}
	.sellCount{
		display: inline-block;
		padding-top: 9px;
		font-size: 10px;
		line-height: 18px;
		color: rgb(77,85,93);
	}
	.like{
		position: absolute;
		right: 18px;
		top: 18px;
		text-align: center;
	}
	.like span{
		display: block;
	}
	.like span:first-child{
			font-size: 24px;
			color: rgb(200,20,0);
			line-height: 24px;
		}
		.like span:last-child{
			color: rgb(77,85,93);
			font-size: 10px;
			line-height: 10px;
			margin-top: 4px;
	}
	.sellerOther{
		display: flex;
		padding: 18px 0;
	}
	.nums{
		flex: 1;
		text-align: center;
		font-size: 10px;
		border-right: 1px solid rgba(147, 153, 159,.1);
	}
	.nums:last-child{
		border-right:none;
	}
	.nums p:first-child{
		color: rgb(147, 153, 159);
	}
	.deliverys{
		font-size: 24px;
		line-height: 24px;
		font-weight: 200;
		color: rgb(7,17,27);
		margin-top: 4px;
	}
	.deliverys span{
		font-size: 10px;
	}
	.lines {
		height: 16px;
		width: 100%;
		background: #f3f5f7;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(7, 17, 27, .1);
		border-top: 1px solid rgba(7, 17, 27, .1);
	}
	.actives{
		padding: 18px;
	}
	.actives h3{
		margin: 0;
		margin-bottom: 8px;
		font-size: 14px;
	}
	.actives p{
		padding: 0 12px;
		font-size: 12px;
		font-weight: 200;
		color: rgb(240,20,20);
		line-height: 24px;
	}
	.supports{
		padding: 0 18px;
	}
	.supports li{
		padding:16px 12px ;
		border-top: 1px solid rgba(7, 17, 27, .1);
		font-size: 14px;
		font-weight: 200;
		color: rgb(7,17,27);
		line-height: 16px;
	}
	.bb{
		display: inline-block;
		height: 16px;
		width: 16px;
		vertical-align: middle;
		background-repeat:no-repeat ;
		background-size: 100%;
	}
	.bb0,.bb1{
		background-image: url(../../assets/decrease_1@2x.png);
	}
	.bb2{
		background-image: url(../../assets/special_1@2x.png);
	}
	.bb3{
		background-image: url(../../assets/invoice_1@2x.png);
	}
	.bb4{
		background-image: url(../../assets/guarantee_1@2x.png);
	}
	.pics{
		padding: 18px 0 18px 18px;
	}
	.pics h3{
		margin: 0;
		margin-bottom:12px ;
	}
	.pics ul{
		overflow: auto;
		 white-space: nowrap;
		/*width: 100%;*/
		/*height: 90px;*/
	}
	.pics-item{
		display: inline-block;
		height: 90px;
		width: 120px;
		overflow: hidden;
		margin-right: 6px;
	}
	.sellerInfos{
		padding:18px;
	}
	.sellerInfos h3{
		margin-bottom: 12px;
	}
	.sellerInfos li{
		padding: 16px 12px;
		font-size: 12px;
		font-weight: 200px;
		line-height: 16px;
		color: (7,17,27);
		border-top: 1px solid rgba(7,17,27,.1);
	}
	.picHide{
		position: fixed;
		z-index: 100;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		background:rgba(7, 17, 27, .8);
		text-align: center;
		box-sizing: border-box;
		padding: 36px 18px;
	}
	.picHide img{
		transform: translateY(30%);
	}
	.picHide-enter-active,.picHide-leave-active{
		transition: all .5s;
	}
	.picHide-enter,.picHide-leave-to{
		opacity: 0;
		transform: scale(0);
	}
</style>
