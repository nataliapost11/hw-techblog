const router = require('express').Router();
const {  Blog, BlogComment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogsData = await Blog.findAll({
      order: [
        ['title', 'ASC']
      ],
    });

    const blogs = blogsData.map((blog) => blog.get({
      plain: true
    }));

    res.render('homepage', {
      blogs,
      // Passing the logged_inn flag value from the session object to the 
      // handlebar's homepage view  
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogsData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [
        ['title', 'ASC']
      ],
    });

    const blogs = blogsData.map((blog) => blog.get({
      plain: true
    }));

    res.render('dashboard', {
      blogs,
      // Passing the logged_inn flag value from the session object to the 
      // handlebar's homepage view  
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in redirect the page to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});


router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/newblog', withAuth, (req, res) => {
  res.render('newblog');
});

router.get('/editblog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      raw: true
    });

    res.render('editblog', {
      blog: blogData,
      // Passing the logged_inn flag value from the session object to the view  
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/viewblog/:id', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id: req.params.id
      }
    });   

    const blogComments = await BlogComment.findAll({
      where: {
        blog_id: req.params.id
      }
    });  

    const blogData = blog.get({ plain: true }); 
    const commentsData = blogComments.map((comment) => comment.get({ plain: true }));

    console.log(commentsData);
    
    res.render('viewblog', {
      blog: blogData,
      comments:commentsData,
      // Passing the logged_inn flag value from the session object to the view  
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});
module.exports = router;