"use strict";
exports.__esModule = true;
var parkingClass_1 = require("./parkingClass");
var securityClass_1 = require("./securityClass");
var parking = new parkingClass_1.Parking();
var client1 = new securityClass_1.Secutiry(parking);
var client2 = new securityClass_1.Secutiry(parking);
var client3 = new securityClass_1.Secutiry(parking);
var client4 = new securityClass_1.Secutiry(parking);
var client5 = new securityClass_1.Secutiry(parking);
var result = parking.add(client1);
console.log(result);
result = parking.add(client2);
console.log(result);
result = parking.remove(client1);
console.log(result);
result = parking.add(client1);
console.log(result);
