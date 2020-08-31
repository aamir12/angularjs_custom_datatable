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
    let defaultPerPage = 10;
    $scope.isLoading = true;
	$scope.$on('LastElem', function(event,data){
	  $scope.isLoading = false;
	  console.log("lastElem")
	  $scope.showFilterStatus();
    });
	
	$http.get("mockJson/mock.json").then(function(response){ 
		$scope.users = response.data;  //ajax request to fetch data into $scope.data
	});
	
	$scope.sort = function(keyname){
		$scope.resetPage();
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa

	}

	$scope.filterKey = 'All'
	$scope.setFilter = function(key){
		$scope.resetPage();
		$scope.filterKey = key;
	}

	
    $scope.onSearch = function(){
		$scope.resetPage();
	}

	
	$scope.resetPage = function(){
		if($scope.current_page>1){
			$scope.current_page = 1;
		}
		
		if($scope.itemsPerPages < defaultPerPage){
			$scope.showFilterStatus();
		}
	}

	$scope.showFilterStatus = function(){
		let filteredItems =  $scope.filteredItems.length;
		console.log("showFilterStatus");
		//let total = $scope.users;
		$scope.from  = ($scope.current_page-1)*$scope.itemsPerPages+ 1;
		console.log($scope.current_page);
		$scope.to = $scope.current_page*$scope.itemsPerPages;
		if(filteredItems<=$scope.itemsPerPages){
			$scope.to = filteredItems;
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


