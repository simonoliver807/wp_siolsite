define(["oimo","v3d"],function(e,r){"use strict";return function(){var o,n,a,i,t,s,d=0,p=new r.View,l=2,c=8,m=!1,h=0,y=[],u=0,v=[],f=0,x=100;new e.Vec3(0,1,0),p.w/2,p.h/2;s=new e.Vec3(0,0,0);var g,b,w,z=(document.getElementById("container"),[]),D=new e.Vec3,M=p.tvec(0,0,0),B=p.tvec(0,0,0),q=document.getElementById("mapms1"),j=document.getElementById("mapms2"),S=document.getElementById("gmap"),_=0,V=0,E=0,F=0;return{createWorld:function(r){o=new e.World(r,l,c,m),o.worldscale(100),o.gravity=new e.Vec3(0,0,0),p.setWorld(o),u=0,p.addPhaser=function(r,o){return y[y.length]=new e.Body(r),v[v.length]=o,y[y.length-1]},i=0,n=[{id:"temp1",gameid:12345,posx:0,posy:0,posx:0,rotx:0,roty:0,rotz:0}],g=document.getElementById("perf"),a=0,b=1},oimoLoop:function(){function e(){if(requestAnimationFrame(e),h+=1e-5,!r.bincam)var n=8;if(r.bincam)var n=9;if(!d&&r.startRender==n){var t=[];if(o.step(),p.render(),5==b?b=0:b+=1,!i){document.getElementById("loadingScreen").style.display="none";for(var l=0;l<y.length;l++)for(var c=0;c<p.scene.children.length;c++){if(y[l].name==p.scene.children[c].name&&("mothership"==y[l].name?y[l].msname==p.scene.children[c].children[0].name&&v.push(p.scene.children[c]):v.push(p.scene.children[c])),"drones"==p.scene.children[c].name)var m=c;if("containerMesh"==p.scene.children[c].name)var u=c;"ms1phaser"==p.scene.children[c].name&&(E=c),"ms2phaser"==p.scene.children[c].name&&(F=c)}for(var c=0;c<p.scene.children[m].children.length;c++)v.push(p.scene.children[m].children[c]);p.containerMesh=p.scene.children[u],i=p.scene.children[u],f=v.length}if(r.exdrone3.userData.active){for(var c=1;c<r.exdrone3.children.length;c++){for(var x=p.expart(),I=x.geometry.attributes.position.array.length;I>2;)x.geometry.attributes.position.array[I-3]=r.exdrone3.children[c].position.x,x.geometry.attributes.position.array[I-2]=r.exdrone3.children[c].position.y,x.geometry.attributes.position.array[I-1]=r.exdrone3.children[c].position.z,I-=3;x.userData.timecreated=h,r.grouppart.add(x),r.exdrone3.children[c].geometry.dispose(),r.exdrone3.remove(r.exdrone3.children[c])}r.exdrone3.userData.active=!1}if(r.exdrone2.userData.active){for(var c=1;c<r.exdrone2.children.length;c++){var C=r.exdrone3.children[0].clone();C.position.set(r.exdrone2.children[c].position.x,r.exdrone2.children[c].position.y,r.exdrone2.children[c].position.z),C.quaternion.set(r.exdrone2.children[c].quaternion.x,r.exdrone2.children[c].quaternion.y,r.exdrone2.children[c].quaternion.z,r.exdrone2.children[c].quaternion.w),C.visible=!0,r.exdrone3.children.push(C),r.exdrone3.userData.active=!0,r.exdrone2.children[c].geometry.dispose(),r.exdrone2.remove(r.exdrone2.children[c])}r.exdrone2.userData.active=!1}if(r.exdrone1.userData.active){for(var c=1;c<r.exdrone1.children.length;c++){var C=r.exdrone2.children[0].clone();C.position.set(r.exdrone1.children[c].position.x,r.exdrone1.children[c].position.y,r.exdrone1.children[c].position.z),C.quaternion.set(r.exdrone1.children[c].quaternion.x,r.exdrone1.children[c].quaternion.y,r.exdrone1.children[c].quaternion.z,r.exdrone1.children[c].quaternion.w),C.visible=!0,r.exdrone2.children.push(C),r.exdrone2.userData.active=!0,r.exdrone1.children[c].geometry.dispose(),r.exdrone1.remove(r.exdrone1.children[c])}r.exdrone1.userData.active=!1}for(var O,R,P="drone",W="phaser",k="shp1",A="dphaser",L=o.contacts;null!==L;)null!=L.body1&&null!=L.body2&&(O=L.body1.name||" ",R=L.body2.name||" ",(O==P&&R==W||R==P&&O==W)&&(t.push(L.shape1.id),t.push(L.shape2.id),o.removeContact(L)),(O==k&&R==A||R==k&&O==A)&&console.log("collision")),L=L.next;for(var c=0;c<r.grouppart.children.length;c++)if(h-r.grouppart.children[c].userData.timecreated>8e-4)r.grouppart.children[c].geometry.dispose(),r.grouppart.children[c].material.dispose(),r.grouppart.remove(r.grouppart.children[c]);else{for(var N=r.grouppart.children[c].geometry.attributes.position.array,I=0;I<N.length;I++){var T=Math.random();I%2===0&&(T*=-1),r.grouppart.children[c].geometry.attributes.position.array[I]+=T}r.grouppart.children[c].geometry.attributes.position.needsUpdate=!0}a=o.performance.show(),g.innerHTML=a;for(var U,G,c=y.length;c--;){if(G=y[c],U=v[c],"phaser"!=U.name&&"dphaser"!=U.name||(U.userData.timealive?(h-U.userData.timealive>.002&&"dphaser"==U.name&&t.push(y[c].body.shapes.id),h-U.userData.timealive>615e-6&&"phaser"==U.name&&t.push(y[c].body.shapes.id)):U.userData.timealive=h),!G.getSleep()&&(U.position.copy(G.getPosition()),U.quaternion.copy(G.getQuaternion()),"shp1"==G.name)){s.set(i.position.x,i.position.y,i.position.z),i.position.set(U.position.x,U.position.y,U.position.z);var H=i.position.x-s.x,Q=i.position.y-s.y,J=i.position.z-s.z;p.camera.position.x+=H,p.camera.position.y+=Q,p.camera.position.z+=J,0!==p.startRot.rot&&(p.camera.position.x+=p.camrot.x,p.camera.position.y+=p.camrot.y,p.camera.position.z+=p.camrot.z,p.camera.lookAt(i.position)),p.camera.updateMatrixWorld()}if(t.indexOf(G.body.shapes.id)!=-1){y.splice(c,1),v.splice(c,1);var K=U.geometry,X=U.material;if(K.dispose(),"undefined"==typeof X.dispose){r.exdrone1.userData.active=!0;var C=r.exdrone1.children[0].clone();C.position.set(U.position.x,U.position.y,U.position.z),C.quaternion.set(U.quaternion.x,U.quaternion.y,U.quaternion.z,U.quaternion.w),C.visible=!0,r.exdrone1.children.push(C),X.materials[0].dispose(),X.materials[1].dispose(),p.scene.children[r.mesharrpos.drones].remove(U)}else X.dispose(),"phaser"==U.name&&p.scene.children[r.mesharrpos.phasers].remove(U),(U.name="dphaser")&&p.scene.children[r.mesharrpos.dphasers].remove(U);o.removeRigidBody(G.body)}if("mothership"==U.name){w="ms_Object007.001"==G.msname?q:j,M.set(i.position.x,i.position.y,i.position.z),B.set(U.position.x,U.position.y,U.position.z);var Y=B.x-M.x;Y<4e3&&Y>-4e3&&(Y=(Y+4e3)/8e3*100,w.style.left=Y+"%");var Z=B.y-M.y;Z<4e3&&Z>-4e3&&(Z=(Z+4e3)/8e3*100,w.style.top=Z+"%",S.children[2].style.top=Z+"%");var $=p.getPlayerDir("forward",i.position),ee=p.tvec();ee.subVectors(B,M).normalize(),"ms_Object007.001"==G.msname?_=Math.acos($.dot(ee)):V=Math.acos($.dot(ee));_<.7||V<.7?S.className="divGreen":S.className="divRed"}}z.length>0&&(z[38]&&void 0===z[32]&&p.addForce(),z[40]&&void 0===z[32]&&p.minusForce(),z[32]&&void 0===z[38]&&void 0===z[40]&&p.phaser(),z[32]&&z[38]&&(p.addForce(),p.phaser()),z[32]&&z[40]&&(p.minusForce(),p.phaser())),p.updateSightPos();for(var c=0;c<y.length;c++){var re=y[c],oe=v[c];"drone"==re.name&&(oe.userData.ld&&p.updateDrones(re.body,v[c],re.ms),oe.userData.ld||oe.userData.rtm||(D.sub(i.position,v[c].position),D.length()<3500?oe.userData.ld=1:re.body.linearVelocity.set(0,0,0)))}for(var ne=0;ne<4;)p.scene.children[E].children[ne].scale.y+=.3,p.scene.children[E].children[ne].position.x+=1.63,p.scene.children[E].children[ne].position.z-=2.525,p.scene.children[F].children[ne].scale.y+=.3,p.scene.children[F].children[ne].position.x-=3,ne++}}e()},populate:function(n){var a,i,s,d,l,c,m,h;i=0,d=0,s=0,l=c=m=25;var v=[{type:"sphere",size:[x,x,x],pos:[0,0,0],move:!0,noSleep:!0,world:o,color:16777215,wireframe:"false",name:"shp1",transparent:"true",opacity:0},{type:"sphere",size:[8,8,8],pos:[0,0,0],move:!0,world:o,color:"#ff0000",wireframe:"false",name:"containerMesh",transparent:"false",opacity:1,image:"cpv/cpv.obj",mtl:"cpv/cpv.mtl"},{type:"sphere",size:[750,750,750],pos:[500,10,-1e4],move:!1,world:o,color:"#0000ff",wireframe:"false",name:"mercury",transparent:"false",opacity:1,image:"planets/mercury.jpg"},{type:"sphere",size:[500,500,500],pos:[500,10,1e4],move:!1,world:o,color:"#0000ff",wireframe:"false",name:"moon",transparent:"false",opacity:1,image:"planets/moon.jpg"}];r.bincam||(v[1].image=0,v[1].mtl=0);for(var f=0;f<v.length;f++)"containerMesh"!=v[f].name&&(y[u]=new e.Body(v[f]),p.addSphere(v[f]),p.setBodys(y[u]),u+=1),"containerMesh"==v[f].name&&p.addSphere(v[f]);t={type:"box",size:[15,15,.5],pos:[0,0,-100],move:"true",world:o,color:"#66ff33",wireframe:"false",name:"sight",transparent:"true",opacity:0,image:"sight_1.png"},t=p.addBox(t);var g={type:"box",size:[700,300,700],pos:[-5e3,0,-2e3],move:!1,world:o,name:"mothership",transparent:"false",opacity:0,image:"ms/ms.obj",mtl:"ms/ms.mtl"},b={type:"box",size:[700,300,700],pos:[-5e3,0,-2e3],move:!1,world:o,color:16711680,wireframe:"false",name:"mothershipbb1",transparent:"false",opacity:0},w={type:"box",size:[700,500,300],pos:[8e3,0,-1e4],move:!1,world:o,name:"mothership",transparent:"false",opacity:0,image:"ms/ds.obj",mtl:"ms/ds.mtl"},z={type:"box",size:[700,500,300],pos:[8e3,0,-1e4],move:!1,world:o,color:16711680,wireframe:"false",name:"mothershipbb2",transparent:"false",opacity:0};y[u]=new e.Body(g),y[u].msname="ms_Object007.001",u+=1,y[u]=new e.Body(w),y[u].msname="DestroyerR_Destroyer_Untitled.000",u+=1,p.addBox(g),p.addBox(b),p.addBox(w),p.addBox(z);for(var D,h=3,M=[],f=0;f<n;f++)i=this.randMinMax(-1e3,1e3),s=this.randMinMax(-1e3,1e3),d=this.randMinMax(-1e3,1e3),f<n/2?(i+=g.pos[0],s+=g.pos[1],d+=g.pos[2],D=1):(i+=w.pos[0],s+=w.pos[1],d+=w.pos[2],D=2),2===h&&(a={type:"box",size:[l,c,m],pos:[i,s,d],move:!0,world:o,color:"#66ff33",wireframe:"false",name:"boxTarget",transparent:"false",opacity:1,image:""}),3===h&&(a={type:"cylinder",size:[l,c,m],pos:[i,s,d],move:!0,world:o,noSleep:!0,color:"#66ff33",wireframe:"false",name:"drone",transparent:"false",opacity:1,image:"Free_Droid/bake.obj"}),y[u]=new e.Body(a),y[u].drota=0,y[u].ms=D,2==h||M.push(a),u+=1;p.addCylinder(M);for(var B=[{type:"cylinder",move:"true",world:o,name:"exdrone1",transparent:"false",opacity:1,image:"ani/exdrone1.obj",mtl:"images/ani/BaseMaterial_normal.png"},{type:"cylinder",move:"true",world:o,name:"exdrone2",transparent:"false",opacity:1,image:"ani/exdrone2.obj",mtl:"images/ani/BaseMaterial_normal.png"},{type:"cylinder",move:"true",world:o,name:"exdrone3",transparent:"false",opacity:1,image:"ani/exdrone3.obj",mtl:"images/ani/BaseMaterial_normal.png"}],f=0;f<B.length;f++)p.addCylinder(B[f]);var q={type:"sphere",move:"true",world:o,name:"phasers",transparent:"false",opacity:1,image:"phasers/phaser.obj",texture:"images/phasers/fb.jpg"};p.addSphere(q);var j={type:"sphere",move:"true",world:o,name:"dphasers",transparent:"false",opacity:1,image:"phasers/dphaser.obj",texture:"images/phasers/bluefire.png"};p.addSphere(j);var S={type:"cylinder",name:"ms1phaser",color:39423};p.addCylinder(S,g.pos);var _={type:"cylinder",name:"ms2phaser",color:39423};p.addCylinder(_,w.pos)},getObj:function(e){switch(e){case"bodys":return y;case"containerMesh":return i;case"shp1r":return x;case"v3d":return p;case"world":return o;case"keys":return z}},randMinMax:function(e,r){return Math.floor(Math.random()*(r-e+1))+e},isSleeping:function(e){for(var r=0;r<y.length;r++)if(y[r].name==e)return y[r].getSleep()},gspause:function(e){return void 0==e?d:void(d=e)}}}});