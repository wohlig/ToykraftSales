var adminurl = "http://mafiawarloots.com/clientunderworkcode/index.php/";


angular.module('starter.controllers', ['myservices'])

.factory('Camera', ['$q',
    function ($q) {

        return {
            getPicture: function (options) {
                var q = $q.defer();
                console.log(options);
                /*$scope.options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI
                };*/
                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
}])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $location, MyServices) {

    $scope.setslide = function () {
        var path = $location.path();
        var path2 = path.slice(0, 12)
            //console.log(path);

        if (path2 == "/app/dealer/") {
            //console.log("true");
            return true;
        } else {
            //console.log("false");
            return false;
        };
        //return false;        
    };

    var categorynamesuccess = function (data, status) {
        $scope.categorynamedata = data;
    };
    MyServices.getcategoriesname().success(categorynamesuccess);

    $scope.rid = MyServices.getretailer();
    $scope.changecategory = function (cid) {
        MyServices.setcategory(cid);
        MyServices.setsearchtxt("");
        var retailer = MyServices.getretailer();
        $location.path("/app/dealer/" + retailer + "/" + cid);
        $location.replace();
    };
    //$scope.categorynamedata = [{name: "Abhay"},{name: "Chintan"}];

    /*    var productcategorysuccess = function(data, status) 
    {
        productdata = data;
        MyServices.setproductCatdata(data);
        
    };
    $scope.findcategory = function(catid) 
    {
        MyServices.findproductbycategory(catid).success(productcategorysuccess);
    };*/

    /*    var productsuccess = function(data, status) {
        productdata = data;
        setproductCatdata(productdata);
    }    
    MyServices.getproductsbycategory(cid).success(productsuccess);*/

})


.controller('LoginCtrl', function ($scope, $stateParams, MyServices, $location) {
    console.log("CONTROLLER IS CALLED");
    $scope.login = {};
    console.log($scope.login)

    var loginSuccess = function (data, status) {
        console.log(data);
        if (data != "false") {
            $location.path("#/app/home");
            MyServices.setuser(data);
        } else {
            $scope.alert = "Username or password incorrect";
        }
    };

    $scope.loginFunction = function (login) {
        // console.log("FUNCTION WORKING");
        // console.log($scope.login.username);
        MyServices.loginFunc(login).success(loginSuccess);
    };


})

.controller('HomeCtrl', function ($scope, $stateParams, $location, MyServices) {

    //GET ZONE DATA
    var user = MyServices.getuser();
    var userzone = user.zone;
    console.log("THE ZOOOOOONNNNNEEEE ISSSSSS " + userzone)
    $scope.zonedata = [];

    $scope.zonedata.id = userzone;

    //$ionicSideMenuDelegate.canDragContent(false);

    $scope.logout = function () {
        $.jStorage.flush();
        user = undefined;
        $location.path("/app/login");
    };
    $scope.user = user;
    $scope.lastretailer = MyServices.getretailer();

    $scope.gotolastretailer = function () {
        var pathtolast = "/app/dealer/" + $scope.lastretailer + "/6";
        $location.path(pathtolast);
    };

    todaytallydatasuccess = function (data, status) {
        if (data == "false") {
            $scope.todtallydata = data;
        } else {
            $scope.todtallydata = data;
        }

    };

    monthtallydatasuccess = function (data, status) {
        $scope.monthtallydata = data;
    };

    console.log("user id is" + user.id)
    MyServices.gettodaytally(user.id).success(todaytallydatasuccess);
    MyServices.getmonthtally(user.id).success(monthtallydatasuccess)
})



.controller('ZoneCtrl', function ($scope, $stateParams, $http, MyServices) {

    $scope.zonedata = [];
    var onzonesuccess = function (data, status) {
        console.log("DATA SUCCESS");
        console.log(data);
        $scope.zonedata = data;
    };
    MyServices.findzone().success(onzonesuccess);

})

.controller('StateCtrl', function ($scope, $stateParams, $http, MyServices) {

    var zoneID = $stateParams.id;
    $scope.statedata = [];

    var onsuccess = function (data, status) {
        console.log("DATA SUCCESS");
        console.log(data);
        $scope.statedata = data;
    };
    MyServices.findstate(zoneID).success(onsuccess);

})

.controller('CityCtrl', function ($scope, $stateParams, $http, MyServices) {

    var stateID = $stateParams.id;
    console.log("Main ID " + stateID);
    $scope.citydata = [];

    var citySuccess = function (data, status) {
        console.log("CITY SUCCESS")
        $scope.citydata = data;
    };
    MyServices.findcity(stateID).success(citySuccess);

})

