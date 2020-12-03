const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type dir {
    dir: [folder]
}
type FILE {
   _id: ID
   name:String
   type: String
   content: String
}
scalar JSON
scalar Date
type folder {
   _id: ID
   name:String
   type: String
   content: [JSON]
}



type Comment {
    _id: ID
    comment: String
    date: Date
    userId: ID
}

type Project {
_id: ID!
title: String!
technology: String!
description: String!
url: String!
screenshot: String!
code: dir
date:Date
comments: [Comment]
rating: [String]

}
type Query {
projects:[Project]
project(_id: ID): Project


}

schema {
query: Query
}
`);
