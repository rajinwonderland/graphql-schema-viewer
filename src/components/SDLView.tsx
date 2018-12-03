import * as React from "react";
import Spinner from "./Spinner";
import SDLFieldDoc from "./SDLFieldDoc";
import { sdlArray } from "../utils/createSDL";
import { GraphQLSchema } from "graphql";
import { styled } from "../styled";
import {
  SchemaExplorerContainer,
  CategoryTitle,
  SDLFieldDoc,
  ErrorContainer,
  SDLColumn
} from "./SDLStyles";

const columnWidth = "100%";

export interface Props {
  schema: any;
}

class SDLView extends React.Component<Props> {
  constructor(props) {
    super(props);
    (window as any).d = this;
  }

  render() {
    const { schema } = this.props;
    let emptySchema;
    if (schema === undefined) {
      // Schema is undefined when it is being loaded via introspection.
      emptySchema = <Spinner />;
    } else if (schema === null) {
      // Schema is null when it explicitly does not exist, typically due to
      // an error during introspection.
      emptySchema = <ErrorContainer>{"No Schema Available"}</ErrorContainer>;
    }
    let types;
    if (schema instanceof GraphQLSchema) {
      types = sdlArray(schema);
    }
    return (
      <SchemaExplorerContainer>
        <SDLColumn width={columnWidth}>
          <CategoryTitle>Schema</CategoryTitle>
          {emptySchema && <SDLColumn>{emptySchema}</SDLColumn>}
          {!emptySchema &&
            schema &&
            types &&
            types.map(type => (
              <SDLFieldDoc schema={schema} type={type} key={type.name} />
            ))}
        </SDLColumn>
      </SchemaExplorerContainer>
    );
  }
}

export default SDLView;
