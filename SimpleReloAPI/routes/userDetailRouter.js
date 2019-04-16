var express = require('express');
var mongoose = require('mongoose');
var userDetailRouter = express.Router();
const bodyParser = require('body-parser');

const UserDetails = require('../models/userDetail');

userDetailRouter.use(bodyParser.json());

userDetailRouter.route('/')
    .get((req, res, next) => {
        UserDetails.find({})
            .then((userDetail) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(userDetail);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
userDetailRouter.route('/')
    .post((req, res, next) => {
        UserDetails.create(req.body)
            .then((userDetail) => {
                console.log('User Detail Added :', userDetail);
                UserDetails.find({})
                    .then((locations) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(locations);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));
    });
userDetailRouter.route('/:id')
    .put((req, res, next) => {
        UserDetails.updateOne({ _id: req.params.id }, req.body)
            .then((userDetail) => {
                console.log('User Detail Updated :', userDetail);
                UserDetails.find({})
                    .then((UserDetails) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(UserDetails);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));
    });
userDetailRouter.route('/:ids')
    .delete((req, res, next) => {
        let ids = String(req.params.ids).split(',');
        UserDetails.deleteMany({ _id: { $in: ids } })
            .then((userDetail) => {
                console.log('User Detail Deleted :', ids);
                UserDetails.find({})
                    .then((UserDetails) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(UserDetails);
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => console.log(err));
    });

module.exports = userDetailRouter;