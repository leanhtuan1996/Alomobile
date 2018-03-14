var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

router.get('/tgdd/dien-thoai/samsung', (req, res) => {
    request('https://www.thegioididong.com/dtdd-samsung', (err, response, body) => {
        if (body) {
            var $ = cheerio.load(body);
            $('ul.homeproduct').each((index, element) => {
                var li = $(element).find('li');

                li.each((index, i) => {
                    var a = $(i).find('a');
                    a.each((l, x) => {                        
                        var href = $(a).attr('href');

                        request(`https://www.thegioididong.com${href}`, (error, r, b) => {
                            var image = $(x).find('img').attr('src');
                            var name = $(x).find('h3').html();
                            var price = $(x).find('strong').text();

                            var $$ = cheerio.load(b);
                            
                            var leftContent = $$('body > section > div.box_content > aside.left_content > div.boxArticle > article');
                            var rigthContent = $$('body > section > div.box_content > aside.right_content');

                            if (leftContent && rigthContent) {

                            }

                        });
                    });
                });
            })
            res.json(body)
        }
    })
});

module.exports = router