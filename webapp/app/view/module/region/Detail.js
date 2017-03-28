/*选中记录显示在明细区*/
Ext.define('app.view.module.region.Detail',{
	extend: 'Ext.grid.property.Grid',
	alias: 'widget.recordDetail',
	
	title: '记录明细',
	
	initComponent: function(){
		this.source = {
			'工程名称':'title',
			'投资总额': 1234
		}
		this.callParent();
	}
	
})