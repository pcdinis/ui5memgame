sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		var front = 0;
		

		return Controller.extend("pt.pcdinis.ui5memgame.ui5memgame.controller.Game", {

			onInit: function () {
				front = 0;
			},

			onPress: function (){
				var idtile1 = this.byId("tile1");
				if(front === 0){
					idtile1.setBackgroundImage("images/zigzag_pattern.jpg")
					front = 1;
				}else{
					idtile1.setBackgroundImage("");
					front = 0;
				}
				
			},

			onPressBack: function (oEvent){
				var oRouterBack = sap.ui.core.UIComponent.getRouterFor(this);
				oRouterBack.navTo("RouteMain");
			}
		});
	});
