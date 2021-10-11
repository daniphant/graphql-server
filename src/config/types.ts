import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {authors, books} from './constants';

export const AuthorType: any = new GraphQLObjectType({
	name: 'Author',
	description: 'This represents an author who writes books',
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLInt)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		books: {type: new GraphQLList(BookType), resolve: author => books.filter(b => b.authorId === author.id)},
	}),
});

export const BookType: any = new GraphQLObjectType({
	name: 'Book',
	description: 'This represents a book written by an author',
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLInt)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		authorId: {type: new GraphQLNonNull(GraphQLInt)},
		author: {type: AuthorType, resolve: book => authors.find(a => a.id === book.authorId)},
	}),
});
