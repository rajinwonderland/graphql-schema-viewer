import * as React from 'react';
import { styled } from '../styled';

interface EBState {
	hasError: boolean;
	message: string;
	info?: any;
}
export default class ErrorBoundary extends React.Component<any, EBState> {
	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, message: error.message };
	}
	constructor(props: any) {
		super(props);
		this.state = {
			hasError: false,
			message: '',
			info: null
		};
	}

	componentDidCatch(error: Error, info: any) {
		// tslint:disable-next-line
		console.error(error, info);
		this.setState({
			hasError: true,
			message: error.message,
			info
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<ErrorContainer>
					<h1>Nani!?!</h1>
					<p>Something just broke</p>
					{JSON.stringify(this.state.message)}
				</ErrorContainer>
			);
		}
		return this.props.children;
	}
}

const ErrorContainer = styled.div`
	color: ${p => p.theme.colours.red};
	background: ${p => p.theme.editorColours.background};
	font-family: ${p => p.theme.settings['editor.fontFamily']};
	font-size: ${p => p.theme.settings['editor.fontSize']};
	h1 & p {
		font-family: 'Open Sans', sans-serif;
	}
`;
