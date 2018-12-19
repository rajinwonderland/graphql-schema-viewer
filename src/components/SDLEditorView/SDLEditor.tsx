import * as React from 'react';
import { GraphQLSchema } from 'graphql';
import EditorWrapper from './EditorWrapper';
import { styled } from '../../styled';
import { getSDL } from '../../utils/createSDL';

export interface Props {
	schema?: GraphQLSchema | null;
	getRef?: (ref: SDLEditor) => void;
	width?: any;
	sessionId?: string;
}

class SDLEditor extends React.PureComponent<Props, { overflowY: boolean }> {
	cachedValue: string;
	private editor: any;
	private mirror: any;

	constructor(props) {
		super(props);
		this.state = {
			overflowY: false
		};
		// Keep a cached version of the value, this cache will be updated when the
		// editor is updated, which can later be used to protect the editor from
		// unnecessary updates during the update lifecycle.
		this.cachedValue = props.value || '';
		if (this.props.getRef) {
			this.props.getRef(this);
		}
	}

	componentDidMount() {
		// Lazily require to ensure requiring GraphiQL outside of a Browser context
		// does not produce an error.
		const CodeMirror = require('codemirror');
		require('codemirror/addon/fold/brace-fold');
		require('codemirror/addon/comment/comment');
		require('codemirror-graphql/mode');

		const gutters: any[] = [];
		gutters.push('CodeMirror-linenumbers');

		this.editor = CodeMirror(this.mirror, {
			autofocus: false,
			value: getSDL(this.props.schema, false) || '',
			lineNumbers: false,
			showCursorWhenSelecting: false,
			tabSize: 1,
			mode: 'graphql',
			theme: 'graphiql',
			readOnly: true,
			gutters
		});
		(global as any).editor = this.editor;

		this.editor.on('scroll', this.handleScroll);
		this.editor.refresh();
	}

	componentDidUpdate(prevProps: Props) {
		const CodeMirror = require('codemirror');
		if (this.props.schema !== prevProps.schema) {
			this.cachedValue = getSDL(this.props.schema, true) || '';
			this.editor.setValue(getSDL(this.props.schema, true));
			CodeMirror.signal(this.editor, 'change', this.editor);
		}

		// if (
		// 	this.props.settings['schema.disableComments'] !==
		// 	prevProps.settings['schema.disableComments']
		// ) {
		// 	this.editor.refresh();
		// }
	}

	componentWillUnmount() {
		this.editor.off('scroll');
		this.editor = null;
	}

	handleScroll = e => {
		if (e.doc.scrollTop > 0) {
			return this.setState({
				overflowY: true
			});
		}
		return this.setState({
			overflowY: false
		});
	};

	render() {
		const { overflowY } = this.state;
		return (
			<EditorWrapper>
				{overflowY && <OverflowShadow />}
				<Editor ref={this.setRef} />
			</EditorWrapper>
		);
	}

	setRef = ref => {
		this.mirror = ref;
	};

	getCodeMirror() {
		return this.editor;
	}
	getClientHeight() {
		return this.mirror && this.mirror.clientHeight;
	}
}

export default SDLEditor;

const Editor = styled.div`
	flex: 1;
	height: auto;
	overflow-x: hidden;
	overflow-y: scroll;
	.CodeMirror {
		background: ${p =>
			p.theme.mode === 'dark'
				? p.theme.editorColours.editorBackground
				: 'white'};
		padding-left: 20px;
	}
`;
const OverflowShadow = styled.div`
	position: fixed:
	top: 0;
	left: 0;
	right: 0;
	height: 1px;
	box-shadow: 0px 1px 3px rgba(17, 17, 17, 0.1);
	z-index: 1000;
`;