.controller('AreaCtrl', function ($scope, $stateParams, $http, MyServices) {

    var cityID = $stateParams.id;
    console.log("Main ID " + cityID);
    $scope.areadata = [];

    var areaSuccess = function (data, status) {
        console.log("AREA SUCCESS")
        $scope.areadata = data;
    };

    MyServices.findarea(cityID).success(areaSuccess);

})

.controller('RetailerCtrl', function ($scope, $stateParams, $http, MyServices, $location) {

    var areaID = $stateParams.id;
    $scope.areaid = areaID;
    MyServices.setareaid(areaID);
    console.log("AREA ID is " + areaID);
    $scope.retailerdata = [];

    var retailSuccess = function (data, status) {
        console.log("RETAIL SUCCESS")
        $scope.retailerdata = data;
    };

    MyServices.findretailer(areaID).success(retailSuccess);

})

.controller('DealerCtrl', function ($scope, $stateParams, $http, MyServices, $location, $ionicModal, $window) {
        $scope.heightVal = $window.innerHeight - 44;
        /*   //WATCH
    $scope.changetext = {name:"abhay"};
    $scope.$watch('changetext', function() {
      // alert('hey, myVar has changed!');
   });
    $scope.change = function() {
        MyServices.setproductCatdata([{name: "Abhay"},{name:"Chintan"}]);
    };*/


        //GEO-LOCATION
        var onSuccess = function (position) {
            console.log('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude);
        };

        function onError(error) {
            console.log('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
        window.navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: false
        });

        $scope.total = 0;
        $scope.user = user;

        //CHECK IF NEW RETAILER
        $scope.retailerid = $stateParams.id;
        MyServices.checkretailer($scope.retailerid);
        //SET RETAILER
        MyServices.setretailer($scope.retailerid);
        //GET CART
        $scope.mycart = MyServices.getCart();

        $scope.retailerID = $stateParams.id;
        if ($scope.retailerID == 0) {
            $location.path("/app/home");
        };



        // console.log('retailer ID is ' + retailerID);

        //GAINING RETAILER INFORMATION
        $scope.retailerdata2 = [];
        console.log($scope.retailerdata2);
        var retailSuccess2 = function (data, status) {
            console.log("Retailer info gained");
            console.log(data);
            $scope.retailerdata2 = data;
            $scope.dealeremail = data.distributor;
            console.log($scope.dealeremail);
        };
        MyServices.findoneretailer($scope.retailerID).success(retailSuccess2);
        $scope.productquantity = 1;

        //PRODUCT INFORMATION
        var pronumber = 1;
        $scope.pname;
        $scope.pid;
        $scope.pquantity;

        $scope.changequantity = function (quantity, id) {

            $scope.mycart[id].quantity = parseInt(quantity);
            var mrp = $scope.mycart[id].mrp;
            $scope.mycart[id].totalprice = quantity * mrp;
            MyServices.setcart($scope.mycart);
            //$scope.total += ;
        };


        //GET LAST THREE ORDERS OF RETAIlER
        var retailerrecentorders = function (data, status) {
            if (data != "false") {
                $scope.retailerrecentdata = data;
            } else {
                //$scope.retailerrecentdata = [{0,0,0,0},{0,0,0,0},{0,0,0,0}];
            };
        };
        MyServices.getrecentorders($scope.retailerid).success(retailerrecentorders);


        //GET TOTAL FUNCTION
        $scope.gettotal = function () {
            var total = 0;
            for (var i = 0; i < $scope.mycart.length; i++) {
                total += $scope.mycart[i].totalprice;
            }
            return total;
        };


        /*    //FIND PRODUCT
    var productSuccess = function (data, status) {
        console.log(data.name);
        $scope.product = data;
        $scope.pid = data.id;
        $scope.pname = data.name;
        $scope.pquantity = data.mrp;
        //MyServices.setproductCatdata(data);
        //console.log(productname);
    };

    function findproduct(id) {
        console.log("product ID is " + id);
        MyServices.findoneproduct(id).success(productSuccess);
    };*/


        //INITIAL CALLING PRODUCTS ON PAGE LOAD
        $scope.choice = "scheme";
        //CAEGORY AND PRODUCTS
        $scope.categoryid = $stateParams.cid;
        MyServices.setcategory($stateParams.cid);

        //DEFINING THE ARRAY VARIABLE
        $scope.categoryproductdata = {};

        //GIVING VALUES IN VARIABLE
        var oncategoryproductsuccess = function (data, status) {
            $scope.categoryproductdata = data;
            //findproduct(data.id);
        };
        //INITITAL FUNCTION ON PAGE CALL
        MyServices.findnext(0, 1).success(oncategoryproductsuccess);

        //SCHEME AND NEW PRODUCTS
        $scope.getscheme = function (cid) {
            MyServices.setsearchtxt("");
            MyServices.setcategory(cid);
            var retailer = MyServices.getretailer();
            $location.path("/app/dealer/" + $scope.retailerid + "/" + cid);
            $location.replace();
        };

        //NEXT BUTTON AN PREVIOUS BUTTON (1 FOR NEXT, 0 FOR PREVIOUS)
        $scope.getnextproduct = function (next) {
            console.log("SENDING ID " + $scope.categoryproductdata.id);
            MyServices.findnext($scope.categoryproductdata.id, next).success(oncategoryproductsuccess);
        };


        //SEARCH
        var searchtxt = MyServices.getsearchtxt();
        if (searchtxt != "") {
            $scope.searchtext = searchtxt;
        }
        $scope.searchproduct = function (searchvalue) {
            var retail = MyServices.getretailer();
            MyServices.setsearchtxt(searchvalue);
            console.log(searchvalue);
            var searchtext = "f" + searchvalue;
            console.log(searchtext);
            MyServices.setcategory(searchtext);
            $location.path("/app/dealer/" + retail + "/" + searchtext);
        };

        //TOP TEN ORDERS
        $scope.toptendata = {};
        $ionicModal.fromTemplateUrl('templates/topten.html', {
            id: '1',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal1 = modal;
        });
        var toptendatasuccess = function (data, status) {
            $scope.toptendata = data;
        };
        $scope.gettopten = function () {
            $scope.oModal1.show();
            MyServices.gettoptenproducts().success(toptendatasuccess);
        };

        //EDIT RETAILERS
        $scope.editretailer = {};
        $scope.editretailer.id = $scope.retailerID;

        $ionicModal.fromTemplateUrl('templates/editretailer.html', {
            id: '2',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal2 = modal;
        });
        var editretailersuccess = function (data, status) {
            //$scope.toptendata = data;
            $scope.oModal2.hide();
        };
        $scope.gettopen = function () {
            $scope.oModal2.show();
        };
        $scope.editRetailerFunction = function () {
            console.log($scope.editretailer.number);
            MyServices.editretailerdetails($scope.editretailer).success(editretailersuccess);
            $scope.oModal2.hide();
        };
        

    //USPs
    $ionicModal.fromTemplateUrl('templates/usp.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal3 = modal;
    });
    $scope.closeusp = function () {
        $scope.oModal3.hide();
    };
    $scope.openusp = function () {
        $scope.oModal3.show();
    };
    
        /*    //PREVIOUS BUTTON
    $scope.getpreviousproduct = function () 
    {
        console.log("SENDING ID " + $scope.pid);
        MyServices.findnext($scope.pid, 0).success(oncategoryproductsuccess);
    };*/

        /*    //NEXT AND id
    var onnextid = function (data) {
        $scope.newnid = data.id;
        console.log("getting id: " + data.id);
        
        //findproduct(data.id);
    };
    var onpreviousid = function (data) {
        $scope.newnid = data.id;
        console.log("getting id: " + data.id);
        findproduct(data.id);
    }*/



        //$scope.productquantity = 1;


        $scope.cartnotschemenew = function (category, $index) {
            //console.log("CATEGORY>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            //console.log(category);
            if (category.category == "new" || category.category == "scheme") {
                return false;
            } else {
                return true;
            }
        };


        //ADD TO CART
        $scope.addToCart = function (id, name, quantity, mrp) {

            $scope.totalprice = quantity * mrp;
            //$scope.total += totalprice;
            if (quantity > 0) {

                MyServices.addItemToCart(id, name, quantity, mrp, $scope.totalprice);
                $scope.mycart = MyServices.getCart();
                //console.log("YOUR CART "+ mycart);+
            };

        };

        //REMOVE FROM CART
        $scope.remove = function (oid) {
            console.log("REMOVE FUNCITON CALLED");
            MyServices.removeObject(oid);
        };


        //ORDER NOW
        var orderSuccess = function (data, status) {
            $scope.aid = MyServices.getareaid();
            $location.path("/app/retailer/" + $scope.aid);
            MyServices.clearcart();
            MyServices.setretailer(0);
        };

        $scope.sendOrder = function (retailerdata2) {

            console.log("Send ORder pressed");
            console.log(retailerdata2);
            var recieversname = retailerdata2.name;
            console.log($scope.mycart);
            
            var emaildata = '<style>.table2 {width: 100%;max-width: 100%;margin-bottom: 20px;}th {text-align: left;font-weight: bold;}    .table2>thead>tr>th,        .table2>thead>tr>td,            .table2>tbody>tr>th,                    .table2>tbody>tr>td {                            padding: 5px;                            vertical-align: middle;                            border-top: 1px solid #ddd;                        }    .table2>thead>tr>th,        .table2>thead>tr>td {            border-top: 0        }</style> <h3> </h3> <h3> </h3> <h3>'+ $scope.retailerdata2.name +'</h3> <h3>'+ $scope.retailerdata2.address +' </h3> </br> <table class="table2" style="width:100%"><thead> <tr> <th> Sr.no. </th> <th> Code </th> <th> Name </th> <th> Quantity </th> <th> MRP </th> <th> Amount </th> <th> Scheme </th> </tr></thead><tbody>';

            var emailtotalquantity = 0;
            var emailtotalvalue = 0;
            var index = 1;
            //E-MAIL
            for (var e = 0; e < $scope.mycart.length; e++) {
                emaildata += "<tr>";
                /* for(var em=0; em<$scope.mycart[e].length; em++)
            {*/
                emaildata += "<td>" + index +"</td>";
                index++;
                emaildata += "<td>" + $scope.mycart[e].name + "</td>";
                emaildata += "<td>" + $scope.mycart[e].name + "</td>";
                emaildata += "<td>" + $scope.mycart[e].quantity + "</td>";
                emailtotalquantity += $scope.mycart[e].quantity;
                emaildata += "<td>₹ " + $scope.mycart[e].mrp + "</td>";
                emaildata += "<td>₹ " + $scope.mycart[e].totalprice + "</td>";
                emailtotalvalue += $scope.mycart[e].totalprice;
                if ($scope.mycart[e].category == "scheme")
                {
                    emaildata += "<td>₹ " + YES + "</td>";
                }else{
                    emaildata += "<td>₹ " + NO + "</td>";   
                };
                /*}*/
                emaildata += "</tr>";
            }

                emaildata += "<tr>";

                emaildata += "<td></td>";
                emaildata += "<td>" + emailtotalquantity + "</td>";
                emaildata += "<td> <strong>Total: </strong></td>";
                emaildata += "<td>₹ " + emailtotalvalue + "</td>";

                emaildata += "</tr>";
                emaildata += "</tbody></table>";
                console.log(emaildata);
                
                
                $scope.params = {};
                $scope.params = {
                    "key": "cGE4EC2IdBhogNPk6e6-Xg",
                    "template_name": "ordertemplate",
                    "template_content": [
                        {
                            "name": "table",
                            "content": emaildata
        }
    ],
                    "message": {
                        "to": [
                                    {
                                "email": "contactabhay2@gmail.com", //$scope.retailerdata2.email,
                                "name": $scope.retailerdata2.name,
                                "type": "to"
            }
                      
        ],
                        "headers": {
                            "Reply-To": "noreply@toy-kraft.com"
                        },
                        "important": true,
                        "bcc_address": "chintan@wohlig.com", //$scope.dealeremail,
                        "global_merge_vars": [
                            {
                                "name": "merge1",
                                "content": "merge1 content"
            }
        ],              "recipient_metadata": [
                            {
                                "rcpt": "contactabhay2@gmail.com", //$scope.retailerdata2.email,
                                "values": {
                                    "user_id": 123456
                                }
                            }
        ]
                    },
                    "async": false
                };
            
                console.log($scope.params);
                var onemailsuccess = function (data, status) {
                    //alert(data);
                    console.log(data);
                };
                
                if($scope.mycart.length > 0 )
                {
                    MyServices.sendemail($scope.params).success(onemailsuccess);
                };
                    MyServices.sendOrderNow(retailerdata2).success(orderSuccess);

                
            };

            //RETRIEVE DATA
            $scope.retrieveData = function () {
                console.log(MyServices.getData());
                //console.log(display);
            };

        })

    .controller('ViewallCtrl', function ($scope, $stateParams, MyServices) {
        $scope.noorder = true;
        console.log(user);
        var userorders = function (data, status) {
            if (data != "false") {
                $scope.userordersdata = data;
            } else {
                $scope.noorder = false;
                console.log("noorder is true");
            }

        };

        MyServices.getuserorders(user.id).success(userorders);


    })

    .controller('OrderCtrl', function ($scope, $stateParams, MyServices, $ionicModal) {
        console.log("ORDER CONTROLLER IS WRKING");

        var user = MyServices.getuser();
        console.log(user.zone);
        var zid = user.zone;

        $scope.filter = {
            state: "",
            city: "",
            area: "",
            retailer: ""
        };

        $scope.ordersdata = 'false';

        //MyServices.findzone().success(zonesuccess);
        //STATE
        statesuccess = function (data, status) {
            console.log(data);
            $scope.statedata = data;
        };
        MyServices.findstate(zid).success(statesuccess);

        //CITY
        citysuccess = function (data, status) {
            $scope.citydata = data;
        };
        $scope.statechange = function (sid) {
            MyServices.findcity(sid).success(citysuccess);
        };
        //AREA
        areasuccess = function (data, status) {
            $scope.areadata = data;
        };
        $scope.citychange = function (cid) {
            MyServices.findarea(cid).success(areasuccess);
        };
        //RETAILER
        retailersuccess = function (data, status) {
            $scope.retailerdata = data;

        };
        retailersuccessini = function (data, status) {
            $scope.retailerdata = data;
            console.log("Chinatn shah");
            MyServices.getretailerdata(MyServices.getmyorderretailer().retailer).success(retailerdatasuccess);
        };
        $scope.areachange = function (aid) {
            MyServices.findretailer(aid).success(retailersuccess);
        };

        $scope.resettoold = function () {
            $scope.filter = {
                zone: "4",
                state: "27",
                city: "1",
                area: "1",
                retailer: "1"
            };
        };
        $scope.resettoold2 = function () {
            $scope.filter = {
                zone: "",
                state: "",
                city: "",
                area: "",
                retailer: ""
            };
        };

        //GET RETAILER DATA
        retailerdatasuccess = function (data, status) {
            $scope.ordersdata = data;
            $scope.filter = {
                zone: "",
                state: "",
                city: "",
                area: "",
                retailer: ""
            };
            $scope.filter = MyServices.getmyorderretailer();
        };
        $scope.retailerchange = function (filter) {
            MyServices.setmyorderretailer(filter);
            MyServices.setmyorderdate(false);

            MyServices.getretailerdata(filter.retailer).success(retailerdatasuccess);
            $scope.closeRetailer();
        };

        //GET DATA BY DATE
        datedatasuccess = function (data, status) {
            $scope.ordersdata = data;

        };
        $scope.datechange = function (did) {
            MyServices.setmyorderdate(did);
            MyServices.getdatedata(did).success(datedatasuccess);
            $scope.closeDate();
        };

        $scope.selecteddate = MyServices.getmyorderdate();

        if (MyServices.getmyorderdate()) {
            MyServices.getdatedata(MyServices.getmyorderdate()).success(datedatasuccess);
        } else if (MyServices.getmyorderretailer().retailer != "") {
            //$scope.filter=MyServices.getmyorderretailer();
            MyServices.findzone().success(zonesuccess);
            MyServices.findstate(MyServices.getmyorderretailer().zone).success(statesuccess);
            MyServices.findcity(MyServices.getmyorderretailer().state).success(citysuccess);
            MyServices.findarea(MyServices.getmyorderretailer().city).success(areasuccess);
            MyServices.findretailer(MyServices.getmyorderretailer().area).success(retailersuccessini);


        }


        //MyServices.getuserorders(user.id).success(userorders);

        //    Sorting Modals

        // Date Modal
        $ionicModal.fromTemplateUrl('templates/sort-date.html', {
            id: '1',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal1 = modal;
        });
        $scope.openDate = function () {
            $scope.oModal1.show();
        };
        $scope.closeDate = function () {
            $scope.oModal1.hide();
        };

        // Retailer Modal 
        $ionicModal.fromTemplateUrl('templates/sort-retailer.html', {
            id: '2',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal2 = modal;
        });
        $scope.openRetailer = function () {
            $scope.oModal2.show();
        };
        $scope.closeRetailer = function () {
            $scope.oModal2.hide();
        };


    })

    .controller('OrderdetailCtrl', function ($scope, $stateParams, MyServices) {



        var orderID = $stateParams.id;
        //console.log(user);
        var orderdetails = function (data, status) {
            console.log(data);
            $scope.user = data.sales;
            $scope.total = data.amount;
            $scope.retailerdata = data.retailer;
            $scope.orderdetailsdata = data.orderproduct;
            $scope.gettotalquantity();

        };
        MyServices.getorderdetail(orderID).success(orderdetails);

        $scope.gettotalquantity = function () {
            $scope.quantitytotal = 0;
            for (var i = 0; i < $scope.orderdetailsdata.length; i++) {
                $scope.quantitytotal += parseInt($scope.orderdetailsdata[i].quantity);
            };
            return $scope.quantitytotal;
        };

        //FUNCTION TO DISPLAY PRODUCTS FILTER
        $scope.cartnotschemenew = function (category, $index) {
            if (category.category == "new" || category.category == "scheme") {
                return false;
            } else {
                return true;
            }
        };

    })

    .controller('AddshopCtrl', function ($scope, $stateParams, Camera, $http, MyServices, $location) {

        var aid = $stateParams.areaid;
        $scope.addretailer = {
            area: aid
        };

        //GEO-LOCATION
        var onSuccess = function (position) {
            alert('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude);
        };

        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
        window.navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: false
        });


        $scope.addRetailerFunction = function () {
            console.log("retailer name is " + $scope.addretailer.name);
            console.log($scope.addretailer);

            function addRetailerSuccess(data, status) {
                //SUCCESS
                console.log(data);

                //REDIRECT
                var pathToGo = "/app/retailer/" + aid;
                console.log($location.path());
                $location.path(pathToGo);

            };

            MyServices.addNewRetailer($scope.addretailer).success(addRetailerSuccess);



            //sqfeet type dob area latitude longitude contactperson address contactnumber email compony code name
        };




        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*    pictureSource=navigator.camera.PictureSourceType;
     destinationType=navigator.camera.DestinationType;*/

        $scope.getCamera = function (event) {

            // $scope.window.requestFileSystem($scope.LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);



            console.log('Getting camera');
            Camera.getPicture().then(function (imageURI) {

                console.log(imageURI);
                //$scope.movePic(imageURI);
                $scope.lastPhoto = imageURI;
                parentEntry = new DirectoryEntry({
                    fullPath: parent
                });
                imageURI.moveTo(parentEntry, newName, success, fail);

            }, function (err) {
                console.err(err);
            }, {
                quality: 75,
                // targetWidth: 320,
                // targetHeight: 320,
                destinationType: Camera.destinationType.FILE_URI,
                //saveToPhotoAlbum: true
            });
        };


        $scope.onRequestFileSystemSuccess = function (fileSystem) {
            $scope.entry = fileSystem.root;
            entry.getDirectory("example", {
                create: true,
                exclusive: false
            }, onGetDirectorySuccess, onGetDirectoryFail);
        }

        $scope.onGetDirectorySuccess = function (dir) {
            console.log("Created dir " + dir.name);
        }

        $scope.onGetDirectoryFail = function (error) {
            console.log("Error creating directory " + error.code);
        }


        /*    $scope.movePic = function(file) {
        console.log("MOVE PIC FUNTION");
        window.resolveLocalFileSystemURI(file, onResSucc, errMove);  
    };*/


        /*    $scope.onResSucc = function(entry) {
        var d = new Date();
        var n = d.getTime();
        var newFileName = n + ".jpg";
        var appFolderName = "MyAppImages";
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
            fileSys.root.getDirectory(appFolderName, {create:true, exclusive:false},
                                     function(directory){
                                         entry.moveTo(directory, newFileName, succMove, errMove);
                                     },errMove );
        }, errMove);
    }*/

        /*    $scope.succMove = function(entry) {
        console.log(entry.fullPath);
        $('#photoHolder').attr('src', "file://"+ entry.fullPath);
    }

    $scope.errMove = function() {}*/
    })
    .controller('PhotoSliderCtrl', function ($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {
        $ionicModal.fromTemplateUrl('templates/image-slider.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function (index2) {

            $scope.modal.show();
            // Important: This line is needed to update the current ion-slide's width
            // Try commenting this line, click the button and see what happens

            $ionicSlideBoxDelegate.start();
            $ionicSlideBoxDelegate.update();
            for (var i = 0; i < 20; i++) {
                $ionicSlideBoxDelegate.previous();
            }
            for (var i = 0; i < index2; i++) {
                $ionicSlideBoxDelegate.next();
            }

        };

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
        $scope.$on('modal.shown', function () {
            console.log('Modal is shown!');
        });

        // Call this functions if you need to manually control the slides
        $scope.next = function () {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
        };
    });