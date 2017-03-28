/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('application.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'application.view.main.MainController',
        'application.view.main.MainModel'
    ],

    xtype: 'app-main',
    
    uses: ['app.view.main.region.Bottom','app.view.main.region.Top',
           'app.view.main.region.MainMenuToolbar','app.view.main.region.MainMenuTree',
           'app.view.main.region.AccordionMainMenu','app.view.main.region.LeftMenu',
           'app.view.main.region.Center'],
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },
    listeners: {
    	//监控窗体大小
    	resize: function(container){
    		container.getController().onMainResize();
    	}
    },
    
    initComponent: function(){
    	Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性  
        this.callParent();  
    },

    items: [{
    	xtype: 'maintop',
    	region: 'north'
    },
    {
    	xtype: 'mainMenuToolbar',
    	region: 'north',
    	hidden: true,
    	bind:{
    		hidden: '{!isToolbarMenu}',
    	}
    },
    {
    	xtype: 'mainbottom',
    	region: 'south'
    },
    {
		xtype : 'leftMenu',
		region : 'west', // 左边面板
		title : '导航菜单',
//		hidden : Cookies.get('menutoolbar', 'true') == 'true',
		width : 220,
		collapsible : true,
		split : true,
		hidden : true,
		bind : {
			hidden : '{!isTreeMenu}'
		}
	}, 
	{
		region : 'center', // 中间面版
//		xtype : 'modulePanel'
		xtype : 'maincenter'
	}
    /*{
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
        region: 'west',
        glyph: 0xf013,
        html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
        width: 250,
        split: true,
        tbar: [{
            text: 'Button',
            handler: 'onClickButton'
        }]
    },
    {
    	xtype:'mainMenuTree',
    	region: 'west',
    	title: '导航菜单',
    	width : 250,
    	collapsible: true,
        split : true,
        hidden: true,
        bind:{
        	hidden: '{!isTreeMenu}'
        }
    },
    {
    	xtype:'accordionMainMenu',
    	region: 'west',
    	width : 250,  
        split : true  
    },
    {
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Tab 1',
            glyph: 0xf0e5,
            html: '<h2>Content appropriate for the current navigation.</h2>'
        }]
    }*/
    ]
});
