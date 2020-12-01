const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Dir {
    _id: ID!
    name:String!
    type: String!
    content: Dir
}


type Rating {
    _id: ID!
    type: String!
    enum: String!
}
type Comment {
    _id: ID!
    comment: String!
    date: String!
    userId: ID!
}

type Project {
_id: ID!
title: String!
technology: String!
description: String!
url: String!
screenshot: String!
code: [Dir]
iterate(_id: ID): Dir
date: String!
comments: [Comment]
rating: [Rating]

}
type Query {
projects:[Project]
project(_id: ID): Project


}

schema {
query: Query

}
`);
