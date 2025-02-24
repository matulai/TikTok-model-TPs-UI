package controllers

import drafts.DraftComment
import drafts.DraftPost
import io.javalin.http.Context
import io.javalin.http.BadRequestResponse
import io.javalin.http.NotFoundResponse
import service.TiktokSystem
import schema.*
import utils.*

class PostController( private val service: TiktokSystem) {

    fun addPost(ctx: Context) {
        val user = ctx.attribute<UserDTO>("user")!!
        val body = ctx.bodyValidator(PostBody::class.java)
            .check({ it.title.isNotEmpty() }, "Empty title")
            .check({ it.description.isNotEmpty() }, "Empty description")
            .check({ it.video.isNotBlank() }, "Invalid or empty video")
            .check({ isAnURL(it.video) }, "Invalid video url")
            .getOrThrow {
                BadRequestResponse("Invalid body")
            }
        val draftPost = DraftPost(body.title, body.description, body.video)
        ctx.json(PostDTO(service.addPost(user.id, draftPost)))
    }

    fun getPost(ctx: Context) {
        val postId = ctx.pathParam("id")
        try {
            val post = service.getPost(postId)
            ctx.json(PostDTO(post))
        } catch (e: Exception) {
            throw NotFoundResponse("Post doesn't exist")
        }
    }

    fun updatePost(ctx: Context) {
        val user = ctx.attribute<UserDTO>("user")!!
        val postId = ctx.pathParam("id")
        val post = getAPost(service, postId)
        val body = ctx.bodyValidator(PostBody::class.java)
            .check({ post.user.id == user.id }, "Not valid post")
            .check({ it.title.isNotEmpty() }, "Empty title")
            .check({ it.description.isNotEmpty() }, "Empty description")
            .check({ it.video.isNotBlank() }, "Invalid or empty video")
            .check({ isAnURL(it.video) }, "Invalid video url")
            .getOrThrow {
                BadRequestResponse("Invalid body")
            }
        service.editPost(
            postId,
            user.id,
            DraftPost(body.title, body.description, body.video)
        )
        ctx.json(PostDTO(post))
    }

    fun addLike(ctx: Context) {
        val user = ctx.attribute<UserDTO>("user")!!
        val postId = ctx.pathParam("id")
        val post = getAPost(service, postId)
        service.updateLike(user.id, postId)
        ctx.json(PostDTO(post))
    }

    fun addComment(ctx: Context) {
        val user = ctx.attribute<UserDTO>("user")!!
        val postId = ctx.pathParam("id")
        val post = getAPost(service, postId)
        val body = ctx.bodyValidator(CommentBody::class.java)
            .check({ it.text.isNotEmpty() }, "Empty comment")
            .getOrThrow {
                BadRequestResponse("Invalid body")
            }
        service.addComment(user.id, postId, DraftComment(body.text))
        ctx.json(PostDTO(post))
    }

    fun getLastTenPosts(ctx: Context) {
        val lastTenPosts = service.getLatestPosts().map{ SimplePostDTO(it) }
        ctx.json(lastTenPosts)
    }

}