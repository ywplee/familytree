(function(){
	'use strict';
	angular
		.module('familyTreeApp')
		.factory('Tree', TreeService);

	function TreeService($timeout) {
		var rootModel = null;
		var treeService = {
			constructTree: constructTree,
			addChild: addChild,
			// getParents: getParents,
			// getGrandParents: getGrandParents,
			// getChildren: getChildren,
			// Utility functions
			getGrandParents: getGrandParents,
			getPeopleWithNoSibiling: getPeopleWithNoSibiling,
			getPeopleWithNoChildren: getPeopleWithNoChildren,
			getPersonWithMostGrandChildren: getPersonWithMostGrandChildren,
			getTree: getTree
		};
		return treeService;

		/////// 
		/* 
		 * Function Declarations to Hide Implementation Details
		 * ref: https://github.com/johnpapa/angularjs-styleguide#style-y053
		 * Hoisting
		 */
		function constructTree() {
			var nancy = new TreeNode('Nancy');
			var carl = new TreeNode('Carl');
			carl.addChild(new TreeNode('Catherine'));
			carl.addChild(new TreeNode('Joseph'));
			nancy.addChild(new TreeNode('Adam'));
			nancy.addChild(new TreeNode('Jill'));
			nancy.addChild(carl);
			addChild('Nancy');
				
			// 	$timeout(function(){
			// 		addChild('Jill', new TreeNode('Kevin'));
			// 		addChild('Carl', new TreeNode('Catherine'));
			// 		addChild('Carl', new TreeNode('Joseph'));
			// 	})
			// });
			// console.log(nancy);
			return nancy;
		};
		function addChild(name, child) {
			// empty tree
			if (!rootModel) {
				rootModel = new TreeNode(name);
			}
			// non empty tree, find correct position and add child
			else {
				var n = _findNode(name, rootModel);
				if (n) {
					n.children.push(child);	
				} else {
					console.error('children add failed');
				}	
			}
			
		}
		// returns the tree model
		function getTree() {
			return rootModel;
		}
		// Gets a list of grandParents of a given node
		function getGrandParents() {
		}
		// Gets a list of people with no siblings
		function getPeopleWithNoSibiling() {
		}
		// Gets a list of people with no children
		function getPeopleWithNoChildren(){
		}
		// Gets a person with the most grand children
		function getPersonWithMostGrandChildren(){
		}
		// private functions
		function _findNode(name, node) {
			// first try to find whethere there is a match
			var idx = _.findIndex(node.children, {name: node.name});
			// no match found, call this recursively
			if (idx < 0 && node.children.length > 0) {
				_.each(node.children, function(n){
					_findNode(n);
				});
			}
			// found match
			else if (idx > -1) {
				return node.children[idx];
			}
			// no match, return null
			else {
				return null;
			}
		}
	}
})();