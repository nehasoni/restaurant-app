App.directive('panelimage', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                var width = element[0].width;
                var height = element[0].height;
                var ratio = Math.min(300 / element[0].width, 300 / element[0].height);
                element[0].width = width * ratio;
                element[0].height = height * ratio;

            });
        }
    };
});
