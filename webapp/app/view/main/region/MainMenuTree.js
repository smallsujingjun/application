//树型菜单
Ext.define('app.view.main.region.MainMenuTree',{
	extend: 'Ext.tree.Panel',
	alias: 'widget.mainMenuTree',
	title: '系统菜单',
	glyph : 0xf0c9,  
	rootVisible : false,  
	lines : true,  
	viewModel : 'main',  
	
	listeners: {//监听树型菜单的单击事件
		itemclick: function(){
			 this.up('app-main').getController().onMainMenuClick(); 
		}
	},
	
	initComponent: function(){
		
		this.store = Ext.create('Ext.data.TreeStore',{
			root:{
				text : '系统菜单',  
				leaf : true,//false,  消除了重复添加菜单到west面板
				expanded : true
			}
		});
		
		var menus = this.getViewModel().get('systemMenu');
		var root = this.store.getRootNode();
		
		for(var i in menus){
			var menugroup = menus[i];
			var menuitem = root.appendChild({
				text: menugroup.text,
				expanded: false,//menugroup.expanded,控制菜单展开
				icon: menugroup.icon,
				glyph: menugroup.glyph
			});
			for(var j in menugroup.items){
				var menumodule = menugroup.items[j];
				var childnode = {
					moduleId : menumodule.text,  
                    moduleName : menumodule.module,  
                    text : menumodule.text,  
                    leaf : true  	
				};
				menuitem.appendChild(childnode);
			}
		};
		
		this.callParent(arguments);
	}
	
	
})