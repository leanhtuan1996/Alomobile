'use strict';

var session = require('express-session');
var event = require('events');
var mongoose = require('mongoose');

var helper = require('../../helpers/index').helper;
var Category = require('../../models/index').category;
var Category_controller = require('../../controllers/index').category;

var getCategories = (result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-categories')
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-categories', () => {

        Category_controller.getCategories((result) => {
            workflow.emit('response', result);
        });
    });

    workflow.emit('validate-parameters');
}

var addCategory = (category, result) => {

    console.log(category);

    var workflow = new event.EventEmitter();

    var name = category.name,
        alias = category.alias,
        icon = category.newName,
        url = category.url,
        root_category = category.id_root_category;

    workflow.on('validate-parameters', () => {

        if (!name) {
            workflow.emit('response', {
                error: "Tên danh mục không được bỏ trống."
            });
            return
        }

        if (!alias) {
            workflow.emit('response', {
                error: "SEO URL không được bỏ trống"
            });
            return
        }

        if (root_category === 'undefined') {
            if (!(icon || url)) {
                workflow.emit('response', {
                    error: "Hình ảnh không được bỏ trống"
                });
                return
            }            
        }

        workflow.emit('add-category');
    });

    workflow.on('response', (response) => {
        console.log(response);
        return result(response);
    });

    workflow.on('add-category', () => {
        var category = new Category();
        category.name = name;
        category.alias = alias;
        category.created_at = Date.now();
    
        if (icon) {
            category.icon = "/static/img/" + icon
        }

        if (url) {
            category.url = url
        }

        //root
        if (root_category === 'undefined') {            
            category.save((err) => {
                if (err) {
                    workflow.emit('response', {
                        error: err,
                        success: true
                    });
                } else {
                    workflow.emit('response', {
                        error: null, 
                        success: true
                    });
                }
            });            
        } else {
            Category.findById(root_category, (err, c) => {
                if (err) {
                    workflow.emit('response', {
                        error: err,
                        success: false
                    });
                    return
                }

                if (!c) {
                    workflow.emit('response', {
                        error: "Không tìm thấy danh mục cần thêm vào",
                        success: false
                    });
                    return
                }

                c.subCategories.push(category);
                
                c.save((err) => {
                    if (err) {
                        workflow.emit('response', {
                            error: err,
                            success: false
                        });
                    } else {
                        workflow.emit('response', {
                            error: null,
                            success: true
                        });
                    }
                });                  
            });
        }
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    getCategories: getCategories,
    addCategory: addCategory
}