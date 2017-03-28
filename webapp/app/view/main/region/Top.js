Ext.define('app.view.main.region.Top',{
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.maintop',
	uses: ['app.ux.ButtonTransparent','app.view.main.region.ButtonMainMenu','app.view.main.region.SettingMenu'],
	defaults:{
		xtype: 'buttonTransparent'
	},
	items:[{
		xtype: 'image',
		bind:{
			hidden: '{!system.iconUrl}',
			src: '{system.iconUrl}'
		}
	},{
		xtype: 'label',
		bind: {
			text: '{system.name}',
		},
		style: 'font-size: 20px;color: blue;',
	},{
		xtype: 'label',
		bind:{
			text: '{system.version}'
		}
	},'->',{
//		text: '菜单',
//		glyph: 0xf0c9,
//		menu:[{
//			text: '工程管理',
//			menu: [{
//				text: '工程项目'
//			},{
//				text: '工程标段'
//			}]
//		}]
		xtype: 'buttonMainMenu',
		hidden : true,
		bind : {
			hidden : '{!isButtonMenu}'
		}
	},'','',{
		text: '主页',
		glyph: 0xf015
	},{
		text: '帮助',
		glyph : 0xf059 
	},{
		text: '关于',
		glyph: 0xf06a 
	},{
		text: '注销',
		glyph: 0xf011
	},{
		xtype: 'settingMenu'
	},'->','->',{
		text: '搜索',
		glyph: 0xf002
//		iconCls: 'icon-search'
	},{
		text: '设置',
		glyph: 0xf0c9
//		glyph: 'xf0c9@FontAwesome'	
	},{  
        glyph : 0xf102,  
        handler : 'hiddenTopBottom',  
        tooltip : '隐藏顶部和底部区域'  
    }]
});