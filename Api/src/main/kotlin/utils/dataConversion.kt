package utils

import model.Post
import model.User
import schema.SimplePostsDTO
import schema.SimpleUserDTO


fun convertUsersToSimpleUsersDTO(users: List<User>): List<SimpleUserDTO> {
    return users.map { user -> SimpleUserDTO(user) }
}

fun convertPostsToSimplePostsDTO(posts: List<Post>): List<SimplePostsDTO> {
    return posts.map { post ->
        SimplePostsDTO(
            post.id,
            SimpleUserDTO(post.user),
            post.title,
            post.description,
            post.video,
            convertUsersToSimpleUsersDTO(post.likes.toList()),
            post.comments.size
        )
    }
}