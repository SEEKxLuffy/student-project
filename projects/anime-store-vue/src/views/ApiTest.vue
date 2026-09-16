<script setup lang="ts">
import { ref } from 'vue'

const posts = ref<{
  id: number
  title: string
  body: string
}[]>([])

const loading = ref(false)
const errorMessage = ref('')
const postTitle = ref('')
const postBody = ref('')

async function getPosts() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    )
if (!response.ok) {
  throw new Error('Failed to fetch posts.')
}
    const data = await response.json()

    posts.value = data
  } catch (error) {
    errorMessage.value = 'Failed to load posts.'
  }

  loading.value = false
}
async function createPost() {
  if (!postTitle.value || !postBody.value) {
    alert('Please enter title and body.')
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: postTitle.value,
          body: postBody.value,
          userId: 1
        })
      }
    )

    if (!response.ok) {
      throw new Error('Failed to create post.')
    }

    const data = await response.json()

    console.log('Created Post:', data)

    postTitle.value = ''
    postBody.value = ''
  } catch (error) {
    errorMessage.value = 'Failed to create post.'
  } finally {
    loading.value = false
  }
}
async function updatePost() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: 1,
          title: 'Updated Post',
          body: 'This post has been updated.',
          userId: 1
        })
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update post.')
    }

    const data = await response.json()

    console.log('Updated Post:', data)
  } catch (error) {
    errorMessage.value = 'Failed to update post.'
  } finally {
    loading.value = false
  }
}
async function deletePost() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete post.')
    }

    console.log('Post deleted successfully.')
  } catch (error) {
    errorMessage.value = 'Failed to delete post.'
  } finally {
    loading.value = false
  }
}
async function patchPost() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Patched Post'
        })
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update post.')
    }

    const data = await response.json()

    console.log('Patched Post:', data)
  } catch (error) {
    errorMessage.value = 'Failed to patch post.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="api-page">
    <h1>API Test</h1>

    <button @click="getPosts">
      Get Posts
    </button>
    <input
  v-model="postTitle"
  type="text"
  placeholder="Post title"
>

<textarea
  v-model="postBody"
  placeholder="Post body"
></textarea>
    <button @click="createPost">
  Create Post
</button>
<button @click="updatePost">
  Update Post
</button>
<button @click="deletePost">
  Delete Post
</button>
<button @click="patchPost">
  Patch Post
</button>
    <p v-if="loading">
  Loading posts...
</p>
<p v-if="errorMessage">
  {{ errorMessage }}
</p>

    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </section>
</template>

<style scoped>
.api-page {
  padding: 40px;
  background: #111;
  min-height: 100vh;
  color: white;
}

.api-page button {
  padding: 10px 20px;
  margin: 20px 0;
  background: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.api-page button:hover {
  background: #444;
}
</style>