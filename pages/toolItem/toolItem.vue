<template>
	<view class="tool-page">
		<view class="tool-info">
			<view class="the-tool">
				<view class="tool-left">
					<image :src="info.imgSrc" mode="aspectFill"></image>
				</view>
				<view class="tool-right">
					<view class="tool-title">{{info.title}}</view>
					<view class="tool-desc">{{info.desc}}</view>
				</view>
			</view>
			
			<view class="tool-data">
				<view class="tool-website">官网：{{info.website}}</view>
				<view class="tool-sell">已售99</view>
			</view>
		</view>
		
		<view class="tool-btm">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				info: ''
			}
		},
		onLoad(option) {
			console.log(option);
			this.id = option.id;
		},
		onShow() {
			this.getInfo();
		},
		methods: {
			getInfo() {
				var query = this.$Bmob.Query('product');
				query.get(this.id).then((res) => {
					this.info = {
						imgSrc: res.imgSrc,
						title: res.title,
						desc: res.desc,
						website: res.website
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}
	.tool-page {
		.tool-info {
			padding: 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			.the-tool {
				display: flex;
				.tool-left {
					width: 160rpx;
					height: 160rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.tool-right {
					flex: 1;
					padding-left: 30rpx;
					box-sizing: border-box;
					.tool-title {
						margin-bottom: 20rpx;
						font-size: 36rpx;
						color: #333;
						font-weight: bold;
					}
					.tool-desc {
						font-size: 20rpx;
						color: #666;
					}
				}
			}
			.tool-data {
				display: flex;
				padding: 20rpx 0;
				font-size: 20rpx;
				color: #999;
				.tool-sell {
					flex: 1;
					text-align: right;
				}
			}
		}
		
		.tool-btm {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			background-color: #fff;
		}
	}
</style>
