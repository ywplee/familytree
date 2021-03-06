(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name familyTreeApp
	 * @description
	 * # familyTreeApp
	 *
	 * Main module of the application.
	 */
	angular
		.module('familyTreeApp', [
			'ngAnimate',
			'ngCookies',
			'ngResource',
			'ngRoute',
			'ngSanitize',
			'ngTouch'
		])
		.config(function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'scripts/components/tree/templates/tree.html',
					controller: 'TreeCtrl',
					controllerAs: 'vm'
				})
				.otherwise({
					redirectTo: '/'
				});
		});
})();