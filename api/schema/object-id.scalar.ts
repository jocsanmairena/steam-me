/* 
The GraphQLScalarType code handles parsing objects as "strings", and serializing them as hex strings.
In summary, ObjectID("adaj130jfsdm10") can be converted to text string: adaj130jfsdm10, and vice versa.
Graphql comes bundle with scalar types for string, int, Id, etc. But none with mongodb ObjectId format.
GraphQlScalarType: This graphql scalar type can define custom scalar types for us to work with.
*/
import { GraphQLScalarType, Kind, parseValue } from 'graphql'
import { ObjectId } from 'mongodb'


export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo Id scalar type",

  parseValue(value: string) {
    /* The parseValue function takes a value of a string and return a new ObjectId based on the value. */
    return new ObjectId(value) // client from input value
  },
  serialize(value: ObjectId) {
    /* The serialize function takes a value of ObjectId and return the value in to Hex String format.
    It will not return a string value such as "adaj130jfsdm10". Not as ObjectID("adaj130jfsdm10")  */
    return value.toHexString() // return value to client
  },
  parseLiteral(ast) {
    /*  Parses the literal ObjectId base on what kind of ast you pass in. */
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value) //value from client query
    }
    return null

  }



})
// export const ObjectIdScalar = new GraphQLScalarType({
//   name: "ObjectId",
//   description: "Mongo object id scalar type",
//   parseValue(value: string) {
//     return new ObjectId(value) // value from the client input variables
//   },
//   serialize(value: ObjectId) {
//     return value.toHexString() // value sent to the client
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.STRING) {
//       return new ObjectId(ast.value) // value from the client query
//     }
//     return null
//   },
// })
