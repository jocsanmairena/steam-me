/* We declare User entity with the fields UserId, Email, Password and Streams using ES7 decorator syntax */
/* prop allows us to create properties on our entity model. */
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

/*
DOCUMENTATION:
-------------

https://typegraphql.com/docs/types-and-fields.html
The main idea of TypeGraphQL is to automatically create GraphQL schema definitions from TypeScript classes. To avoid the need for schema definition files and interfaces describing the schema, we use decorators and a bit of reflection magic.

SUMMARY: With TypeGraphQl @ObjectType and @Field decorators, we are allowing the graphql schema to collect metadata and incorporate that metadata with the typescript reflection system.


@ObjectType decorator marks the class as the type known from the GraphQL SDL or GraphQLObjectType from graphql-js:

@Field decorator mark which class properties should be mapped to the GraphQL fields and collect metadata from the TypeScript reflection system.


 */
