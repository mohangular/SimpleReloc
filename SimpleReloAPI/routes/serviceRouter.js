var express = require('express');
var mongoose = require('mongoose');
var serviceRouter = express.Router();
const bodyParser = require('body-parser');

const Services = require('../models/service');

serviceRouter.use(bodyParser.json());

serviceRouter.route('/')
    .get((req, res, next) => {
        Services.find({})
            .then((service) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(service);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
serviceRouter.route('/')
    .post((req, res, next) => {
        Services.create(req.body)
            .then((service) => {
                console.log('Service Added :', service);
                Services.find({})
                    .then((locations) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(locations);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));
    });
serviceRouter.route('/:id')
    .put((req, res, next) => {
        Services.updateOne({ _id: req.params.id }, req.body)
            .then((service) => {
                console.log('Service Updated :', service);
                Services.find({})
                    .then((Services) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(Services);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));
    });
serviceRouter.route('/:ids')
    .delete((req, res, next) => {
        let ids = String(req.params.ids).split(',');
        Services.deleteMany({ _id: { $in: ids } })
            .then((service) => {
                console.log('Service Deleted :', ids);
                Services.find({})
                    .then((Services) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(Services);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => console.log(err));
    });

module.exports = serviceRouter;