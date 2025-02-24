package schema

class RegisterBody(
    val username: String,
    val email: String,
    val password: String,
    val image: String
)

class EditUserBody(
    val email: String,
    val password: String,
    val image: String
)

class LoginBody(val username: String, val password: String)

class PostBody(val title: String, val description: String, val video: String)
class CommentBody(val text: String)