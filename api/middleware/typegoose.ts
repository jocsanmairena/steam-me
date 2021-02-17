/*
Summary: 
1. Middleware intercepts the "result" of a resolver's execution.
2. The result is converted from a MongoDB Document to an old plain JavasScript object.
Note: Without this middleware, our Ref types would not be able to reference other database objects.
*/

import { Model, Document } from "mongoose"
import { getClassForDocument } from "@typegoose/typegoose"
import { MiddlewareFn } from "type-graphql"

/* TYPEGRAPHQL DOCUMENTATION middlewares: https://typegraphql.com/docs/middlewares.html */
export const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
	/* Middleware also has the ability to intercept the result of a resolver's execution with next(). 
  It's not only able to e.g. create a log but also replace the result with a new value: */
	const result = await next()

	/* if result is a array */
	if (Array.isArray(result)) {
		/* If an item from the result array is a instance of Model, then convert document (MongoDB Document) into an old plain JavaScript Object, else just return the document (MongoDB Document). */
		/* https://mongoosejs.com/docs/models.html Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.*/
		return result.map((document) => (document instanceof Model ? convertDocument(document) : document))
	}

	/* If result is a single object and an instance of Model, but not an array proceed to convert result (MongoDB Document) into an old plain JavaScript Object */
	if (result instanceof Model) {
		return convertDocument(result)
	}

	return result
}

/* convertDocument: Converts MongoDB Documents into plain JavaScript objects. 
Takes an argument of doc of type Document.*/
function convertDocument(doc: Document) {
	const convertedDocument = doc.toObject()
	/* We force unwrap the object with the exclamation mark so that typescript does not consider it as a possibly undefined object and get the class for the document.  */
	const DocumentClass = getClassForDocument(doc)!
	/* Setting up baseline attributes for a new object, which return as a convertedDocument */
	Object.setPrototypeOf(convertedDocument, DocumentClass.prototype)
	return convertedDocument
}
