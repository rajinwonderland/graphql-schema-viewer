/* tslint:disable */
import * as React from 'react';
import styled from './styled';
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
					<p>{this.state.error.toString()}</p>
					<React.Suspense fallback={<Spinner />}>
						<JSONPretty json={JSON.stringify(this.state.errorInfo)} />
					</React.Suspense>
				</ErrorContainer>
			);
		}
		return this.props.children;
	}
}

const ErrorContainer = styled.div`
	color: white;
	background: #0f202d;
	font-family: 'Source Code Pro', monospace;
	h1,
	p {
		font-family: 'Open Sans', sans-serif;
		color: #f25c54;
	}
`;
