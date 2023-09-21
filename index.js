const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { GraphQLSchema } = require("graphql");

const { RootQuery, Mutation } = require("./GraphQL/userGraphQL");
const dbConnect = require("./Config/db");
dbConnect();

dotenv.config();

const app = express();

const events = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
      _id: ID!
      title: String !
      description : String !
      price : Float !
      date : String !
    }

    input EventInput {
      title: String !
      description : String !
      price : Float !
      date : String !
    }

    type RootQuery{
      events: [Event!]!
    }

    type RootMutation{
      createEvent(eventInput : EventInput): Event
    }

    schema{
      query: RootQuery
      mutation: RootMutation
    }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date,
        };
        // console.log(args);
        events.push(event);
        return event;
      },
    },
    graphiql: true,
  })
);
const { User } = require("./Routes/index");
app.use("/user", User.route);

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4500, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
