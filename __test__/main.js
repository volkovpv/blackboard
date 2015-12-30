var login = require('../src/js/controller/login'),
    config = require('../src/config');


describe("Authorization", function() {

    beforeEach(function() {

    });

      it("loginTrue", function() {
          document.body.innerHTML = __html__['www/index.html'];

          var myEl = document.getElementById('textHeader');


          var data = {
              login: config.pupils[0].email,
              password: config.pupils[0].password
          };

          var authorization = login(data);
          expect(authorization.success).toBe(true);
          expect(authorization.role).toEqual(config.pupils[0].role);
          expect(authorization.firstName).toEqual(config.pupils[0].firstName);
          expect(authorization.lastName).toEqual(config.pupils[0].lastName);
          //expect(myEl.innerHTML).toEqual('"Вася"');

      });


    it("loginFalse", function() {
        document.body.innerHTML = __html__['www/index.html'];

        var myEl = document.getElementById('textHeader');


        var data = {
            login: "",
            password: ""
        };

        var authorization = login(data);
        expect(authorization.success).toBe(false);
        //expect(myEl.innerHTML).toEqual('"Вася"');



    });

});
