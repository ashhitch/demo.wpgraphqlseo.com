import React, { FC } from 'react';

import { rhythm } from '../utils/typography';

interface BioProps {
  name?: string;
  avatar?: any;
  summary?: string;
  twitter?: string;
}
const Bio: FC<BioProps> = ({ twitter, name, avatar, summary }) => (
  <div
    style={{
      display: `flex`,
      marginBottom: rhythm(2.5),
    }}
  >
    {avatar && (
      <img
        src={avatar}
        alt={name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: 50,
          height: 50,

          borderRadius: `50%`,
        }}
      />
    )}
    <p>
      Written by <strong>{name}</strong> {summary}
      {` `}
      {twitter && (
        <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer">
          You should follow them on Twitter
        </a>
      )}
    </p>
  </div>
);

export default Bio;
