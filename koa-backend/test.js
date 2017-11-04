var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"
parseString(xml, function (err, result) {
  // console.dir()可以显示一个对象所有的属性和方法
  console.dir(err);
  console.dir(result);
  if(err===null)
  {
    console.log("YEAH!!!!");
  }
});