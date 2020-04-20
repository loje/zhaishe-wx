<template>
	<scroll-view class="list-view" scroll-y>
		<template v-for="(item, $index) in toolList">
			<view class="the-tool" :key="$index">
				<view class="tool-left">
					<image class="img" :src="item.imgSrc" lazy-load mode="widthFix"></image>
				</view>
				<view class="tool-right">
					<view class="tool-title">{{item.title}}</view>
					<view class="tool-desc">{{item.desc}}</view>
					<view class="tool-btm">
						<text class="sell">已售0</text>
						<text class="buy">去购买</text>
					</view>
				</view>
			</view>
		</template>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				toolList: []
			}
		},
		onLoad() {
			this.getToolList();
			uni.startPullDownRefresh();
		},
		methods: {
			getToolList() {
				var query = this.$Bmob.Query('product');
				this.toolList = [];
				let arr = [];
				
				query.order('-endTime');
				query.equalTo('notDelete', '==', true);
				query.find().then((res) => {
					uni.stopPullDownRefresh();
					// that.loading = false;
					for (let i = 0; i < res.length; i += 1) {          
						arr.push({
							id: res[i].objectId,
							imgSrc: res[i].imgSrc,
							title: res[i].title,
							desc: res[i].desc,
						});
					}
					this.toolList = arr;
				});
			},
			onPullDownRefresh() {
					console.log('refresh');
					// setTimeout(function () {
					// 		uni.stopPullDownRefresh();
					// }, 1000);
					this.getToolList();
			}
		}
	}
</script>

<style lang="scss">
	.list-view {
		box-sizing: border-box;
		.the-tool {
			display: flex;
			padding: 30rpx;
			height: 220rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #eee;
			.tool-left {
				width: 160rpx;
				.img {
					width: 160rpx;
					height: 160rpx;
				}
			}
			.tool-right {
				position: relative;
				flex: 1;
				padding-left: 30rpx;
				.tool-title {
					font-size: 30rpx;
					color: #333;
				}
				.tool-desc {
					padding-top: 24rpx;
					font-size: 24rpx;
					color: #666;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				.tool-btm {
					position: absolute;
					left: 0;
					bottom: 0;
					padding: 0 30rpx;
					width: 100%;
					font-size: 24rpx;
					color: #999;
					box-sizing: border-box;
					.buy {
						position: absolute;
						right: 0;
						bottom:0;
						font-size: 24rpx;
						color: #F4751D;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
