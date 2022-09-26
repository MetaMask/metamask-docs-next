import React, { PropsWithChildren } from 'react';

interface Props {
  title: string;
}

const Warning = (props: PropsWithChildren<Props>) => {
  return (
    <div className="warning">
      <div className="warning-content-title">{props.title}</div>
      <div className="warning-content">{props.children}</div>
    </div>
  );
};

export default Warning;
