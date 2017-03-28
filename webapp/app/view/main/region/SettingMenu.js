/**
 * 显示在顶部的按钮菜单，可以切换至标准菜单，菜单树
 */
Ext.define('app.view.main.region.SettingMenu', {
			extend : 'app.ux.ButtonTransparent',
			alias : 'widget.settingMenu',

			text : '设置',
			glyph : 0xf013,
			tooltip : '偏好设置',
			uses:['app.view.main.region.Monetary'],

			initComponent : function() {
				this.menu = [];
				this.menu.push({
							text : '菜单样式',
							menu : [{
										xtype : 'segmentedbutton',
										reference : 'menuType',
										//defaultUI : 'default',
										value : 'toolbar',
										items : [{
													text : '标准菜单',
													value : 'toolbar'
												}, {
													text : '树形菜单',
													value : 'tree'
												}, {
													text : '按钮菜单',
													value : 'button'
												}]
									}]
						},{
							text: '金额单位',
							menu: [{
								xtype : 'segmentedbutton',
								reference : 'monetary',
								defaultUI : 'default',  
                                value : 'tenthousand',  
                                items: app.view.main.region.Monetary.getMonetaryMenu()
							}]
						});
						
//				this.listeners = {
//					menushow : function(button, menu) {
//						// 设置当前的菜单类型为已选中的类型，本来应该是自动setValue的，不知道为什么没有自动赋值。
//						button.down('segmentedbutton').setValue(this.up('app-main')
//								.getViewModel().get('menuType.value'))
//					}
//				};
				
				this.callParent();
			}

		})