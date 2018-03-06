'use strict';

var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../helpers/index').helper;
var Brand = require('../models/index').brand;

var getBrands = (result) => {

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-brands');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-brands', () => {
        Brand.find({}, (err, brands) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!brands) {
                workflow.emit('response', {
                    error: "Brand is empty"
                });
            }

            workflow.emit('response', {
                brands: brands
            });
        });
    });

    workflow.emit('validate-parameters');
};

var newBrand = (brand, result) => {

    var name = brand.name,
        alias = brand.alias,
        image = Array.isArray(brand.newNames) == true ? brand.newNames[0] : brand.newNames,
        url = brand.url;

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!name) {
            workflow.emit('response', {
                error: "Name of brand is required!"
            });
            return
        }

        if (!alias) {
            workflow.emit('response', {
                error: "Alias of brand is required!"
            });
            return
        }

        if (!(image || url)) {
            workflow.emit('response', {
                error: "Hình ảnh không được bỏ trống"
            });
            return
        }

        workflow.emit('new-brand');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('new-brand', () => {
        var newBrand = new Brand();
        newBrand.name = name;
        newBrand.alias = alias;        
        newBrand.created_at = Date.now();

        if (url) {
            newBrand.image = url
        }

        if (image) {
            newBrand.image = '/static/img/' + image;
        }

        newBrand.save((err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters');
}

var editBrand = (brand, result) => {
    var workflow = new event.EventEmitter();

    var id = brand.id,
        name = brand.name,
        alias = brand.alias,
        image = Array.isArray(brand.newNames) == true ? brand.newNames[0] : brand.newNames,
        url = brand.url;

    workflow.on('validate-parameters', () => {
        if (!id || id == 'undefined') {
            workflow.emit('response', {
                error: "Id of Brand is required!"
            });
            return
        }

        workflow.emit('edit-brand');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('edit-brand', () => {
        Brand.findById(id, (err, element) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!element) {
                workflow.emit('response', {
                    error: "Brand not found"
                });
                return
            }

            if (!(name || alias || image)) {
                workflow.emit('response', {

                });
                return
            }

            if (name && name != 'undefined') {
                element.name = name
            }

            if (alias && alias != 'undefined') {
                element.alias = alias
            }

            if (url && url != 'undefined') {
                element.image = url
            }

            if (image && image != 'undefined') {
                element.image = '/static/img/' + image
            }

            element.save((err) => {
                workflow.emit('response', {
                    error: err
                });
            });
        });
    });

    workflow.emit('validate-parameters');
}

var deleteBrand = (parameters, result) => {

    var id = parameters.id;

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id || id == 'undefined') {
            workflow.emit('response', {
                error: "Id of Brand is required!"
            });
            return
        }

        workflow.emit('delete-brand');
    });

    workflow.on('response', (response) => {
        return result(response)
    });

    workflow.on('delete-brand', () => {
        Brand.findByIdAndRemove(id, (err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    getBrands: getBrands,
    newBrand: newBrand,
    editBrand: editBrand,
    deleteBrand: deleteBrand
}