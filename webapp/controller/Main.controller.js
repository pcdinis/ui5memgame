sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		

		return Controller.extend("pt.pcdinis.ui5memgame.ui5memgame.controller.Main", {

			onInit: function () {
			},

			onPressEasyLvl: function (oEvent){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteGame");
			},

			onPressMediumLvl: function (oEvent){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteGame");
			},

			onPressHardLvl: function (oEvent){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteGame");
			}
			
		});
	});