import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Tip = (props: Props) => {
  return (
    <div className="tip">
      <div className="tip-content-title">{props.title}</div>
      <div className="tip-content">{props.children}</div>
    </div>
  );
};

export default Tip;
