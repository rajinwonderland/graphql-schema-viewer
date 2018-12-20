import * as React from 'react';
import { GraphQLSchema } from 'graphql';
import EditorWrapper from './EditorWrapper';
import { styled } from '../../styled';
import { getSDL } from '../../utils/createSDL';

export interface SDLEditorProps {
	disableComments?: boolean;
	schema?: GraphQLSchema | null;
	getRef?: (ref: SDLEditor) => void;
	width?: any;
}

export interface SDLEditorState {
	loading: boolean;
	disableComments: boolean;
	overflowY: boolean;
}

class SDLEditor extends React.PureComponent<SDLEditorProps, SDLEditorState> {
	public static defaultProps = {
		disableComments: true
	};
	cachedValue: any;
	private editor: any;
	private mirror: any;

	constructor(props: SDLEditorProps) {
		super(props);
		this.state = {
			loading: true,
			disableComments: props.disableComments || true,
			overflowY: true
		};
		// Keep a cached version of the value, this cache will be updated when the
		// editor is updated, which can later be used to protect the editor from
		// unnecessary updates during the update lifecycle.
		this.cachedValue = props.schema;
		if (this.props.getRef) {
			this.props.getRef(this);
		}
	}

	componentDidMount() {
		// Lazily require to ensure requiring GraphiQL outside of a Browser context
		// does not produce an error.
		const value = this.parseSchema();
		const CodeMirror = require('codemirror');
		require('codemirror/addon/fold/brace-fold');
		require('codemirror/addon/comment/comment');
		require('codemirror-graphql/mode');

		const gutters: any[] = [];
		gutters.push('CodeMirror-linenumbers');

		this.editor = CodeMirror(this.mirror, {
			autofocus: false,
			value,
			lineNumbers: false,
			showCursorWhenSelecting: false,
			tabSize: 1,
			mode: 'graphql',
			theme: 'graphiql',
			lineWrapping: true,
			readOnly: true,
			gutters
		});
		(global as any).editor = this.editor;

		this.editor.on('scroll', this.handleScroll);
		this.editor.refresh();
	}

	componentDidUpdate(prevProps: SDLEditorProps) {
		const CodeMirror = require('codemirror');

		if (this.props.schema !== prevProps.schema) {
			this.setState(
				{
					loading: true
				},
				() => {
					const schema = this.parseSchema();
					this.cachedValue = schema;
					this.editor.setValue(schema);
				}
			);
			CodeMirror.signal(this.editor, 'change', this.editor);
		}

		if (this.props.disableComments !== prevProps.disableComments) {
			this.setState(
				{
					loading: true
				},
				() => {
					const schema = this.parseSchema();
					this.cachedValue = schema;
					this.editor.refresh();
				}
			);
		}
	}

	componentWillUnmount() {
		this.editor.off('scroll');
		this.editor = null;
	}

	parseSchema = () => {
		const schema = getSDL(this.props.schema, this.state.disableComments);
		this.cachedValue = schema;
		this.setState({
			loading: false
		});
		return schema;
	};

	handleScroll = (e: any) => {
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

	setRef = (ref: any) => {
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
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 1px;
	box-shadow: 0px 1px 3px rgba(17, 17, 17, 0.1);
	z-index: 1000;
`;
