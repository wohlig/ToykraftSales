var adminurl = "http://admin.toy-kraft.com/rest/index.php/";
var myservices = angular.module('myservices', [])

.factory('MyServices', function ($http, $location) {
    var productarray = [];
    var cart = [];
    var retailer = 0;
    var category = 0;
    var area = 0;
    var searchtxt = "";
    var areaID = 0;
    var d = new Date();
    //var myorderdate="2014-08-08";
    var myorderdate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    //console.log(myorderdate);
    var myorderretailer = {
        zone: '',
        state: '',
        city: '',
        area: '',
        retailer: ''
    };

    var productCatdata = [];

    return {
        getsearchtxt: function () {
            return searchtxt;
        },
        setsearchtxt: function (data) {
            searchtxt = data;
            console.log("Category is " + data);
        },
        getcategory: function () {
            return category;
        },
        setcategory: function (data) {
            category = data;
            console.log("Category is " + data);
        },
        getmyorderdate: function () {
            return myorderdate;
        },
        setmyorderdate: function (date) {
            myorderdate = date;
        },
        getmyorderretailer: function () {
            console.log(myorderretail);
            return myorderretail;
        },
        setmyorderretailer: function (filter) {
            myorderretail = filter;
        },
        loginFunc: function (userinfo) {
            return $http.get(adminurl + "user/authenticate", {
                params: {
                    username: userinfo.username,
                    password: userinfo.password
                }
            });
        },
        setuser: function (data) {
            user = data;
            $.jStorage.set("user", data);
        },
        getuser: function () {
            return user;
        },
        gettodaytally: function (userid) {
            return $http.get(adminurl + "orders/gettodaystally", {
                params: {
                    user: userid,
                }
            });
        },
        getmonthtally: function (userid2) {
            return $http.get(adminurl + "orders/getmonthstally", {
                params: {
                    user: userid2,
                }
            });
        },
        setareaid: function (aid) {
            areaID = aid;
            return areaID;
        },
        getareaid: function () {
            return areaID;
        },
        checkretailer: function (retail) {
            if (retail == retailer) {

            } else {
                retailer = retail;
                cart = [];
            }
        },
        getretailer: function () {
            return retailer;
        },
        setretailer: function (retail) {
            retailer = retail;
        },
        sendorderemail: function (id, retail, amount, user, datetime, quantity, remark) {
            return $http.get(adminurl + "orders/sendorderemail?id=" + id + "&retail=" + retail + "&amount=" + amount + "&user=" + user + "&datetime=" + datetime + "&quantity=" + quantity + "&remark=" + remark, {});
        },
        findzonebyuser: function () {
            console.log(user);
            return $http.get(adminurl + "zone/find", {
                params: {
                    user: user
                }
            });
        },

        findstate: function (zone) {
            return $http.get(adminurl + "state/findbyzone", {
                params: {
                    zone: zone
                }
            });
        },
        findcity: function (state) {
            return $http.get(adminurl + "city/findbystate", {
                params: {
                    state: state
                }
            });
        },
        findarea: function (city) {
            return $http.get(adminurl + "area/findbycity", {
                params: {
                    city: city
                }
            });
        },
        findretailer: function (area) {
            return $http.get(adminurl + "retailer/findbyarea", {
                params: {
                    area: area
                }
            });
        },
        findoneretailer: function (retailer) {
            return $http.get(adminurl + "retailer/findone", {
                params: {
                    id: retailer
                }
            });
        },
        findoneproduct: function (product) {
            return $http.get(adminurl + "product/findone", {
                params: {
                    id: product
                }
            });
        },
        addNewRetailer: function (object1) {
            return $http.get(adminurl + "retailer/create", {
                params: object1
            });
        },
        getCart: function () {
            return cart;
        },
        setcart: function (newcart) {
            cart = newcart;
        },
        getData: function () {
            console.log(cart);
        },
        addItemToCart: function (pid, pproductcode, pname, pquantity, pmrp, ptotalprice) {
            var isnew = true;
            var addquantityon = 0;
            if (!pid) {
                return false;
            }
            pid = parseInt(pid);
            pquantity = parseInt(pquantity);
            pmrp = parseFloat(pmrp);
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].id == pid && cart[i].category == category) {
                    isnew = false;
                    addquantityon = i;
                }
            }
            if (isnew) {
                cart.push({
                    id: pid,
                    productcode: pproductcode,
                    name: pname,
                    quantity: pquantity,
                    mrp: pmrp,
                    totalprice: pmrp * pquantity,
                    category: category
                });
            } else {
                if (cart[addquantityon].quantity > 0) {
                    cart[addquantityon].quantity = parseInt(cart[addquantityon].quantity) + pquantity;
                    cart[addquantityon].totalprice = parseFloat(pmrp) * cart[addquantityon].quantity;
                } else {
                    cart[addquantityon].quantity = parseInt(pquantity);
                    cart[addquantityon].totalprice = parseFloat(pmrp) * cart[addquantityon].quantity;
                }
            }
            console.log(cart);

        },
        sendOrderNow: function (retailer, remark) {

            return $http.post(adminurl + "orders/makeorder", {
                cart: cart,
                user: user,
                retailer: retailer,
            });
            console.log(cart);
            cart = [];
            console.log(cart);
        },
        sendcartoffline: function () {
            //orderid(generate), userid, retailerid, productid(many), quantity, mrp, totalprice
            //cart=[];
        },
        removeObject: function (oid) {

            cart.splice(oid, 1);
        },
        findnext: function (id, next) {
            return $http.get(adminurl + "product/getnextproduct", {
                params: {
                    id: id,
                    category: category,
                    next: next
                } //id: category: next:0
            });
        },
        findprevious: function (id) {
            return $http.get(adminurl + "product/getpreviousproduct", {
                params: {
                    id: id,
                    category: category
                }
            });
        },
        clearcart: function () {
            cart = [];
        },
        getuserorders: function (user) {
            return $http.get(adminurl + "orders/findbyuser", {
                params: {
                    user: user
                }
            });
        },
        getorderdetail: function (order) {
            return $http.get(adminurl + "orders/findone", {
                params: {
                    id: order
                }
            });
        },
        getrecentorders: function (retailerid) {
            return $http.get(adminurl + "orders/findbyretailer?retailer=" + retailerid);
        },
        getretailerdata: function (retailerid) {
            return $http.get(adminurl + "orders/getmyordersbyretailer", {
                params: {
                    retailer: retailerid,
                    user: user.id
                }
            });
        },
        getdatedata: function (did) {
            console.log(did);
            return $http.get(adminurl + "orders/getmyordersbydate", {
                params: {
                    date: did,
                    user: user.id
                }
            });
        },

        //GETTING NAMES OF CATEGORIES TO LIST
        getcategoriesname: function () {
            return $http.get(adminurl + "catelog/getcatelog");
        },
        //CALLED DURING CHANGE OF CATEGORY
        findproductbycategory: function (id) {
            $http.get(adminurl + "", {
                params: {
                    id: id
                }
            })
        },
        //SETTING GLOBAL CATEGORY DATA
        setproductCatdata: function (data) {
            productCatdata = data;
        },
        gettoptenproducts: function () {
            return $http.get(adminurl + "product/gettoptenproducts");
        },
        editretailerdetails: function (data) {
            console.log("DATA/////////////////////");
            console.log(data);
            return $http.get(adminurl + "retailer/updatecontact", {
                params: data
            });
        },
        sendemail: function (data) {
            return $http.post("https://mandrillapp.com/api/1.0/messages/send-template.json", data);
        },
        sendsms: function (url) {
            return $http.post(url);
        },
        areaone: function (id) {
            return $http.get(adminurl + "area/findone", {
                params: {
                    id: id
                }
            });
        },

    }
});