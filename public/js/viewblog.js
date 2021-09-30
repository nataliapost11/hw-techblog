const commentBlogFormHandler = async (event) => {
  // The below statement prevents the event from triggering the default event handler
  event.preventDefault();

  const blog_id = document.querySelector('#blog-id').value.trim();
  const comment = document.querySelector('#blog-comment').value.trim();

  if (blog_id && comment) {
    // If both title and content are entered, trigger the api to 
    // post new blog details.
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        blog_id,
        comment
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to post');
    }
  }
};
 

document
  .querySelector('.comment-blog-form')
  .addEventListener('submit', commentBlogFormHandler);
