package utils

import io.javalin.http.NotFoundResponse
import model.Post
import service.TiktokSystem

fun getAPost(service: TiktokSystem, postId: String): Post {
    try {
        return service.getPost(postId)
    } catch (e: Exception) {
        throw NotFoundResponse("Post doesn't exist")
    }
}
