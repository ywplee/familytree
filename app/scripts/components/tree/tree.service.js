(function(){
	'use strict';
	angular
		.module('familyTreeApp')
		.factory('Tree', TreeService);

	function TreeService() {
		var rootModel = null;
		var treeService = {
			rootModel: rootModel,
			demo: demo,
			addChild: addChild,
			removeFamily: removeFamily,
			getGrandParent: getGrandParent,
			getTree: getTree
		};
		return treeService;

		/////// 
		/* 
		 * Function Declarations to Hide Implementation Details
		 * ref: https://github.com/johnpapa/angularjs-styleguide#style-y053
		 * Hoisting
		 */
		function demo() {
			var nancy = new TreeNode('Nancy');
			var carl = new TreeNode('Carl');
			var kevin = new TreeNode('Kevin');
			var george = new TreeNode('George');
			var james = new TreeNode('James');
			var jill = new TreeNode('Jill');
			// carl
			carl.addChild(new TreeNode('Catherine'));
			carl.addChild(new TreeNode('Joseph'));
			// George
			george.addChild(new TreeNode('Patrick'));
			george.addChild(new TreeNode('Robert'));
			// James
			james.addChild(new TreeNode('Mary'));
			// Kevin
			kevin.addChild(new TreeNode('Samuel'));
			kevin.addChild(george);
			kevin.addChild(james);
			kevin.addChild(new TreeNode('Aaron'));
			// Jill
			jill.addChild(kevin);
			nancy.addChild(new TreeNode('Adam'));
			nancy.addChild(jill);
			nancy.addChild(carl);
			rootModel = nancy;
			// addChild('Nancy');
			return nancy;
		}
		function addChild(name, node) {
			// empty tree
			if (!rootModel) {
				rootModel = new TreeNode(name);
			}
			// non empty tree, find correct position and add child
			else {
				node.addChild(new TreeNode(name));
			}
		}
		// removes the family model
		function removeFamily(){
			rootModel = null;
		}
		// returns the tree model
		function getTree() {
			return rootModel;
		}
		// Gets grandParent of a given node, supports duplicate
		function getGrandParent(name) {
			// var rootRef = _.clone(rootModel);
			var result = _findNode(name, rootModel, []);
			if (result && result.length > 0) {
				var gps = [];
				_.each(result, function(n){
					gps.push(n.getGrandparent());
				});
				return gps;
			} else {
				return [];
			}
		}
		// private functions
		function _findNode(name, node, result) {
			// first try to find whethere there is a match
			var idx = [];
			if (node && node.children) {
				_.each(node.children, function(n, i) {
					if (n.name.toLowerCase() === name.toLowerCase()){
						idx.push(i);
					}
				});
			}
			// base case, found!
			if (idx.length > 0) {
				_.each(idx, function(i){
					result.push(node.children[i]);
				});
			}
			// no match found, call this recursively
			if (node && node.children.length > 0) {
				var r = [];
				for (var i = 0; i < node.children.length; i++) {
					r = _findNode(name, node.children[i], result);
				}
				return r;
			} else {
				return result;
			}
		}
	}
})();