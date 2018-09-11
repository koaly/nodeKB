//- Natthapong Somboonphattarakit 5910501950
const express = require('express');
const router = express.Router();

// Bring in Article Models
let Article = require('../models/article'); 

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
    res.render('add_article', {
        title:'เพิ่มบทความ'
    });
});

// Add Submit POST Route
router.post('/add', function(req, res){
    req.checkBody('title', 'ต้องการชื่อบทความ').notEmpty();
    // req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'ต้องการเนื้อหา').notEmpty();

    // Get Errors
    let errors = req.validationErrors();

    if(errors){
        res.render('add_article', {
            title:'เพิ่มบทความ',
            errors:errors
        });
    }
    else{
        let article = new Article();
        article.authorID = req.user._id;
        article.title = req.body.title;
        article.author = req.user.name;
        article.body = req.body.body;
        if (req.body.goldMedal) article.goldMedal = req.body.goldMedal;
        if (req.body.silverMedal) article.silverMedal = req.body.silverMedal;
        if (req.body.bronzeMedal) article.bronzeMedal = req.body.bronzeMedal;

        article.save(function(err){
            if(err){
                console.log(err);
                return;
            }
            else{
                req.flash('success', 'เพิ่มบทความแล้ว');
                res.redirect('/');
            }
        });
    }
});

// Get Single Article
router.get('/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
        res.render('article', {
            article:article
        });
    });
});

// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('danger', 'กรุณาเข้าสู่ระบบ');
        res.redirect('/');
    }
}

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
    Article.findById(req.params.id, function(err, article){
        if(article.authorID != req.user._id){
            req.flash('danger', 'ไม่ใช่บทความของท่าน');
            res.redirect('/');
            return;
        }
        res.render('edit_article', {
            title:'แก้ไขบทความ',
            article:article
        });
    });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}

    Article.update(query, article, function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            req.flash('success', 'อัปเดตบทความ');
            res.redirect('/');
        }
    });
});

router.delete('/:id', function(req, res){
    if(!req.user._id){
        res.status(500).send();
    }
    let query = {_id:req.params.id};

    Article.findById(req.params.id, function(err, article){
        if(article.authorID != req.user._id){
            res.status(500).send();
        }
        else{
            Article.remove(query, function(err){
                if(err){
                    console.log(err);
                }
                res.send('Success');
            });
        }
    });
});

module.exports = router;