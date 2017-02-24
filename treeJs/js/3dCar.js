function init(){
	
	var renderer=new THREE.WebGLRenderer({
		canvas:document.getElementById("myCanvas")
	});
	var scene=new THREE.Scene();
	var camera=new THREE.PerspectiveCamera(45,800/600,30,70);
	
	camera.position.set(40,20,20);
	scene.add(camera);
	camera.lookAt(new THREE.Vector3(0,0,0));
    //车身
	var cube=new THREE.Mesh(new THREE.CubeGeometry(24,10,10,39,16,16),
		new THREE.MeshBasicMaterial({
			color:0xff0000,
			wireframe:true
		}));
	scene.add(cube);
	//左轮子
	var torusFront=new THREE.Mesh(new THREE.TorusGeometry(2,1,12,18),
		new THREE.MeshBasicMaterial({
			color:0x00ff00,
			wireframe:true
		}));
	torusFront.position.x=-7;
	torusFront.position.y=-5;
	torusFront.position.z=5;
	scene.add(torusFront);
    //右轮子
	var torusRear=new THREE.Mesh(new THREE.TorusGeometry(2,1,12,18),
		new THREE.MeshBasicMaterial({
			color:0x00ff00,
			wireframe:true
		}));
	torusRear.position.x=7;
	torusRear.position.y=-5;
	torusRear.position.z=5;
	scene.add(torusRear);

	renderer.render(scene,camera);
}