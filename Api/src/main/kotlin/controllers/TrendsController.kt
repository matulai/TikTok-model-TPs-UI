package controllers

import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import service.TiktokSystem
import utils.convertPostsToSimplePostsDTO

class TrendsController(private val service: TiktokSystem) {
    fun getTopTenTrends(context: Context) {
        context.json(service.getTopTrends())
    }

    fun getPostByTrend(context: Context) {
        val name = context.pathParam("name")
        val posts = service.getTrend(name).take(10)

        if (posts.isEmpty()) {
            throw NotFoundResponse("Trend name not exist")
        }

        context.json(convertPostsToSimplePostsDTO(posts))
    }

}
