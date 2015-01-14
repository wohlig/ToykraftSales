//VARIABLES NEEDED
var adminurl = "http://admin.toy-kraft.com/rest/index.php/";
var zone;

//CREATE THE DATABASE
var db = openDatabase('toykraftapp2', '1.0', 'toykraftapp DB', 50 * 1024 * 1024);

//CREATE ALL TABLES
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS ZONE (id Integer PRIMARY KEY, name, email)');
    console.log("created");
    //tx.executeSql('DROP DATABASE toykraftapp')
    //    /tx.executeSql('DROP TABLE ZONE');
});

console.log("ABHAY RISHI OMKAR");

var mydatabase = angular.module('mydatabase', [])
    .factory('MyDatabase', function ($http, $location, $cordovaNetwork, MyServices) {

        var statedata = [];
        var categorydata = [];
        if ($.jStorage.get("categoriesdata")) {
            var categorydata = $.jStorage.get("categoriesdata");
        };
        var orderid = 0;
        if ($.jStorage.get("offlineorderid")) {
            orderid = $.jStorage.get("offlineorderid");
        };


        return {

            findzonebyuser: function () {
                return $http.get(adminurl + "zone/find", {
                    params: {
                        user: user
                    }
                });
            },
            addzonedata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO ZONE (id , name, email) VALUES (' + data[i].id + ',"' + data[i].name + '","' + data[i].email + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("RAOW INSERTED");
                        }, null);
                    };
                    console.log("zones added");
                });
            },
            findzonebyuseroffline: function () {
                zone = user.zone;
            },

            createretailertables: function () {
                db.transaction(function (tx) {
                    //tx.executeSql('DROP TABLE STATE');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS STATE (id Integer PRIMARY KEY, zone, name)');
                    console.log("states created");
                });
                db.transaction(function (tx2) {
                    //tx2.executeSql('DROP TABLE CITY');
                    tx2.executeSql('CREATE TABLE IF NOT EXISTS CITY (id Integer PRIMARY KEY, state, name)');
                    console.log("City created");
                });
                db.transaction(function (tx3) {
                    //tx3.executeSql('DROP TABLE AREA');
                    tx3.executeSql('CREATE TABLE IF NOT EXISTS AREA (id Integer PRIMARY KEY, city, name, distributor)');
                    console.log("Area created");
                });
                db.transaction(function (tx5) {
                    tx5.executeSql('CREATE TABLE IF NOT EXISTS RETAILER (id INTEGER ,lat,long,area,dob,type_of_area,sq_feet,store_image,name,number,email,address,ownername,ownernumber,contactname,contactnumber,timestamp, sync)');
                    //tx5.executeSql('DROP TABLE RETAILER');
                    console.log("Retailer created");
                });
                db.transaction(function (tx6) {
                    tx6.executeSql('CREATE TABLE IF NOT EXISTS PRODUCT (id INTEGER PRIMARY KEY, name, product, encode, name2, productcode, category,video,mrp,description VARCHAR2(5000),age,scheme,isnew,timestamp)');
                    //tx6.executeSql('DROP TABLE PRODUCT');
                    console.log("Product created");
                });
                //orderid(generate), userid, retailerid, productid(many), quantity, mrp, totalprice
                db.transaction(function (tx7) {
                    tx7.executeSql('CREATE TABLE IF NOT EXISTS ORDERS (orderid INTEGER, userid INTEGER, retailerid INTEGER, id INTEGER,productcode, name, quantity INTEGER, mrp, totalprice, category, remark VARCHAR2(5000))');
                    //tx7.executeSql('DROP TABLE ORDERS');
                    console.log("Order Transaction Table created");
                });
            },
            syncinretailerstatedata: function () {
                return $http.get(adminurl + "state/find", {
                    params: {}
                })
                console.log(statedata);
            },
            insertretailerstatedata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO STATE (id , zone, name) VALUES (' + data[i].id + ',"' + data[i].zone + '","' + data[i].name + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("RAOW INSERTED");
                        }, null);
                    };
                });
            },
            syncinretailercitydata: function () {
                return $http.get(adminurl + "city/find", {
                    params: {}
                })
            },
            insertretailercitydata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO CITY (id , state, name) VALUES (' + data[i].id + ',"' + data[i].state + '","' + data[i].name + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("RAOW INSERTED");
                        }, null);
                    };
                });
            },
            syncinretailerareadata: function () {
                return $http.get(adminurl + "area/find", {
                    params: {}
                })
            },
            insertretailerareadata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO AREA (id , city, name) VALUES (' + data[i].id + ',"' + data[i].city + '","' + data[i].name + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("RAOW INSERTED");
                        }, null);
                    };
                });
            },
            syncinretailerdata: function () {
                return $http.get(adminurl + "retailer/find", {
                    params: {}
                })
            },

            /*id,lat,long,area,dob,type_of_area,sq_feet,store_image,name,number,email,address,ownername,ownernumber,contactname,contactnumber,timestamp, sync*/

            insertretailerdata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO RETAILER (id,lat,long,area,dob,type_of_area,sq_feet,store_image,name,number,email,address,ownername,ownernumber,contactname,contactnumber,timestamp, sync) VALUES ("' + data[i].id + '","' + data[i].lat + '","' + data[i].long + '","' + data[i].area + '","' + data[i].dob + '","' + data[i].type_of_area + '","' + data[i].sq_feet + '","' + data[i].store_image + '","' + data[i].name + '","' + data[i].number + '","' + data[i].email + '","' + data[i].address + '","' + data[i].ownername + '","' + data[i].ownernumber + '","' + data[i].contactname + '","' + data[i].contactnumber + '","' + data[i].timestamp + '", "true")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("RAOW INSERTED");
                        }, function (tx, results) {
                            console.log("RAOW NOT INSERTED");
                        });
                    };
                });
            },
            syncinproductdata: function () {
                return $http.get(adminurl + "product/find", {
                    params: {}
                })
            },
            insertproductdata: function (data) {
                db.transaction(function (tx) {
                    for (var i = 0; i < data.length; i++) {
                        var sqls = 'INSERT INTO PRODUCT (id, name, product, encode, name2, productcode, category,video,mrp,description,age,scheme,isnew,timestamp) VALUES (' + data[i].id + ',"' + data[i].name + '","' + data[i].product + '","' + data[i].encode + '","' + data[i].name2 + '","' + data[i].productcode + '","' + data[i].category + '","' + data[i].video + '","' + data[i].mrp + '","' + data[i].description + '","' + data[i].age + '","' + data[i].scheme + '","' + data[i].isnew + '","' + data[i].timestamp + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log("PRODUCT RAOW INSERTED");
                        }, function (tx, results) {
                            console.log("PRODUCT RAOW NOT INSERTED");
                        });
                    };
                });
            },
            synccategorydata: function (data) {
                $.jStorage.set("categoriesdata", data);
                console.log(data);
                categorydata = data;
            },
            getcategoriesoffline: function () {
                return categorydata;
            },
            sendcartoffline: function (orid, ouid, ocart, remark) {
                if ($.jStorage.get("offlineorderid") > 0) {
                    orderid = $.jStorage.get("offlineorderid");
                } else {
                    orderid = 0
                };
                orderid += 1;
                $.jStorage.set("offlineorderid", orderid);
                db.transaction(function (tx) {
                    if (ocart.length == 0) {
                        var sqls = 'INSERT INTO ORDERS (orderid, userid, retailerid, id, productcode, name, quantity, mrp, totalprice, category, remark) VALUES (' + orderid + ',' + ouid + ',' + orid + ',null,null,null,null,null,null,null," no remark ")';
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log('added no products with order id ' + orderid);
                            var aid = MyServices.getareaid();
                            MyServices.clearcart();
                            MyServices.setretailer(0);
                            if (aid > 0) {
                                window.location.replace(window.location.origin + window.location.pathname + "#/app/retailer/" + aid);
                            } else {
                                window.location.replace(window.location.origin + window.location.pathname + "#/app/home");
                            };
                        }, function (tx, results) {
                            console.log('did not add no product with no name');
                        });
                    };
                    for (var i = 0; i < ocart.length; i++) {
                        var sqls = 'INSERT INTO ORDERS (orderid, userid, retailerid, id, productcode, name, quantity, mrp, totalprice, category, remark) VALUES (' + orderid + ',' + ouid + ',' + orid + ',' + ocart[i].id + ',"' + ocart[i].productcode + '","' + ocart[i].name + '",' + ocart[i].quantity + ',"' + ocart[i].mrp + '","' + ocart[i].totalprice + '","' + ocart[i].category + '","' + remark + '")';
                        console.log(sqls);
                        tx.executeSql(sqls, [], function (tx, results) {
                            console.log('added ' + i + ' products with order id ' + orderid);
                            var aid = MyServices.getareaid();
                            MyServices.clearcart();
                            MyServices.setretailer(0);
                            if (aid > 0) {
                                window.location.replace(window.location.origin + window.location.pathname + "#/app/retailer/" + aid);
                            } else {
                                window.location.replace(window.location.origin + window.location.pathname + "#/app/home");
                            };
                        }, function (tx, results) {
                            console.log('did not add product with name' + ocart.name);
                        });
                    };
                });
            },
            syncsendorders: function (sqls, dsqls) {
                //function after email success
                var emailsend = function (data, status) {
                    console.log(data);
                };
                //funtion after sms success
                var smssuccess = function (data, status) {
                    console.log(data);
                };
                //function after the success of the syncing of the order
                var syncordersuccess = function (data, status) {
                    MyServices.sendorderemail(data.id, data.retail, data.amount, data.sales, data.timestamp, data.quantity, data.remark).success(emailsend);
                    db.transaction(function (tx3) {
                        tx3.executeSql(dsqls, [], function (tx3, results3) {
                            console.log(results3);
                            console.log(data);
                            $.jStorage.set("offlineorderid", $.jStorage.get("offlineorderid") - 1);
                        }, function (tx3, results3) {});
                    });
                };
                //user and retailer and cart variables
                var retaileridtosend = 0;
                var useridtosend, retailertosend, usertosend, remarktosend, totalq, totalp, number1, number2;
                var carttosend = [];
                var userme = MyServices.getuser();
                console.log(sqls);
                db.transaction(function (tx2) {
                    //selecting idividual orders
                    tx2.executeSql(sqls, [], function (tx2, results2) {
                        for (var i = 0; i < results2.rows.length; i++) {
                            //getting retailer id and the user id of the order
                            retaileridtosend = results2.rows.item(i).retailerid;
                            useridtosend = results2.rows.item(i).userid;
                            //remark of that order
                            remarktosend = results2.rows.item(i).remark;
                            //total quantity
                            totalq += results2.rows.item(i).quantity;
                            totalp += results2.rows.item(i).totalprice;
                            //creating the cart
                            if (results2.rows.item(i).id != null) {
                                carttosend.push({
                                    id: results2.rows.item(i).id,
                                    productcode: results2.rows.item(i).productcode,
                                    name: results2.rows.item(i).name,
                                    quantity: results2.rows.item(i).quantity,
                                    mrp: results2.rows.item(i).mrp,
                                    totalprice: results2.rows.item(i).totalprice,
                                    category: results2.rows.item(i).category
                                });
                            };
                        };
                        if (retaileridtosend == 0) {
                            $.jStorage.set("offlineorderid", $.jStorage.get("offlineorderid") - 1);
                        };
                        //checking if user is the current user
                        if (useridtosend == userme.id) {
                            //retrieving the retailer object
                            var rsqls = 'SELECT * FROM RETAILER WHERE id=' + retaileridtosend;
                            tx2.executeSql(rsqls, [], function (tx2, results2) {
                                retailertosend = results2.rows.item(0);
                                retailertosend.remark = remarktosend;
                                //get number to send sms
                                number1 = retailertosend.contactnumber;
                                number2 = retailertosend.ownernumber;
                                //sending order
                                MyServices.sendSyncOrderNow(carttosend, retailertosend).success(syncordersuccess);
                                //send sms
                                if (carttosend.length > 0) {
                                    MyServices.sms(number1, number2, totalq, totalp).success(smssuccess);
                                };
                            }, function (tx2, results2) {});
                        };
                    }, function (tx2, results2) {});
                });
            },
            addnewretailer: function (data) {
                console.log(data.area);
                db.transaction(function (tx) {
                    db.transaction(function (tx) {
                            var sqls = 'INSERT INTO RETAILER (id,lat,long,area,dob,type_of_area,sq_feet,store_image,name,number,email,address,ownername,ownernumber,contactname,contactnumber,timestamp, sync) VALUES (null,"' + data.lat + '","' + data.long + '","' + data.area + '","' + data.dob + '","' + data.type_of_area + '","' + data.sq_feet + '","' + data.store_image + '","' + data.name + '","' + data.number + '","' + data.email + '","' + data.address + '","' + data.ownername + '","' + data.ownernumber + '","' + data.contactname + '","' + data.contactnumber + '",null, "false")';
                            console.log(sqls);
                            tx.executeSql(sqls, [], function (tx, results) {
                                console.log("RAOW INSERTED");
                            }, function (tx, results) {
                                console.log("RAOW NOT INSERTED");
                            });
                    });
                });
            },
            editaretailer: function(data, name) {
                    db.transaction(function (tx) {
                            var sqls = 'UPDATE RETAILER SET email = "'+data.email+'", ownername = "'+data.ownername+'", ownernumber = "'+data.ownernumber+'", contactname = "'+data.contactname+'", contactnumber = "'+data.contactnumber+'", sync = "false" WHERE id = '+data.id+' AND name ="'+name+'"';
                            console.log(sqls);
                            tx.executeSql(sqls, [], function (tx, results) {
                                console.log("RAOW UPDATED");
                            }, function (tx, results) {
                                console.log("RAOW NOT INSERTED");
                            });
                    });
            },
        }
    });