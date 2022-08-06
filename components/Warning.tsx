import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Warning = (props: Props) => {
  return (
    <div className="warning">
      <div className="warning-content-title">{props.title}</div>
      <div className="warning-content">{props.children}</div>
    </div>
  );
};

export default Warning;
