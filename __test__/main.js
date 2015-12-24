var main = require('../src/js/main');


describe("запуск", function() {

  //We shall contemplate truth by testing reality, via spec expectations.
  it("первый", function() {
      document.body.innerHTML = __html__['index.html'];
      expect(document.getElementById('textHeader')).toBeDefined();
      expect(main(6)).toEqual(9);


  });

});
