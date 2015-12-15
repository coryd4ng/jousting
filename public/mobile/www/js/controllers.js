angular.module('app.controllers', [])

.controller('authCtrl', function($scope, $http, $location) {
    $scope.user = {fullName: '', userName: '', email: '', password: ''};

    $scope.login = function() { 
        $http.post('/login', {
            userName: $scope.user.userName,
            password: $scope.user.password,
        })
        .success(function (user) {
            window.localStorage.user = JSON.stringify($scope.user);
            console.log('Login: Received OK response from server.');
            $location.url('/gauntlet');
        })
        .error(function () {
            console.log('Login: Received BAD response from server.');
            $location.url('/login');
        });
    };

    $scope.register = function() {
        $http.post('/register', {
            fullName: $scope.user.fullName,
            userName: $scope.user.userName,
            password: $scope.user.password, 
            email: $scope.user.email,
        })
        .success(function(user) {
            window.localStorage.user = JSON.stringify($scope.user);
            console.log('Registration: Received OK response from server.');
            $location.url('/gauntlet');
        })
        .error(function() {
            console.log('Registration: Received BAD response from server.');
            $location.url('/login');
        });
    };

    $scope.logout = function() {
        $http.post('/logout')
        .success(function() {
            delete window.localStorage.user;
            console.log('Logout: Received OK response from server.');
            $location.url('/');
        })
        .error(function() {
            console.log('Logout: Received BAD response from server.');
        });
    };
})

// .controller('loginCtrl', function($scope) {

// })

.controller('createATeamCtrl', function($scope, $http, $location) {
    var userNode = JSON.parse(window.localStorage['user']);
    console.log('userNode team is ', userNode.teams)
    console.log('scope user is', userNode.userName);
    $scope.team = {teamName: '', createdBy: ''};

    $scope.createTeam = function() {
        $http.post('/createTeam', {
            userName: userNode.userName,
            teamName: $scope.team.teamName
        })
        .success(function() {
            console.log($scope.team.teamName + ' has entered the gauntlet!');
            $location.url('/roster');
        })
        .error(function(err) {
            console.log('Team was not created :( '+err);
        })
        // get team name
    };
})

.controller('joinATeamCtrl', function($scope, $http, $location) {
    var userNode = JSON.parse(window.localStorage['user']);
    var listOfTeams = [];
    $scope.team = {teamName: '', createdBy: ''};
    //console.log('cory', $scope.team.teamName);
    console.log("userNode "+JSON.stringify(userNode));

    $http.get('/listAllTeams')
        .success(function(teams) {
            console.log("list of teams "+JSON.stringify(teams));
            //teams["teams"][i]["teamName"]
            for (var i = 0; i < teams['teams'].length; i++) {
                console.log("teamnames: "+teams['teams'][i]['teamName'])
                listOfTeams.push(teams['teams'][i]['teamName']);
            }
        });

    $scope.joinTeam = function() {
        console.log('In the Join Team function ' + $scope.team.teamName);
        $http.post('/joinTeam', {
            userName: userNode["userName"],
            teamName: $scope.team.teamName
        })
            .success(function() {
                $location.url('/roster')
                console.log('userName: ' + userNode["userName"] + ' teamName: ' + $scope.team.teamName)
            })
            .error(function(err) {
                console.log('NOT A REAL TEAM!' + err);
            })
        }
})

.controller('homeCtrl', function($scope) {

})

.controller('rosterCtrl', function($scope, $http) {
    var userNode = JSON.parse(window.localStorage['user']);
    console.log("in roster control");
    $scope.teamInfo = {users: [], teamName: ''}
    var teamUserIsIn;
    var usersInTeam;
    // $scope.getTeamName = function() {
        $http.post('/getTeamName', {
            userName: userNode["userName"]
        })
            .success(function(teams) {
                // console.log(JSON.stringify(teams));
                teamUserIsIn = teams["teams"];
                console.log("teamarray "+JSON.stringify(teamUserIsIn[0]['teamName']));
                // teamUserIsIn[index]["teamName"];
                $scope.teamInfo.teamName = teamUserIsIn[0]['teamName'];
                console.log('This is the scope.teamInfo.teamName: ' + $scope.teamInfo.teamName)

                // NESTED HTTP POST REQUEST IS BAD PRACTICE! NEEDS REFACTORING!
                $http.post('/roster', {
                    teamName: teamUserIsIn[0]["teamName"]
                })
                    .success(function(users) {
                        // console.log("userarray "+JSON.stringify(users));
                        usersInTeam = users["users"];
                        $scope.teamInfo.users = usersInTeam;
                        // for (var i = 0; i < usersInTeam.length; i++) {
                        //     $scope.teamInfo.users.push(JSON.stringify(usersInTeam[i]['userName']));
                        //     console.log("userNameArray: "+$scope.teamInfo.users);
                        //     // usersInTeam[index]["userName"];
                        // }
                    })
                    .error(function(err) {
                        console.log('Could not retrive roster list ' + err)
                    })

            })
            .error(function(err) {
                console.log('Could not retrive user info ' + err);
            })
        // }
    //teamUserIsIn[index]["teamName"]

})

.controller('gauntletCtrl', function($scope) {

})

.controller('theTeamCtrl', function($scope) {

})
