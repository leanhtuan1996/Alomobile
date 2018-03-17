var express = require('express');
var router = express();
var request = require('request');
var cheerio = require('cheerio');
const querystring = require('querystring');
var _ = require('lodash');

router.get('/g3g4/send-sms', (req, res) => {

    request('https://g3g4.vn/sms/login.jsp', (a, b, c) => {
        console.log('SESSION LOGIN INDEX: ' + b.headers['set-cookie'][0].split(';')[0].split('=')[1]);
        var sessionID = b.headers['set-cookie'][0].split(';')[0].split('=')[1];
        //console.log(b);
        login(sessionID, (result) => {
            if (result.success && result.sessionId) {
                request({
                    uri: 'https://g3g4.vn/sms/main?1iutlomLork=jgor%7F5yktjysy5ysyeo',
                    headers: {
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                        'Connection': 'keep-alive',
                        'Host': 'g3g4.vn',
                        'Referer': 'https://g3g4.vn/sms/main',
                        'Upgrade-Insecure-Requests': 1,
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36',
                        'Cookie': `JSESSIONID=${sessionID}; _ga:'GA1.2.1413610610.1517567681' ;`
                    },
                    _qs: {
                        '1y%7Fyezksvrgzkelork': 'rg%7Fu{z5iihy5zvreiihy',
                        '1iutlomLork': 'rg%7Fu{z5iihy5otjk~',
                        'skt{xklxkyn': 1
                    }
                }, (e, r, b) => {
                    console.log('SESSION MAIN INDEX: ' + r.request.headers.Cookie);
                    res.send(b);
                });
            } else {
                res.json({
                    error: "Login have been failed"
                });
            }
        });
    });
});

var checkLoggedIn = (s, cb) => {
    console.log(s);
    if (s.length == 0) {
        return cb({
            error: "",
            logged: false
        });
    }

    _.forEach(s, (sessionID) => {
        console.log(`TRY LOGGED IN WITH SESSION ID: ${sessionID}`);


        request({
            headers: headers,
            uri: 'https://g3g4.vn/sms/main',
            method: 'GET',
            qs: {
                '1iutlomLork': 'jgor5yktjysy5ysyeo'
            }
        }, (error, response, body) => {
            console.log(`LOGGED IN WITH SESSION ID: ${sessionID} WITH RESULT: `);
            console.log(error);
            console.log(response);
            return cb({
                body: body
            })
        });
    });
};

var login = (sessionID, cb) => {
    console.log("LOGIN");
    var form = {
        '1yyezksvrgzkelork': 'rgu{z5iihy5zvrerumot',
        'username': 'nguyenvietnamson',
        'password': 'namson270231'
    }

    var formData = querystring.stringify(form);
    var contentLength = formData.length;

    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://g3g4.vn',
        'Host': 'g3g4.vn',
        'Pragma': 'no-cache',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
        'Accept-Language': 'en-us',
        'Accept-Encoding': 'br, gzip, deflate',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36',
        'Referer': 'https://g3g4.vn/sms/login.jsp',
        'Content-Length': contentLength,
        'Cookie': `JSESSIONID=${sessionID}; _ga='GA1.2.1413610610.1517567681'`
    }

    request({
        headers: headers,
        uri: "https://g3g4.vn/sms/checkuser.jsp",
        body: formData,
        method: "POST"        
    }, (error, response, body) => {
        //console.log(response);
        console.log('SESSION LOGIN: ' + response.request.headers.Cookie);
        if (error) {
            return cb({
                error: error,
                success: false
            });
        }

        //login success
        if (response.statusCode == 200 && response.statusMessage == 'OK') {
            console.log('LOGIN SUCCESSFULLY');
            return cb({
                success: true,
                sessionId: sessionID,
                body: body
            });
        } else {
            return cb({
                success: false,
            });
        }
    });
}

var sendSms = (parameters, cb) => {

}

module.exports = router;