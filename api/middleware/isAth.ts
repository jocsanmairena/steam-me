/* 
This custom middleware will make sure the curent session contains 
a logged user by checking the graphjql header for an authorization token.
*/
import { MiddlewareFn } from "type-graphql"
import { MyContext } from "../types/MyContext"
import jwt from "jsonwebtoken"

/* Read Json Web Tokens that are pass into the headers each time we make a request with this middleware function. */

/* Need a way to for our application to keep a secret about a token. */
/* This session secret  will allow us to compare the json tokens we have, with an existing secret that only exist within the context of our application. */

const APP_SECRET = process.env.SESSION_SECRET || "AJFDHJDHJFHAJEQ242423"

/* MiddlewareFn takes a generic context called MyContenxt.
And we set it to an asynchronous function with contest and next from express. */

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	/* examine autorization token and context in current header */
	const authorization = context.req.headers["authorization"]
	try {
		/* A token format is {"Autorization": "Bearer <TOKEN_STRING>"}
    Thus, we replace Bearer with and empy string and stored the TOKEN_STRING by itself in the token constant. */
		const token = authorization?.replace("Bearer ", "")
		/* Verify that APP_SECRET and TOKEN_STRING match and declare extracted user object. */
		const user = jwt.verify(token!, APP_SECRET) as any
		/* Pull out id from user into the current session */
		context.res.locals.userId = user.id
		return next()
	} catch (error) {
		throw new Error(error.message)
	}
}
