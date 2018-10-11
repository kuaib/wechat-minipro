Page({
	data: {
		prodList: [], // 商品列表
		hasChoosed: '还未添加商品',
		choosePrice: '满￥90元起送',
		sumPrice: 0,	// 已选中的总价格
		count: 0,		// 已选中的总数量
		activeLeft: false,
		activeRight: false,
		pathName: 'index',	// 文件路径名称，用于切换footer
	},
	onLoad() {
		this.setData({
			prodList: [
				{
					id: '1101',
					name: 'N300纤食杯风味发酵乳',
					price: 19.8,
					unit: '盒',
					num: 0,
					isLimit: true,
					imgUrl: '../../images/flower.jpg'
				},
				{
					id: '1102',
					name: '黄桃百香果三三三倍酸奶',
					price: 17.8,
					unit: '盒',
					num: 0,
					isLimit: false,
					imgUrl: '../../images/flower.jpg'
				},
				{
					id: '1103',
					name: '羽衣甘蓝芒果蔬舒果昔',
					price: 12.8,
					unit: '支',
					num: 0,
					isLimit: true,
					imgUrl: '../../images/flower.jpg'
				},
				{
					id: '1104',
					name: '南瓜百香果蔬舒果昔',
					price: 12.8,
					unit: '支',
					num: 0,
					isLimit: true,
					imgUrl: '../../images/flower.jpg'
				},
				{
					id: '1105',
					name: '原味三三三倍酸奶',
					price: 15,
					unit: '盒',
					num: 0,
					isLimit: true,
					imgUrl: '../../images/flower.jpg'
				},
				{
					id: '1106',
					name: '紫薯黑米三三三倍酸奶',
					price: 17.9,
					unit: '盒',
					num: 0,
					isLimit: true,
					imgUrl: '../../images/flower.jpg'
				},
				{
					id: '1107',
					name: '榛子香草三三三倍酸奶',
					price: 17.9,
					unit: '盒',
					num: 0,
					isLimit: true,
					imgUrl: '../../images/flower.jpg'
				},
				{
					id: '1108',
					name: '桂花马蹄三三三倍酸奶',
					price: 17.9,
					unit: '盒',
					num: 0,
					isLimit: true,
					imgUrl: '../../images/flower.jpg'
				}
			]
		})
	},
	// 减少商品数量
	decreaseAct(e) {
		let idx = e.currentTarget.dataset.idx;
		let proNum = 'prodList[' + idx + '].num';
		let num = this.data.prodList[idx].num - 1;
		let price = this.data.prodList[idx].price;
		if((this.data.sumPrice).toFixed(2) <= price) {
			this.setData({
				[proNum]: num,
				sumPrice: 0,
				count: this.data.count - 1,
				activeLeft: false,
				hasChoosed: '还未添加商品'
			}, () => {
				this.setData({
					choosePrice: '满￥90元起送'
				})
			})
		} else if((this.data.sumPrice).toFixed(2) - price >=90) {
			this.setData({
				[proNum]: num,
				sumPrice: this.data.sumPrice - price,	
				count: this.data.count - 1,
				activeLeft: true
			}, () => {
				this.setData({
					choosePrice: '立即购买',
					hasChoosed: '已选购：' + this.data.count + '盒',
					activeRight: true
				})
			})
		}
		else {
			this.setData({
				[proNum]: num,
				sumPrice: this.data.sumPrice - price,	
				count: this.data.count - 1,
				activeLeft: true
			}, () => {
				this.setData({
					choosePrice: '还差￥' + (90 - this.data.sumPrice).toFixed(2),
					hasChoosed: '已选购：' + this.data.count + '盒',
					activeRight: false
				})
			})
		}
	},

	// 增加数量
	increaseAct(e) {
		let idx = e.currentTarget.dataset.idx;
		let proNum = 'prodList[' + idx + '].num';
		let num = this.data.prodList[idx].num + 1;
		let price = this.data.prodList[idx].price;

		if((90 - this.data.sumPrice).toFixed(2) > price) {
			this.setData({
				[proNum]: num,
				sumPrice: this.data.sumPrice + price,
				count: this.data.count + 1,
				activeLeft: true
			}, () => {
				this.setData({
					choosePrice: '还差￥' + (90 - this.data.sumPrice).toFixed(2),
					hasChoosed: '已选购：' + this.data.count + '盒'
				})
			})
		} 
		else {
			this.setData({
				[proNum]: num,
				sumPrice: this.data.sumPrice + price,	
				count: this.data.count + 1,
				activeLeft: true
				
			}, () => {
				this.setData({
					choosePrice: '立即购买',
					activeRight: true,
					hasChoosed: '已选购：' + this.data.count + '盒'
				})
			})
		}
	},

	// 立即购买
	goBuy() {
		if(this.data.activeRight) {
			wx.navigateTo({
				url: '/pages/confirmOrder/confirmOrder'
			})
		}
	}
})