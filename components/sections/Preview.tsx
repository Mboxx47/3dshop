'use client'

import React, {useEffect, useRef} from 'react'

import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject,GLTFLoader, OBJLoader } from 'three/examples/jsm/Addons.js';
import gsap  from 'gsap';

import { ProductType } from './Catalogue';




interface PreviewProps{
  selectedProduct: ProductType;
}

const Preview = ({selectedProduct}:PreviewProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const isMouseDown = useRef<boolean>(false);
  
  
  useEffect(() => {
    

    const labelRenderer = new CSS2DRenderer();
    
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    
  
    labelRenderer.domElement.style.pointerEvents = 'none';
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
  

    const mount = mountRef.current;
    if (typeof document !== 'undefined') {
      // code referencing document here
      const wrapper = document.createElement('wrapper');
      const sideWrapper = document.createElement('wrapper');
      
      // UI
      const blueDiv = document.createElement('div');
      blueDiv.innerHTML ='More Details';
      blueDiv.className = 'color-picker';
      blueDiv.id = 'blue';
      
      const scene = new THREE.Scene();
      const backButton = document.createElement('div');
      backButton.innerHTML ='Close';
      backButton.className = 'color-picker';
      backButton.id = 'black'
      
      
  
  const dataPanel = document.createElement('div');
  dataPanel.className="panel";
 
  const dataPanelText = document.createElement('div');
  dataPanelText.className="dataText";
 
    
    wrapper.className = 'wrapper';
    sideWrapper.className = 'wrapper';
    sideWrapper.append(dataPanel);
    
    wrapper.appendChild(blueDiv);
    const wrapperObject = new CSS2DObject(wrapper);
    const sideWrapperObject = new CSS2DObject(sideWrapper);
    wrapperObject.position.set(0, -2, 0);
    wrapperObject.position.x = 3;
    
    scene.add(wrapperObject);
    sideWrapperObject.position.set(-3,0.8,0);
    
    
    ;
    
    if (mount) {
      mount.appendChild(labelRenderer.domElement);
    }
    
    if(!mount || !selectedProduct) return;
    
    const loader = new GLTFLoader();
    const loader2 = new OBJLoader();
    
    const containerWidth = mount.clientWidth;
    const sceneWidth = containerWidth <= 1536 ? containerWidth: 1536;
    const sceneHeight = window.innerWidth <= window.innerHeight? window.innerWidth : window.innerHeight;
    
    //Animation
    let mixer: THREE.AnimationMixer ;
     let anim1: THREE.AnimationAction , anim2: THREE.AnimationAction, anim3: THREE.AnimationAction, anim4: THREE.AnimationAction;

     
     
     scene.rotation.x = THREE.MathUtils.degToRad(60)
     
     const renderer = new THREE.WebGLRenderer({antialias: true});
     renderer.setSize(sceneWidth,sceneHeight);
     renderer.setPixelRatio(window.devicePixelRatio);
     renderer.setClearColor(0x000000,0)
     
     
     mount.appendChild(renderer.domElement);
     
     const camera = new THREE.PerspectiveCamera(75, sceneWidth/sceneHeight, 0.1, 10000)
     
     //Lighting
     const ambientLight = new THREE.AmbientLight(0xffffff,1.5)
     scene.add(ambientLight);
     
     const directionalLightTop = new THREE.DirectionalLight(0xffffff,1)
     directionalLightTop.position.set(0,1, -1);
     scene.add(directionalLightTop)
     
     const directionalLightBottom = new THREE.DirectionalLight(0xffffff,2)
     //directionalLightBottom.position.set(5,-10, 7.5);
     directionalLightBottom.rotation.set(45,45,45);
     scene.add(directionalLightBottom)
     
     const directionalLightLeft = new THREE.DirectionalLight(0xffffff,1)
     directionalLightBottom.rotation.set(-45,-45,-45);
    
     //directionalLightLeft.position.set(-10, 5, 0);
     scene.add(directionalLightLeft)
     
     const directionalLightRight = new THREE.DirectionalLight(0xffffff,1)
     directionalLightRight.position.set(10, 5, 0);
    // scene.add(directionalLightRight)
     
     loader2.load("/assets/textured.obj",(obj) =>
      {
        const model = obj;
        model.scale.set(10,10,10);
        
        //scene.add(model)
        
        
      }
    );
    const loadModel = (product: ProductType) =>
      {
        loader.load(product.modelSrc, (gltf) =>
          {
            if(modelRef.current)
              {
                scene.remove(modelRef.current)
              }
              const model = gltf.scene;
              model.scale.set(product.modelScale.x, product.modelScale.y, product.modelScale.z);
              dataPanel.innerHTML = product.title;
              dataPanelText.innerHTML = product.modelDetails;
              
              model.position.set(0,0,-2)
              mixer = new THREE.AnimationMixer(model)
              if(mixer)
              {

                anim1 = mixer.clipAction(gltf.animations[0] );
                anim1.clampWhenFinished = true;
                //anim2 = mixer.clipAction(gltf.animations[1] );
               // anim3 = mixer.clipAction(gltf.animations[2] );
               // anim4 = mixer.clipAction(gltf.animations[3] );
              }
        scene.add(model)
        dataPanel.append(dataPanelText)
    dataPanel.append(backButton)
        modelRef.current = model;
      })  
    }
    
    loadModel(selectedProduct )
    camera.position.z =1;
    
    const gravity = 0.002;
    const bounceFactor = 0.3;
    const groundY =-2;
    let velocityY =0;
    let isBouncing = false;
    
    
    
    function animate()
    {
      requestAnimationFrame(animate)

      if(modelRef.current )
      {
        velocityY -= gravity;
        modelRef.current.position.y += velocityY;

        if(modelRef.current.position.y <= groundY)
          {
            modelRef.current.position.y = groundY;
          velocityY*= -bounceFactor;
          isBouncing =true
        }else{
          isBouncing = false;
        }

        if(Math.abs(velocityY) < 0.1 && isBouncing)
        {
          velocityY=0;
        }
      }
      labelRenderer.render(scene, camera);
      renderer.render(scene,camera);
      if(mixer) mixer.update(0.02);
    }

    animate();

    const raycaster = new THREE.Raycaster();
    
    const handleMouseMove = (event: MouseEvent) =>
    {
      if(modelRef.current)
        {
          
          if(isMouseDown.current)
         {

            const MouseX = (event.clientX/ window.innerWidth) *2 -1;
            const MouseY = (event.clientY/ window.innerHeight) *4 -1;
            modelRef.current.rotation.y = MouseX *Math.PI;  
            modelRef.current.rotation.x = MouseY *Math.PI;  
          }
      }
    }
    
     
      const handleMouseDown = (event: MouseEvent) =>
      {

        // const coords = new THREE.Vector2(
        //   (event.clientX/renderer.domElement.clientWidth)* 2-1, 
        //   ((event.clientY/window.innerHeight)* 2-1), 
        // );
        
        //   raycaster.setFromCamera(coords, camera);

        //   const intersections = raycaster.intersectObjects(scene.children, true)
        //   if(intersections.length>0)
        //   {
        //     isMouseDown.current = false;
        //     const selectedObject = intersections[0].object;
        //     const colour = new THREE.Color(Math.random(), Math.random(), Math.random())
        //     selectedObject.rotateY(90)
        //     return;
        
        //   }
          //else
        isMouseDown.current= true;
        
        
        
        
      }

      const handleIneractionEnd = () =>
      {
        isMouseDown.current =false;
        const animateRotationBack = () =>
        {
          if(modelRef.current)
            {
              const modelRotation = modelRef.current.rotation;
            if(Math.abs(modelRotation.y)> 0.01)
            {
              modelRef.current.rotation.y -=(modelRotation.y* 0.01);
             
              requestAnimationFrame(animateRotationBack);
            }
            else{
              modelRef.current.rotation.y =0;
              
              
            }
            if(Math.abs(modelRotation.x)> 0.01)
              {
                
                modelRef.current.rotation.x -=(modelRotation.x* 0.001);
                requestAnimationFrame(animateRotationBack);
              }
              else{
                modelRef.current.rotation.x =0;
                
  
              }
          }
        }

        animateRotationBack();
      }
      mount.addEventListener("mousedown", handleMouseDown);
      window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
      
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      blueDiv.addEventListener('click', function () {
        mixer.timeScale =1;
       anim1.play().setLoop(THREE.LoopOnce,10000);
       anim1.reset();
       gsap.to(camera.position,
        {
          x: 0,
          y: 0.5,
          duration:1
        }
       );
       gsap.to(camera.rotation,
        {
          y: 0.6,
          duration: 1
        }
       )
       if(modelRef.current)
       {
         gsap.to(modelRef.current.scale, 
          {
            x:8,
            y: 8,
            z:8,
            duration: 1
          }
        )

       
      }
       
     scene.add(sideWrapperObject);

    });

      backButton.addEventListener('click', function()
    {
      mixer.timeScale =-1;
      anim1.play().setLoop(THREE.LoopOnce,10000);
       anim1.reset();
      gsap.to(camera.position,
        {
          x: 0,
          y: 0,
          duration:1
        }
       );
       gsap.to(camera.rotation,
        {
          y: 0,
          duration: 1
        }
      );
       if(modelRef.current)
        {
          gsap.to(modelRef.current.scale, 
           {
             x:15,
             y: 15,
             z:15,
             duration: 1
            }
         )
       };
     scene.remove(sideWrapperObject);
    })
      mount.addEventListener("mouseup", handleIneractionEnd);
      mount.addEventListener("mouseleave", handleIneractionEnd);
      mount.addEventListener("mousemove", handleMouseMove);
      

      return () =>
    {
      if(mount)
        {
        mount.removeChild(renderer.domElement)
        
      }
      
      mount.removeChild(labelRenderer.domElement);
      mount.removeEventListener("mousemove", handleMouseMove);
      mount.removeEventListener("mousedown", handleMouseDown);
      mount.removeEventListener("mouseup", handleIneractionEnd);
      mount.removeEventListener("mouseleave", handleIneractionEnd);
     
    
    }
  }
  }, [selectedProduct])
  

  
  return (
  
    <div ref={mountRef} className='w-full h-[400px] md:h-[800px] pt-8 md:pt-0'/>
  )
}

export default Preview