function init(){
var renderer=new THREE.WebGLRenderer({
		canvas:document.getElementById("myCanvas")
	});
    renderer.setClearColor(0xC9C9C9);
	renderer.shadowMap.enabled=true;
	renderer.shadowMapSoft = true;

	var scene=new THREE.Scene();
	var camera=new THREE.PerspectiveCamera(40,800/600,20,90);
	
	camera.position.set(34,20,30);
	scene.add(camera);
	camera.lookAt(new THREE.Vector3(0,0,0));
    //车身
	var cube=new THREE.Mesh(new THREE.CubeGeometry(24,10,10),
		new THREE.MeshLambertMaterial({
			color:0xC9C9C9,			
		}));
	cube.castShadow = true;
	scene.add(cube);
	//左轮子
	var torusFront=new THREE.Mesh(new THREE.TorusGeometry(2,1,12,18),
		new THREE.MeshLambertMaterial({
			color:0xC9C9C9,
		}));
	torusFront.position.x=-7;
	torusFront.position.y=-5;
	torusFront.position.z=5;
	torusFront.castShadow=true;
	scene.add(torusFront);
    //右轮子
	var torusRear=new THREE.Mesh(new THREE.TorusGeometry(2,1,12,18),
		new THREE.MeshLambertMaterial({
			color:0xC9C9C9		
		}));
	torusRear.position.x=7;
	torusRear.position.y=-5;
	torusRear.position.z=5;
	torusRear.castShadow=true;
	scene.add(torusRear);
	//地面
	var plane=new THREE.Mesh(new THREE.PlaneGeometry(45,60),
		new THREE.MeshLambertMaterial({
			color:0x9BCD9B
		}));
	plane.rotation.x=-Math.PI/2;
	plane.position.y=-8;
	plane.receiveShadow = true;
	scene.add(plane);
	//光源
	var light =new THREE.DirectionalLight(0xffffff,1);
	light.position.set(-6,5,10);
	light.castShadow = true;
    light.shadow.camera.near = -10;
    light.shadow.camera.far = 40;
    light.shadow.camera.left=-15;
    light.shadow.camera.right=15;
    light.shadow.camera.top=5;
    light.shadow.camera.bottom=-10;
    
	scene.add(light);
    // var helper = new THREE.CameraHelper( light.shadow.camera );
    // scene.add( helper );
	renderer.render(scene,camera);
}