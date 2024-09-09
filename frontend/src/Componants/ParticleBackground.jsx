import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import particleConfig from '../config/ParticleConfig';


const ParticleBackground = () => {
  const particlesInit=useCallback(async engine=>{
    console.log(engine)

    await loadSlim(engine)
    
  },[])

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);
  return (
    
     <Particles id="tsparticles" options={particleConfig} init={particlesInit} loaded={particlesLoaded} />
   
  )
}

export default ParticleBackground