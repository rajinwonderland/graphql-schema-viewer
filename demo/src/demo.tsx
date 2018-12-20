import * as React from 'react';
import { styled, ThemeProvider, theme as styledTheme } from './styled';
import { SDLExplorerView, SDLEditorView } from './components';
import { buildSchema, buildClientSchema } from 'graphql';
import { createApolloFetch } from 'apollo-fetch';
import { introspectionQuery } from './utils/constants';
import './index.css';
import config from './config';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from './components/Spinner';

const uri = config.endpoint;
const fetcher = createApolloFetch({ uri });

export interface DemoState {
	loading: boolean;
	editor: boolean;
	schema?: any;
}

class Demo extends React.Component<{}, DemoState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			loading: true,
			editor: true,
			schema: null
		};
	}

	async componentDidMount() {
		const schema = await fetcher({
			query: introspectionQuery
		})
			.then((res: any) => res.data)
			.catch((err: any) => new Error(err.message));
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

	handleClick = () => {
		this.setState({
			editor: !this.state.editor
		});
	};

	render() {
		const { schema, editor, loading } = this.state;
		// If no  endpoint passed tries to get one from url
		return (
			<ErrorBoundary>
				<ThemeProvider theme={styledTheme}>
					<Wrapper>
						{!loading ? (
							<div style={{ width: '100%', height: '100%' }}>
								{editor ? (
									<SDLEditorView schema={schema} width="100%" />
								) : (
									<SDLExplorerView width="100%" schema={schema} />
								)}
								<FAB onClick={this.handleClick}>
									{editor ? 'Editor View' : 'Explorer View'}
								</FAB>
							</div>
						) : (
							<Spinner />
						)}
					</Wrapper>
				</ThemeProvider>
			</ErrorBoundary>
		);
	}
}

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
`;

const FAB = styled.button`
	position: fixed;
	bottom: 16px;
	right: 16px;
	left: auto;
	width: 64px;
	height: 64px;
	display: flex;
	z-index: 100000;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background: ${p => p.theme.colours.green};
	color: white;
`;

export default Demo;
