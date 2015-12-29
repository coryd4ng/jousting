angular.module('app')

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider, API_URL) {

  $stateProvider

  .state('register', {
    url: '/register',
    views: {
      'app-nav': {
        templateUrl: 'templates/register.html',
      }
    }
  })

  .state('login', {
    url: '/login',
    views: {
      'app-nav': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('logout', {
    url: '/logout'
    // views: {
    //   'app-nav': {
    //     templateUrl: 'templates/home.html',
    //   }
    // }
  })

  .state('createTeam', {
    url: '/create-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/createTeam.html',
      }
    }
  })

  .state('joinTeam', {
    url: '/join-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/joinTeam.html',
        controller: 'JoinTeamCtrl'
      }
    }
  })

  .state('home', {
    url: '/',
    views: {
      'app-nav': {
        templateUrl: 'templates/home.html',
      }
    }
  })

  .state('roster', {
    url: '/roster',
    views: {
      'app-nav': {
        templateUrl: 'templates/roster.html',
        controller: 'RosterCtrl'
      }
    }
  })

  // .state('selfieChallenge', {
  //   url: '/selfie-challenge',
  //   resolve: {
  //     loggedin: checkLoggedin
  //   },
  //   views: {
  //     'app-nav': {
  //       templateUrl: 'templates/selfieChallenge.html',
  //       controller: 'challengeCtrl'
  //     }
  //   }
  // })

  .state('gauntlet', {
    url: '/gauntlet',
    views: {
      'app-nav': {
        templateUrl: 'templates/gauntlet.html',
      }
    }
  })

  .state('theTeam', {
    url: '/the-team',
    views: {
      'app-nav': {
        templateUrl: 'templates/theTeam.html',
        controller: 'theTeamCtrl'
      }
    }
  })

   .state('challenges', {
    url: '/challenges',
    views: {
      'app-nav': {
        templateUrl: 'templates/challenges.html',
        controller: 'ChallengesCtrl'
      }
    }
  })

  .state('selfieChallenge', {
    url: '/selfieChallenge',
    views: {
      'app-nav': {
        templateUrl: 'templates/selfieChallenge.html',
        controller: 'ImageController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  $authProvider.loginUrl = API_URL + 'login';
  $authProvider.signupUrl = API_URL + 'register';

})

.constant('API_URL', 'http://localhost:8000/');
