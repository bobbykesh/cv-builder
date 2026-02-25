import { css } from 'styled-components';
import { media } from './breakpoints';

export const container = css`
  width: 100%;
  padding: 0 30px;
  margin: 0 auto;

  ${media.md} {
    max-width: 750px;
    padding: 0 15px;
  }

  ${media.lg} {
    max-width: 970px;
  }

  ${media.xl} {
    max-width: 1170px;
  }
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const colView = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${media.md} {
    flex-direction: row;
  }
`;

export const headingFont = css`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: inherit;
`;

export const bodyFont = css`
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export const resetButton = css`
  border: 0;
  border-radius: 0;
  background: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

export const resetList = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const resetLink = css`
  color: inherit;
  text-decoration: none;
`;

export const truncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const sectionPadding = css`
  padding: 60px 0;

  ${media.md} {
    padding: 80px 0;
  }
`;
