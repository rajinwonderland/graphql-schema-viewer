import * as React from 'react';
import {
	ThemeProvider,
	theme as styledTheme,
	ThemeInterface
} from '../../styled';
import MainView from './MainView';
import '../../index.css';
import ErrorBoundary from '../ErrorBoundary';

export interface IProps {
	width?: any;
	schema?: any;
	theme: ThemeInterface;
}

export default class SDLEditorView extends React.Component<IProps, {}> {
	static defaultProps = {
		theme: styledTheme,
		width: '100%'
	};
	render() {
		// If no  endpoint passed tries to get one from url
		return (
			<ErrorBoundary>
				<ThemeProvider theme={this.props.theme}>
					<MainView schema={this.props.schema} width={this.props.width} />
				</ThemeProvider>
			</ErrorBoundary>
		);
	}
}
