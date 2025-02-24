package controllers

import drafts.DraftEditUser
import drafts.DraftUser
import io.javalin.http.BadRequestResponse
import io.javalin.http.ConflictResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import schema.EditUserBody
import schema.LoginBody
import schema.RegisterBody
import schema.UserDTO
import service.TiktokSystem
import utils.convertPostsToSimplePostsDTO
import utils.convertUsersToSimpleUsersDTO
import utils.isAnEmail
import utils.isAnURL


class UserController(
    private val service: TiktokSystem, private val tokenController: TokenController
) {
    fun login(ctx: Context) {
        val userLogin = ctx
            .bodyValidator(LoginBody::class.java)
            .check({ it.username.isNotBlank() }, "Username cannot be empty")
            .check({ it.password.isNotBlank() }, "Password cannot be empty")
            .getOrThrow {
                throw BadRequestResponse("Not valid body")
            }

        try {
            val user = service.login(userLogin.username, userLogin.password)
            tokenController.addToken(ctx, user)
            ctx.json(UserDTO(user))
        } catch (e: Exception) {
            throw NotFoundResponse("Wrong email or password")
        }

    }

    fun registerUser(ctx: Context) {
        val body = ctx
            .bodyValidator(RegisterBody::class.java)
            .check({ it.username.isNotBlank() }, "Username cannot be empty")
            .check({ it.email.isNotBlank() }, "Email cannot be empty")
            .check({ isAnEmail(it.email) }, "Email is wrong")
            .check({ it.password.isNotBlank() }, "Password cannot be empty")
            .check({ it.image.isNotBlank() }, "Image cannot be empty")
            .check({ isAnURL(it.image) }, "Image is wrong")
            .getOrThrow {
                throw BadRequestResponse("Not valid body")
            }

        try {
            val draftUser = DraftUser(
                body.username, body.email, body.password, body.image
            )
            val newUser = service.addUser(
                draftUser
            )

            tokenController.addToken(ctx, newUser)
            ctx.json(UserDTO(newUser))
        } catch (e: Exception) {
            throw ConflictResponse("Wrong email or password")
        }
    }

    fun getUser(ctx: Context) {
        val user = ctx.attribute<UserDTO>("user")!!
        ctx.json(user)
    }

    fun editUser(ctx: Context) {
        val body = ctx
            .bodyValidator(EditUserBody::class.java)
            .check({ it.email.isNotBlank() }, "Email cannot be empty")
            .check({ isAnEmail(it.email) }, "Email is wrong")
            .check({ it.password.isNotBlank() }, "Password cannot be empty")
            .check({ it.image.isNotBlank() }, "Image cannot be empty")
            .check({ isAnURL(it.image) }, "Image is wrong")
            .getOrThrow {
                throw BadRequestResponse("Not valid body")
            }

        val user = ctx.attribute<UserDTO>("user")!!
        val draftEditUser = DraftEditUser(
            body.email, body.password, body.image
        )

        val editedUser = service.editUser(
            user.id, draftEditUser
        )
        ctx.json(UserDTO(editedUser))
    }

    fun getTimeline(ctx: Context) {
        val user = ctx.attribute<UserDTO>("user")!!
        val posts = service.getTimeline(user.id)

        ctx.json(convertPostsToSimplePostsDTO(posts))
    }

    fun getUserById(ctx: Context) {
        val userId = ctx.pathParam("id")
        try {
            val user = service.getUser(userId)
            ctx.json(UserDTO(user))
        } catch (e: Exception) {
            throw NotFoundResponse("UserID doesn't exist")
        }
    }

    fun addOrRemoveFromFollowingTheUserId(ctx: Context) {
        val userIdToFollowOrUnfollow = ctx.pathParam("id")
        val user = ctx.attribute<UserDTO>("user")!!

        if (user.id == userIdToFollowOrUnfollow) {
            throw BadRequestResponse("You can't add yourself")
        }

        try {
            service.getUser(userIdToFollowOrUnfollow)
        } catch (e: Exception) {
            throw NotFoundResponse("Id doesn't exist")
        }

        val userUpdated = service.updateFollow(user.id, userIdToFollowOrUnfollow)

        ctx.json(UserDTO(userUpdated))
    }

    fun recommendedAccounts(ctx: Context) {
        val user = ctx.attribute<UserDTO>("user")!!

        val users = service.getRecommendAccounts(user.id)
        ctx.json(convertUsersToSimpleUsersDTO(users))
    }

}
