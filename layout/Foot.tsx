import { useEffect } from 'react';
import { getCompiledWebpack } from '../lib/getCodeBlockModules';

console.log(getCompiledWebpack);

const Foot = () => {
  const run = async () => {
//     const code = `
// // This function detects most providers injected at window.ethereum
// import detectEthereumProvider from '@metamask/detect-provider';

// const provider = await detectEthereumProvider();
// console.log('provider', provider);
//         `;
    // const code2 = await getCompiledWebpack(code, 'typescript');
    // console.log('code2', code2);
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <>
      <div className="left">&nbsp;</div>
      <div className="right">&nbsp;</div>
    </>
  );
};

export default Foot;
