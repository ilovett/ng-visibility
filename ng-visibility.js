(function (window, angular, undefined) {

  'use strict';

  var NG_INVISIBLE_CLASS = 'ng-invisible';
  var NG_INVISIBLE_IN_PROGRESS_CLASS = 'ng-invisible-animate';

  /**
   * @ngdoc directive
   * @name ngVisibility.directive:focusOnClick
   * @description
   * # focusOnClick
   */
  angular.module('ngVisibility', [])
    .directive('ngVisible', function ($animate) {
      return {
        restrict: 'A',
        multiElement: true,
        link: function (scope, element, attr) {
          scope.$watch(attr.ngVisible, function ngVisibleWatchAction(value) {
            // we're adding a temporary, animation-specific class for ng-hide since this way
            // we can control when the element is actually displayed on screen without having
            // to have a global/greedy CSS selector that breaks when other animations are run.
            // Read: https://github.com/angular/angular.js/issues/9103#issuecomment-58335845
            $animate[value ? 'removeClass' : 'addClass'](element, NG_INVISIBLE_CLASS, {
              tempClasses: NG_INVISIBLE_IN_PROGRESS_CLASS
            });
          });
        }
      }
    })
    .directive('ngInvisible', function ($animate) {
      return {
        restrict: 'A',
        multiElement: true,
        link: function (scope, element, attr) {
          scope.$watch(attr.ngInvisible, function ngInvisibleWatchAction(value) {
            // see comment in ngVisible directive
            $animate[value ? 'addClass' : 'removeClass'](element, NG_INVISIBLE_CLASS, {
              tempClasses: NG_INVISIBLE_IN_PROGRESS_CLASS
            });
          });
        }
      }
    });

  // add ng-invisible styles
  !window.angular.$$csp() && window.angular.element(document).find('head').prepend('<style type="text/css">@charset "UTF-8";.' + NG_INVISIBLE_CLASS + ':not(.' + NG_INVISIBLE_IN_PROGRESS_CLASS + '){visibility:hidden !important;}</style>');

})(window, window.angular);
