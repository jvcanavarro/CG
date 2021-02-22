var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;
var orbitControls, dragControls;

var crate, crateTexture, crateNormalMap, crateBumpMap;

var keyboard = {};
var pov = { height:10, lightSpeed:0.3, crateSpeed:Math.PI*0.04 };
var USE_WIREFRAME = false;

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1.5,1.5,1.5),
		new THREE.MeshNormalMaterial({wireframe:USE_WIREFRAME})
	);
	mesh.position.y += 1;
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	scene.add(mesh);
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(18,18, 10,10),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
	);
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);
	
	
	ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
	scene.add(ambientLight);
	
	light = new THREE.PointLight(0xffffff, 0.7, 15);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);
	
	
	var textureLoader = new THREE.TextureLoader();
	crateTexture = textureLoader.load("textures/crate_diffuse.jpg");
	crateBumpMap = textureLoader.load("textures/crate_bump.jpg");
	crateNormalMap = textureLoader.load("textures/crate_normal.jpg");
	
	crate = new THREE.Mesh(
		new THREE.BoxGeometry(3,3,3),
		new THREE.MeshPhongMaterial({
			color:0xffffff,
			map:crateTexture,
			bumpMap:crateBumpMap,
			normalMap:crateNormalMap
		})
	);
	scene.add(crate);
	crate.position.set(2.5, 3/2, 2.5);
	crate.receiveShadow = true;
	crate.castShadow = true;
	
	// Model/Texture loading
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("models/Tent_Poles.mtl", function(materials){
		
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		
		objLoader.load("models/Tent_Poles.obj", function(mesh){
		
			mesh.traverse(function(node){
				if( node instanceof THREE.Mesh ){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
		
			scene.add(mesh);
			mesh.position.set(-5, 0, 4);
			mesh.rotation.y = -Math.PI/4;
		});
		
	});
	
	
	camera.position.set(0, pov.height, -8);
	camera.lookAt(new THREE.Vector3(0,pov.height,0));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	document.body.appendChild(renderer.domElement);
	

	orbitControls = new THREE.OrbitControls(camera, renderer.domElement)

	dragControls = new THREE.DragControls([mesh], camera, renderer.domElement)
	dragControls.addEventListener("hoveron", function () {
		orbitControls.enabled = false;
	});
	dragControls.addEventListener("hoveroff", function () {
		orbitControls.enabled = true;
	});

	animate();
}

function animate(){
	requestAnimationFrame(animate);
	
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	crate.rotation.y += 0.005;
	
	if(keyboard[87]){ // W key
		light.position.x -= Math.sin(camera.rotation.y) * pov.lightSpeed;
		light.position.z -= -Math.cos(camera.rotation.y) * pov.lightSpeed;
	}
	if(keyboard[83]){ // S key
		light.position.x += Math.sin(camera.rotation.y) * pov.lightSpeed;
		light.position.z += -Math.cos(camera.rotation.y) * pov.lightSpeed;
	}
	if(keyboard[65]){ // A key
		light.position.x += Math.sin(camera.rotation.y + Math.PI/2) * pov.lightSpeed;
		light.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * pov.lightSpeed;
	}
	if(keyboard[68]){ // D key
		light.position.x += Math.sin(camera.rotation.y - Math.PI/2) * pov.lightSpeed;
		light.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * pov.lightSpeed;
	}
	
	if(keyboard[37]){ // left key
		mesh.position.x += pov.crateSpeed;
	}
	if(keyboard[38]){ // up key
		mesh.position.z += pov.crateSpeed;
	}
	if(keyboard[39]){ // right key
		mesh.position.x -= pov.crateSpeed;
	}
	if(keyboard[40]){ // down key
		mesh.position.z -= pov.crateSpeed;
	}
	
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
