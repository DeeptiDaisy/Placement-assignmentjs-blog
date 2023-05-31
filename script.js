   // Fetch 
   function fetchBlogs() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(blogs => {
            const blogsContainer = document.getElementById('blogs');
            blogs.forEach(blog => {
                const blogDiv = document.createElement('div');
                blogDiv.className = 'blog';
                blogDiv.innerHTML = `
                    <h3 data-id="${blog.id}">${blog.title}</h3>
                    <p>${blog.body}</p>
                    <button class="delete-btn" onclick="deleteBlog(${blog.id})">Delete</button>
                `;
                blogsContainer.appendChild(blogDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching blogs:', error);
        });
}

// Add new blog
function addBlog(event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    const newBlog = {
        title: titleInput.value,
        body: contentInput.value
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBlog)
    })
        .then(response => response.json())
        .then(blog => {
            const blogsContainer = document.getElementById('blogs');
            const blogDiv = document.createElement('div');
            blogDiv.className = 'blog';
            blogDiv.innerHTML = `
                <h3 data-id="${blog.id}">${blog.title}</h3>
                <p>${blog.body}</p>
                <button class="delete-btn" onclick="deleteBlog(${blog.id})">Delete</button>
            `;
            blogsContainer.appendChild(blogDiv);

            titleInput.value = '';
            contentInput.value = '';
        })
        .catch(error => {
            console.error('Error adding blog:', error);
        });
}

// Delete
function deleteBlog(blogId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                const blogDiv = document.querySelector(`h3[data-id="${blogId}"]`).parentNode;
                blogDiv.remove();
            } else {
                throw new Error('Failed to delete blog');
            }
        })
        .catch(error => {
            console.error('Error deleting blog:', error);
        });
}


function init() {
    fetchBlogs();

    const newBlogForm = document.getElementById('new-blog-form');
    newBlogForm.addEventListener('submit', addBlog);
}


init();