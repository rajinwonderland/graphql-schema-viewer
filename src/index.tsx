import * as React from "react";
import { render } from "react-dom";
import { styled, ThemeProvider, theme as styledTheme } from "./styled";
import SDLView from "./components/SDLView";
import { buildSchema, buildClientSchema } from "graphql";
import { createApolloFetch } from "apollo-fetch";
import { introspectionQuery } from "./utils/constants";
import "./index.css";
import config from "./config";

const uri = config.endpoint;
const fetcher = createApolloFetch({ uri });

export interface State {
  loading: boolean;
  schema?: any;
}

class App extends React.Component<State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      schema: null
    };
  }

  async componentDidMount() {
    const schema = await fetcher({ query: introspectionQuery })
      .then(res => res.data)
      .catch(err => console.error(err));

    if (schema) {
      if (typeof schema === "string") {
        this.setState({ schema: buildSchema(schema), loading: false });
        // if it's an object, it must be an introspection query
      } else {
        this.setState({
          schema: buildClientSchema(schema),
          loading: false
        });
      }
    }
  }

  render() {
    const { schema, loading } = this.state;
    // If no  endpoint passed tries to get one from url
    return (
      <Wrapper>
        <ThemeProvider theme={styledTheme}>
          {!loading && <SDLView schema={schema} />}
        </ThemeProvider>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

render(<App />, document.getElementById("root"));
