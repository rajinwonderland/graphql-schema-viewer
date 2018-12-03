import { styled } from "../styled";

export const DocType = styled.div`
  padding: 20px 16px 0 16px;
  overflow: auto;
  font-size: 14px;
  .field-name {
    color: ${p => `${p.theme.colours.blue}`};
  }
  .type-name {
    color: rgb(245, 160, 0);
  }
`;
