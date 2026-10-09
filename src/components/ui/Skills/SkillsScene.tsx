'use client'

import { OrbitControls, Sphere } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import type { ThreeElements } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

import { skillCategories } from './skills-data'
import type { Skill, SkillCategory } from '@/schemas/skill.schema'

interface SkillsSceneProps {
  selectedCategory: SkillCategory | null
  onSelect: (category: SkillCategory) => void
  reduceMotion: boolean
}

const focusedAmbientLightProps = { intensity: 0.55 } satisfies ThreeElements['ambientLight']
const overviewAmbientLightProps = { intensity: 0.4 } satisfies ThreeElements['ambientLight']
const focusedKeyLightProps = {
  position: [5, 5, 5],
  intensity: 70,
  color: '#ffffff',
} satisfies ThreeElements['pointLight']
const sunMaterialProps = {
  color: '#fbbf24',
  emissive: '#fbbf24',
  emissiveIntensity: 2.3,
  toneMapped: false,
} satisfies ThreeElements['meshStandardMaterial']
const sunGlowMaterialProps = {
  color: '#fbbf24',
  transparent: true,
  opacity: 0.14,
} satisfies ThreeElements['meshBasicMaterial']
const sunLightProps = {
  color: '#fbbf24',
  intensity: 100,
  distance: 60,
} satisfies ThreeElements['pointLight']
const orbitMaterialProps = {
  color: '#fbbf24',
  transparent: true,
  opacity: 0.16,
} satisfies ThreeElements['meshBasicMaterial']
const maximumCategoryOrbitBands = 4

function getSceneScale(canvasWidth: number) {
  if (canvasWidth < 480) return 0.58
  if (canvasWidth < 768) return 0.68
  return 0.78
}

function getFocusedCameraDistance(canvasWidth: number) {
  if (canvasWidth < 480) return 14
  if (canvasWidth < 768) return 12.5
  return 11
}

export function SkillsScene({
  selectedCategory,
  onSelect,
  reduceMotion,
}: Readonly<SkillsSceneProps>) {
  const canvasWidth = useThree((state) => state.size.width)
  const camera = useThree((state) => state.camera)
  const scale = getSceneScale(canvasWidth)
  const categoryCount = skillCategories.length
  const categoryOrbitBandCount = Math.min(categoryCount, maximumCategoryOrbitBands)

  useEffect(() => {
    const isFocused = selectedCategory !== null
    const cameraDistance = isFocused ? getFocusedCameraDistance(canvasWidth) : 20

    camera.position.set(0, isFocused ? 4 : 7, cameraDistance)
    camera.lookAt(0, 0, 0)
  }, [camera, canvasWidth, selectedCategory])

  if (selectedCategory) {
    const focusedFillLightProps = {
      position: [-5, -5, -5],
      intensity: 35,
      color: selectedCategory.color,
    } satisfies ThreeElements['pointLight']

    return (
      <>
        <ambientLight {...focusedAmbientLightProps} />
        <pointLight {...focusedKeyLightProps} />
        <pointLight {...focusedFillLightProps} />
        <FocusedPlanet
          category={selectedCategory}
          scale={scale * 1.9}
          reduceMotion={reduceMotion}
        />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate
          autoRotate={!reduceMotion}
          autoRotateSpeed={0.65}
        />
      </>
    )
  }

  return (
    <>
      <ambientLight {...overviewAmbientLightProps} />
      <Sun scale={scale} reduceMotion={reduceMotion} />
      {Array.from({ length: categoryOrbitBandCount }, (_, orbitBandIndex) => (
        <OrbitalRing key={orbitBandIndex} radius={3.1 + orbitBandIndex * 2.15} />
      ))}
      {skillCategories.map((category, categoryIndex) => {
        const orbitBandIndex = categoryIndex % maximumCategoryOrbitBands
        const orbitRadius = 3.1 + orbitBandIndex * 2.15

        return (
          <CategoryPlanet
            key={category.name}
            category={category}
            orbitRadius={orbitRadius}
            orbitSpeed={0.22 - orbitBandIndex * 0.025}
            initialAngle={(categoryIndex / categoryCount) * Math.PI * 2}
            onSelect={onSelect}
            scale={scale}
            reduceMotion={reduceMotion}
          />
        )
      })}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        autoRotate={!reduceMotion}
        autoRotateSpeed={0.35}
      />
    </>
  )
}

function Sun({ scale, reduceMotion }: Readonly<{ scale: number; reduceMotion: boolean }>) {
  const sunRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (reduceMotion) return

    const time = state.clock.getElapsedTime()
    if (sunRef.current) sunRef.current.rotation.y = time * 0.1
    if (glowRef.current) {
      const glowScale = 1.3 + Math.sin(time * 2) * 0.06
      glowRef.current.scale.setScalar(glowScale)
    }
  })

  return (
    <group>
      <Sphere ref={sunRef} args={[1.55 * scale, 32, 32]}>
        <meshStandardMaterial {...sunMaterialProps} />
      </Sphere>
      <Sphere ref={glowRef} args={[1.85 * scale, 32, 32]}>
        <meshBasicMaterial {...sunGlowMaterialProps} />
      </Sphere>
      <pointLight {...sunLightProps} />
    </group>
  )
}

