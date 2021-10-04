/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ptpcdinis.ui5memgame./ui5memgame/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
