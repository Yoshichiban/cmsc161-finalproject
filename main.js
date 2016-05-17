var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
renderer.setSize(width, height);
renderer.setClearColor(0xFFCC33, 0);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene;


var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
var cubeMaterial = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30 } );
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.translateX(600);
cube.rotation.y = Math.PI * 45 / 180;

scene.add(cube);

var geometry = new THREE.SphereGeometry( 500, 300, 300 );
var material = new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 50 } );
var sphere = new THREE.Mesh( geometry, material );

scene.add( sphere );

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 160;
camera.position.z = 2000;

scene.add(camera);
camera.lookAt(sphere.position);



var directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
directionalLight.position.set( 0, 0, 50 );
scene.add( directionalLight );


renderer.render(scene,camera);
