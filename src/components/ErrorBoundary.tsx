/* tslint:disable */
import * as React from 'react';
import { styled } from '../styled';
import Spinner from './Spinner';
import 'react-json-pretty/JSONPretty.monikai.styl';
import * as JSONPretty from 'react-json-pretty';
export default class ErrorBoundary extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			error: null,
			errorInfo: null
		};
	}
	componentDidCatch(error: any, errorInfo: any) {
		this.setState({
			error,
			errorInfo
		});
	}

	render() {
		if (this.state.error) {
			return (
				<ErrorContainer>
					<h1>Error</h1>
					<span>{this.state.error.toString()}</span>
					<br />
					<React.Suspense fallback={<Spinner />}>
						<JSONPretty json={this.state.errorInfo} />
					</React.Suspense>
				</ErrorContainer>
			);
		}
		return this.props.children;
	}
}

const ErrorContainer = styled.div`
	background: #0f202d;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	flex: 1;
	width: 100vw;
	height: 100vh;
	padding: 24px;
	font-family: 'Source Code Pro', monospace;
	h1,
	span {
		line-height: 2em;
		font-family: 'Open Sans', sans-serif;
		color: #f25c54;
	}
`;
