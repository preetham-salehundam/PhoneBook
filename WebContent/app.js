/**
 * 
 */

var app=angular.module('ContactsApp',['ui.router','ngResource','ngStorage']);
app.config(function($stateProvider){
	$stateProvider
	.state('smartshop',{//Parent state
		url:'/smartshop/Clients',
		templateUrl:"/AngularSession/html/client.html",
		controller:"clientCtrl",
		resolve:{
			clientList:function($http){
				return $http.get('repository/clientRepo.json').then(function(response){
					return response.data;
					
				})
		}			
		}
	
	})
	.state('smartshop.managePhoneBook',{// child state
		url:'/details/:name',
		templateUrl:'/AngularSession/html/PhoneBook.html',
		controller:'phoneBookCtrl',
		resolve:{
			DetailsList:function($http){
				return $http.get('repository/clientRepo.json').then(function(response){
					return response.data;
					
				})
			}
		}
		
	})
	.state('Managers',{//Parent state
		url:'/managers',
		templateUrl:"/AngularSession/html/managers.html",
		controller:"managersCtrl",
		resolve:{
			managersList:function($http){
				return $http.get('repository/managersRepo.json').then(function(response){
					return response.data;
					
				})
		}			
		}
	
	})
	.state('Managers.managePhoneBook',{// child state
		url:'/details/:name',
		templateUrl:'/AngularSession/html/PhoneBook.html',
		controller:'phoneBookCtrl',
		resolve:{
			DetailsList:function($http){
				return $http.get('repository/managersRepo.json').then(function(response){
					return response.data;
					
				})
			}
		}
		
	})
	
	.state('ProjectLead',{
		url:'/projectLeads',
		templateUrl:"/AngularSession/html/projectLeads.html",
		controller:"projectLeadCtrl",
		resolve:{
			projectLeadsList:function($http){
				return $http.get('repository/projectLeadsRepo.json').then(function(response){
					return response.data;
					
				})
			}
		}
	})
	
	.state('ProjectLead.managePhoneBook',{
		url:'/details/:name',
		templateUrl:"/AngularSession/html/PhoneBook.html",
		controller:"phoneBookCtrl",
		resolve:{
			DetailsList:function($http){
				return $http.get('repository/projectLeadsRepo.json').then(function(response){
					return response.data;
					
				})
			}
		}
	})
	
	
	
	
	.state('TechLeads',{
		url:'/techleads',
		templateUrl:'/AngularSession/html/techleads.html',
		controller:'techleadsCtrl',
		resolve:{
			techleadsList:function($http){
				return $http.get('repository/techleadsRepo.json').then(function(response){
					return response.data;
					
				})
			}
		}
	})
	
	.state('TechLeads.managePhoneBook',{
		url:'/details/:name',
		templateUrl:"/AngularSession/html/PhoneBook.html",
		controller:"phoneBookCtrl",
		resolve:{
			DetailsList:function($http){
				return $http.get('repository/techleadsRepo.json').then(function(response){
					return response.data;
					
				})
			}
		}
	})
	.state('SeniorSE',{
		url:'/seniorSE',
		templateUrl:'/AngularSession/html/seniorse.html',
		controller:'seniorseCtrl',
		resolve:{
			seniorSEList:function($http){
				return $http.get('repository/sseRepo.json').then(function(response){
					return response.data;
					
				})
			}
		}
	})
	.state('SeniorSE.managePhoneBook',{
		url:'/details/:name',
		templateUrl:"/AngularSession/html/PhoneBook.html",
		controller:"phoneBookCtrl",
		resolve:{
			DetailsList:function($http){
				return $http.get('repository/sseRepo.json').then(function(response){
					return response.data;
					
				})
			}
		}
	})
	.state('Freshers',{
		url:'/freshers',
		templateUrl:'/AngularSession/html/freshers.html',
		controller:'freshersCtrl',
		resolve:{
			freshersList:function($http){
				return $http.get('repository/freshersrepo.json').then(function(response){
					return response.data;
					
				})
			}
		}
	})
	.state('Freshers.managePhoneBook',{
		url:'/details/:name',
		templateUrl:"/AngularSession/html/PhoneBook.html",
		controller:"phoneBookCtrl",
		resolve:{
			DetailsList:function($http){
				return $http.get('repository/freshersrepo.json').then(function(response){
					return response.data;
					
				})
			}
		}
	})
	
	
})
app.run(function($state,$rootScope){
	$rootScope.$Currentstate=$state;
})

