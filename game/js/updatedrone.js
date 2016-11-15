

    	var te = new TextEncoder();
    	var td = new TextDecoder("utf-8");
    	var up = [0,1,0];
    	var t = 0.016666666666666666;

    	onmessage = function( msg ) {


			var view = new DataView(msg.data, 0, msg.data.byteLength);
			var dd = td.decode(view);
			dd = dd.split('/');
			var cmp = JSON.parse(dd[0]);
			dd.splice(0,1)
			var rdd = '';
			var q = [0,0,0,1];



			for (var i=0;i<dd.length;i+=7){
				var id = dd[i];
    			var rblv = JSON.parse(dd[i+1]);
    			var dp = JSON.parse(dd[i+2]);
    			var ldh = JSON.parse(dd[i+3]);
    			var ld = dd[i+4];
    			var drota = JSON.parse(dd[i+5]);
    			var bincount = dd[i+6];
 

		        if( ld == 'true' ) {
		         
		         	var rblv = uddmod.length(rblv);
		         	ldh = uddmod.negate(ldh);


		            var correctvec = [ ldh[0], ldh[1], ldh[2] ];
		            correctvec = uddmod.normalize(correctvec);

		            ldh = uddmod.sub( cmp, dp );
		            var dist = Math.round( uddmod.length(ldh));
		            uddmod.normalize(ldh);
		            var m = uddmod.lookAtFunc(ldh, up);
//		            var q = new THREE.Quaternion();

		            q = uddmod.setFromRotationMatrix( m );

		            var angle = 2 * Math.acos(q[3]);

		            if(  bincount == 'true') {

		                if( drota != angle) {

		                    var anglediff = drota - angle;
		                    if( anglediff < 0 ) { anglediff *= -1; }
		                    var mag = anglediff;
		                    
		                   if(anglediff <= 0.01) {
		                        mag *= 100;
		                    }
		                    if(anglediff > 0.01 && anglediff <= 0.1) {
		                        mag *= 100;
		                    }
		                    if(anglediff > 0.1 && anglediff < 1) {
		                        mag *= 10;
		                    }
		                    if(anglediff > 1) {
		                        mag;
		                    }
		                 //   console.log('mag ' + mag); 

		                    correctvec = uddmod.multiplyScalar(correctvec,-mag);
		                    rblv = uddmod.addTime(correctvec,t);
		                    drota = angle;
		                    //console.log(rb.linearVelocity); 
		                  //  console.log('anglediff' + anglediff);

		                }
		            }
		            else {

		                    if ( dist <= 15 ) {

		                    	rblv = uddmod.normalizelv( rblv,2,ldh );

		                    }
		                    if (dist > 15 && dist <= 40) { 

		                        rblv = uddmod.normalizelv( rblv,7,ldh );
		                    
		                    }
		                    if (dist > 40 && dist <= 100 ) {

		                        rblv = uddmod.normalizelv( rblv,10,ldh );

		                    }
		                    if (dist > 100 ) {
		                        ldh = uddmod.multiplyScalar(ldh,15);
		                        rblv = uddmod.addTime(ldh,t);  
		                    }

		            }
		            bincount ? bincount = false : bincount = true;
		        }
		        else {
		            var pddist = uddmod.sub(cmp,dp);
		            var len = uddmod.length( pddist );
		            if( len < 15) {
		                ld = true;
		            }
		        }

		        rdd += id+'/'+ld+'/['+ldh+']/'+'['+rblv+']/'+bincount+'/'+''+drota+'/'+'['+q+']';
		        if ( i < dd.length-7 ){
		        	rdd +='/';
		        }
		    }



			var uint8_array = te.encode(rdd);
			var array_buffer = uint8_array.buffer;
			postMessage(array_buffer, [array_buffer]);


postMessage('b');





	

    	}

    	var uddmod = (function () {

    		return {
    			addTime: function(v, t){
    				var vector = [ 0,0,0 ];
			        vector[0]+=v[0]*t;
			        vector[1]+=v[1]*t;
			        vector[2]+=v[2]*t;
			        return vector;
			    },
    			crossVectors: function ( a, b ) {
    				var vector = [ 0,0,0 ];
					var ax = a[0], ay = a[1], az = a[2];
					var bx = b[0], by = b[1], bz = b[2];

					vector[0] = ay * bz - az * by;
					vector[1] = az * bx - ax * bz;
					vector[2] = ax * by - ay * bx;

					return vector;

				},
    			getObjHeading: function(pos, rot) {
        			var vector = [ 0,0,0 ];
			        var x = pos.x, y = pos.y, z = pos.z;
					var qx = rot.x, qy = rot.y, qz = rot.z, qw = rot.w;

					// calculate quat * vector

					var ix =  qw * x + qy * z - qz * y;
					var iy =  qw * y + qz * x - qx * z;
					var iz =  qw * z + qx * y - qy * x;
					var iw = - qx * x - qy * y - qz * z;

					// calculate result * inverse quat

					vector.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
					vector.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
					vector.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

					return vector;

			    },
	    		length: function( vector ) {

	    			return Math.sqrt( vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2] );

	    		},
	    		lookAtFunc: function(currdir,up) {

		                var m = this.Matrix4();

		                var f = this.normalize(currdir);


		                var u = this.normalize(this.crossVectors( up, f ));


		                var s = this.normalize(this.crossVectors( f, u ));



		                m[ 0 ] = u[0]; m[ 4 ] = s[0]; m[ 8 ] = f[0];
		                m[ 1 ] = u[1]; m[ 5 ] = s[1]; m[ 9 ] = f[1];
		                m[ 2 ] = u[2]; m[ 6 ] = s[2]; m[ 10 ] = f[2];

		                return m;
			    },
			    Matrix4() {

					var elements = new Float32Array( [

						1, 0, 0, 0,
						0, 1, 0, 0,
						0, 0, 1, 0,
						0, 0, 0, 1

					] );
					return elements;
				},
				multiplyScalar: function ( vector, scalar ) {
					if ( isFinite( scalar ) ) {

						vector[0] *= scalar;
						vector[1] *= scalar;
						vector[2] *= scalar;

					} else {

						vector.x = 0;
						vector.y = 0;
						vector.z = 0;

					}

					return vector;

				},
			    negate: function ( v ) {
			    	var vector = [ 0,0,0 ];
					vector[0] = - v[0];
					vector[1] = - v[1];
					vector[2] = - v[2];

					return vector;

				},
				normalize: function(v){
					var vector = [ 0,0,0 ];
			        var x = v[0], y = v[1], z = v[2];
			        var l = x*x + y*y + z*z;
			        if (l > 0) {
			            l = 1 / Math.sqrt(l);
			            vector[0] = x*l;
			            vector[1] = y*l;
			            vector[2] = z*l;
			        }
			        return vector;
			    },
			    normalizelv: function(rblv, mag, ldh) {

			        if( this.length(rblv) >= (mag + 1) ){
			            rblv = this.normalize(rbvl);
			            rblv = this.multiplyScalar(rblv,mag);
			        }
			        ldh = uddmod.multiplyScalar(ldh,mag);
			         rblv = this.addTime( ldh, t );
			         return rblv;  


			    },
			    setFromRotationMatrix: function ( m ) {

					// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

					// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

					var te = m,

						m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
						m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
						m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

						trace = m11 + m22 + m33,
						s;

					if ( trace > 0 ) {

						s = 0.5 / Math.sqrt( trace + 1.0 );

						q_w = 0.25 / s;
						q_x = ( m32 - m23 ) * s;
						q_y = ( m13 - m31 ) * s;
						q_z = ( m21 - m12 ) * s;

					} else if ( m11 > m22 && m11 > m33 ) {

						s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

						q_w = ( m32 - m23 ) / s;
						q_x = 0.25 * s;
						q_y = ( m12 + m21 ) / s;
						q_z = ( m13 + m31 ) / s;

					} else if ( m22 > m33 ) {

						s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

						q_w = ( m13 - m31 ) / s;
						q_x = ( m12 + m21 ) / s;
						q_y = 0.25 * s;
						q_z = ( m23 + m32 ) / s;

					} else {

						s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

						q_w = ( m21 - m12 ) / s;
						q_x = ( m13 + m31 ) / s;
						q_y = ( m23 + m32 ) / s;
						q_z = 0.25 * s;

					}
					var q = [q_x,q_y,q_z,q_w];
					return q;

				},
			    sub: function(v1,v2){
			    	var vector = [ 0,0,0 ];
			        vector[0]=v1[0]-v2[0];
			        vector[1]=v1[1]-v2[1];
			        vector[2]=v1[2]-v2[2];
			        return vector;
			    }
	    	}

    	}());

