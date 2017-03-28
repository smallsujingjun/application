//按钮菜单
Ext.define('app.view.main.region.ButtonMainMenu',{
	extend: 'app.ux.ButtonTransparent',
	alias: 'widget.buttonMainMenu',
	
	viewModel: 'main',
	
	text : '菜单',  
    glyph : 0xf0c9, 
    
    initComponent: function(){
    	
//    	this.menu = this.getViewModel().getMenus();
    	this.menu = this.up('app-main').getViewModel().getMenus();
    	this.callParent();
    }
})