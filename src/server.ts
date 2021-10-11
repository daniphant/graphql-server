import express from 'express';
import {graphqlHTTP} from 'express-graphql';

import {GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql';

const app = express();

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'HelloWorld',
		fields: () => ({
			message: {type: GraphQLString, resolve: () => 'Hello World'},
		}),
	}),
});

app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema,
}));

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
