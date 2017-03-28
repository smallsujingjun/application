/*模块控制器*/
Ext.define('app.view.module.ModuleController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.module',
	requires : [ 'Ext.window.MessageBox', 'Ext.window.Toast' ],

	init : function() {
		console.log('cotroller.init');
	},

	addRecord : function() {
		var grid = this.getView().down('moduleGrid');
		var model = Ext.create(grid.getStore().model);
		/*model.set('tf_id', 1);
		model.set('tf_name', '太湖花园小区建设');
		model.set('tf_code', '2004-01');
		model.set('tf_squaremeter', 12000);
		model.set('tf_budget', -3800000);
		model.set('tf_rjl', 0.67);
		model.set('tf_startDate', new Date());
		model.set('tf_endDate', new Date());
		model.set('tf_isValid', false);
		model.set('tf_m3', 1239.24);
		
		grid.getStore().add(model);
		console.log(model);
		grid.getStore().sync();*/

		
		 model.set('tf_id',0);  
	     grid.getStore().insert(0, model); 
	},
	// 选中的记录发生变化过后的事件  
	selectionChange : function(model, selected, eOpts) {  
	  
	    // 设置删除按钮的状态  
	    this.getView().down('toolbar button#deletebutton')[selected.length > 0  
	            ? 'enable'  
	            : 'disable']();
	    var viewModel = this.getView().getViewModel();  
	    // 下面将组织选中的记录的name显示在title上，有二种方案可供选择，一种是用下面的MVVM特性，第二种是调用refreshTitle()  
	    var selectedNames = ''  
	    if (selected.length > 0) {  
	        if (!!selected[0].getNameValue())  
	            selectedNames = selectedNames + '　『<em>' + selected[0].getNameValue()  
	                    + '</em>'  
	                    + (selected.length > 1 ? ' 等' + selected.length + '条' : '') + '』';  
	    }  
	    viewModel.set('selectedNames', selectedNames); // 修改ModuleModel中的数据，修改好后会自动更新bind的title  
	    // this.getView().down('grid').refreshTitle(); // 这是不用MVVM特性的做法  
	  
	},  
	
	// 删除一条或多条记录  
	deleteRecords : function(button) {  
	    var grid = this.getView().down('moduleGrid'), selection = grid  
	            .getSelectionModel().getSelection(), message = '';  
	    if (selection.length == 1) // 如果只选择了一条  
	        message = ' 『' + selection[0].getNameValue() + '』 吗?';  
	    else { // 选择了多条记录  
	        message = '<ol>';  
	        Ext.Array.each(grid.getSelectionModel().getSelection(), function(  
	                        record) {  
	                    message += '<li>' + record.getNameValue() + '</li>';  
	                });  
	        message += '</ol>';  
	        message = '以下 ' + selection.length + ' 条记录吗?' + message;  
	    }  
	    Ext.MessageBox.confirm('确定删除', '确定要删除 <strong>'  
	                    + this.getView().getViewModel().get('tf_title')  
	                    + '</strong> 中的' + message, function(btn) {  
	                if (btn == 'yes') {  
	                    grid.getStore().remove(grid.getSelectionModel().getSelection());  
	                    grid.getStore().sync();  
	                }  
	            })  
	},
	
	// 根据选中的记录复制新增一条记录
	addRecordWithCopy : function() {
		var grid = this.getView().down('moduleGrid'), sm = grid.getSelectionModel();
		if (sm.getSelection().length != 1) {
			Ext.toast({
						title : '警告',
						html : '请先选择一条记录，然后再执行此操作！',
						bodyStyle : 'background-color:yellow;',
						header : {
							border : 1,
							style : {
								borderColor : 'pink'
							}
						},
						border : true,
						style : {
							borderColor : 'pink'
						},
						saveDelay : 10,
						align : 'tr',
						closable : true,
						minWidth : 200,
						useXAxis : true,
						slideInDuration : 500
					});
			return;
		}
		var model = Ext.create(grid.getStore().model);
//		alert('tishi','dddd');
		Ext.Array.each(model.fields, function(field) { // 将选中记录的model都赋给值新的记录
			model.set(field.name, sm.getSelection()[0].get(field.name));
//			console.log(field.name + ':'+sm.getSelection()[0].get(field.name));
		});
		model.set('tf_id', null); // 设置为null,可自动增加
		grid.getStore().insert(0, model);
		sm.select(model); // 选中当前新增的记录
	},
	
	editRecord : function(button) {  
	    var window = Ext.widget('baseWindow',{  
	        viewModel : this.getView().getViewModel()  
	    });
	    window.down('baseForm').setData(this.getView().down('moduleGrid')  
	            .getSelectionModel().getSelection()[0]); 
	    window.show();  
	}

})