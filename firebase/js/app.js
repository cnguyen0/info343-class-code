
/*
theres an API for syncronized arrays for firebase
*/

angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chat.firebaseio.com/messages')
    .controller('ChatController', function($scope, $firebaseArray, firebaseUrl) {
        // create a reference to the firebase
        var ref = new Firebase(firebaseUrl);
        ref.limitToLast(1000);
        $scope.messages = $firebaseArray(ref);

        //initialize form fields
        $scope.body = null;
        $scope.name = null;

        $scope.sendMessage = function() {
            // adds a new object to the array and synchronizes with the server
            $scope.messages.$add({
                name: $scope.name,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP // special value
            });

            $scope.body = null;
        }
    });
