/* eslint-disable react-hooks/set-state-in-effect */

import { type DetailedHTMLProps, type FC, type HTMLAttributes, useEffect, useState } from 'react';
import { useNavigation } from 'react-router';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const TopProgressBar: FC<Props> = () => {
  const { state } = useNavigation();
  const [ progress, setProgress ] = useState( 0 );

  useEffect( () => {
    if ( state === 'loading' && progress === 0 ) {
      setProgress( 10 );
    } else if ( state === 'idle' && progress > 0 ) {
      setProgress( 100 );
    }
  }, [ state, progress ] );

  useEffect( () => {
    let interval: number | undefined;
    let timeout: number | undefined;

    if ( state === 'loading' ) {
      interval = setInterval( () => { setProgress( prev => prev >= 90 ? 90 : prev + Math.random() * 10 ); }, 300 );
    } else if ( state === 'idle' ) {
      timeout = setTimeout( () => { setProgress( 0 ); }, 300 );
    }

    return () => { clearInterval( interval ); clearTimeout( timeout ); };
  }, [ state, progress ] );

  if ( progress === 0 ) return null;

  return (
    <div style={{ width: `${progress}%` }} className="fixed top-0 left-0 h-1 bg-green-200 z-50 transition-all duration-300 ease-out" />
  );
};

export default TopProgressBar;