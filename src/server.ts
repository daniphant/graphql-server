import express from 'express';
import {graphqlHTTP} from 'express-graphql';

import {GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt} from 'graphql';
import {authors, books} from './config/constants';
import {AuthorType, BookType} from './config/types';

const app = express();

const RootQueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'Root query',
	fields: () => ({
		book: {
			type: BookType,
			description: 'A single book',
			args: {
				id: {type: GraphQLInt},
			},
			resolve: (_, args) => books.find(b => b.id === args.id),
		},
		author: {
			type: AuthorType,
			description: 'A single author',
			args: {
				id: {type: GraphQLInt},
			},
			resolve: (_, args) => authors.find(a => a.id === args.id),
		},
		books: {
			type: new GraphQLList(BookType),
			description: 'List of books',
			resolve: () => books,
		},
		authors: {
			type: new GraphQLList(AuthorType),
			description: 'List of authors',
			resolve: () => authors,
		},
	}),
});

const schema = new GraphQLSchema({
	query: RootQueryType,
});

app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema,
}));

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
