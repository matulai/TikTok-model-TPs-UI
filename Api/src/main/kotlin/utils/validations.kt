package utils


fun isAnEmail(email: String): Boolean {
    val emailRegex = Regex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\$")
    return emailRegex.matches(email)
}

fun isAnURL(url: String): Boolean {
    val urlRegex = Regex("^((http|https)://)?[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+([/?].*)?\$")
    return urlRegex.matches(url)
}
