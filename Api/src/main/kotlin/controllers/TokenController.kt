package controllers

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTCreator
import com.auth0.jwt.algorithms.Algorithm
import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import model.User
import schema.UserDTO
import service.TiktokSystem

const val AUTHORIZATION_HEADER = "Authorization"

class UserGenerator : JWTGenerator<User> {
    override fun generate(user: User, alg: Algorithm?): String {
        val token: JWTCreator.Builder = JWT
            .create()
            .withClaim("id", user.id)
        return token.sign(alg)
    }
}

class TokenController(private val service: TiktokSystem) {
    private val algorithm = Algorithm.HMAC256("very_secret")
    private val verifier = JWT
        .require(algorithm)
        .build()
    private val generator = UserGenerator()
    private val provider = JWTProvider(algorithm, generator, verifier)


    fun addToken(ctx: Context, user: User) {
        val token = provider.generateToken(user)
        ctx.header(AUTHORIZATION_HEADER, token)
    }

    private fun tokenToUser(header: String): User {
        val validateToken = provider.validateToken(header)
        if (!validateToken.isPresent) {
            throw UnauthorizedResponse("Token not valid")
        }
        val userId = validateToken
            .get()
            .getClaim("id")
            .asString()

        try {
            return service.getUser(userId)
        } catch (e: Exception) {
            throw UnauthorizedResponse("Token not valid")
        }
    }

    fun validate(ctx: Context) {
        val header = ctx.header(
            AUTHORIZATION_HEADER
        )
        when {
            ctx
                .routeRoles()
                .contains(Roles.ANYONE) -> return

            header == null -> {
                throw UnauthorizedResponse("Invalid token")
            }

            else -> {
                val user = tokenToUser(header)
                ctx.attribute("user", UserDTO(user))
                return
            }
        }
    }
}