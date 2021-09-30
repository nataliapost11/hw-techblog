const newBlogFormHandler = async (event) => {
  // The below statement prevents the event from triggering the default event handler
  event.preventDefault();

  // The below expressons finds the title and content fields from the 
  // HTML conetent and gets the values from those fields and trims any spaces before
  // and after the values and stores to respective constants.
  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  if (title && content) {
    // If both title and content are entered, trigger the api to 
    // post new blog details.
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to post');
    }
  }
};

document
  .querySelector('.add-blog-form')
  .addEventListener('submit', newBlogFormHandler);
