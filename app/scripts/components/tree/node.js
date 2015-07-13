'use strict';
var TreeNode = function(name) {
	this.name = name;
	this.children = [];
	this.parents = [];
};
// Add a child to this node
TreeNode.prototype.addChild = function(child) {
	this.children.push(child);
};
// Gets all the parents of this node
TreeNode.prototype.getParents = function() {
	return this.parents;
};
// Gets a list of grandparents of this node 
TreeNode.prototype.getGrandParents = function(){
	var gp = [];
	if (this.parents.parents && this.parents.parents.length) {
		gp = this.parents.parents;
	}
	return gp;
};
// Gets all the children of this node
TreeNode.prototype.getChildren = function() {
	return this.children;
};
// Get a count for grand children for this node
TreeNode.prototype.getGrandChildrenCount = function() {
	return 0;
};
// Get a count of sibilings for this node
TreeNode.prototype.getSibilingCount = function() {
	return 0;
};