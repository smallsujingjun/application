Ext.define('app.ux.ButtonTransparent',{
	extend: 'Ext.button.Button',
	alias: 'widget.buttonTransparent',//xtype类型
	//类初始化函数
	initComponent: function(){
//		时间监听
		this.listeners = {
//				鼠标移开，背景设置透明
			mouseout: function(){
				this.setTransparent(document.getElementById(this.id));
			},
//			鼠标移过，取消背景透明
			mouseover: function(){
				var b = document.getElementById(this.id);
				b.style.backgroundImage= '';
				b.style.backgroundColor= '';
				b.style.borderColor= '';
			},
//			背景设置透明
			afterrender: function(){
				this.setTransparent(document.getElementById(this.id));
			}
		};
		this.callParent(arguments);// 调用initComponent函数
	},
	setTransparent: function(b){
		b.style.backgroundImage= 'inherit';
		b.style.backgroundColor= 'inherit';
		b.style.borderColor= 'transparent';
	}
});