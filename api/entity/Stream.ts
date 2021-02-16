/* Streams are consider embedded post. Meaning that they belong to a User. 
So, within the stream entity, we reference the User entity as author of Streams 
by using Ref type. */
import { prop as Property, getModelForClass } from "@typegoose/typegoose"
import { ObjectId } from "mongodb"
import { Field, ObjectType } from "type-graphql"
import { User } from "./User"
import { Ref } from "../types/Ref"

@ObjectType({ description: "Stream embedded post content" })
export class Stream {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  title: string

  @Field()
  @Property({ required: true })
  description: string

  @Field()
  @Property({ required: true })
  url: string

  /* The following field decorator returns a type of User */
  @Field(() => User)
  /* We reference a User */
  @Property({ ref: User, required: true })
  /* author reference a particular User */
  autor: Ref<User>
}

export const StreamModel = getModelForClass(Stream)

/* What is next:
With User and Stream entities defined we can go on to create a new ObjectID scalar for our schema.
This "scalar" is specific to MongoDB, because an ObjectId has a unique format, e.g. ObjectId("adaj130jfsdm10"). */
