import * as React from 'react';
import { styled, theme as styledTheme } from './styled';
import { SDLEditorView } from './components';
import { buildSchema, buildClientSchema } from 'graphql';
import swapi from './swapi.json';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from './components/Spinner';

export interface DemoState {
	loading: boolean;
	schema?: any;
}

class Demo extends React.Component<{}, DemoState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			loading: true,
			schema: swapi.data
		};
	}

	componentDidMount() {
		const { schema } = this.state;
		if (schema) {
			if (typeof schema === 'string') {
				return this.setState({ schema: buildSchema(schema), loading: false });
				// if it's an object, it must be an introspection query
			}
			return this.setState({
				schema: buildClientSchema(schema),
				loading: false
			});
		}
	}

	render() {
		const { schema } = this.state;

		// If no  endpoint passed tries to get one from url
		return (
			<Wrapper>
				<React.Suspense fallback={<Spinner />}>
					<SDLEditorView schema={schema} width="100%" theme={styledTheme} />
				</React.Suspense>
			</Wrapper>
		);
	}
}

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
`;
export default Demo;
