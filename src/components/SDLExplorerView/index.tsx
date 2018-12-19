import * as React from 'react';
import Spinner from '../Spinner';
import SDLFieldDoc from './SDLFieldDoc';
import { sdlArray } from '../../utils/createSDL';
import { GraphQLSchema } from 'graphql';
import { styled } from '../../styled';
import {
	SchemaExplorerContainer,
	ErrorContainer,
	SDLColumn
} from './SDLStyles';
import SDLHeader from '../SDLEditorView/SDLHeader';

export interface EProps {
	schema: any;
	width?: string;
}

class SDLExplorerView extends React.Component<EProps> {
	constructor(props: EProps) {
		super(props);
		(window as any).d = this;
	}

	render() {
		const { schema, width } = this.props;
		let emptySchema;
		if (schema === undefined) {
			// Schema is undefined when it is being loaded via introspection.
			emptySchema = <Spinner />;
		} else if (schema === null) {
			// Schema is null when it explicitly does not exist, typically due to
			// an error during introspection.
			emptySchema = <ErrorContainer>{'No Schema Available'}</ErrorContainer>;
		}
		let types;
		if (schema instanceof GraphQLSchema) {
			types = sdlArray(schema);
		}
		return (
			<SchemaExplorerContainer>
				<SDLColumn width={width} verticalScroll={true}>
					<SDLHeader schema={schema} fixed />
					{emptySchema && emptySchema}
					{!emptySchema &&
						schema &&
						types &&
						types.map(t => (
							<SDLFieldDoc schema={schema} type={t} key={t.name} />
						))}
				</SDLColumn>
			</SchemaExplorerContainer>
		);
	}
}

export default SDLExplorerView;
