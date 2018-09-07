import Koa from 'koa'
import axios from "axios";
import cheerio from "cheerio";
const app = new Koa();

app.use(async ctx => {
  ctx.body = "hello world!";
});
axios.get('https://maoyan.com/films?showType=1').then(data=>{
  let $ = cheerio.load(data.data);
  let idList = [];
  $('.movie-item a').each((i,item)=>{
    if($(item).next().hasClass('channel-action')){
      let movieObj = $(item).attr('data-val');
      movieObj = movieObj.replace('{movieid:','');
      movieObj = movieObj.replace('}','');
      idList.push(movieObj);
    }
  });
  console.log(idList);
});

export default app;
