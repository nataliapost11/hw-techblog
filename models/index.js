const User = require('./User');
const Blog = require('./Blog');
const BlogComment = require('./BlogComment');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(BlogComment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogComment.belongsTo(User, {
  foreignKey: 'user_id'
});


Blog.hasMany(BlogComment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogComment.belongsTo(Blog, {
  foreignKey: 'user_id'
});


module.exports = { User, Blog, BlogComment };
