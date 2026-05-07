'use client'

import { useMemo, useRef } from 'react'
import { Points, PointMaterial } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AnimatedStars() {
  const ref = useRef<THREE.Points>(null!)
  const materialRef = useRef<THREE.PointsMaterial>(null!)

  const positions = useMemo(() => {
    const STAR_COUNT = 2000
    const positions = new Float32Array(STAR_COUNT * 3)

    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 400
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400
    }

    return positions
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.01
      ref.current.rotation.y += delta * 0.02
      ref.current.rotation.z += delta * 0.008
    }

    if (materialRef.current) {
      const time = state.clock.getElapsedTime()
      materialRef.current.size = 0.35 + Math.sin(time * 0.6) * 0.08 + Math.sin(time * 1.2) * 0.03
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        ref={materialRef}
        transparent
        color="#ffffff"
        size={0.4}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function Stars() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 75 }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <AnimatedStars />
    </Canvas>
  )
}