function OrbitalRing({ radius }: Readonly<{ radius: number }>) {
  const orbitMeshProps = {
    rotation: [Math.PI / 2, 0, 0],
  } satisfies ThreeElements['mesh']
  const orbitGeometryProps = {
    args: [radius, 0.018, 12, 96],
  } satisfies ThreeElements['torusGeometry']

  return (
    <mesh {...orbitMeshProps}>
      <torusGeometry {...orbitGeometryProps} />
      <meshBasicMaterial {...orbitMaterialProps} />
    </mesh>
  )
}

interface SceneLabelProps {
  label: string
  color: string
  position: [number, number, number]
  height: number
}

function SceneLabel({ label, color, position, height }: Readonly<SceneLabelProps>) {
  const labelTexture = useMemo(() => {
    if (typeof document === 'undefined') return null

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return null

    const fontSize = 32
    const horizontalPadding = 24
    const colorMarkerSpace = 28
    context.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`
    canvas.width = Math.ceil(
      context.measureText(label).width + horizontalPadding * 2 + colorMarkerSpace,
    )
    canvas.height = 64

    context.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`
    context.textBaseline = 'middle'
    context.beginPath()
    context.roundRect(1, 1, canvas.width - 2, canvas.height - 2, 12)
    context.fillStyle = 'rgba(15, 23, 42, 0.92)'
    context.fill()
    context.strokeStyle = 'rgba(71, 85, 105, 0.75)'
    context.lineWidth = 2
    context.stroke()

    context.beginPath()
    context.arc(horizontalPadding, canvas.height / 2, 6, 0, Math.PI * 2)
    context.fillStyle = color
    context.fill()

    context.fillStyle = '#ffffff'
    context.fillText(label, horizontalPadding + colorMarkerSpace, canvas.height / 2)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    return texture
  }, [color, label])

  useEffect(() => () => labelTexture?.dispose(), [labelTexture])

  if (!labelTexture) return null

  const aspectRatio = labelTexture.image.width / labelTexture.image.height

  return (
    <sprite position={position} scale={[height * aspectRatio, height, 1]}>
      <spriteMaterial
        map={labelTexture}
        transparent
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </sprite>
  )
}

interface CategoryPlanetProps {
  category: SkillCategory
  orbitRadius: number
  orbitSpeed: number
  initialAngle: number
  onSelect: (category: SkillCategory) => void
  scale: number
  reduceMotion: boolean
}

function CategoryPlanet({
  category,
  orbitRadius,
  orbitSpeed,
  initialAngle,
  onSelect,
  scale,
  reduceMotion,
}: Readonly<CategoryPlanetProps>) {
  const groupRef = useRef<THREE.Group>(null)
  const planetRef = useRef<THREE.Mesh>(null)
  const angleRef = useRef(initialAngle)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    if (groupRef.current) {
      if (!reduceMotion) angleRef.current += delta * orbitSpeed
      const angle = angleRef.current
      const wobble = reduceMotion ? 0 : Math.sin(time * 0.5 + angle) * 0.07
      groupRef.current.position.set(
        Math.cos(angle) * orbitRadius,
        wobble,
        Math.sin(angle) * orbitRadius,
      )
    }

    if (planetRef.current && !reduceMotion) planetRef.current.rotation.y += 0.005
  })

  const planetSize = 1.25 * scale
  const planetGeometryProps = {
    args: [planetSize, 32, 32],
  } satisfies ThreeElements['sphereGeometry']
  const planetMaterialProps = {
    color: category.color,
    emissive: category.color,
    emissiveIntensity: hovered ? 1.25 : 0.55,
    metalness: 0.3,
    roughness: 0.65,
  } satisfies ThreeElements['meshStandardMaterial']

  return (
    <group ref={groupRef}>
      <mesh
        ref={planetRef}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = ''
        }}
        onClick={(event) => {
          event.stopPropagation()
          document.body.style.cursor = ''
          onSelect(category)
        }}
        scale={hovered ? 1.18 : 1}
      >
        <sphereGeometry {...planetGeometryProps} />
        <meshStandardMaterial {...planetMaterialProps} />
      </mesh>

      <SceneLabel
        label={category.name}
        color={category.color}
        position={[0, planetSize + 0.55, 0]}
        height={0.46}
      />

      {category.skills.map((skill, skillIndex) => (
        <SkillMoon
          key={skill.name}
          skill={skill}
          parentSize={planetSize}
          skillIndex={skillIndex}
          totalSkills={category.skills.length}
          scale={scale}
          reduceMotion={reduceMotion}
        />
      ))}
    </group>
  )
}

interface SkillMoonProps {
  skill: Skill
  parentSize: number
  skillIndex: number
  totalSkills: number
  scale: number
  reduceMotion: boolean
}

