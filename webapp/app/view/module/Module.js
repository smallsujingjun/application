//模块主界面
Ext.define('app.view.module.Module',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.modulePanel',
	
	requires: ['app.view.module.ModuleController','app.view.module.ModuleModel',
	           'app.view.module.factory.ModelFactory'],
	uses: ['app.view.module.region.Navigate','app.view.module.region.Grid',
	       'app.view.module.region.Detail','app.view.module.window.BaseWindow'],
	
	controller: 'module',
	viewModel:{
		type: 'module'
	},
	bind:{
		title: '{tf_title}'
	},
	layout: 'border',
	
	initComponent: function(){
		this.glyph = this.getViewModel().get('tf_glyph');
		
		this.model = app.view.module.factory.ModelFactory.getModelByModule(this.getViewModel());  

        console.log(this.model);
        
        this.store = Ext.create('Ext.data.Store', {  
            model : this.model,  
            autoLoad : true,
            autoSync : true,//自动保存
            proxy : {  
                type : 'localstorage',  
                id : 'module' + '__' + this.getViewModel().get('tf_moduleName')  
            }  
        });  
         
		this.items = [/*{
			xtype: 'navigate',
			region: 'west',
			width: 250,
			collapsible: true,
			split: true
		},*/{
			xtype: 'moduleGrid',
			region: 'center',
			store: this.store
		},{
			xtype: 'recordDetail',
			region: 'east',
			width: 250,
			collapsible: true,
			collapseMode: 'mini',
			split: true	
		}];
		this.callParent();
	}
	
});