/**
 * Created by https://github.com/volkovpv on 12.2015.
 */

'use strict';

var controllerLogin = require('../../src/js/controller/controllerLogin'),
    config = require('../../src/config');


describe("Authorization", function() {
      it("controllerLoginTrue", function() {
          var data = {
              login: config.pupils[0].email,
              password: config.pupils[0].password
          },
              authorization = controllerLogin(data);

          expect(authorization.success).toBe(true);
          expect(authorization.role).toEqual(config.pupils[0].role);
          expect(authorization.firstName).toEqual(config.pupils[0].firstName);
          expect(authorization.lastName).toEqual(config.pupils[0].lastName);
      });


    it("controllerLoginFalse", function() {
        var data = {
            login: "",
            password: ""
        },
            authorization = controllerLogin(data);

        expect(authorization.success).toBe(false);
    });

});
