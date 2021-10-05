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
		var cardsArray = [];

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

				// Get level from parameter
				levelId = oArgs.levelId;

				// Create VBox and Tiles dinamically
				//var data = {
				//	"items": [{
				//		"key": "tile1",
				//		"title": "title1",
				//		"subtitle": "subtitle1"
				//		
				//	}, {
				//		"key": "tile2",
				//		"title": "title2",
				//		"subtitle": "subtitle2"
				//		
				//	}, {
				//		"key": "tile3",
				//		"title": "title3",
				//		"subtitle": "subtitle3"
				//		
				//	}, {
				//		"key": "tile4",
				//		"title": "title4",
				//		"subtitle": "subtitle4"		
				//	}]
				//}

				//var oModel = new sap.ui.model.json.JSONModel('items');
				//oModel.setData(data);
				//this.getView().setModel(oModel);
				//this.getView().byId("gridList").setModel(oModel);
				//this.getView().setModel(oModel);

				//oModel.refresh();
				
				// Get panel object
				var grid = this.getView().byId("panelForGridList");

				//
				var numTiles = 0;
				switch (levelId){
					case 'easy':
						numTiles = 16;
						break;
					case 'medium':
						numTiles = 28;
						break;
					case 'hard':
						numTiles = 40;
						break;
					default:
				}
				// Create tiles based on level
				var newTile;
				
				for( var i=0; i<numTiles; i++){
					newTile = new sap.m.GenericTile({
						id : 'tid' + i.toString(),
						header : '',
						subheader : '',
						backgroundImage : 'images/zigzag_pattern.jpg',
						headerImage : ''
						});

					// Init card status (back or front)
					front = 0;
					var frontimage = '';

					var cardArray = ['tid' + i.toString(), front, frontimage];
					cardsArray.push(cardArray);

					newTile.attachPress( function(oEvent){ 
						// Check Id

						// Get front status

						// Set background or front
						if(front === 0){
							oEvent.getSource().setBackgroundImage('images/zigzag_pattern.jpg')
							front = 1;
						}else{
							oEvent.getSource().setBackgroundImage('')
							front = 0;
						}
					 } );
					newTile.placeAt(grid);
				}


// 'https://36.media.tumblr.com/4c1c24d32d29fe4d2667102a67b07d05/tumblr_nfeoirox8O1qi1d8wo3_500.png'
					

				
			},

			onPress: function (){
				idtile1 = this.byId("tile");
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
