const router = require('express').Router();
const { Blog, BlogComment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id,{
      include:[{ model: BlogComment }],
    }); 
    
    const blogData = blog.get({ plain: true });

    if (!blogData) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', async (req, res) => {
  try {
    const blog = await Blog.update({
      ...req.body,
      user_id: req.session.user_id,
    }, {
      where: {
        id: req.body.id,
      }
    });

    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({
        message: 'No blog found with this id!'
      });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;