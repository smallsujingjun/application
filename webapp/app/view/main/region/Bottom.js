Ext.define('app.view.main.region.Bottom',{
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.mainbottom',
	uses: ['app.ux.ButtonTransparent'],
	defaults: {
		xtype: 'buttonTransparent'
	},
	items:[{
		bind: {
			text:'{user.company}'
		},
		glyph : 0xf0f7
	},{
		bind: {
			text: '{user.name}'
		},
		glyph : 0xf007
	},'->',{
		bind: {
			text: '{service.company}'
		},
		glyph : 0xf059
	},{
		bind: {
			text: '{service.name}'
		}
	},{
		bind: {
			text: '{service.phonenumber}'
		},
		glyph : 0xf095
	},{
		bind: {
			hidden: '{!service.email}',
			text: '{service.email}'
		},
		glyph : 0xf003 
	},{
		bind: {
			text: '©{service.copyright}'
		}
	}]
	
});