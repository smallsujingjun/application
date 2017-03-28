//系统主菜单，根据mainmodel中的数据生成
Ext.define('app.view.main.region.MainMenuToolbar',{
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.mainMenuToolbar',
	uses: ['app.ux.ButtonTransparent'],
	defaults:{
		xtype: 'buttonTransparent'
	},
	
	items:[{
		 glyph : 0xf100,  
         tooltip : '在左边栏中显示树状菜单', // 几种菜单样式切换的按钮  
         disableMouseOver : true,  
         margin : '0 -5 0 0',
         handler: 'showLeftMenuRegion'
	},{
		glyph : 0xf102,  
        tooltip : '在顶部区域显示菜单',// 几种菜单样式切换的按钮  
        disableMouseOver : true ,
        handler: 'showButtonMenu'
	}],
	
	viewModel: 'main',
	
	initComponent: function(){
		// 把ViewModel中生成的菜单items加到此toolbar的items中  
		this.items = this.items.concat(this.getViewModel().getMenus());
//		this.items = this.items.concat(this.up('app-main').getViewModel().getMenus());
		this.callParent();
	}
})