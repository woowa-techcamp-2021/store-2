import React, { FC, Children } from 'react';
import styled from 'lib/woowahan-components';

interface GridFormProps {
  titles: string[];
}

const FormContainer = styled.div`
  width: 100%;

  textarea {
    resize: none;
    height: 300px;
  }
  input,
  textarea {
    font-size: 14ox;
    padding: 6px 12px;
    border: 1px solid ${({ theme }) => theme?.colorLineLight};
    width: 240px;
  }

  ${({ theme }) => theme?.mobile} {
    input,
    textarea {
      width: 100%;
    }
    textarea {
      height: 120px;
    }
  }
  ${({ theme }) => theme?.tablet} {
    input,
    textarea {
      width: 100%;
      max-width: 220px;
    }
    textarea {
      height: 200px;
    }
  }
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme?.colorLineLight};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme?.colorLineLight};
  }
`;

const RowHead = styled.div`
  padding: 18px 24px;
  background-color: ${({ theme }) => theme?.colorFooter};
  width: 180px;
  align-self: stretch;
  font-size: 12px;
  font-weight: ${({ theme }) => theme?.weightBold};
  color: ${({ theme }) => theme?.colorSoftBlack};

  ${({ theme }) => theme?.mobile} {
    width: 110px;
    padding: 16px 18px;
  }
`;

const RowContent = styled.div`
  flex: 1;
  padding: 8px 16px;
`;

const GridForm: FC<GridFormProps> = ({ titles, children }) => {
  const reactElements = Children.toArray(children);
  return (
    <FormContainer>
      {titles.map((title, i) => {
        return (
          <FormRow key={title}>
            <RowHead>{title}</RowHead>
            <RowContent>{reactElements[i]}</RowContent>
          </FormRow>
        );
      })}
    </FormContainer>
  );
};

export default GridForm;
