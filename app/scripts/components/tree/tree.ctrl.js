(function(){
	'use strict';
	angular
		.module('familyTreeApp')
		.controller('TreeCtrl', Tree);

	function Tree(Tree) {
		var vm = this;
		// Exposing members
		vm.tree = null;
		// Exposing functions
		vm.test = test;
		// start 
		activate();
		/////// 
		/* 
		 * Function Declarations to Hide Implementation Details
		 * ref: https://github.com/johnpapa/angularjs-styleguide#style-y053
		 * Hoisting
		 */
		function activate() {
			vm.tree = Tree.getTree();
			console.log(vm.tree);
		}
		function test(){
			vm.tree = Tree.constructTree();
			console.log(vm.tree);	
		}
	}
})();