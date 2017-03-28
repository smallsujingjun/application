//可折叠的 菜单
Ext.define('app.view.main.region.AccordionMainMenu', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.accordionMainMenu',
	title : '系统菜单',
	glyph : 0xf0c9,
	
	uses:['app.ux.ButtonTransparent'],
    layout: {
		type : 'accordion',
		animate : true
	},

	viewModel : 'main',

	initComponent : function() {
		this.items = [];
		var menus = this.getViewModel().get('systemMenu');

		for ( var i in menus) {
			var menugroup = menus[i];
			var accpanel = {
				menuAccordion : true,
				xtype : 'panel',
				title : menugroup.text,
				bodyStyle : {
					padding : '10px'
				},
				layout : 'fit',
				dockedItems : [ {
					dock : 'left',
					xtype : 'toolbar',
					items : []
				} ],
				glyph : menugroup.glyph
			};
			for ( var j in menugroup.items) {
				var menumodule = menugroup.items[j];
				accpanel.dockedItems[0].items.push({
					xtype : 'buttonTransparent',
					text : this.addSpace(menumodule.text, 12),
					glyph : menumodule.glyph,
					handler : 'onMainMenuClick'
				});
			}
			this.items.push(accpanel);
		}
		this.callParent(arguments);
	},
	addSpace : function(text, len) {  
        console.log(text.length);  
        var result = text;  
        for (var i = text.length; i < len; i++) {  
            result += '　';  
        }  
        return result;  
    }  

});