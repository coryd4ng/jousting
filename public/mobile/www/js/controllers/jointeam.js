angular.module('app').controller('JoinTeamCtrl', function($scope, $http, $state, API_URL, $window) {
    
  var email = window.localStorage.email;
  var listOfTeams = [];

  $scope.team = {
    teamName: '',
    createdBy: ''
  };

  $http.get(API_URL + 'listAllTeams')
  .success(function(teams) {
    console.log("list of teams " + JSON.stringify(teams));
    for (var i = 0; i < teams['teams'].length; i++) {
      listOfTeams.push(teams['teams'][i]['teamName']);
    }
  });

$scope.joinTeam = function() {
  console.log('In the Join Team function ' + $scope.team.teamName);
  $http.post(API_URL + 'joinTeam', {
      email: email,
      teamName: $scope.team.teamName
    })
    .success(function() {
      var storage = $window.localStorage;
      storage.setItem('team', $scope.team.teamName);
      $state.go('roster');
    })
    .error(function(err) {
      console.log('NOT A REAL TEAM!' + err);
    });
};
});