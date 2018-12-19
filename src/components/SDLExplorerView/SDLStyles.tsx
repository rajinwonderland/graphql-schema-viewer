import * as React from 'react';
import { styled } from '../../styled';

const columnWidth = '100%';

export const Button = styled.button`
	text-transform: uppercase;
	font-weight: 600;
	color: ${p => p.theme.editorColours.buttonText};
	background: ${p => p.theme.editorColours.button};
	border-radius: 2px;
	flex: 0 0 auto;
	letter-spacing: 0.53px;
	font-size: 14px;
	margin-left: 6px;
	cursor: pointer;
	transition: 0.1s linear background-color;
	&:first-child {
		margin-left: 0;
	}
	&:hover {
		background-color: ${p => p.theme.editorColours.buttonHover};
	}
`;

const Title = styled.div`
	color: ${p => p.theme.colours.darkBlue};
	cursor: default;
	font-size: 14px;
	font-weight: 600;
	text-transform: uppercase !important;
	letter-spacing: 1px;
	padding: 16px;
	user-select: none;
`;
export const CategoryTitle = ({ children }) => <Title>{children}</Title>;

export const ErrorContainer = styled.div`
	font-weight: bold;
	left: 0;
	letter-spacing: 1px;
	opacity: 0.5;
	position: absolute;
	right: 0;
	text-align: center;
	text-transform: uppercase;
	top: 50%;
	transform: translate(0, -50%);
`;

export const SchemaExplorerContainer = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
	flex-direction: column;
	flex-wrap: wrap;
	background: ${p =>
		p.mode === 'dark' ? p.theme.editorColours.editorBackground : 'white'};
	font-family: ${p => p.theme.settings['editor.fontFamily']};
	font-size: ${p => `${p.theme.settings['editor.fontSize']}px`};
	outline: none !important;
`;

export interface SDLColumnProps {
	children: any;
	verticalScroll?: boolean;
	width?: any;
}

const SDLColumn = ({
	children,
	width = columnWidth,
	verticalScroll = false
}: SDLColumnProps) => {
	return (
		<Column style={{ width }} verticalScroll={verticalScroll}>
			{children}
		</Column>
	);
};

export { SDLColumn };

const Column = styled<SDLColumnProps, 'div'>('div')`
	display: flex;
	flex: ${p => (p.verticalScroll ? '1 1 auto' : '1 0 auto')};
	flex-flow: column;
	padding-bottom: 20px;
	margin-top: ${p => (p.verticalScroll ? '64px' : 0)};
  overflow: ${p => (p.verticalScroll ? 'scroll' : 'auto')}
	border-right: 1px solid ${p => p.theme.colours.black10};
`;
