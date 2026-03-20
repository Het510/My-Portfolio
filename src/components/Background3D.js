import React, { useEffect, useRef } from "react";
import "../styles/Background3D.css";
const Background3D = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId, mouseX = 0, mouseY = 0, time = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouseX = (e.clientX/window.innerWidth-0.5)*2; mouseY = (e.clientY/window.innerHeight-0.5)*2; });
    const project = (x,y,z,fov=500) => { const s=fov/(fov+z); return {x:canvas.width/2+x*s,y:canvas.height/2+y*s,scale:s}; };
    const rotX = (y,z,a) => ({y:y*Math.cos(a)-z*Math.sin(a),z:y*Math.sin(a)+z*Math.cos(a)});
    const rotY = (x,z,a) => ({x:x*Math.cos(a)+z*Math.sin(a),z:-x*Math.sin(a)+z*Math.cos(a)});
    const makeCube = (cx,cy,cz,size) => { const h=size/2; const verts=[[-h,-h,-h],[h,-h,-h],[h,h,-h],[-h,h,-h],[-h,-h,h],[h,-h,h],[h,h,h],[-h,h,h]].map(([x,y,z])=>({x:cx+x,y:cy+y,z:cz+z})); const edges=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]; return {verts,edges}; };
    const makeOcta = (cx,cy,cz,r) => { const verts=[{x:cx,y:cy-r,z:cz},{x:cx+r,y:cy,z:cz},{x:cx,y:cy+r,z:cz},{x:cx-r,y:cy,z:cz},{x:cx,y:cy,z:cz+r},{x:cx,y:cy,z:cz-r}]; const edges=[[0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4],[0,5],[1,5],[2,5],[3,5]]; return {verts,edges}; };
    const particles = Array.from({length:120},()=>({x:(Math.random()-0.5)*1200,y:(Math.random()-0.5)*900,z:(Math.random()-0.5)*800,r:Math.random()*1.5+0.5,speed:Math.random()*0.3+0.1}));
    const shapes = [{...makeCube(0,0,-200,120),color:"#00d4ff",rotSpeed:{x:0.004,y:0.007,z:0.002}},{...makeOcta(-300,-180,-100,80),color:"#7b2fff",rotSpeed:{x:0.006,y:0.004,z:0.003}},{...makeOcta(350,200,-150,60),color:"#ff2d78",rotSpeed:{x:0.003,y:0.008,z:0.005}},{...makeCube(-250,220,-300,80),color:"#00ffaa",rotSpeed:{x:0.005,y:0.003,z:0.006}},{...makeCube(280,-200,-250,90),color:"#7b2fff",rotSpeed:{x:0.007,y:0.005,z:0.004}}];
    const rots = shapes.map(()=>({x:0,y:0,z:0}));
    const draw = () => {
      time+=0.012; ctx.clearRect(0,0,canvas.width,canvas.height);
      const gRX=mouseY*0.08, gRY=mouseX*0.08;
      particles.forEach(p=>{ p.z+=p.speed; if(p.z>400)p.z=-400; let ry=rotX(p.y,p.z,gRX); let rx=rotY(p.x,ry.z,gRY); const proj=project(rx.x,ry.y,ry.z); if(proj.scale<=0)return; ctx.beginPath(); ctx.arc(proj.x,proj.y,p.r*proj.scale,0,Math.PI*2); ctx.fillStyle=`rgba(0,212,255,${Math.max(0,Math.min(0.6,proj.scale*0.7))})`; ctx.fill(); });
      shapes.forEach((shape,si)=>{ rots[si].x+=shape.rotSpeed.x; rots[si].y+=shape.rotSpeed.y; const t=shape.verts.map(v=>{ let rx=rotX(v.y,v.z,rots[si].x); let ry=rotY(v.x,rx.z,rots[si].y); let gx=rotX(rx.y,ry.z,gRX); let gy=rotY(ry.x,gx.z,gRY); return project(gy.x,gx.y,gx.z); }); shape.edges.forEach(([a,b])=>{ const va=t[a],vb=t[b]; if(va.scale<=0||vb.scale<=0)return; ctx.beginPath(); ctx.moveTo(va.x,va.y); ctx.lineTo(vb.x,vb.y); ctx.strokeStyle=shape.color; ctx.globalAlpha=Math.min(0.35,(va.scale+vb.scale)/2*0.4); ctx.lineWidth=1; ctx.stroke(); }); t.forEach(v=>{ if(v.scale<=0)return; ctx.beginPath(); ctx.arc(v.x,v.y,2*v.scale,0,Math.PI*2); ctx.fillStyle=shape.color; ctx.globalAlpha=Math.min(0.6,v.scale*0.5); ctx.fill(); }); });
      ctx.globalAlpha=1; animId=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{ cancelAnimationFrame(animId); window.removeEventListener("resize",resize); };
  },[]);
  return <canvas ref={canvasRef} className="bg3d-canvas" />;
};
export default Background3D;
