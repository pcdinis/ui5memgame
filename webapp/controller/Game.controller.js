sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		var front = 0;
		var levelId = "";
		

		return Controller.extend("pt.pcdinis.ui5memgame.ui5memgame.controller.Game", {

			onInit: function () {
				front = 0;

				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("RouteGame").attachMatched(this._onRouteMatched, this);
			},

			_onRouteMatched : function (oEvent) {
				var oArgs, oView;
				oArgs = oEvent.getParameter("arguments");
//				oView = this.getView();
	
/*				oView.bindElement({
					path : "/leveId(" + oArgs.levelId + ")",
					events : {
						change: this._onBindingChange.bind(this),
						dataRequested: function (oEvent) {
							oView.setBusy(true);
						},
						dataReceived: function (oEvent) {
							oView.setBusy(false);
						}
					}
				});*/

				// Get level
				levelId = oArgs.levelId;

				// Create VBox and Tiles dinamically
				var data = {
					"items": [{
						"tId": "tile1",
						"title": "title1",
						"subtitle": "subtitle1"
						
					}, {
						"tId": "tile2",
						"title": "title2",
						"subtitle": "subtitle2"
						
					}, {
						"tId": "tile3",
						"title": "title3",
						"subtitle": "subtitle3"
						
					}, {
						"tId": "tile4",
						"title": "title4",
						"subtitle": "subtitle4"
						
					}]
				}

				var oModel = new sap.ui.model.json.JSONModel('items');
				oModel.setData(data);
				this.getView().setModel(oModel);
				//this.getView().byId("gridList").setModel(oModel);
				//this.getView().setModel(oModel);

				oModel.refresh();
				
				
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
