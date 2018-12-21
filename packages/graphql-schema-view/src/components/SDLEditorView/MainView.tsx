import * as React from 'react';
import Spinner from '../Spinner';
import {
	SchemaExplorerContainer,
	SDLColumn,
	ErrorContainer
} from '../SDLExplorerView/SDLStyles';
import SDLHeader from './SDLHeader';
import SDLEditor from './SDLEditor';
export interface IProps {
	schema: any;
	width?: string;
}

class SDLEditorView extends React.Component<IProps> {
	constructor(props: IProps) {
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
			emptySchema = <ErrorContainer>{'No Schema Available'}</ErrorContainer>;
		}
		// let types
		// if (schema instanceof GraphQLSchema) {
		// 	types = sdlArray(schema)
		// }
		return (
			<SchemaExplorerContainer>
				{emptySchema ? (
					<SDLColumn>{emptySchema}</SDLColumn>
				) : (
					<SDLColumn width={this.props.width}>
						<SDLHeader schema={schema} fixed={false} />
						<SDLEditor schema={schema} width={this.props.width} />
					</SDLColumn>
				)}
			</SchemaExplorerContainer>
		);
	}
}

export default SDLEditorView;
