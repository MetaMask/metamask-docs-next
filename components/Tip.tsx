import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Tip = (props: Props) => {
  return (
    <div className="border-l-4 p-5 pl-8 border-l-green-500">
      <div className="font-bold mb-4 text-lg">{props.title}</div>
      <div className="tip-content">{props.children}</div>
    </div>
  );
};

export default Tip;
