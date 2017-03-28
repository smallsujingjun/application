/*金额单位管理类*/
Ext.define('app.view.main.region.Monetary',{
	
	statics: {
		values: null,
		getAllMonetary: function(){
			if(!this.values){
				this.values = new Ext.util.MixedCollection();
				this.values.add('unit',this.createAMonetary('', 1, '元'));
				this.values.add('thousand',this.createAMonetary('千', 1000, '千元'));
				this.values.add('tenthousand',this.createAMonetary('万', 10000, '万元'));
				this.values.add('million',this.createAMonetary('M', 100*10000, '百万元'));
				this.values.add('hundredmillion',this.createAMonetary('亿', 10000*10000, '亿元'));
			}
			return this.values;
		},
		createAMonetary: function(monetaryText,monetaryUnit,unitText){
			return {
				monetaryText: monetaryText,
				monetaryUnit: monetaryUnit,
				unitText: unitText
			}
		},
		getMonetaryMenu: function(){
			var items = [];
			this.getAllMonetary().eachKey(function(key,item){
				items.push({
					text: item.unitText,
					value: key	
				})
			})
			return items;
		},
		getMonetary: function(key){
			return this.getAllMonetary().get(key);
		}
	}
	
})