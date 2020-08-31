var app = angular.module('angularTable', ['angularUtils.directives.dirPagination']);

app.directive('myRepeatDirective', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
      scope.$emit('LastElem',{status:true});
    }
  };
})


app.controller('listdata',function($scope, $http){
	$scope.users = []; //declare an empty array
	$scope.current_page = 1;

    $scope.isLoading = true;
	$scope.$on('LastElem', function(event,data){
	  console.log(data);
	  $scope.isLoading = false;
    });
	
	$http.get("mockJson/mock.json").then(function(response){ 
		$scope.users = response.data;  //ajax request to fetch data into $scope.data
	});
	
	$scope.sort = function(keyname){
		if($scope.current_page>1){
			$scope.current_page = 1;
		}
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa

	}

	$scope.filterKey = 'All'
	$scope.setFilter = function(key){
		if($scope.current_page>1){
			$scope.current_page = 1;
		}
		$scope.filterKey = key;
	}

	
    $scope.onSearch = function(){
		if($scope.current_page>1){
			$scope.current_page = 1;
		}
	}

    
	$scope.customFilter = function(users){

		if($scope.filterKey == 'All'){
		  return true;
		}

		if(users.hobby == $scope.filterKey){
		 return true;
		}
		else {
		 return false; 
		}
	}

	$scope.onView = function(user){
       console.log(user);
	}
});


