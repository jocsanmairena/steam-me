/* Ref allows us to reference one database object (User) to another (stream) in MongoDB */
import { ObjectId } from 'mongodb'

/* For almost every use case where you want to store a releationship between two documents,
in our use case, User and Stream, we use a manual reference.  */
/* A manual reference is where you save the ObjectId field of one document into another document as a reference ( Linking both documents by pointing to same ObjectId ) */
/* The manual reference define below, takes a generic object and gets assign to a generic object or the ObjectId itself. */
export type Ref<T> = T | ObjectId

/* Note: In some cases, you may want to create a more complex relational database reference to documents from multiple collections. For those cases, use a database reference. */
