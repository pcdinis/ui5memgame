sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, MessageBox) {
		"use strict";

		const easyNumTiles = 16;
		const mediumNumTiles = 28;
		const hardNumTiles = 40;

		var front = 0;
		var levelId = "";
		var cardsArray = [];
		var randomNum = [];
		var numTiles = 0;
		var gameOver = false;
		var gameOverMin = 0;
		var gameOverSec = 0;

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
				
				// Set Game Over to false
				this.gameOver=false;
				gameOverMin = 0;
				gameOverSec = 0;

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
						headerImage : '',
						sizeBehavior : 'Small'
						});

					// Init card status (back or front) and front image
					front = 0;
					// Create path to image
					var frontimage = 'images/image' + randomNum[i].toString() + '.jpg';

					// Add tile information to card array 
					var cardArray = ['tid' + i.toString(), front, frontimage, ""];
					// Add to cardS array
					cardsArray.push(cardArray);

					var self = this;

					//*******************/
					// onPress Event!!! */
					//*******************/
					newTile.attachPress( function(oEvent){ 
						var continueFlipCards = true;
						// Count if there are 2 cards front faced
						var countCards = 0;
						for(var x=0; x<cardsArray.length; x++){
							if(cardsArray[x][1] === 1 && cardsArray[x][3] === ""){
								countCards++;
							}
						}
						if(countCards === 2){
							// Check if the 2 cards are equal
							var card1 = "";
							var card2 = "";
							for(var x=0; x<cardsArray.length; x++){
								if(card1 === ""){
									if(cardsArray[x][1] === 1 && cardsArray[x][3] === ""){
										card1 = cardsArray[x][2];
									}
								}else if(card2 === ""){
									if(cardsArray[x][1] === 1 && cardsArray[x][3] === ""){
										card2 = cardsArray[x][2];
									}
								}
							}
							if(card1 != card2){
								continueFlipCards = false;
								// Flip cards back over
								self.resetCard();
							}else{
								for(x=0; x<cardsArray.length; x++){
									if(cardsArray[x][2] === card1){
										cardsArray[x][3] = "OK";
									}else if(cardsArray[x][2] === card2){
										cardsArray[x][3] = "OK";
									}
								}
								// Check if Game Over
								self.gameOver=true;
								for(x=0; x<cardsArray.length; x++){
									if(cardsArray[x][3] != "OK"){
										self.gameOver=false;
									}
								}
								if(self.gameOver === true){
									clearInterval(timerInt);
									MessageBox.information("You finished the game in " + self.gameOverMin + ":" + self.gameOverSec);
								}
							}

						}

						if(continueFlipCards === true){
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
							// Check if it's a tile already with double ("OK")
							if(cardsArray[i][3]  != "OK"){						
								// Set background or front
								if(cardsArray[i][1] === 1){
									oEvent.getSource().setBackgroundImage('images/zigzag_pattern.jpg');
									cardsArray[i][1] = 0;
								}else{
									oEvent.getSource().setBackgroundImage(cardsArray[i][2]);
									cardsArray[i][1] = 1;
								}
							}
						}
					 });

					newTile.placeAt(grid);


					// Set amd show timer
					var scs = 0;
					scs = new Date().setMinutes(new Date().getMinutes() + 0);

					var timerInt = setInterval(function() {
						if(self.gameOver === false){
							var countdowntime = scs;
							var now = new Date().getTime();
							var cTime = now - countdowntime;
							var minutes = Math.floor((cTime % (1000 * 60 * 60)) / (1000 * 60));
							var second = Math.floor((cTime % (1000 * 60)) / 1000);
							self.byId("timer").setValue("Solve as fast as possible: " + minutes + ":" + second);
							self.gameOverMin = minutes;
							self.gameOverSec = second;
						}
					}, 1000);

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
				var halfTiles = nTiles / 2;
				randomNum = [];
				randomNum.length = nTiles;
				
				for(var i=0; i<halfTiles; i++){
					slot1 = this.getRandomNumber(nTiles-1);
					if(randomNum[slot1] != undefined){
						resume = 0;
						while(randomNum[slot1] != undefined){
							if(resume === nTiles-1){
								break;
							}
							if(slot1 === nTiles-1){
								slot1 = 0;
							}else{
								slot1 = slot1 + 1;
							}
							resume++;
						}
					}
					randomNum[slot1] = randomNumAux[i];

					slot2 = this.getRandomNumber(nTiles-1);
					if(randomNum[slot2] != undefined){
						resume = 0;
						while(randomNum[slot2] != undefined){
							if(resume === nTiles-1){
								break;
							}
							if(slot2 === nTiles-1){
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
			},

			sleep: function(milliseconds){
				const date = Date.now();
				let currentDate = null;
				do {
				  currentDate = Date.now();
				} while (currentDate - date < milliseconds);
			},

			resetCard: function(){
				// Get panel object
				var grid = this.getView().byId("panelForGridList");

				// Set background images
				for(var i=0; i<cardsArray.length ; i++){
					if(cardsArray[i][1] === 1 && cardsArray[i][3] != "OK"){
					var agg = grid.mAggregations;
					grid.mAggregations.content[i].setBackgroundImage('images/zigzag_pattern.jpg');
					cardsArray[i][1] = 0;
					}
				}

			}

		});
	});
