(function(){
	'use strict';
	angular
		.module('familyTreeApp')
		.controller('TreeCtrl', TreeCtrl);

	function TreeCtrl($scope, $timeout, Tree) {
		var vm = this;
		// Exposing members
		vm.tree = null;
		vm.searchTerm = '';
		// Exposing functions
		vm.addChild = addChild;
		vm.addFamily = addFamily;
		vm.demo = demo;
		vm.handleKeyEvent = handleKeyEvent;
		vm.isSearchResult = isSearchResult;
		vm.removeFamily = removeFamily;
		vm.toggleEdit = toggleEdit;
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
			// watches search term to find grand parent and hightlight the node
			$scope.$watch('vm.searchTerm', function() {
				if (vm.searchTerm.length && vm.tree) {
					var grands = Tree.getGrandParent(vm.searchTerm);
					vm.grandSearchResult = grands; 
					if (grands && grands.length > 0) {
						vm.grandView = true;
					} else {
						// turn off grandparnet serach result view
						vm.grandView = false;
					}
				}
				// turn off grandparnet serach result view 
				else {
					vm.grandView = false;
				}
			});
			// whenever there's change on tree model, fill the no sibling info
			$scope.$watch('vm.tree', function() {
				// root doesn't have siblings
				if (vm.tree) {
					vm.tree.noSibling = true;
					_fillNoSiblingInfo();
					_findMostGrandChildren();
				}
			});
		}
		// sets demo data
		function demo(){
			vm.tree = Tree.demo();
		}
		function handleKeyEvent(e, node){
			if (e){
				if (e.keyCode === 27) {
					node.edit = false;
				}
			}
		}
		// given a node, determine whether it's a part of the search result
		function isSearchResult(node) {
			var result = false;
			_.each(vm.grandSearchResult, function(n){
				if (n === node) {
					result = true;
					return;
				}
			});
			return result;
		}
		// starts a new family tree
		function addFamily(name) {
			Tree.addChild(name);
			vm.tree = Tree.getTree();
		}
		// remove this family
		function removeFamily(){
			Tree.removeFamily();
			vm.tree = Tree.getTree();
		}
		// Addchild to the given node
		function addChild(name, node) {
			node.newChildName = '';
			Tree.addChild(name, node);
			$timeout(function(){
				// update no sibling status
				// node.edit = false;
				_fillNoSiblingInfo();
				_findMostGrandChildren();
			});
		}
		// toggle edit property for this node
		function toggleEdit(node) {
			if (node.edit === undefined) {
				node.edit = true;
			} else {
				node.edit = !node.edit;
			}
		}
		/* Private functions */
		//recursive function to fill out no sibling info
		function _fillNoSiblingInfo() {
			_fillNoSiblingInfoHelper(vm.tree);
		}
		function _fillNoSiblingInfoHelper(node) {
			// toggle on no sibling flag
			if (node.children.length === 1) {
				// mark this model as no sibling
				node.children[0].noSibling = true;
			}
			// toggle off no sibling flag
			else if (node.children.length > 1) {
				_.each(node.children, function(n){
					n.noSibling = false;
				});
			}
			// recursively fill out the children
			if (node.children.length > 0){
				_.each(node.children, function(n){
					_fillNoSiblingInfoHelper(n);
				});
			}
		}
		// resursive function to find the person with the most grand children
		function _findMostGrandChildren(){
			var max = 0;
			_findMostGrandChildrenHelper(vm.tree, max);
		}
		function _findMostGrandChildrenHelper(node, max) {
			var count = 0;
			if (node && node.children) {
				_.each(node.children, function(n){
					count += n.children.length;
				});
				if (count > max) {
					max = count;
					vm.mostGrandChildren = node;
				}
				// start recursion
				_.each(node.children, function(n){
					_findMostGrandChildrenHelper(n, max);
				});
			}
		}
	}	
})();