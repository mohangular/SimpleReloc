var express = require('express');
var mongoose = require('mongoose');
var locationRouter = express.Router();
const bodyParser = require('body-parser');

const Locations = require('../models/location');

locationRouter.use(bodyParser.json());

locationRouter.route('/')
    .get((req, res, next) => {
        Locations.find({})
            .then((location) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(location);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
locationRouter.route('/')
    .post((req, res, next) => {
        Locations.create(req.body)
            .then((location) => {
                console.log('Location Added :', location);
                Locations.find({})
                    .then((locations) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(locations);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));
    });
locationRouter.route('/:id')
    .put((req, res, next) => {
        Locations.updateOne({ _id: req.params.id }, req.body)
            .then((location) => {
                console.log('Location Updated :', location);
                Locations.find({})
                    .then((Locations) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(Locations);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));
    });
locationRouter.route('/:ids')
    .delete((req, res, next) => {
        let ids = String(req.params.ids).split(',');
        console.log(ids);
        Locations.deleteMany({ _id: { $in: ids } })
            .then((location) => {
                console.log('Location Deleted :', ids);
                Locations.find({})
                    .then((Locations) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(Locations);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => console.log(err));
    });

module.exports = locationRouter;