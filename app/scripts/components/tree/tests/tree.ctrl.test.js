'use strict';

describe('Controller: Tree', function () {

	// load the controller's module
	beforeEach(module('familyTreeApp'));

	var TreeCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope, Tree) {
		scope = $rootScope.$new();
		Tree.demo = function() {
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
			return nancy;
		};
		Tree.getGrandParent = function(name){
			if (name === 'Kevin') {
				return [TreeCtrl.tree];
			} else {
				return [];
			}
		};
		TreeCtrl = $controller('TreeCtrl', {
			$scope: scope,
			// place here mocked dependencies
			Tree: Tree
		});
	}));
	describe('validating members', function(){
		it('- tree varaible shoud start out with null', function () {
			expect(TreeCtrl.tree).toBe(null);
		});
		it('- searchTerm varaible shoud start out with an empty string', function () {
			expect(TreeCtrl.searchTerm).toBe('');
		});	
	});
	describe('validating functions', function(){
		it('- addChild function should be defined', function () {
			expect(TreeCtrl.addChild).toBeDefined();
		});
		it('- addFamily function should be defined', function () {
			expect(TreeCtrl.addFamily).toBeDefined();
		});	
		it('- demo function should be defined', function () {
			expect(TreeCtrl.demo).toBeDefined();
		});
		it('- isSearchResult function should be defined', function () {
			expect(TreeCtrl.isSearchResult).toBeDefined();
		});
		it('- removeFamily function should be defined', function () {
			expect(TreeCtrl.removeFamily).toBeDefined();
		});
		it('- toggleEdit function should be defined', function () {
			expect(TreeCtrl.toggleEdit).toBeDefined();
		});
	});
	describe('testing addFamily function', function(){
		beforeEach(function(){
			TreeCtrl.addFamily('testFamily');	
		});
		it('- tree should now be Initialize.', function(){
			expect(TreeCtrl.tree).toBeDefined();
		});
		it('- the root element should have name testFamily', function(){
			expect(TreeCtrl.tree.name).toBe('testFamily');
		});
		it('- it should have no child', function(){
			expect(TreeCtrl.tree.children).toEqual([]);
		});
	});
	describe('testing removeFamily function', function(){
		beforeEach(function(){
			TreeCtrl.addFamily('testFamily');	
		});
		it('- it should have no child', function(){
			TreeCtrl.removeFamily();
			expect(TreeCtrl.tree).toBe(null);
		});
	});
	describe('testing addChild function', function(){
		beforeEach(function(){
			TreeCtrl.tree = new TreeNode('Test');
			TreeCtrl.addChild('testChild', TreeCtrl.tree);
		});
		it('- tree should now be Initialize.', function(){
			expect(TreeCtrl.tree).toBeDefined();
		});
		it('- the root element should have name Test', function(){
			expect(TreeCtrl.tree.name).toBe('Test');
		});
		it('- now it should have one children name testChild', function(){
			TreeCtrl.addChild('testChild', TreeCtrl.tree);
			expect(TreeCtrl.tree.children.length).toEqual(1);
		});
	});
	describe('testing demo function', function(){
		beforeEach(function() {
			TreeCtrl.demo();
		});
		it('- demo data should be filled', function(){
			expect(TreeCtrl.tree).toBeDefined();
		});
		it('- root should be Nancy', function(){
			expect(TreeCtrl.tree.name).toBe('Nancy');
		});
		it('- Nancy should have 3 children', function(){
			expect(TreeCtrl.tree.children.length).toEqual(3);
		});
		it('- Nancy should have child name Adam', function(){
			var idx = _.findIndex(TreeCtrl.tree.children, {name: 'Adam'});
			expect(idx).not.toEqual(-1);
		});
		it('- Nancy should have child name Jill', function(){
			var idx = _.findIndex(TreeCtrl.tree.children, {name: 'Jill'});
			expect(idx).not.toEqual(-1);
		});
		it('- Nancy should have child name Carl', function(){
			var idx = _.findIndex(TreeCtrl.tree.children, {name: 'Carl'});
			expect(idx).not.toEqual(-1);
		});
		it('- person with the most grandchildren should be Jill', function(){
			scope.$digest();
			expect(TreeCtrl.mostGrandChildren.name).toEqual('Jill');
		});
		it('- Nancy\'s noSibling flag should be turned on', function(){
			scope.$digest();
			expect(TreeCtrl.tree.noSibling).toBe(true);
		});
		it('- Kevin\'s noSibling flag should be turned on', function(){
			scope.$digest();
			// this is where kevin is using this to be not dependent on find function
			var kevin = TreeCtrl.tree.children[1].children[0];
			expect(kevin.noSibling).toBe(true);
		});
		it('- Mary\'s noSibling and noChildren flag should be turned on', function(){
			scope.$digest();
			// this is where kevin is using this to be not dependent on find function
			var mary = TreeCtrl.tree.children[1].children[0].children[2].children[0];
			expect(mary.noSibling).toBe(true);
			expect(mary.children.length).toEqual(0);
		});
		it('- Adam, Samuel, Patrick, Robert, Mary, Aaron, Catherine and Joseph should ' +
			' not have any child.', function(){
			scope.$digest();
			// this is where kevin is using this to be not dependent on find function
			var adam = TreeCtrl.tree.children[0],
					samuel = TreeCtrl.tree.children[1].children[0].children[0],
					patrick = TreeCtrl.tree.children[1].children[0].children[1].children[0],
					robert = TreeCtrl.tree.children[1].children[0].children[1].children[1],
					mary = TreeCtrl.tree.children[1].children[0].children[2].children[0],
					aaron = TreeCtrl.tree.children[1].children[0].children[3],
					catherine = TreeCtrl.tree.children[2].children[0],
					joseph = TreeCtrl.tree.children[2].children[1];
			expect(adam.children.length).toEqual(0);
			expect(samuel.children.length).toEqual(0);
			expect(patrick.children.length).toEqual(0);
			expect(robert.children.length).toEqual(0);
			expect(mary.children.length).toEqual(0);
			expect(aaron.children.length).toEqual(0);
			expect(catherine.children.length).toEqual(0);
			expect(joseph.children.length).toEqual(0);
		});
	});
	describe('testing isSearchResult function', function(){
		// safe to use demo
		beforeEach(function(){
			TreeCtrl.demo();
		});
		it('searching with a valid value should turn on grandView toggle.', function(){
			TreeCtrl.searchTerm = 'Kevin';
			scope.$apply();
			expect(TreeCtrl.grandView).toBe(true);
		});
		it('searching with an invalid value should not turn on grandView toggle.', function(){
			TreeCtrl.searchTerm = 'INVALID';
			scope.$apply();
			expect(TreeCtrl.grandView).toBe(false);
		});
		it('searching with an empty string should not turn on grandView toggle.', function(){
			TreeCtrl.searchTerm = '';
			scope.$apply();
			expect(TreeCtrl.grandView).toBe(false);
		});
		it('searching when there is no tree model should not turn on grandView toggle.', function(){
			TreeCtrl.tree = null;
			TreeCtrl.searchTerm = 'Kevin';
			scope.$apply();
			expect(TreeCtrl.grandView).toBe(false);
		});
		it('Kevin\'s grand parent should be Nancy.', function(){
			TreeCtrl.searchTerm = 'Kevin';
			scope.$apply();
			var idx = _.findIndex(TreeCtrl.grandSearchResult, {name: 'Nancy'});
			expect(TreeCtrl.grandSearchResult[idx].name).toEqual('Nancy');
		});
		it('Kevin\'s grand parent should be Nancy by returned value of isSearchResult.',
			function(){
			TreeCtrl.searchTerm = 'Kevin';
			scope.$apply();
			expect(TreeCtrl.isSearchResult(TreeCtrl.tree)).toBe(true);
		});
		it('Adam should not be a search result.',
			function(){
			TreeCtrl.searchTerm = 'Kevin';
			scope.$apply();
			expect(TreeCtrl.isSearchResult(TreeCtrl.tree.children[0])).toBe(false);
		});
	});
	describe('testing toggleEdit function', function() {
		it('if edit is not defined, edit becomes true', function(){
			var node = new TreeNode('abc');
			TreeCtrl.toggleEdit(node);
			expect(node.edit).toBe(true);
		});
		it('if edit is true, edit becomes false', function(){
			var node = new TreeNode('abc');
			node.edit = true;
			TreeCtrl.toggleEdit(node);
			expect(node.edit).toBe(false);
		});
		it('if edit is false, edit becomes true', function(){
			var node = new TreeNode('abc');
			node.edit = false;
			TreeCtrl.toggleEdit(node);
			expect(node.edit).toBe(true);
		});
	});
});