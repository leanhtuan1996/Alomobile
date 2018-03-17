var express = require('express');
var router = express.Router();
var fs = require('fs');

var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');


const jsdom = require("jsdom");
const { JSDOM } = jsdom;
//const $ = require('jquery');

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

router.get('/zalo', (req, res) => {
    fs.readFile('/Users/tuan/Documents/GitHub/Alomobile/app/views/zaloPro.ejs', "utf8", (err, html) => {    
        // call_jsdom(data, function (window) {
        //     var $ = window.$;
    
        //     var listUsers = $('#wpbody-content > div.container-fluid > div:nth-child(2) > div > div > div.panel-body > div > table');
        //     console.log(listUsers.length);
        // });

        
        var $ = cheerio.load(html);
        var listUsers = $('#listUsers');
        var tr = $(listUsers).find('tr');
        console.log(tr.length);


        var list = [];

        _.forEach(tr, (element) => {
            var td = $(element).find('td');
            var name = $(td[0]).text();
            var email = $(td[1]).text();
            var phone = $(td[2]).find('input').val();
            var user = {
                name: name,
                email: email,
                phone: phone
            }
            console.log(user);
            list.push(user);
        });

        fs.writeFile('/Users/tuan/Desktop/users.json', JSON.stringify(list), "utf-8", (err) => {
            
        });

        // console.log(1111);
        // const dom = new JSDOM(html);
        // var aa = $(dom).find('#listUsers');
        // console.log(aa);
    });
    
    res.json({
        name: "12321"
    })
})

module.exports = router