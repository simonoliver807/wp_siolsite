define(["three"],function(e){e.TGALoader=function(a){this.manager=void 0!==a?a:e.DefaultLoadingManager},e.TGALoader.prototype.load=function(a,r,t,o){var i=this,n=new e.Texture,s=new e.XHRLoader(this.manager);return s.setResponseType("arraybuffer"),s.load(a,function(e){n.image=i.parse(e),n.needsUpdate=!0,void 0!==r&&r(n)},t,o),n},e.TGALoader.prototype.parse=function(e){function a(e){switch(e.image_type){case p:case g:(e.colormap_length>256||24!==e.colormap_size||1!==e.colormap_type)&&console.error("THREE.TGALoader.parse.tgaCheckHeader: Invalid type colormap data for indexed type");break;case h:case f:case u:case _:e.colormap_type&&console.error("THREE.TGALoader.parse.tgaCheckHeader: Invalid type colormap data for colormap type");break;case l:console.error("THREE.TGALoader.parse.tgaCheckHeader: No data");default:console.error('THREE.TGALoader.parse.tgaCheckHeader: Invalid type " '+e.image_type+'"')}(e.width<=0||e.height<=0)&&console.error("THREE.TGALoader.parse.tgaCheckHeader: Invalid image size"),8!==e.pixel_size&&16!==e.pixel_size&&24!==e.pixel_size&&32!==e.pixel_size&&console.error('THREE.TGALoader.parse.tgaCheckHeader: Invalid pixel size "'+e.pixel_size+'"')}function r(e,a,r,t,o){var i,n,s,c;if(n=r.pixel_size>>3,s=r.width*r.height*n,a&&(c=o.subarray(t,t+=r.colormap_length*(r.colormap_size>>3))),e){i=new Uint8Array(s);for(var d,l,p,h=0,f=new Uint8Array(n);h<s;)if(d=o[t++],l=(127&d)+1,128&d){for(p=0;p<n;++p)f[p]=o[t++];for(p=0;p<l;++p)i.set(f,h+p*n);h+=n*l}else{for(l*=n,p=0;p<l;++p)i[h+p]=o[t++];h+=l}}else i=o.subarray(t,t+=a?r.width*r.height:s);return{pixel_data:i,palettes:c}}function t(e,a,r,t,o,i,n,s,c){var d,l,p,h=c,f=0,g=A.width;for(p=a;p!==t;p+=r)for(l=o;l!==n;l+=i,f++)d=s[f],e[4*(l+g*p)+3]=255,e[4*(l+g*p)+2]=h[3*d+0],e[4*(l+g*p)+1]=h[3*d+1],e[4*(l+g*p)+0]=h[3*d+2];return e}function o(e,a,r,t,o,i,n,s){var c,d,l,p=0,h=A.width;for(l=a;l!==t;l+=r)for(d=o;d!==n;d+=i,p+=2)c=s[p+0]+(s[p+1]<<8),e[4*(d+h*l)+0]=(31744&c)>>7,e[4*(d+h*l)+1]=(992&c)>>2,e[4*(d+h*l)+2]=(31&c)>>3,e[4*(d+h*l)+3]=32768&c?0:255;return e}function i(e,a,r,t,o,i,n,s){var c,d,l=0,p=A.width;for(d=a;d!==t;d+=r)for(c=o;c!==n;c+=i,l+=3)e[4*(c+p*d)+3]=255,e[4*(c+p*d)+2]=s[l+0],e[4*(c+p*d)+1]=s[l+1],e[4*(c+p*d)+0]=s[l+2];return e}function n(e,a,r,t,o,i,n,s){var c,d,l=0,p=A.width;for(d=a;d!==t;d+=r)for(c=o;c!==n;c+=i,l+=4)e[4*(c+p*d)+2]=s[l+0],e[4*(c+p*d)+1]=s[l+1],e[4*(c+p*d)+0]=s[l+2],e[4*(c+p*d)+3]=s[l+3];return e}function s(e,a,r,t,o,i,n,s){var c,d,l,p=0,h=A.width;for(l=a;l!==t;l+=r)for(d=o;d!==n;d+=i,p++)c=s[p],e[4*(d+h*l)+0]=c,e[4*(d+h*l)+1]=c,e[4*(d+h*l)+2]=c,e[4*(d+h*l)+3]=255;return e}function c(e,a,r,t,o,i,n,s){var c,d,l=0,p=A.width;for(d=a;d!==t;d+=r)for(c=o;c!==n;c+=i,l+=2)e[4*(c+p*d)+0]=s[l+0],e[4*(c+p*d)+1]=s[l+0],e[4*(c+p*d)+2]=s[l+0],e[4*(c+p*d)+3]=s[l+1];return e}function d(e,a,r,d,l){var p,h,f,g,u,_;switch((A.flags&m)>>T){default:case k:p=0,f=1,u=a,h=0,g=1,_=r;break;case w:p=0,f=1,u=a,h=r-1,g=-1,_=-1;break;case y:p=a-1,f=-1,u=-1,h=0,g=1,_=r;break;case v:p=a-1,f=-1,u=-1,h=r-1,g=-1,_=-1}if(G)switch(A.pixel_size){case 8:s(e,h,g,_,p,f,u,d);break;case 16:c(e,h,g,_,p,f,u,d);break;default:console.error("THREE.TGALoader.parse.getTgaRGBA: not support this format")}else switch(A.pixel_size){case 8:t(e,h,g,_,p,f,u,d,l);break;case 16:o(e,h,g,_,p,f,u,d);break;case 24:i(e,h,g,_,p,f,u,d);break;case 32:n(e,h,g,_,p,f,u,d);break;default:console.error("THREE.TGALoader.parse.getTgaRGBA: not support this format")}return e}var l=0,p=1,h=2,f=3,g=9,u=10,_=11,m=48,T=4,w=0,v=1,k=2,y=3;e.length<19&&console.error("THREE.TGALoader.parse: Not enough data to contain header.");var E=new Uint8Array(e),b=0,A={id_length:E[b++],colormap_type:E[b++],image_type:E[b++],colormap_index:E[b++]|E[b++]<<8,colormap_length:E[b++]|E[b++]<<8,colormap_size:E[b++],origin:[E[b++]|E[b++]<<8,E[b++]|E[b++]<<8],width:E[b++]|E[b++]<<8,height:E[b++]|E[b++]<<8,pixel_size:E[b++],flags:E[b++]};a(A),A.id_length+b>e.length&&console.error("THREE.TGALoader.parse: No data"),b+=A.id_length;var H=!1,x=!1,G=!1;switch(A.image_type){case g:H=!0,x=!0;break;case p:x=!0;break;case u:H=!0;break;case h:break;case _:H=!0,G=!0;break;case f:G=!0}var L=document.createElement("canvas");L.width=A.width,L.height=A.height;var z=L.getContext("2d"),R=z.createImageData(A.width,A.height),C=r(H,x,A,b,E);d(R.data,A.width,A.height,C.pixel_data,C.palettes);return z.putImageData(R,0,0),L}});