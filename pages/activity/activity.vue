<template>
	<view class="page-view">
		<view class="tabs">
			<view :class="active === 1 ? 'tab active' : 'tab'">
				<view class="tab-text" @click="toggle(1)">宅社主办</view>
			</view>
			<view :class="active !== 1 ? 'tab active' : 'tab'">
				<view class="tab-text" @click="toggle('')">其他活动</view>
			</view>
		</view>
		
		<scroll-view class="list-view" scroll-y>
			<template v-for="(item, $index) in activityList">
				<view class="the-activity" :key="$index">
					<view class="activity-left">
						<view class="img" :style="{backgroundImage: `url(${item.src})`}"></view>
					</view>
					<view class="activity-right">
						<view class="activity-title">{{item.title}}</view>
						<view class="activity-desc">{{item.desc}}</view>

						<view class="activity-info">
							<!-- <view class="info">活动时间：{{item.startTime}} ~ {{item.endTime}}</view> -->
							<!-- <view class="info">活动人数：{{item.number}}</view> -->
							<!-- <view class="info">活动方式：{{item.mode}}</view> -->
							<view class="info">活动费用：{{item.fee || '免费'}}</view>
						</view>
						<view class="activity-link">查看</view>          
					</view>
				</view>
			</template>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 1,
				activityList: [],
			}
		},
		onLoad() {
			this.getActivityList();
			uni.startPullDownRefresh();
		},
		methods: {
			toggle(item) {
				this.active = item;
				this.getActivityList();
			},
			getActivityList() {
				let that = this;
				var query = this.$Bmob.Query('activity');
				this.activityList = [];
				let arr = [];
				
				query.order('-updatedAt');
				if (this.active) {
					query.equalTo('sort', '==', 1);
				} else {
					query.equalTo('sort', '!=', 1);
				}
				query.find().then((res) => {
					uni.stopPullDownRefresh();
					// that.loading = false;
					for (let i = 0; i < res.length; i += 1) {
						for (let key in res[i].startTime) {
							if (key === 'iso') {
								res[i].startTime = res[i].startTime[key];
							}
						}
						for (let key in res[i].endTime) {
							if (key === 'iso') {
								res[i].endTime = res[i].endTime[key];
							}
						}
						arr.push({
							id: res[i].objectId,
							src: res[i].imgSrc,
							title: res[i].title,
							desc: res[i].desc,
							// startTime: that.$moment(res[i].startTime).format('YYYY-MM-DD HH:mm'),
							// endTime: that.$moment(res[i].endTime).format('YYYY-MM-DD HH:mm'),
							number: res[i].number,
							// mode: that.modeList[res[i].mode - 1].label,
							fee: res[i].fee,
						});
					}
					that.activityList = arr;
				});
			},
			onPullDownRefresh() {
					console.log('refresh');
					// setTimeout(function () {
					// 		uni.stopPullDownRefresh();
					// }, 1000);
					this.getActivityList();
			}
		}
	}
</script>

<style lang="scss">
	.page-view {
		box-sizing: border-box;
		.tabs {
			display: flex;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 2rpx solid #eee;
			.tab {
				flex: 1;
				color: #999;
				text-align: center;
				font-size: 30rpx;
				.tab-text {
					display: inline-block;
					line-height: 78rpx;
				}
				&.active {
					color: #333333;
					.tab-text {
						border-bottom: 4rpx solid #333;
					}
				}
			}
		}
		
		.list-view {
			height: calc(100vh - 82rpx);
			box-sizing: border-box;
		}
	}

</style>