//app.factory('JsonResolver',function($resource){
//return $resource('Repo.json');
//})

app.controller('ContactsController',function($scope){

	
})

app.controller('clientCtrl',function($scope,clientList){

	$scope.clientDetails=clientList;
	
})
app.controller('managersCtrl',function($scope,managersList){

	$scope.managerDetails=managersList;
	
})

app.controller('projectLeadCtrl',function($scope,projectLeadsList){
	$scope.plList=projectLeadsList;
	
})

app.controller('seniorseCtrl',function($scope,seniorSEList){
	$scope.SSElist=seniorSEList;
	
})

app.controller('techleadsCtrl',function($scope,techleadsList){
	$scope.techleadList=techleadsList;
	
})

app.controller('freshersCtrl',function($scope,freshersList){
	$scope.newJoineeList=freshersList;
	
})
app.controller('phoneBookCtrl',function($scope,$state,$stateParams,DetailsList,$localStorage,$timeout){
$scope.nameDetails=$stateParams.name;
$scope.currentState=$state.current.name;
$scope.details=DetailsList;
$scope.PhoneNumbers=$scope.details.filter(function(contact){
	return contact.Name==$scope.nameDetails;
})
$scope.showtextBox=false;
$scope.$storage=$localStorage; //initialise localstorage to $scope.$storage
$scope.attachNotes=function(contactName){
		
		 var notesObj={};
		 notesObj['Notes_by_'+contactName.replace(/ /g,'')+'']=$scope.notesData; // to remove spaces
		if($scope.notesData){
			$timeout(function(){
				$scope.$storage[''+contactName.replace(/ /g,'')+'']=notesObj;
			})
			
		}else if($scope.$storage && $scope.$storage[''+contactName.replace(/ /g,'')+''] ){
			$scope.notesData=$scope.$storage[''+contactName.replace(/ /g,'')+'']['Notes_by_'+contactName.replace(/ /g,'')+''];//$scope.$storage.cheran.Notes_by_cheran
		}
		 
		
		
		$scope.showtextBox=!$scope.showtextBox;
}

$scope.saveNotes=function(contactName){
//	if($scope.$storage && $scope.$storage[''+contactName.replace(/ /g,'')+''] ){
//		$scope.notesData=$scope.$storage[''+contactName.replace(/ /g,'')+'']['Notes_by_'+contactName.replace(/ /g,'')+''];//$scope.$storage.cheran.Notes_by_cheran
//	}
	 var tempObj={};
	 tempObj['Notes_by_'+contactName.replace(/ /g,'')+'']=$scope.notesData; // regex to remove spaces
	if($scope.notesData){
		$timeout(function(){
			$scope.$storage[''+contactName.replace(/ /g,'')+'']=tempObj;
		})
		$scope.stamp=new Date();
		$scope.glowIcon= {'color':'#4CAF50'};
	}
}
// notification
var contactName=$scope.nameDetails;
if($scope.$storage && $scope.$storage[''+contactName.replace(/ /g,'')+''] ){ //to prevent error when localstorage is cleareds
	$scope.notesAttached=$scope.$storage[''+contactName.replace(/ /g,'')+'']['Notes_by_'+contactName.replace(/ /g,'')+''];	
	if(angular.isString($scope.notesAttached) && ($scope.notesAttached.length!=0)){
		$scope.glowIcon= {'color':'#4CAF50'};
	};

}

	
})



//------filter section----//
app.filter('phoneNumberFormatter',function(){
	return function(number){
		return number.substring(0,3)+" "+number.substring(3,5)+"-"+number.substring(5,7)+"-"+number.substring(7,number.length)
	}
})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

