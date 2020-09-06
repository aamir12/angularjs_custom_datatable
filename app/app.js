var app = angular.module('angularTable', ['angularUtils.directives.dirPagination']);
//custom directive to indicate last row of records
app.directive('myRepeatDirective', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
	  //emit event - LastElem 	
      scope.$emit('LastElem',{status:true});
    }
  };
})


app.controller('listdata',function($scope, $http){
	$scope.users = []; //declare an empty array
	$scope.current_page = 1; //current page
    let defaultPerPage = 10; //used for campare
	$scope.isLoading = true; // show loading div
	//call when last row render
	$scope.$on('LastElem', function(event,data){
	  $scope.isLoading = false;
	  $scope.showFilterStatus();
	});
	//step1:
	//fetch data from database/file/any resource
	$http.get("mockJson/mock.json").then(function(response){ 
		$scope.users = response.data;  //ajax request to fetch data into $scope.data
	});
	
	//use to sort data
	$scope.sort = function(keyname){
		$scope.resetPage();
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}

	//Custom filter- call on button click
	$scope.filterKey = 'All'
	$scope.setFilter = function(key){
		$scope.resetPage();
		$scope.filterKey = key;
	}

	//call on text search
    $scope.onSearch = function(){
		$scope.resetPage();
	}

	//call on change number of records per page
	//it also reset current page to 1 on search,filter,sort,numberofPageChange
	$scope.resetPage = function(){
		if($scope.current_page>1){
			$scope.current_page = 1;
		}
        //if number of items is less than default items per page
		if($scope.itemsPerPages < defaultPerPage){
			$scope.showFilterStatus();
		}
	}

	//show status of pages and filter items
	$scope.showFilterStatus = function(){
		let filteredItems =  $scope.filteredItems.length;
		//let total = $scope.users;
		$scope.from  = ($scope.current_page-1)*$scope.itemsPerPages+ 1;
		$scope.to = $scope.current_page*$scope.itemsPerPages;
		if(filteredItems<= $scope.itemsPerPages || $scope.to >= filteredItems){
			$scope.to = filteredItems;
		}
	}
	
	//it call on ng-repeat
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


