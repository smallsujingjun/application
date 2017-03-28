/*左边的菜单面板，可以放树型菜单也可以放折叠菜单*/
Ext.define('app.view.main.region.LeftMenu',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.leftMenu',
	uses: ['app.view.main.region.MainMenuTree',
	       'app.view.main.region.AccordionMainMenu'],
	
	layout : {
		type : 'accordion',
		animate : true
	},
	glyph : 0xf0c9,
	
	tools:[
		{
			type : 'pin',
			tooltip : '层叠方式显示菜单',
			listeners : {
				click : function(tool) {
					var panel = tool.up('leftMenu');
					panel.insert(0, {
								xtype : 'accordionMainMenu'
							});
					panel.items.items[0].expand();
					panel.remove(panel.down('mainMenuTree'), true);
					tool.hide();
					tool.nextSibling().show();
				}
			}
		}, 
		{
			type : 'unpin',
			tooltip : '树状方式显示菜单',
			hidden : true,
			listeners : {
				click : function(tool) {
					var panel = tool.up('leftMenu');
					panel.insert(0, {
								xtype : 'mainMenuTree'
							});

					panel.items.items[0].expand();
					Ext.each(panel.query('accordionMainMenu'), function(
									accordion) {
								panel.remove(accordion, true)
							})
					tool.hide();
					tool.previousSibling().show();
				}
			}
		},
		{
			itemId : 'up',
			type : 'up',
			tooltip : '在上面显示菜单条',
			handler : 'showMainMenuToolbar'
		}],
		initComponent: function(){
			this.items = [{
				xtype: 'mainMenuTree'
			}];
			this.callParent();
		}
})