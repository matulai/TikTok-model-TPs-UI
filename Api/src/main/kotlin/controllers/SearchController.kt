package controllers

import io.javalin.http.Context
import schema.SearchResultDTO
import service.TiktokSystem
import utils.convertPostsToSimplePostsDTO
import utils.convertUsersToSimpleUsersDTO

class SearchController(private val tiktokSystem: TiktokSystem) {
    fun searchUsersAndPosts(context: Context) {
        val query = context.queryParam("query") ?: ""

        val modelRes = tiktokSystem.search(query)

        val usersDTO = convertUsersToSimpleUsersDTO(modelRes.users.take(10))
        val postsDTO = convertPostsToSimplePostsDTO(modelRes.posts.take(10))

        context.json(SearchResultDTO(usersDTO, postsDTO))
    }

}
