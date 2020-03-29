/**
 * Custom exceptions
 * if the custom exceptions inherit from the base HttpException or standard exceptions that inherit from the base then Nest will recognize your exceptions, and automatically take care of the error responses
 * else the global exception filter, which handles exceptions, otherwise define your own filter that handle your custom exception
 */
