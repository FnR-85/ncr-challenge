import { createRef, useEffect } from 'react';
import styled from 'styled-components';
import Icon from './icon';
import withLoader from './load-indicator';

const StyledBoxShadow = `
  box-shadow: 7px 7px 3px rgb(0 0 0 / 50%);
`;

const StyledBorder = `
  border: 1px solid #CCC;
`;

const StyledContainer = styled.div`
  ${StyledBoxShadow};
  ${StyledBorder};

  border-radius: 25px;
  padding: 30px;
  background-color: #fff;
  margin-top: 30px;

  &.small {
    width: 600px;
  }

  &.medium {
    width: 900px;
  }

  &.large {
    width: 1200px;
  }
`;

const StyledHeaderColor = `
  background-color: #DED;
  color: lightseagreen; /* Antes: #097890; */
`;

const StyledHeaderBorderRadius = `
  ${StyledBorder};
  border-radius: 10px;
`;

const StyledHeaderBoxShadow = `
  box-shadow: 5px 5px 3px rgb(0 0 0 / 50%);
`;

const StyledHeaderContainer = `
  ${StyledHeaderColor};
  ${StyledHeaderBorderRadius};
  ${StyledHeaderBoxShadow};
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const StyledHeader = styled.div`
  ${StyledHeaderContainer};
  position: relative;
  margin-bottom: 30px;
  height: 68px;
`;

const StyledTitle = styled.h2`
  ${StyledHeaderContainer};
  position: absolute;
  font-family: cursive;
  display: inline;

  &.full-width {
    width: calc(100% - 20px);
  }

  &.with-action-width {
    width: calc(100% - 75px);
  }
`;

const StyledAcctionsContainer = styled.div`
  ${StyledHeaderBorderRadius};
  ${StyledHeaderBoxShadow};
  position: absolute;
  margin-right: 10px;
  right: 0px;
  top: 5px;
  height: 50px;
  padding-left: 8px;
  padding-right: 8px;
`;

const StyledAcctionContainer = styled.div`
  ${StyledBorder};
  border-radius: 6px;
  margin-top: 8px;

  & > .separation {
    padding: 0px;
  }
`;

// prop.size: "small", "medium", "large"
function Panel(props) {
  const titleRef = createRef();

  useEffect(() => {
    if (props.actions) {
      titleRef.current.classList.remove('full-width');
      titleRef.current.classList.add('with-action-width');
    }
  });

  return (
    <StyledContainer className={'container panel-container ' + props.size}>
      <div className="row justify-content-center">
        <div>
          <StyledHeader>
            <StyledTitle ref={titleRef} className="full-width">
              {props.title}
            </StyledTitle>
            {props.actions ? (
              <StyledAcctionsContainer>
                {props.actions.map((item, index) => (
                  <StyledAcctionContainer
                    className="btn-secondary"
                    key={item.id}
                    data-toggle="tooltip"
                    title={item.tooltip}
                  >
                    <Icon
                      fontName={item.icon}
                      onClick={() => item.action()}
                      medium
                    ></Icon>
                  </StyledAcctionContainer>
                ))}
              </StyledAcctionsContainer>
            ) : (
              <></>
            )}
          </StyledHeader>
          {props.children}
        </div>
      </div>
    </StyledContainer>
  );
}

export default withLoader('model')(Panel);
