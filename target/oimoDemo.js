define(["oimo","V3D"],function(e,a){function o(){requestAnimationFrame(o),p.render()}function t(){d.step();for(var e,a,o,t,r,n=v.length;n--;)r=v[n],t=w[n],r.getSleep()?("box"===t.material.name&&(t.material=p.mats.sbox),"sph"===t.material.name&&(t.material=p.mats.ssph)):(t.position.copy(r.getPosition()),t.quaternion.copy(r.getQuaternion()),"sbox"===t.material.name&&(t.material=p.mats.box),"ssph"===t.material.name&&(t.material=p.mats.sph),t.position.y<-100&&(e=i(-100,100),o=i(-100,100),a=i(100,1e3),r.resetPosition(e,a,o)))}function r(a){var o;o={size:[400,40,390],pos:[0,-20,0],world:d,flat:!0},new e.Body(o),p.add(o);for(var t,r,n,s,m,l,c,h=100;h--;)c=i(1,3),t=i(-100,100),n=i(-100,100),r=i(100,1e3),s=i(10,20),m=i(10,20),l=i(10,20),1===c&&(o={type:"sphere",size:[.5*s,.5*s,.5*s],pos:[t,r,n],move:!0,world:d}),2===c&&(o={type:"box",size:[s,m,l],pos:[t,r,n],move:!0,world:d}),3===c&&(o={type:"cylinder",size:[s,m,s,s,m,s,s,m,s,s,m,s],pos:[t,r,n],rot:[0,0,0,0,45,0,0,22.5,0,0,-22.5,0],move:!0,world:d}),v[h]=new e.Body(o),w[h]=p.add(o)}function i(e,a,o){var t,o=o||0;return t=e<0?e+Math.random()*(Math.abs(e)+a):e+Math.random()*a,1*t.toFixed(o)}var n=1/60,s=2,m=8,l=!1,d=new e.World(n,s,m,l);d.gravity=new e.Vec3(0,-9.8,0),d.worldscale(100);var p=new a.View;p.initLight();var v=[],w=[];r(1),setInterval(t,1e3*n),o()});