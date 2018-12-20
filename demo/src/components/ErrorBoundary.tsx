/* tslint:disable */
import * as React from 'react';
import { styled, theme } from '../styled';
import Spinner from './Spinner';
import 'react-json-pretty/JSONPretty.monikai.styl';

export default class ErrorBoundary extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		console.error('CAUGHT', error);
		this.setState({
			error,
			errorInfo
		});
	}

	render() {
		const { error, errorInfo } = this.state;
		if (error) {
			const JSONPretty = React.lazy(() => import('react-json-pretty'));
			return (
				<ErrorContainer>
					<h1>ERROR</h1>
					<span>{error && error.toString()}</span>
					<br />
					<React.Suspense fallback={<Spinner />}>
						<JSONPretty json={JSON.stringify(errorInfo)} />
					</React.Suspense>
				</ErrorContainer>
			);
		}
		return this.props.children;
	}
}

const ErrorContainer = styled.div`
	color: ${theme.editorColours['text']};
	background: ${theme.editorColours['background']};
	padding: 24px;
	font-family: 'Open Sans', sans-serif;
	display: flex;
	flex-direction: column;
	flex: 1;
	width: 100vw;
	height: 100vh;
	flex-wrap: wrap;
	span,
	h1 {
		line-height: 1.5em;
		color: ${theme.colours.red};
	}
`;
