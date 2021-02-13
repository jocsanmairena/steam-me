/* We declare and User entity with the fields UserId, Email Password and Streams using ES7 decorator syntax */
/* prop allows us to create properties on our model. */
/* getModelForClass allows us to convert the model to a class that mongoose can work with. */
import { prop as Property, getModelForClass } from '@typegoose/typegoose'
/* import the mongoDB ObjectId type, which identifies each entity as a unique object. */
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

/* We declare objects in our database using the @ObjectType decorator */
@ObjectType()
/* The class User defines all the properties that a user contains */
export class User {

  @Field()
  /* The read only _id field is assigned the ObjectId from mongoDB, which identifies each user as a unique object. */
  readonly _id: ObjectId

  @Field()
  /* We declare Property decorator on fields that are writable. */
  @Property({ required: true })
  email: string

  /* We declare Field decorator on fields that are readable. Thus, Password is not readible since Field decorator is not declare. */
  @Property({ required: true })
  password: string

}

/* converts the User class to a mongoDb model name UserModel. Thus, we can call mongo and mongoose methods on the UserModel. */
export const UserModel = getModelForClass(User)
