import * as React from "react";
import { styled } from "../styled";
import { GraphQLSchema } from "graphql";
import { downloadSchema } from "../utils/createSDL";

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

interface SDLHeaderProps {
  schema: GraphQLSchema;
  name: string;
}

interface State {
  open: boolean;
}

class SDLHeader extends React.Component<SDLHeaderProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  showOptions = () => {
    this.setState({
      open: !this.state.open
    });
  };

  printSDL = () => {
    return downloadSchema(this.props.schema, "sdl");
  };

  printIntrospection = () => {
    return downloadSchema(this.props.schema, "json");
  };

  render() {
    const { name } = this.props;
    const { open } = this.state;
    return (
      <SchemaHeader>
        <Title>{`${name} Schema`}</Title>
        <Box>
          <Download onClick={this.showOptions} open={open}>
            Download
          </Download>
          {open && (
            <React.Fragment>
              <Option alternate={true} onClick={this.printIntrospection}>
                JSON
              </Option>
              <Option alternate={false} onClick={this.printSDL}>
                SDL
              </Option>
            </React.Fragment>
          )}
        </Box>
      </SchemaHeader>
    );
  }
}

export { SDLHeader };
export const SchemaExplorerContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 8px;
  padding-top: 64px;
  background: white;
  font-family: ${p => p.theme.settings["editor.fontFamily"]};
  font-size: ${p => `${p.theme.settings["editor.fontSize"]}px`};
  outline: none !important;
`;

const SchemaHeader = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  height: 64px;
  right: 0;
  left: 0;
  align-items: center;
  justify-content: flex-start;
  z-index: 1000;
  background: ${p => p.theme.editorColours.navigationBar};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const Box = styled.div`
  position: absolute;
  top: 10px;
  right: 1em;
  width: 108px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Title = styled.div`
  flex: 1;
  color: ${p => p.color || styleHelper(p).title};
  cursor: default;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase !important;
  font-family: "Open Sans", sans-serif !important;
  letter-spacing: 1px;
  user-select: none;
  padding: 16px;
`;

const Download = styled(Button)`
  flex: 1;
  color: ${p => styleHelper(p).download["text"]};
  background: ${p => styleHelper(p).download["button"]};
  padding: 12px 9px 12px 9px;
  border-radius: 0px;
  &:hover {
    color: ${p => styleHelper(p).buttonTextHover};
    background-color: ${p => styleHelper(p).buttonHover};
  }
`;

const Option = styled(Download)`
  text-align: left;
  width: 100%;
  margin-left: 0px;
  border-radius: 0px;
  z-index: 2000;
  background: ${p => styleHelper(p).button};
`;

const columnWidth = "100%";

export interface SDLColumnProps {
  children: any;
  width?: number;
}

const SDLColumn = ({ children, width = columnWidth }: SDLColumnProps) => {
  return <Column style={{ width }}>{children}</Column>;
};

export { SDLColumn };

const Column = styled<SDLColumnProps, "div">("div")`
  display: flex;
  flex: 1;
  flex-flow: column;
  padding-bottom: 20px;
  border-right: 1px solid ${p => p.theme.colours.black10};
`;

const styleHelper = p => {
  if (p.theme.mode === "dark") {
    return {
      secBackground: "white",
      title: "white",
      download: {
        text: p.open ? p.theme.colours.white30 : "white",
        button: p.open ? "#2e5482" : p.theme.colours.blue
      },
      buttonText: "white",
      button: p.alternate ? "#386bac" : p.theme.colours.blue,
      buttonHover: "#2e5482",
      buttonTextHover: "white"
    };
  }
  return {
    secBackground: "white",
    download: {
      text: p.open ? "rgba(61, 88, 102, 0.5)" : "#3D5866",
      button: "#f6f6f6"
    },
    title: "rgba(0, 0, 0, 0.3)",
    buttonText: "#3d5866",
    button: p.alt ? "#EDEDED" : "#f6f6f6",
    buttonHover: "#f6f6f6",
    buttonTextHover: "rgba(61, 88, 102, 0.5)"
  };
};

export const CategoryTitle = ({ children }) => (
  <Title color="rgba(61, 88, 102, 0.5)">{children}</Title>
);

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
