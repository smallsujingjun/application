/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('application.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox',
        'Ext.window.Toast'
    ],

    uses: ['app.view.module.Module'],
    alias: 'controller.main',
    
    init: function() {  
//        window.onresize = this.onMainResize;
    	var vm = this.getView().getViewModel();
    	vm.bind('{monetary.value}',function(value){
    		this.onMonetaryChange(value);
    	},this);
    },
//    viewModel: 'main',
 // 金额单位修改过后执行  
    onMonetaryChange : function(value) {  
        console.log('金额单位变更:' + value);  
        var m = app.view.main.region.Monetary.getMonetary(value);  
        Ext.monetaryText = m.monetaryText; // 设置当前的全局的金额单位  
        Ext.monetaryUnit = m.monetaryUnit;  
        Ext.each(this.getView().query('moduleGrid'), function(grid) {  
                    if (grid.rendered) {  
                        grid.getView().refresh();  
                        Ext.Array.forEach(grid.columnManager.getColumns(), function(column) {  
                                    // 如果可以改变大小，并且是金额字段，则在改变了金额单位以后，自动调整一下列宽  
                                    if (!column.resizeDisabled && column.fieldDefine  
                                            && column.fieldDefine.tf_isCurrency) {  
                                        column.autoSize();  
                                    }  
                                })  
                    }  
                });  
    }  ,

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        	this.getView().getViewModel().set('name','修改后的title');
        }
    },
    
    // 选择了主菜单上的菜单后执行
	/*onMainMenuClick : function(menuitem) {
		console.log(menuitem);
		Ext.toast({

					html : 'Data Saved , hello  this is a meessage',
					title : menuitem.text,
					saveDelay : 10,
					align : 'tr',
					closable : true,
					width : 200,
					useXAxis : true,
					slideInDuration : 500
				});
	},*/
	// 选择了主菜单上的菜单后执行
	onMainMenuClick : function(menuitem) {
		var maincenter = this.getView().down('maincenter');

		maincenter.setActiveTab(maincenter.add({
					xtype : 'modulePanel',
					closable : true,
					reorderable : true
				}));
	},
    //显示或隐藏顶部和底部的按钮
    hiddenTopBottom: function(){
    	this.getView().down('maintop').hide();
    	this.getView().down('mainbottom').hide();
    	if(!this.showButton){
    		this.showButton = Ext.widget('component',{
			   glyph : 0xf013,  
               view : this.getView(),  
               floating : true,  
               x : document.body.clientWidth - 32,  
               y : 0,  
               height : 6,  
               width : 26,  
               style : 'background-color:#cde6c7',
               listeners: {
            	   el:{
            		   click:function(el){
            			   var c = Ext.getCmp(el.target.id); // 取得component的id值  
                           c.view.down('maintop').show();  
                           c.view.down('mainbottom').show();  
                           c.hide();   
            		   } 
            	   }
               }
    		})
    	};
    	this.showButton.show();
    },
 // 如果窗口的大小改变了，并且顶部和底部都隐藏了，就要调整显示顶和底的那个控件的位置  
    onMainResize : function() {  
        if (this.showButton && !this.showButton.hidden) {  
            this.showButton.setX(document.body.clientWidth - 32);  
        }  
    },
 // 显示菜单条，隐藏左边菜单区域和顶部的按钮菜单。
	showMainMenuToolbar : function(button) {
//		this.getView().getViewModel().set('service.name', 'tree');
		this.getView().getViewModel().set('menuType.value', 'toolbar');
//		alert(this.getView().getViewModel());

	},
	// 显示左边菜单区域,隐藏菜单条和顶部的按钮菜单。
	showLeftMenuRegion : function(button) {

//		this.getView().getViewModel().set('service.name', 'tree');
		this.getView().getViewModel().set('menuType.value', 'tree');

	},
	// 显示顶部的按钮菜单,隐藏菜单条和左边菜单区域。
	showButtonMenu : function(button) {
		this.getView().getViewModel().set('menuType.value', 'button');
	}
    
    
});