function SkillMoon({
  skill,
  parentSize,
  skillIndex,
  totalSkills,
  scale,
  reduceMotion,
}: Readonly<SkillMoonProps>) {
  const moonRef = useRef<THREE.Group>(null)
  const initialAngle = (skillIndex / totalSkills) * Math.PI * 2
  const orbitRadius = parentSize + 0.48 + (skillIndex % 3) * 0.08
  const color = skill.color
  const moonGeometryProps = {
    args: [0.24 * scale, 16, 16],
  } satisfies ThreeElements['sphereGeometry']
  const moonMaterialProps = {
    color,
    emissive: color,
    emissiveIntensity: skill.languages?.length ? 0.9 : 0.35,
    metalness: 0.35,
    roughness: 0.6,
  } satisfies ThreeElements['meshStandardMaterial']

  useFrame((state) => {
    if (!moonRef.current) return

    const time = reduceMotion ? 0 : state.clock.getElapsedTime()
    const angle = initialAngle + time * 1.05
    moonRef.current.position.set(
      Math.cos(angle) * orbitRadius,
      reduceMotion ? 0 : Math.sin(time * 0.8 + initialAngle) * 0.04,
      Math.sin(angle) * orbitRadius,
    )
  })

  return (
    <group ref={moonRef}>
      <mesh>
        <sphereGeometry {...moonGeometryProps} />
        <meshStandardMaterial {...moonMaterialProps} />
      </mesh>
    </group>
  )
}

function FocusedPlanet({
  category,
  scale,
  reduceMotion,
}: Readonly<{
  category: SkillCategory
  scale: number
  reduceMotion: boolean
}>) {
  const planetRef = useRef<THREE.Mesh>(null)
  const planetSize = 1.15 * scale
  const planetGeometryProps = {
    args: [planetSize, 48, 48],
  } satisfies ThreeElements['sphereGeometry']
  const planetMaterialProps = {
    color: category.color,
    emissive: category.color,
    emissiveIntensity: 0.8,
    metalness: 0.3,
    roughness: 0.6,
  } satisfies ThreeElements['meshStandardMaterial']

  useFrame(() => {
    if (planetRef.current && !reduceMotion) planetRef.current.rotation.y += 0.003
  })

  return (
    <group>
      <mesh ref={planetRef}>
        <sphereGeometry {...planetGeometryProps} />
        <meshStandardMaterial {...planetMaterialProps} />
      </mesh>

      {category.skills.map((skill, skillIndex) => {
        const orbitRadius = planetSize + 0.75 + skillIndex * 0.55
        const color = skill.color

        return (
          <group key={skill.name}>
            <OrbitalRing radius={orbitRadius} />
            <FocusedMoon
              label={skill.name}
              color={color}
              orbitRadius={orbitRadius}
              speed={0.9 - skillIndex * 0.1}
              initialAngle={(skillIndex / category.skills.length) * Math.PI * 2}
              size={0.24 * scale}
              reduceMotion={reduceMotion}
            />
          </group>
        )
      })}
    </group>
  )
}

interface FocusedMoonProps {
  label: string
  color: string
  orbitRadius: number
  speed: number
  initialAngle: number
  size: number
  reduceMotion: boolean
}

function FocusedMoon({
  label,
  color,
  orbitRadius,
  speed,
  initialAngle,
  size,
  reduceMotion,
}: Readonly<FocusedMoonProps>) {
  const moonRef = useRef<THREE.Group>(null)
  const moonGeometryProps = {
    args: [size, 16, 16],
  } satisfies ThreeElements['sphereGeometry']
  const moonMaterialProps = {
    color,
    emissive: color,
    emissiveIntensity: 1.1,
    metalness: 0.4,
    roughness: 0.5,
  } satisfies ThreeElements['meshStandardMaterial']
  const glowGeometryProps = {
    args: [size * 1.55, 16, 16],
  } satisfies ThreeElements['sphereGeometry']
  const glowMaterialProps = {
    color,
    transparent: true,
    opacity: 0.1,
  } satisfies ThreeElements['meshBasicMaterial']

  useFrame((state) => {
    if (!moonRef.current) return

    const time = reduceMotion ? 0 : state.clock.getElapsedTime()
    const angle = initialAngle + time * speed
    moonRef.current.position.set(
      Math.cos(angle) * orbitRadius,
      reduceMotion ? 0 : Math.sin(time * 0.8 + initialAngle) * 0.08,
      Math.sin(angle) * orbitRadius,
    )
  })

  return (
    <group ref={moonRef}>
      <mesh>
        <sphereGeometry {...moonGeometryProps} />
        <meshStandardMaterial {...moonMaterialProps} />
      </mesh>
      <mesh>
        <sphereGeometry {...glowGeometryProps} />
        <meshBasicMaterial {...glowMaterialProps} />
      </mesh>
      <SceneLabel label={label} color={color} position={[0, size + 0.32, 0]} height={0.38} />
    </group>
  )
}
