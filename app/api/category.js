'use strict';

var session = require('express-session');
var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../helpers/index').helper;
var Category = require('../models/index').category;

var getCategories = (result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-categories')
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-categories', () => {
        Category.find({}, (err, data) => {
            if (err) {
                workflow.emit('response', {
                    error: err,
                    categories: null
                });
            } else {
                workflow.emit('response', {
                    error: null,
                    categories: data || []
                });
            }
        })
    });

    workflow.emit('validate-parameters');
}

var addCategory = (category, result) => {

    var workflow = new event.EventEmitter();

    var name = category.name,
        alias = category.alias,
        icon = Array.isArray(category.newNames) == true ? category.newNames[0] : category.newNames,
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

        if (root_category === 'undefined' || !root_category) {
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
        return result(response);
    });

    workflow.on('add-category', () => {
        var category = new Category();
        category.name = name;
        category.alias = alias;
        category.created_at = Date.now();

        if (url) {
            category.icon = url
        }

        if (icon) {
            category.icon = "/static/img/" + icon
        }

        //root
        if (root_category === 'undefined' || !root_category) {
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

var delCategory = (parameters, result) => {
    var workflow = new event.EventEmitter();
    var id = parameters.id,
        rootCategory = parameters.rootCategory || parameters.id;

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: 'id category is required!'
            });
            return
        }

        workflow.emit('del-category');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('del-category', () => {
        deleteCategory(id, rootCategory, (result) => {
            workflow.emit('response', {
                error: result.error,

            })
        });
    });

    workflow.emit('validate-parameters');
}

var editCategory = (parameters, result) => {
    var new_name = parameters.new_name,
        new_alias = parameters.new_alias,
        current_id_category = parameters.current_id_category,
        current_root_category = parameters.current_root_category,
        new_root_category = parameters.new_root_category,
        new_icon = Array.isArray(parameters.newNames) == true ? parameters.newNames[0] : parameters.newNames,
        new_url = parameters.new_url;

    console.log(parameters);

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {

        if (!current_id_category) {
            workflow.emit('response', {
                error: "Id of current category is required!"
            });
            return
        }

        if (!current_root_category) {
            workflow.emit('response', {
                error: "Root category is required!"
            });
        }

        workflow.emit('edit-category');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('edit-category', () => {

        //move to root category
        if (new_root_category === 'undefined' || !new_root_category) {

            console.log('NEW ROOT CATEGORY');

            //remove and add new root category           

            deleteCategory(current_id_category, current_root_category, (result) => {
                if (result.error) {
                    workflow.emit('response', {
                        error: "Remove current category has been failed!"
                    });
                } else {
                    var newCate = {
                        name: new_name,
                        alias: new_alias,
                        newName: new_icon,
                        url: new_url
                    }

                    addCategory(newCate, (result) => {
                        workflow.emit('response', result);
                    });
                }
            });
        } else {

            //update root category
            if ((current_id_category == current_root_category) && (current_root_category == new_root_category)) {
                console.log('UPDATE CURRENT ROOT CATEGORY');

                //find root category
                Category.findById(current_root_category, (err, category) => {
                    if (err) {
                        workflow.emit('response', {
                            error: err,
                        });
                        return
                    }

                    if (!category) {
                        workflow.emit('response', {
                            error: "Category not exists"
                        });
                        return
                    }

                    if (new_name && new_name != 'undefined') {
                        category.name = new_name;
                    }

                    if (new_url && new_url != "") {
                        category.icon = new_url;
                    }

                    if (new_icon && new_icon != 'undefined') {
                        category.icon = '/static/img/' + new_icon;
                    }

                    if (new_alias && new_alias != 'undefined') {
                        category.alias = new_alias
                    }

                    category.save((err) => {
                        workflow.emit('response', {
                            error: err
                        });
                    });
                });
            } else if ((current_id_category != current_root_category) && (current_root_category == new_root_category)) {
                //update sub category
                console.log('UPDATE SUB CATEGORY');

                //find root category
                Category.findById(current_root_category, (err, category) => {
                    if (err) {
                        workflow.emit('response', {
                            error: err,
                        });
                        return
                    }

                    if (!category) {
                        workflow.emit('response', {
                            error: "Category not exists"
                        });
                        return
                    }

                    var subs = category.subCategories;
                    if (!subs || subs.length == 0) {
                        workflow.emit('response', {
                            error: "Subcategory is empty!"
                        });
                        return
                    }

                    var idx = _.findIndex(subs, (sub) => {
                        if (sub && sub._id) {
                            return sub._id == current_id_category;
                        }
                    });

                    if (!idx || idx < 0) {
                        workflow.emit('response', {
                            error: "Subcategory not found"
                        });
                        return
                    }

                    var newSub = subs[idx];

                    if (!newSub) {
                        workflow.emit('response', {
                            error: "Subcategory not found"
                        });
                    }

                    if (new_alias) {
                        newSub.alias = new_alias
                    }

                    if (new_name) {
                        newSub.name = new_name
                    }

                    subs[idx] = newSub

                    category.subCategories = subs;

                    category.save((err) => {
                        workflow.emit('response', {
                            error: err
                        });
                    });
                });

            } else {
                console.log('MOVE TO ANOTHER ROOT CATEGORY');

                //move to another root category
                if (!new_root_category) {
                    workflow.emit('response', {
                        error: "New root category is required!"
                    });
                    return
                }

                deleteCategory(current_id_category, current_root_category, (result) => {
                    if (result.error) {
                        workflow.emit('response', {
                            error: result.error
                        });
                        return
                    }

                    //add new category to category that choosen
                    var newCategory = {
                        name: new_name,
                        alias: new_alias,
                        newName: new_icon,
                        url: new_url,
                        id_root_category: new_root_category
                    }

                    addCategory(newCategory, (result) => {
                        workflow.emit('response', result);
                    });
                });
            }
        }
    });

    workflow.emit('validate-parameters');
}

var deleteCategory = (idSub, idRoot, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!idSub) {
            workflow.emit('response', {
                error: "SubCategory is required!"
            });
            return
        }

        if (!idRoot) {
            workflow.emit('response', {
                error: "Root Category is required!"
            });
            return
        }

        workflow.emit('delete-category');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('delete-category', () => {

        //root category
        if (idRoot == idSub) {
            Category.findByIdAndRemove(idRoot, (err) => {
                workflow.emit('response', {
                    error: err
                });
            });
        } else {
            Category.findById(idRoot, (err, category) => {
                if (err) {
                    workflow.emit('response', {
                        error: err,
                    });
                    return
                }

                if (!category) {
                    workflow.emit('response', {
                        error: "Category not found"
                    });
                    return
                }

                var subs = category.subCategories;

                if (!subs || subs.length == 0) {
                    workflow.emit('response', {
                        error: "Sub categories are empty"
                    });
                    return
                }

                var remainingCategory = _.pullAt(subs, (sub) => {
                    return sub._id == idSub
                });

                if (!remainingCategory || remainingCategory.length == 0) {
                    workflow.emit('response', {
                        error: "Delete sub category has been failed"
                    });
                    return
                }

                category.subCategories = remainingCategory;

                category.save((err) => {
                    workflow.emit('response', {
                        error: err,
                    });
                });
            });
        }
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    getCategories: getCategories,
    addCategory: addCategory,
    delCategory: delCategory,
    editCategory: editCategory
}