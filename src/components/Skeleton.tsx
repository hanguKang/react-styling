/** @jsxImportSource @emotion/react */
import React, {useMemo} from 'react'
import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react';


interface GlobalProps{
    className?:string;
    children?:string
}

interface SkeletonProps{
    width?:number;
    height?:number;
    circle?:boolean;
    rounded?:boolean;
    count?:number;
    unit?:string; //px, em, rem, %
    animation?:boolean;
    bgcolor?:string;
    style?:React.CSSProperties
    className?:string
}
//import { keyframes, css } from '@emotion/react';
const pulseKeyframe = keyframes`
    0%{opacity:1;}
    50%{opacity:0.4;}
    100%{opacity:1;}
`;
//import { keyframes, css } from '@emotion/react';
const pulseAnimation = css`
    pulsAnimation:${pulseKeyframe} 1.5s ease-in-out infinite;
`;

const Base = styled.div<Props>`
    ${( {bgcolor} ) => bgcolor && `background: ${bgcolor}`};
    ${( {rounded} ) => rounded && `border-raidus: 8px`};
    ${( {circle} ) => circle && `border-raidus: 50%`};
    ${( {width, height} ) => (width || height) && `display:block`};
    ${( {animation} ) => animation && pulseAnimation};
    width: ${({width,unit}) => width && unit && `${width}${unit}`}
    height: ${({height,unit}) => height && unit && `${height}${unit}`}
`;

const Content = styled.span`
    opacity:0;
`

const P = ({className, children} :GlobalProps) => (
    <p
      css={{/* 최상단 주석처리한 구문에 의해서 실행 */
        margin: 0,
        fontSize: 16,
        lineHeight: '1.5',
        fontFamily: 'Sans-Serif',
        color: 'black'
      }}
      className={className} // <- props contains the `className` prop
    >{children}
    </p>
  )
  
  const ArticleText = ({className, children} :GlobalProps) => (
    <P
      css={{
        fontSize: 32,
        fontFamily: 'Georgia, serif',
        color: 'red'
      }}
      className={className} // <- props contains the `className` prop
    >
        {children}
    </P>
  )
export default function Skeleton ({
    style,
    rounded,
    circle,
    width,
    height,
    animation=true,
    unit='px',
    bgcolor='#f4f4f4',
    count,
    className,
}:SkeletonProps){
    const content = useMemo(
        ()=>[...Array({length:count})].map(()=> "-").join(""),
    [count])
    return( 
        <>
            <ArticleText className='text-2xl text-center'>
                기사 전문이다. 
            </ArticleText>
            <Base
                style={style}
                rounded={rounded}
                circle ={circle}
                width ={width}
                height ={height}
                animation={animation}
                unit={unit}
                bgcolor={bgcolor}
                count ={count}
                className ={className}
            >
            </Base>
            <Content>{content}</Content>
        </>

    )
}