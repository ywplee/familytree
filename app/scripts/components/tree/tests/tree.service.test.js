'use strict';

describe('Service: TreeService', function () {
	beforeEach(module('familyTreeApp'));
	var treeServiceObj;

	beforeEach(inject(function(Tree){
		treeServiceObj = Tree;
	}));
	it('getTree on a empty model should return null.', function(){
		expect(treeServiceObj.getTree()).toBe(null);
	});
	it('adding child to a empty tree should initialize a tree.', function(){
		treeServiceObj.addChild('Test');
		expect(treeServiceObj.getTree()).toBeDefined();
	});
	it('adding child to a non-empty tree should add a child to a proper position.', function(){
		treeServiceObj.addChild('Test');
		treeServiceObj.addChild('TestChild', treeServiceObj.getTree());
		expect(treeServiceObj.getTree().children.length).toEqual(1);
	});
	it('removeFamily should empty out the tree model', function(){
		treeServiceObj.addChild('Test');
		treeServiceObj.addChild('TestChild', treeServiceObj.getTree());
		treeServiceObj.removeFamily();
		expect(treeServiceObj.getTree()).toBe(null);
	});
	it('getParent - invalid grand-child shoud return an empty list.', function(){
		var result = [];
		treeServiceObj.addChild('Test');
		treeServiceObj.addChild('TestChild', treeServiceObj.getTree());
		treeServiceObj.addChild('TestGrandChild', treeServiceObj.getTree().children[0]);
		result = treeServiceObj.getGrandParent('TestGrandChildERROR');
		expect(result.length).toEqual(0);
	});
	it('getParent - no duplicate should reuturn one node.', function(){
		var result = [];
		treeServiceObj.addChild('Test');
		treeServiceObj.addChild('TestChild', treeServiceObj.getTree());
		treeServiceObj.addChild('TestGrandChild', treeServiceObj.getTree().children[0]);
		result = treeServiceObj.getGrandParent('TestGrandChild');
		expect(result.length).toEqual(1);
	});
	it('getParent - duplicate should reuturn 2 nodes.', function(){
		var result = [];
		treeServiceObj.addChild('Test');
		treeServiceObj.addChild('TestChild', treeServiceObj.getTree());
		treeServiceObj.addChild('TestGrandChild', treeServiceObj.getTree().children[0]);
		treeServiceObj.addChild('TestChild', treeServiceObj.getTree().children[0].children[0]);
		treeServiceObj.addChild('TestGrandChild', treeServiceObj.getTree().children[0].children[0].children[0]);
		result = treeServiceObj.getGrandParent('TestGrandChild');
		expect(result.length).toEqual(2);
	});
});
