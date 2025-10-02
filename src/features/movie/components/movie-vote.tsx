import React from 'react'

interface CircularProgressProps {
  value: number // valor da nota (0 a 100)
  size?: number // tamanho do círculo
  strokeWidth?: number // espessura do traço
  color?: string // cor da barra de progresso
  bgColor?: string // cor de fundo do círculo
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 98,
  strokeWidth = 8,
  color = '#FFD700',
  bgColor = '#555',
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        stroke={bgColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // começa do topo
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size * 0.2}
        fill={color}
        fontWeight="bold"
      >
        {value}%
      </text>
    </svg>
  )
}

export default CircularProgress
