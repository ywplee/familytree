'use strict';
var TreeNode = function(name) {
	this.name = name;
	this.children = [];
	this.parent = null;
};
// Add a child to this node
TreeNode.prototype.addChild = function(child) {
	child.parent = this;
	this.children.push(child);
};
// Gets parent of this node
TreeNode.prototype.getParent = function() {
	return this.parent;
};
// Gets grandparent of this node 
TreeNode.prototype.getGrandparent = function(){
	var gp = null;
	if (this.parent && this.parent.parent) {
		gp = this.parent.parent;
	}
	return gp;
};
// Gets all the children of this node
TreeNode.prototype.getChildren = function() {
	return this.children;
};