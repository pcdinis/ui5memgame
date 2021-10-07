sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		const easyNumTiles = 16;
		const mediumNumTiles = 28;
		const hardNumTiles = 40;

		var front = 0;
		var levelId = "";
		var cardsArray = [];
		var randomNum = [];
		var numTiles = 0;

		return Controller.extend("pt.pcdinis.ui5memgame.ui5memgame.controller.Game", {

			onInit: function () {
				front = 0;

				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("RouteGame").attachMatched(this._onRouteMatched, this);
			},

			_onRouteMatched : function (oEvent) {
				var oArgs, oView;
				oArgs = oEvent.getParameter("arguments");

				// Get level from parameter
				levelId = oArgs.levelId;
		
				// Get panel object
				var grid = this.getView().byId("panelForGridList");

				// Set number of tiles based on selected level
				numTiles = 0;
				switch (levelId){
					case 'easy':
						numTiles = easyNumTiles;
						break;
					case 'medium':
						numTiles = mediumNumTiles;
						break;
					case 'hard':
						numTiles = hardNumTiles;
						break;
					default:
				}
				
				// Get random numbers into an array
				this.createRandomArr(numTiles);

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

					// Init card status (back or front) and front image
					front = 0;
					// Create path to image
					var frontimage = 'images/image' + randomNum[i].toString() + '.jpg';

					// Add tile information to card array 
					var cardArray = ['tid' + i.toString(), front, frontimage];
					// Add to cardS array
					cardsArray.push(cardArray);

					newTile.attachPress( function(oEvent){ 
						// Check Id
						var tileId = oEvent.getSource().getId();
						// Get front status
						var cardArrayAux = [];
						for(var i=0; i<cardsArray.length; i++){
							cardArrayAux = cardsArray[i];
							if(cardArrayAux[0] == tileId){
								break;
							}
						}
						// Set background or front
						if(cardsArray[i][1] === 1){
							oEvent.getSource().setBackgroundImage('images/zigzag_pattern.jpg');
							cardsArray[i][1] = 0;
						}else{
							oEvent.getSource().setBackgroundImage(cardsArray[i][2]);
							cardsArray[i][1] = 1;
						}
					 } );
					newTile.placeAt(grid);
				}
				
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
				// Get panel object
				var grid = this.getView().byId("panelForGridList");
				// Delete all tiles
				for(var i=0; i<cardsArray.length ; i++){
					var agg = grid.mAggregations;
					agg.content[0].destroy();
				}

				// Clear cards array
				cardsArray = [];

				// Go back to Main Screen
				var oRouterBack = sap.ui.core.UIComponent.getRouterFor(this);
				oRouterBack.navTo("RouteMain");
			},

			createRandomArr: function(nTiles){
				var number = 0;
				var stopIteration = false;
				var randomNumAux = [];
				// Create random number array
				for(var i=0; i<nTiles; i++){
					
					stopIteration = false;
					var x = 0;
					// Stop iteration only when a number is found
					while(stopIteration === false){
						number = this.getRandomNumber(hardNumTiles);
						
						if(randomNumAux.includes(number) === false){
							stopIteration = true;
						}

						if (x === 100){
							break;
						}
						x++;
					}

					randomNumAux[i] = number;
				}

				// Set numbers on randomNum array
				var slot1;
				var slot2;
				var resume = 0;
				randomNum = [];
				for(var i=0; i<nTiles; i++){
					// Check if all positions are filled
					//if(randomNum.includes(undefined) === false){
					//	break;
					//}
					slot1 = this.getRandomNumber(nTiles);
					if(randomNum[slot1] != undefined){
						resume = 0;
						while(randomNum[slot1] != undefined){
							if(randomNum.includes(undefined) === false){
								break;
							}
							if(slot1 === nTiles){
								slot1 = 0;
							}else{
								slot1 = slot1 + 1;
							}
							resume++;
						}
					}
					randomNum[slot1] = randomNumAux[i];

					slot2 = this.getRandomNumber(nTiles);
					if(randomNum[slot2] != undefined){
						resume = 0;
						while(randomNum[slot2] != undefined){
							if(randomNum.includes(undefined) === false){
								break;
							}
							if(slot2 === nTiles){
								slot2 = 0;
							}else{
								slot2 = slot2 + 1;
							}
							resume++;
						}
					}
					randomNum[slot2] = randomNumAux[i];

				}
			},

			getRandomNumber: function(max){
				return Math.floor(Math.random() * max);
			}
		});
	});
