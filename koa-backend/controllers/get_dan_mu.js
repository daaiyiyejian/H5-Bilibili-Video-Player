// get dan mu:

const dir = __dirname + '/../xml/';
const xml2js = require('xml2js');
const path = require('path');
const fs = require('mz/fs');
const position_map = [0, 0, 0 , 0, 2, 1, 0, 0, 0]

module.exports = {
  'GET /get_dan_mu': async (ctx, next) => {
    var file_name = ctx.query.file_name || '';
    if (file_name.length === 0) {
      ctx.response.status = 404;
    }
    else {
      file_name = decodeURI(file_name);
      let fp = path.join(dir, file_name);
      console.log("--------fp---------")
      console.log(fp)
      if (await fs.exists(fp)) {
        const xml_content = await fs.readFile(fp);
        var parseString = xml2js.parseString;
        await parseString(xml_content, function (err, result) {
          // console.dir()可以显示一个对象所有的属性和方法
          if (err === null) {
            const dan_mu_list = result["i"]["d"];
            var result_list = [];
            var index;
            for (index in dan_mu_list)
            {
              var dan_mu = dan_mu_list[index];
              var text = dan_mu["_"];
              var other_para_list = dan_mu["$"]["p"].split(",");
              var time = parseInt(parseFloat(other_para_list[0])*10);
              var color_int = parseInt(other_para_list[3]);
              var b = color_int % 256;
              color_int = Math.floor(color_int / 256);
              var g = color_int % 256;
              var r = Math.floor(color_int / 256);
              r = r.toString(16);
              g = g.toString(16);
              b = b.toString(16);
              // 拼接成颜色的RGB值
              var color = '#'+r+g+b;
              var position = other_para_list[1];
              var position = position_map[position];
              var size = 1;
              result_list.push({
                "text":text,
                "time":time,
                "color":color,
                "position":position,
                "size":size
              });
            }
            console.dir(result_list);
            var result_str = JSON.stringify(result_list);
            ctx.response.type = "application/javascript";
            // ctx.response.body = callback + '(\'' + result_str + '\')';
            ctx.response.body = result_str;
          }
          else
          {
            ctx.response.status = 404;
          }
        });
      } else {
        ctx.response.status = 404;
      }
    }
  }
};
