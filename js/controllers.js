var adminurl = "http://mafiawarloots.com/clientunderworkcode/index.php/";

var filenameee = "";
angular.module('starter.controllers', ['ngCordova', 'myservices'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $location, MyServices, $cordovaKeyboard, $ionicLoading) {

    console.log("APP CONTROL");
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

        $cordovaKeyboard.hideAccessoryBar(true);

        $cordovaKeyboard.disableScroll(true);

        $cordovaKeyboard.close();

        var isVisible = $cordovaKeyboard.isVisible();
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
})


.controller('LoginCtrl', function ($scope, $stateParams, MyServices, $location) {
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
        MyServices.loginFunc(login).success(loginSuccess);
    };


})

.controller('HomeCtrl', function ($scope, $stateParams, $location, MyServices, $ionicLoading) {

    $ionicLoading.hide();

    //GET ZONE DATA
    var user = MyServices.getuser();
    $scope.userzone = user.zone;
    $scope.zonedata = [];
    //$scope.zonedata.id = userzone;

    //$ionicSideMenuDelegate.canDragContent(false);

    $scope.logout = function () {
        $.jStorage.flush();
        user = undefined;
        var emptycart = [];
        MyServices.setcart(emptycart);
        MyServices.setretailer(0);

        for (var i = 0; i < 5; i++) {
            var stateObj = {
                foo: "bar"
            };
            history.pushState(stateObj, "page 2", "index.html#/app/login");
        }
        $location.replace();
        window.location.href = window.location.href + "#";
    };
    $scope.user = user;
    $scope.lastretailer = MyServices.getretailer();
    if (!($scope.lastretailer > 0)) {
        $scope.lastretailer = 0;
    }

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

.controller('loaderCtrl', function ($scope, $stateParams, $ionicLoading) {
    console.log('Loading..');
    $ionicLoading.show({
        template: '<h1 class="ion-loading-c"></h1><br>Loading...',
        animation: 'fade-in',
        showBackdrop: true
    });
})



.controller('ZoneCtrl', function ($scope, $stateParams, $http, MyServices) {

    $scope.zonedata = [];
    var onzonesuccess = function (data, status) {
        $scope.zonedata = data;
    };
    MyServices.findzone().success(onzonesuccess);

})

.controller('StateCtrl', function ($scope, $stateParams, $http, MyServices, $ionicLoading) {


    var zoneID = $stateParams.id;
    $scope.statedata = [];
    var onsuccess = function (data, status) {

        $ionicLoading.hide();
        $scope.statedata = data;
    };
    MyServices.findstate(zoneID).success(onsuccess);

})

.controller('CityCtrl', function ($scope, $stateParams, $http, MyServices, $ionicLoading) {

    var stateID = $stateParams.id;
    console.log("Main ID " + stateID);
    $scope.citydata = [];

    var citySuccess = function (data, status) {
        $ionicLoading.hide();
        $scope.citydata = data;
    };
    MyServices.findcity(stateID).success(citySuccess);

})

.controller('AreaCtrl', function ($scope, $stateParams, $http, MyServices, $ionicLoading) {

    var cityID = $stateParams.id;
    console.log("Main ID " + cityID);
    $scope.areadata = [];

    var areaSuccess = function (data, status) {
        $ionicLoading.hide();
        $scope.areadata = data;

    };

    MyServices.findarea(cityID).success(areaSuccess);

})

.controller('RetailerCtrl', function ($scope, $stateParams, $http, MyServices, $location, $ionicLoading) {

    var areaID = $stateParams.id;
    $scope.areaid = areaID;
    MyServices.setareaid(areaID);
    console.log("AREA ID is " + areaID);
    $scope.retailerdata = [];

    var retailSuccess = function (data, status) {
        $ionicLoading.hide();
        $scope.retailerdata = data;
    };

    MyServices.findretailer(areaID).success(retailSuccess);

})

.controller('DealerCtrl', function ($scope, $stateParams, $http, MyServices, $location, $ionicModal, $window, $ionicLoading) {
    $scope.firstclick = 1;
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
        $scope.firstclick = 0;
        console.log("Retailer info gained");
        console.log(data);
        $scope.retailerdata2 = data;
        $scope.dealeremail = data.distributor;
        console.log("Dealer is " + $scope.dealeremail);
        $scope.editretailer.ownername = $scope.retailerdata2.ownername;
        $scope.editretailer.ownernumber = $scope.retailerdata2.ownernumber;
        $scope.editretailer.contactname = $scope.retailerdata2.contactname;
        $scope.editretailer.contactnumber = $scope.retailerdata2.contactnumber;
        $scope.editretailer.email = $scope.retailerdata2.email;
    };
    MyServices.findoneretailer($scope.retailerID).success(retailSuccess2);
    $scope.productquantity = 1;

    //PRODUCT INFORMATION
    var pronumber = 1;
    $scope.pname;
    $scope.pid;
    $scope.pquantity;

    $scope.giveclass = function (category) {
        var returnval = "";
        if (category == "scheme") {
            returnval = "list list-royal"
        } else if (category == "new") {
            returnval = "list list-energized";
        }
        return returnval;
    };

    $scope.changequantity = function (quantity, code, category) {
        var id = -1;
        for (var i = 0; i < $scope.mycart.length; i++) {
            if ($scope.mycart[i].productcode == code && $scope.mycart[i].category == category) {
                id = i;
            }
        }
        if (id > 0) {
            console.log("KEY IS " + id);
            $scope.mycart[id].quantity = parseInt(quantity);
            var mrp = $scope.mycart[id].mrp;
            $scope.mycart[id].totalprice = $scope.mycart[id].quantity * mrp;
            // $scope.
            MyServices.setcart($scope.mycart);
        }
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


    //total quantity
    $scope.gettotalquantity = function () {
        $scope.quantitytotal = 0;
        for (var i = 0; i < $scope.mycart.length; i++) {
            $scope.quantitytotal += parseInt($scope.mycart[i].quantity);
        };
        return $scope.quantitytotal;
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
        $ionicLoading.hide();
        console.log(data);
        $scope.categoryproductdata = data;
        if ($scope.categoryproductdata.scheme2) {
            if ($scope.categoryproductdata.scheme2.name) {
                $scope.categoryname = "Scheme : " + $scope.categoryproductdata.scheme2.name + " ("+ $scope.categoryproductdata.scheme2.discount_percent +"%)";
            } else {
                $scope.categoryname = ""
            };
        };
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
        $ionicLoading.hide();
    };
    $scope.gettopten = function () {
        $scope.oModal1.show();
        MyServices.gettoptenproducts().success(toptendatasuccess);
    };

    //EDIT RETAILERS
    $scope.editretailer = {};
    $scope.editretailer.id = $scope.retailerID;
    console.log("retailer name is " + $scope.retailerID);

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

    $ionicModal.fromTemplateUrl('templates/recent-orders.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal4 = modal;
    });
    $scope.closerecent = function () {
        $scope.oModal4.hide();
    };
    $scope.openrecent = function () {
        $scope.oModal4.show();
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
    $scope.addToCart = function (id, productcode, name, quantity, mrp) {

        $scope.totalprice = quantity * mrp;
        //$scope.total += totalprice;
        if (quantity > 0) {

            MyServices.addItemToCart(id, productcode, name, quantity, mrp, $scope.totalprice);
            $scope.mycart = MyServices.getCart();
            //console.log("YOUR CART "+ mycart);+
        };

    };

    //REMOVE FROM CART
    $scope.remove = function (id, category) {
        for (var i = 0; i < $scope.mycart.length; i++) {
            if ($scope.mycart[i].id == id && $scope.mycart[i].category == category) {
                MyServices.removeObject(i);
                return false;
            }
        }
        console.log("REMOVE FUNCITON CALLED");


    };

    //E-mail FUNCTION
    var email = function () {
        console.log($scope.params);
        var onemailsuccess = function (data, status) {
            //alert(data);
            console.log(data);
        };

        if ($scope.mycart.length > 0) {
            MyServices.sendemail($scope.params).success(onemailsuccess);
        };
    };

    //SMS
    var sms = function () {
        if ($scope.mycart.length > 0) {
            //var smsnumber2 = "9029796018";
            //SMS IMPLEMENTATION
            var smssuccess = function (data, status) {
                console.log(data);
            };

            if ($scope.number1 != null) {
                $scope.number1.toString();
                console.log("number one to sting");
                if ($scope.number1.length == 10) {
                    $scope.number1 = "91" + $scope.number1;
                }
                var smscall = 'http://bulksms.mysmsmantra.com:8080/WebSMS/SMSAPI.jsp?username=toykraft &password=1220363582&sendername=TYKRFT&mobileno=' + $scope.number1 + '&message=Dear Customer, We thank you for your order. The order for' + $scope.emailtotalquantity + 'pcs with MRP value of Rs' + $scope.emailtotalvalue + 'is under process. Team Toykraft';
                MyServices.sendsms(smscall).success(smssuccess);
            };

            if ($scope.number2 != null) {
                $scope.number2.toString();
                if ($scope.number2.length == 10) {
                    $scope.number2 = "91" + $scope.number2;
                    console.log($scope.number2);
                }
                var smscall2 = 'http://bulksms.mysmsmantra.com:8080/WebSMS/SMSAPI.jsp?username=toykraft &password=1220363582&sendername=TYKRFT&mobileno=' + $scope.number2 + '&message=Dear Customer, We thank you for your order. The order for ' + $scope.emailtotalquantity + ' pcs with MRP value of Rs.' + $scope.emailtotalvalue + ' is under process. Team Toykraft';
                MyServices.sendsms(smscall2).success(smssuccess);

            };
        }
    };

    //ORDER SUCCESS
    var orderSuccess = function (data, status) {

        console.log(data);
        var datetime = data.timestamp;
        var orderid = data.id;


        $scope.emaildata = '<p>Dear Distributor / Retailer,<br>Our sales executive ' + userdata.name + ' has booked an order with details as below:</p><p><strong>Order id: </strong>' + orderid + ' </p> <p><strong>Order placed on: </strong>' + datetime + ' </p> <p><strong>' + $scope.retailerdata2.name + '</strong></p> <p><strong>' + $scope.retailerdata2.address + '</strong></p> <table class="table2" style="width:100%"><thead style="text-align:center;"> <tr> <th> Sr.no. </th> <th> Product Code </th> <th> Name </th> <th> Quantity </th> <th> MRP </th> <th> Amount </th> <th> Scheme </th> </tr></thead><tbody style="text-align:center;">';

        $scope.emailtotalquantity = 0;
        $scope.emailtotalvalue = 0;
        var index = 1;
        //E-MAIL
        for (var e = 0; e < $scope.mycart.length; e++) {
            $scope.emaildata += "<tr>";
            $scope.emaildata += "<td>" + index + "</td>";
            index++;
            $scope.emaildata += "<td>" + $scope.mycart[e].productcode + "</td>";
            $scope.emaildata += "<td>" + $scope.mycart[e].name + "</td>";
            $scope.emaildata += "<td>" + $scope.mycart[e].quantity + "</td>";
            $scope.emailtotalquantity += parseInt($scope.mycart[e].quantity);
            $scope.emaildata += "<td>₹ " + $scope.mycart[e].mrp + "</td>";
            $scope.emaildata += "<td>₹ " + $scope.mycart[e].totalprice + "</td>";
            $scope.emailtotalvalue += $scope.mycart[e].totalprice;
            if ($scope.mycart[e].category == "scheme") {
                $scope.emaildata += "<td> YES </td>";
            } else {
                $scope.emaildata += "<td> NO </td>";
            };
            $scope.emaildata += "</tr>";
        }

        $scope.emaildata += "<tr>";

        $scope.emaildata += "<td></td>";
        $scope.emaildata += "<td></td>";
        $scope.emaildata += "<td><strong>Total: </strong></td>";
        $scope.emaildata += "<td><strong>" + $scope.emailtotalquantity + "</strong></td>";
        $scope.emaildata += "<td></td>";
        $scope.emaildata += "<td><strong>₹ " + $scope.emailtotalvalue + "</strong></td>";
        $scope.emaildata += "<td></td>";

        $scope.emaildata += "</tr>";
        $scope.emaildata += "</tbody></table>";
        console.log($scope.emaildata);

        var subject = "Order placed. Order Id.: " + orderid;

        $scope.params = {};

        //EMAIL SETTING
        if ($scope.retailerdata2.email == null) {
            var retaileremail = $scope.useremail
        } else {
            var retaileremail = $scope.retailerdata2.email
        };
        if ($scope.dealeremail == null) {
            var dealeremail = $scope.useremail
        } else {
            var dealeremail = $scope.dealeremail
        };

        var emailArray = [{
            email: dealeremail,
            name: 'Distributor'
        }, {
            email: retaileremail,
            name: $scope.retailerdata2.name
        }];
        $scope.params = {
            "key": "cGE4EC2IdBhogNPk6e6-Xg",
            "template_name": "ordertemplate",
            "template_content": [
                {
                    "name": "table",
                    "content": $scope.emaildata
        }
    ],
            "message": {
                "subject": subject,
                "to": emailArray,
                "headers": {
                    "Reply-To": "noreply@toy-kraft.com"
                },
                "important": true,
                //"bcc_address": $scope.dealeremail,
                "global_merge_vars": [
                    {
                        "name": "merge1",
                        "content": "merge1 content"
            }
        ],
                "recipient_metadata": [
                    {
                        "rcpt": retaileremail,
                        "values": {
                            "user_id": 123456
                        }
                            }
        ]
            },
            "async": false
        };

        email();
        sms();

        MyServices.clearcart();
        MyServices.setretailer(0);

        $scope.aid = MyServices.getareaid();
        if ($scope.aid > 0) {
            $location.path("/app/retailer/" + $scope.aid);
        } else {
            $location.path("/app/home");
        };


    };

    var userdata = MyServices.getuser();
    console.log(userdata);
    $scope.useremail = userdata.email;
    //$scope.firstclick = 0;

    $scope.sendOrder = function (retailerdata2) {
         
        if ($scope.firstclick == 0) {
            $scope.firstclick = 1;
            console.log();
            console.log("Send Order pressed");
            console.log(retailerdata2);
            var recieversname = retailerdata2.name;
            console.log($scope.mycart);

            MyServices.sendOrderNow(retailerdata2).success(orderSuccess);

            $scope.number1 = retailerdata2.contactnumber;
            $scope.number2 = retailerdata2.ownernumber;
            $ionicLoading.show({
        template: '<h1 class="ion-loading-c"></h1><br>Sendig order...',
        animation: 'fade-in',
        showBackdrop: true
    });
        }
        //sms(number1, number2, emailtotalquantity, emailtotalvalue);

    };



    //RETRIEVE DATA
    $scope.retrieveData = function () {
        console.log(MyServices.getData());
        //console.log(display);
    };

})

.controller('ViewallCtrl', function ($scope, $stateParams, MyServices, $ionicLoading) {
    $scope.noorder = true;
    var userorders = function (data, status) {
        $ionicLoading.hide();
        if (data != "false") {
            $scope.userordersdata = data;
        } else {
            $scope.noorder = false;
            console.log("noorder is true");
        }

    };

    MyServices.getuserorders(user.id).success(userorders);


})

.controller('OrderCtrl', function ($scope, $stateParams, MyServices, $ionicModal, $location, $ionicLoading) {
    $ionicLoading.hide();


    var user = MyServices.getuser();
    console.log(user);
    $scope.useremail = user.email;

    var onemailsuccess = function (data, status) {
        //alert(data);
        console.log(data);
        alert("e-mail has been sent");
    };

    var email = function () {
        $scope.emaildata = '<p>Dear Distributor / Retailer,<br>Our sales executive ' + userdata.name + ' has booked an order with details as below:</p><p><strong>Order id: </strong>' + orderid + ' </p> <p><strong>Order placed on: </strong>' + datetime + ' </p> <p><strong>' + $scope.retailerdata2.name + '</strong></p> <p><strong>' + $scope.retailerdata2.address + '</strong></p> <table class="table2" style="width:100%"><thead style="text-align:center;"> <tr> <th> Sr.no. </th> <th> Product Code </th> <th> Name </th> <th> Quantity </th> <th> MRP </th> <th> Amount </th> <th> Scheme </th> </tr></thead><tbody style="text-align:center;">';

        $scope.emailtotalquantity = 0;
        $scope.emailtotalvalue = 0;
        var index = 1;
        //E-MAIL
        for (var e = 0; e < $scope.mycart.length; e++) {
            $scope.emaildata += "<tr>";

            $scope.emaildata += "<td>" + index + "</td>";
            index++;
            $scope.emaildata += "<td>" + $scope.mycart[e].productcode + "</td>";
            $scope.emaildata += "<td>" + $scope.mycart[e].name + "</td>";
            $scope.emaildata += "<td>" + $scope.mycart[e].quantity + "</td>";
            $scope.emailtotalquantity += parseInt($scope.mycart[e].quantity);
            $scope.emaildata += "<td>₹ " + ($scope.mycart[e].amount / $scope.mycart[e].quantity) + "</td>";
            $scope.emaildata += "<td>₹ " + $scope.mycart[e].amount + "</td>";
            $scope.emailtotalvalue += $scope.mycart[e].amount;
            if ($scope.mycart[e].category == "scheme") {
                $scope.emaildata += "<td> YES </td>";
            } else {
                $scope.emaildata += "<td> NO </td>";
            };
            $scope.emaildata += "</tr>";
        }

        $scope.emaildata += "<tr>";

        $scope.emaildata += "<td></td>";
        $scope.emaildata += "<td></td>";
        $scope.emaildata += "<td><strong>Total: </strong></td>";
        $scope.emaildata += "<td><strong>" + $scope.emailtotalquantity + "</strong></td>";
        $scope.emaildata += "<td></td>";
        $scope.emaildata += "<td><strong>₹ " + $scope.emailtotalvalue + "</strong></td>";
        $scope.emaildata += "<td></td>";

        $scope.emaildata += "</tr>";
        $scope.emaildata += "</tbody></table>";
        console.log($scope.emaildata);

        var subject = "Order placed. Order ID:" + $scope.orderID;

        $scope.params = {};


        //EMAIL SETTING
        if ($scope.retailerdata.email == null) {
            var retaileremail = $scope.useremail
        } else {
            var retaileremail = $scope.retailerdata.email
        };
        if ($scope.distributoremail == null) {
            var dealeremail = $scope.useremail
        } else {
            var dealeremail = $scope.distributoremail
        };

        var emailArray = [{
            email: dealeremail,
            name: 'Distributor'
        }, {
            email: retaileremail,
            name: $scope.retailerdata.name
        }];
        $scope.params = {
            "key": "cGE4EC2IdBhogNPk6e6-Xg",
            "template_name": "ordertemplate",
            "template_content": [
                {
                    "name": "table",
                    "content": $scope.emaildata
        }
    ],
            "message": {
                "subject": subject,
                "to": emailArray,
                "headers": {
                    "Reply-To": "noreply@toy-kraft.com"
                },
                "important": true,
                //"bcc_address": "contactabhay2@gmail.com",//dealeremail,
                "global_merge_vars": [
                    {
                        "name": "merge1",
                        "content": "merge1 content"
            }
        ],
                "recipient_metadata": [
                    {
                        "rcpt": "tushar@wohlig.com", //retaileremail,
                        "values": {
                            "user_id": 123456
                        }
                            }
        ]
            },
            "async": false
        };



        if ($scope.mycart.length > 0) {
            MyServices.sendemail($scope.params).success(onemailsuccess);
        };
    };

    var orderdetails = function (data, status) {
        $scope.retailerdata = data.retailer;
        $scope.distributoremail = data.retailer.distributor;
        $scope.retaileremail = data.retailer.email;

        $scope.mycart = data.orderproduct;
        $scope.user = data.sales;
        $scope.total = data.amount;
        $scope.timestamp = data.timestamp;

        email();
        console.log(data);
        console.log($scope.retailerdata);
        console.log($scope.mycart);
        console.log($scope.user);
        console.log($scope.total);
    };

    //RESEND EMAIL
    $scope.resendemail = function (orderid) {
        $scope.orderID = orderid;
        MyServices.getorderdetail(orderid).success(orderdetails);
    };

    $scope.recart = [];
    //ADD TO CART FUNCTION
    $scope.addToCart = function (id, productcode, name, quantity, mrp) {

        $scope.totalprice = quantity * mrp;
        //$scope.total += totalprice;
        if (quantity > 0) {

            MyServices.addItemToCart(id, productcode, name, quantity, mrp, $scope.totalprice);
            $scope.newcart = MyServices.getCart();
            console.log("YOUR CART " + $scope.newcart);
        };

    };

    //REORDER ORDER
    var reorder = function (data, status) {
        console.log(data);
        $scope.retailerid = data.retailer.id;
        MyServices.setretailer($scope.retailerid);
        MyServices.setcart($scope.recart);
        $scope.recart = data.orderproduct;

        for (i = 0; i < $scope.recart.length; i++) {
            $scope.addToCart($scope.recart[i].id, $scope.recart[i].productcode, $scope.recart[i].name, $scope.recart[i].quantity, $scope.recart[i].amount);
        };
        $location.path("/app/dealer/" + $scope.retailerid + "/6");

    };

    $scope.resendorder = function (orderid) {
        $scope.orderID = orderid;
        MyServices.getorderdetail(orderid).success(reorder);
    };

    console.log(user.zone);
    var zid = user.zone;

    $scope.filter = {
        state: "",
        city: "",
        area: "",
        retailer: ""
    };

    $scope.ordersdata = 'false';

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

.controller('OrderdetailCtrl', function ($scope, $stateParams, MyServices, $ionicLoading) {

    var orderID = $stateParams.id;
    //console.log(user);
    var orderdetails = function (data, status) {
        $ionicLoading.hide();
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

.controller('AddshopCtrl', function ($scope, $stateParams, $cordovaCamera, $cordovaFile, $http, MyServices, $location, $ionicLoading,$cordovaGeolocation) {
    $ionicLoading.hide();

    var aid = $stateParams.areaid;
    $scope.firstclick = 0;


    var areasuccess = function (data, status) {
        $scope.areaname = data.name;
    };
    MyServices.areaone(aid).success(areasuccess);

    $scope.filename2 = "";
    //GEO-LOCATION
    /*var onSuccess = function (position) {
        alert('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude);
         //$scope.lat = position.coords.latitude;
        //$scope.long = position.coords.longitude;
        $scope.addretailer.lat = '' + position.coords.latitude + '';
        $scope.addretailer.long = '' + position.coords.longitude + '';
    };

    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');

        $scope.addretailer.lat = 'not found';
        $scope.addretailer.long = 'not found';
    }
    window.navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true
    });*/
    
    
      $cordovaGeolocation.getCurrentPosition()
    .then(function (position) {
        $scope.addretailer.lat = '' + position.coords.latitude + '';
        $scope.addretailer.long = '' + position.coords.longitude + '';
    }, function(err) {
      // error
           alert("GPS is off");
    });

    $scope.addretailer = {};
    $scope.addretailer.area = aid;
    $scope.addretailer.name = '';
    $scope.addretailer.address = '';
    $scope.addretailer.code = '';
    $scope.addretailer.contactname = '';
    $scope.addretailer.contactnumber = '';
    $scope.addretailer.dob = '';
    $scope.addretailer.type_of_area = '';
    $scope.addretailer.sq_feet = '';
    $scope.addretailer.store_image = '';
    $scope.addretailer.lat = '';
    $scope.addretailer.long = '';


    $scope.addRetailerFunction = function () {
        if ($scope.firstclick == 0) {
            $scope.firstclick = 1;
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

        }

        //sqfeet type dob area latitude longitude contactperson address contactnumber email compony code name
    };


    //Capture Image
    $scope.takePicture = function () {
        var options = {
            quality: 20,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            // Success! Image data is here
            $scope.cameraimage = imageData;
            $scope.uploadPhoto();
        }, function (err) {
            // An error occured. Show a message to the user
        });

        //Upload photo
        var server = 'http://wohlig.biz/Toykraftbackend/index.php/json/uploadfile';

        //File Upload parameters: source, filePath, options
        $scope.uploadPhoto = function () {
            console.log("function called");
            $cordovaFile.uploadFile(server, $scope.cameraimage, options)
                .then(function (result) {
                    console.log(result);
                    result = JSON.parse(result.response);
                    filenameee = result;
                    $scope.filename2 = result.file_name;
                    $scope.addretailer.store_image = $scope.filename2;

                }, function (err) {
                    // Error
                    console.log(err);
                    console.log("Error");
                }, function (progress) {
                    // constant progress updates
                });

        };

    }
})
    .controller('PhotoSliderCtrl', function ($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate, $ionicLoading) {
        $ionicLoading.hide();
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