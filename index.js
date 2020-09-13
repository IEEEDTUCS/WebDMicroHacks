const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');
const expressSanitizer=require('express-sanitizer');
const express= require('express');
const app=express();
const Blog=require('./models/blog');

mongoose.connect('mongodb://localhost/microhack',{useNewUrlParser: true,useUnifiedTopology: true});

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

app.get('/',function(req,res){
    res.render('myhomepage');
});

app.get('/blogs',function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            res.render('index',{blogs: blogs});
        }
    });
});

app.get('/blogs/new',function(req,res){
    res.render('new.ejs');
});

app.post('/blogs',function(req,res){
    const blog=req.body.blog;
    blog.body=req.sanitize(blog.body);

    Blog.create(blog,function(err,blog){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            res.redirect('/blogs');
        }
    });
});

app.get('/blogs/:id', function(req,res){
    const id=req.params.id;

    Blog.findById(id,function(err,blog){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            res.render('show',{blog: blog});
        }
    });
    
});

app.get('/blogs/:id/edit',function(req,res){
    const id= req.params.id;

    Blog.findById(id,function(err,blog){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            res.render('edit',{blog: blog});
        }
    });    
});

app.put('/blogs/:id',function(req,res){
    const blog=req.body.blog;
    const id=req.params.id;
    blog.body=req.sanitize(blog.body);

    Blog.findByIdAndUpdate(id, blog, function(err, ublog){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            res.redirect('/blogs/'+id);
        }
    });
});

app.delete('/blogs/:id',function(req,res){
    const id=req.params.id;

    Blog.findByIdAndDelete(id, function(err){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            res.redirect('/blogs');
        }
    });
});

app.listen(3000,function(){
    console.log('Server is listening!');
});