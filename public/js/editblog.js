const editBlogFormHandler = async (event) => {
  // The below statement prevents the event from triggering the default event handler
  event.preventDefault();

  // The below expressons finds the title and content fields from the 
  // HTML conetent and gets the values from those fields and trims any spaces before
  // and after the values and stores to respective constants.
  const id = document.querySelector('#blog-id').value.trim();
  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  if (title && content) {
    // If both title and content are entered, trigger the api to 
    // post new blog details.
    const response = await fetch('/api/blogs', {
      method: 'PUT',
      body: JSON.stringify({
        id,
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to post');
    }
  }
};

const deleteBlogHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#blog-id').value.trim();

  if (id) {
    const response = await fetch('/api/blogs/' + id, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete');
    }
  }
};


document
  .querySelector('.edit-blog-form')
  .addEventListener('submit', editBlogFormHandler);

document
  .querySelector('.btn-delete')
  .addEventListener('click', deleteBlogHandler);