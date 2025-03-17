//import emotion from '@emotion/react'
import styled from '@emotion/styled'

const colors = {
  default: 'black',
  danger: 'red',
  outline: 'blue',
}

const sizeStyle = {
  sm: {
    fontSize: '12px',
    padding: '3px 12px',
  },
  md: {
    fontSize: '14px',
    padding: '5px 16px',
  },
  lg: {
    fontSize: '16px',
    padding: '9px 20px',
  },
}

interface EmotionProps{
  className?:string;
  variant:'default'|'danger'|'outline'
  size:'sm'|'md'|'lg'
  children:string
}

function EmotionBtn({ className, variant, size='md', children }:EmotionProps) {
  const Button = styled.button`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    color: ${colors[variant]};
    ${sizeStyle[size]}
    font-weight: bold;
    &:hover {
      color: white;
    }
  `
  return (
    <Button className={className}>
      {children}
    </Button>
  )
}

export default EmotionBtn