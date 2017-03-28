/*模块数据的主显示区，继承grid*/
Ext.define('app.view.module.region.Grid',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.moduleGrid',
	uses: ['app.view.module.region.GridToolbar','app.view.module.factory.ColumnsFactory',
	       'app.view.module.widget.GridSchemeCombo'],	
	requires : ['Ext.selection.CellModel', 'Ext.grid.*', 'Ext.data.*',
				'Ext.util.*'],
	
	bind: {
		title: '{tf_title} {selectedNames}',// 数据绑定到ModuleModel中的tf_title和选中记录的名称  
		 gridSchemeId : '{gridSchemeId}' // 属性gridSchemeId  // 设置绑定，和GridSchemeCombo是value绑定是一样的
	},
	
	listeners: {//监听选择数据改变标题
		 selectionChange : 'selectionChange' 
	},
	
	columnLines : true, // 加上表格线 
	multiSelect : true,//多行操作（选中）
    viewConfig : {  
        stripeRows : true, // 奇偶行不同底色  
        enableTextSelection : true  
    },  
    initComponent : function() {  
        var viewModel = this.up('modulePanel').getViewModel();
        this.store.moduleGrid = this;
        // 创建grid列  
//        this.columns = app.view.module.factory.ColumnsFactory.getColumns(viewModel, 10);
        // 创建grid列  
        // 默认第一个grid方案  
        this.gridSchemeId = viewModel.get('tf_gridSchemes')[0].tf_schemeOrder;  
        // 将第一个方案的columns生成，第一个方案是要先设置好，并不是gridschemecombo触发来生成的  
        this.columns = app.view.module.factory.ColumnsFactory.getColumns(viewModel);
    	this.dockedItems= [{
    		xtype: 'gridToolbar',
    		dock: 'top'
    	},{  
            xtype : 'pagingtoolbar', // grid数据分页  
            store : this.store,  
            displayInfo : true,  
            prependButtons : true,  
            dock : 'bottom',  
            items : [{ // 在最前面加入grid方案的选择Combo  
                xtype : 'gridSchemeCombo'  
            }]  
        }];
        //可编辑=============================
        this.cellEditing = new Ext.grid.plugin.CellEditing({  
            clicksToEdit : 2  
        });  
        this.plugins = [this.cellEditing]; 
        //==================================
        //允许拖动行
        this.viewConfig = {  
        	    stripeRows : true, // 奇偶行不同底色  
        	    enableTextSelection : false,  
        	    // 加入允许拖动功能  
        	    plugins : [{  
        	        ptype : 'gridviewdragdrop',  
        	        ddGroup : 'DD_grid_' + viewModel.get('tf_moduleName'), // 拖动分组必须设置，这个分组名称为:DD_grid_Global  
        	        enableDrop : false  // 设为false，不允许在本grid中拖动  。如果设置成true,那么就可以拖动改变记录的位置
        	        }]  
        	  
        };  
        this.callParent();  
    },
    
    /**
	 * 重新适应所有列的宽度
	 */
	columnAutoSize : function() {
		Ext.Array.forEach(this.columnManager.getColumns(), function(column) {
					if (!column.autoSizeDisabled) {
						column.autoSize();
					}
				})
	},
	/**
	 * 重新选择了列表方案之后，替换方案中的字段
	 */
    setGridSchemeId : function(value) {  
        if (this.gridSchemeId != value) {  
            this.gridSchemeId = value;  
            Ext.suspendLayouts();  
            this.columns = app.view.module.factory.ColumnsFactory.getColumns(this  
                            .up('modulePanel').getViewModel(), value);  
            this.reconfigure(this.store, this.columns);  
            Ext.resumeLayouts(true);  
            this.columnAutoSize();  
        }  
    }
	
	/*columns: [{  
        dataIndex : 'tf_name',  
        text : '工程项目名称',  
        width : 250  
    }, {  
        dataIndex : 'tf_budget',  
        text : '投资总额'  
    }],
    
    store: new Ext.data.Store({
    	fields: ['tf_name',{
    		name: 'tf_budget',
    		type: 'float'
    	}],
    	data: [{
    		tf_name: '安居房建设工程',
    		tf_budget: '1234567'
    	},{
    		tf_name: '道路建设工程',
    		tf_budget: '7654321'
    	}]
    })*/
    
	
})