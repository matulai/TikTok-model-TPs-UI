import bootstrap.Bootstrap
import controllers.PostController
import controllers.SearchController
import controllers.TokenController
import controllers.TrendsController
import controllers.UserController
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.get
import io.javalin.apibuilder.ApiBuilder.post
import io.javalin.apibuilder.ApiBuilder.path
import io.javalin.apibuilder.ApiBuilder.put
import io.javalin.security.RouteRole

internal enum class Roles : RouteRole {
    ANYONE,
    USER,
}


class Api {
    private val app: Javalin
    private val service = Bootstrap().getSystem()

    private val tokenController = TokenController(service)

    private val userController = UserController(service, tokenController)
    private val postController = PostController(service)
    private val searchController = SearchController(service)
    private val trendsController = TrendsController(service)

    init {
        app = Javalin.create { config ->
            config.http.defaultContentType = "application/json"
            config.bundledPlugins.enableCors { cors ->
                cors.addRule {
                    it.anyHost()
                    it.exposeHeader("Authorization")
                }
            }
            config.router.apiBuilder {
                path("/login") {
                    post(userController::login, Roles.ANYONE)
                }
                path("/register") {
                    post(userController::registerUser, Roles.ANYONE)
                }
                path("/user") {
                    get(userController::getUser, Roles.USER)
                    put(userController::editUser, Roles.USER)
                    path("/timeline") {
                        get(userController::getTimeline, Roles.USER)
                    }
                    path("/{id}") {
                        get(userController::getUserById, Roles.ANYONE)
                        path("/follow") {
                            put(
                                userController::addOrRemoveFromFollowingTheUserId,
                                Roles.USER
                            )
                        }
                    }
                }
                path("/recommendAccounts") {
                    get(userController::recommendedAccounts)
                }

                path("/post") {
                    post(postController::addPost, Roles.USER)
                    path("/{id}") {
                        get(postController::getPost, Roles.ANYONE)
                        put(postController::updatePost, Roles.USER)
                        path("/like") {
                            put(postController::addLike, Roles.USER)
                        }
                        path("/comment") {
                            post(postController::addComment, Roles.USER)
                        }
                    }
                }
                path("/latestPosts") {
                    get(postController::getLastTenPosts, Roles.ANYONE)
                }

                path("/search") {
                    get(searchController::searchUsersAndPosts, Roles.ANYONE)
                }
                path("/trends") {
                    get(trendsController::getTopTenTrends, Roles.ANYONE)
                    path("/{name}") {
                        get(trendsController::getPostByTrend, Roles.ANYONE)
                    }
                }
            }
        }

    }

    fun start(port: Int = 7070) {
        app.beforeMatched(tokenController::validate)
        app.start(port)
    }
}

fun main() {
    Api().start()
}