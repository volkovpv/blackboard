var main = require('../src/js/main');


describe("запуск", function() {

    beforeEach(function() {
        var div = document.createElement("h1");
        div.id  = 'textHeader';
        document.body.appendChild(div);
    });

  //We shall contemplate truth by testing reality, via spec expectations.
  it("первый", function() {
      document.body.innerHTML = __html__['www/index.html'];

      var myEl = document.getElementById('textHeader');
      expect(myEl.innerHTML).toEqual('"Вася"');
      expect(main(6)).toEqual(9);


      //jasmine.clock().install();
      //var dummyElement = ;
      //document.getElementById = jasmine.createSpy('textHeader').and.returnValue(dummyElement);
      //
      //jasmine.clock().tick(1002);
      //expect(document.getElementById("textHeader").innerHTML).toEqual('14');
      //jasmine.clock().uninstall();

  });

});
