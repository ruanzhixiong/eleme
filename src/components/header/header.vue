<template>

	<div class="header">

		<div class="headerWrap">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<div class="sellerInfor">
				<p class="name"><span class="brandPic"><img src="../../../resource/img/brand@2x.png"/></span>{{seller.name}}</p>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="decrease">
        		<img src="../../../resource/img/decrease_1@2x.png"/>
        	</span>
					<span class="text1">{{seller.description}}</span>
				</div>
				<div class="supportCount" v-if="seller.supports" @click='showDetail()'>
					<span class="count">{{seller.supports.length}}个</span>
					<i class="icon-keyboard_arrow_right"></i>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper" @click='showDetail()'>
			<span class="bulletinPic"><img src="../../../resource/img/bulletin@2x.png"/></span>
			<span class="bulletin">{{seller.bulletin}}</span>
		</div>
		<div class="bg">
			<img :src="seller.avatar" width="100%">
		</div>
		<transition name='fade'>
			<div class="detail" v-show="detailShow" @click='colseDetail()'>
				<div class="detailWrap">
					<h1 class="sellName">{{seller.name}}</h1>
					<star :score="seller.score"
						:itemWidth ="14"
						 class='header-star'></star>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="supports" v-if="seller.supports">
						<li v-for='(item,index) in seller.supports'>
							<span :class="'aa'+index" class="supportsIcon"></span>
							<span>{{item.description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="content">{{seller.bulletin}}</p>
					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>

	</div>
</template>
<script type="text/javascript">
	import star from '../star/star';
	import Bus from '../../assets/eventBus';
	export default {
		name: 'header',
		props: ["seller"],
		data() {
			return {
				detailShow: false
			}
		},
		components: {
			star
		},
		methods: {
			showDetail() {
				this.detailShow = true;
			},
			colseDetail() {
				this.detailShow = false;
			}
		},
		created() {
			Bus.$emit("fromSeller", this.seller)
		}
	}
</script>
<style>
	.header {
		/*height: 134px;*/
		position: relative;
		background-color: rgba(0, 0, 0, .2);
	}
	
	.headerWrap {
		padding: 24px 12px 18px 24px;
	}
	
	.avatar {
		display: inline-block;
		overflow: hidden;
		border-radius: 2px;
	}
	
	.avatar img {
		display: block;
		vertical-align: top;
	}
	
	.sellerInfor {
		display: inline-block;
		margin-left: 16px;
	}
	
	.name {
		font-size: 16px;
		line-height: 16px;
		font-weight: bold;
		/*margin-top: 2px;*/
		color: rgb(255, 255, 255)
	}
	
	.brandPic {
		display: inline-block;
		margin-right: 6px;
		height: 18px;
		vertical-align: middle;
	}
	
	.brandPic img {
		height: 100%;
		/*vertical-align: middle;*/
		display: block;
	}
	
	.description {
		margin-top: 8px;
		font-size: 12px;
		color: rgb(255, 255, 255);
		font-weight: 200;
		line-height: 12px;
	}
	
	.support {
		margin-top: 10px;
		font-size: 10px;
		color: rgb(255, 255, 255);
		font-weight: 200;
		line-height: 12px;
	}
	
	.decrease {
		display: inline-block;
		height: 12px;
		vertical-align: middle;
	}
	
	.decrease img {
		display: block;
		height: 12px;
		/*vertical-align: middle;*/
	}
	
	.supportCount {
		position: absolute;
		right: 12px;
		bottom: 42px;
		border-radius: 8px;
		background-color: rgba(0, 0, 0, .2);
		font-size: 10px;
		color: rgb(255, 255, 255);
		font-weight: 200;
		line-height: 24px;
		padding: 0 7px;
	}
	
	.icon-keyboard_arrow_right {
		margin-left: 2px;
		vertical-align: middle;
	}
	
	.bulletin-wrapper {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: rgb(255, 255, 255);
		background-color: rgba(7, 17, 27, .2);
		padding: 6px 0;
	}
	
	.bulletinPic {
		display: inline-block;
		margin-left: 12px;
		vertical-align: middle;
		height: 14px;
	}
	
	.bulletinPic img {
		height: 14px;
		display: block;
	}
	
	.bulletin {
		font-size: 12px;
		font-weight: 200;
		margin-right: 4px;
	}
	
	.bulletin .icon-keyboard_arrow_right {
		position: absolute;
		right: 12px;
		vertical-align: middle;
		line-height: 28px;
	}
	
	.bg {
		height: 100%;
		width: 100%;
		overflow: hidden;
		filter: blur(8px);
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1
	}
	
	.detail {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(7, 17, 27, .8);
		/*filter: blur(7px);*/
		z-index: 100;
		overflow: auto;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all .5s;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
		background: rgba(7, 17, 27, 0);
	}
	
	.detailWrap {
		box-sizing: border-box;
		min-height: 100%;
		width: 100%;
		padding: 64px 36px 32px;
		text-align: center;
		color: white;
	}
	
	.sellName {
		font-size: 16px;
		font-weight: 700;
		color: white;
	}
	
	.title {
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 28px;
		margin-bottom: 24px;
	}
	
	.text {
		padding: 0 12px;
		font-size: 14px;
	}
	
	.line {
		flex-grow: 1;
		border-bottom: 1px solid rgba(255, 255, 255, .2);
	}
	
	.supports {
		padding: 0 12px;
	}
	
	.supports li {
		text-align: left;
		font-size: 12px;
		font-size: 12px;
		font-weight: 200;
		line-height: 12px;
		margin-bottom: 12px;
	}
	
	.supportsIcon {
		display: inline-block;
		height: 16px;
		width: 16px;
		background-repeat: no-repeat;
		background-size: 16px 16px;
		vertical-align: middle;
		margin-right: 6px;
	}
	
	.aa0 {
		background-image: url(../../../resource/img/decrease_1@2x.png);
	}
	
	.aa1,
	.aa2 {
		background-image: url(../../../resource/img/discount_1@2x.png);
	}
	
	.aa3,
	.aa4 {
		background-image: url(../../../resource/img/guarantee_1@2x.png);
	}
	
	.bulletin {
		padding: 0 12px;
	}
	
	.detail-close {
		position: fixed;
		width: 32px;
		height: 32px;
		font-size: 32px;
		color: white;
		bottom: 32px;
		margin-left: 50%;
		transform: translateX(-16px);
	}
</style>