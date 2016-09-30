define(["oimo","v3d"],function(o,e){function n(){if(!p){x.step();for(var o,e,n=P.length;n--;)e=P[n],o=r[n],e.getSleep()||(o.position.copy(e.getPosition()),o.quaternion.copy(e.getQuaternion()),"sph1"==e.name&&(y.position.copy(e.getPosition()),h.position.y=y.position.y+20,h.position.z=y.position.z-50),"sbox"===o.material.name&&(o.material=u.mats.box),"ssph"===o.material.name&&(o.material=u.mats.sph))}}function i(e){f=new o.Performance(x);var n,i,s,a,r,c;n=0,s=-50,i=0,a=15,r=15,c=15;var p=[{size:[7.5,7.5,7.5],pos:[0,0,-100],move:"true",name:"sph1",color:"#66ff33"},{size:[1,1,1],pos:[0,20,-150],move:"true",name:"sight",color:"#66ff33"},{size:[1,1,1],pos:[0,0,-100],move:"true",name:"containerSphere",color:"#ff0000"}];t(p)}function t(e){var n;for(var i in e){var t={type:"sphere",size:e[i].size,pos:e[i].pos,move:e[i].move,world:x,name:e[i].name,color:e[i].color};"containerSphere"!=t.name&&"sight"!=t.name&&(P[z]=new o.Body(t),r[c]=u.add(t,n,t.color),w=r[c],z+=1,c+=1),"containerSphere"==t.name&&(y=u.add(t,n,t.color),y.add(u.camera)),"sight"==t.name&&(h=u.add(t,n,t.color))}}function s(o){switch(o.preventDefault(),o.stopPropagation(),o.keyCode){case g.UP:console.log("up key pressed"),w.position.x+=1,y.position.x+=1,h.position.x+=1;break;case g.BOTTOM:u.getCamDir("reverse",y);break;case g.ECS:p=1===p?0:1}}function a(o,e){var n=o.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}}var r=[],c=0,p=0,l=1/60,m=2,d=8,v=!1,x=new o.World(l,m,d,v);x.gravity=new o.Vec3(0,0,0);var g=(new o.Vec3(0,0,0),{LEFT:37,UP:38,RIGHT:39,BOTTOM:40,ECS:27});x.worldscale(100);var u=new e.View;u.initLight();var f,h,y,w,P=[],z=0;i(1);var T=function(){requestAnimationFrame(T),p||u.render()};setInterval(n,1e3*l),T(),window.addEventListener("keydown",s,!1),window.scrollTo(0,document.body.clientHeight);var E=385.5,S=document.getElementById("container");S.addEventListener("mousemove",function(o){var e=a(S,o);console.log("mousePos.x 1: "+e.x),console.log("containerMesh"+y.position.x+", "+y.position.y),e.x+=y.position.x,E+=y.position.x,console.log("canvas centre: "+E),console.log("mousPos.x 2: "+e.x),e.x>E&&(h.position.x=(e.x-E)/3.192,h.position.x+=y.position.x),e.x<398.5&&(h.position.x=(398.5-e.x)/-3.192),console.log("Mouse position: "+e.x.toFixed(0)+","+e.y.toFixed(0)),console.log("sight position"+h.position.x+","+h.position.y)},!1)});