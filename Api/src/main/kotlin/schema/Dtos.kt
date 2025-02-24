package schema

import model.Post
import model.User
import model.Comment

class PostDTO(post: Post) {
    val id = post.id
    val user = SimpleUserDTO(post.user)
    val title = post.title
    val description = post.description
    val video = post.video
    val comments = post.comments.map { CommentsDTO(it) }
    val likes = post.likes.map { SimpleUserDTO(it) }
}

class SimplePostDTO(post: Post) {
    val id = post.id
    val user = SimpleUserDTO(post.user)
    val title = post.title
    val description = post.description
    val video = post.video
    val likes = post.likes.map { SimpleUserDTO(it) }
    val commentsAmount = post.comments.size
}

class UserDTO(user: User) {
    val id = user.id
    val username = user.username
    val email = user.email
    val image = user.image
    val posts = user.posts.map { SimplePostDTO(it) }
    val following = user.following.map { SimpleUserDTO(it) }
    val followers = user.followers.map { SimpleUserDTO(it) }
}

class SimpleUserDTO(user: User) {
    val id = user.id
    val username = user.username
    val image = user.image
}

class CommentsDTO(comment: Comment) {
    val id = comment.id
    val user = SimpleUserDTO(comment.user)
    val post = SimplePostDTO(comment.post)
    val text = comment.text
}

class SimplePostsDTO(
    val id: String,
    val user: SimpleUserDTO,
    val title: String,
    val description: String,
    val video: String,
    val likes: List<SimpleUserDTO>,
    val commentsAmount: Int
)

class SearchResultDTO(val users: List<SimpleUserDTO>, val posts: List<SimplePostsDTO>)
