var cubeCam = true;
var sphereCam = false;


var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });


renderer.setSize(width, height);
renderer.setClearColor(0xFFCC33, 0);

document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene;
var group1 = new THREE.Group;


var cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('gold_crinkle.jpg') } );
var cube = new THREE.Mesh(cubeGeometry, material);
cube.translateX(600);


group1.add(cube);

var geometry = new THREE.SphereGeometry( 500, 300, 300 );
var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('earth_uv_map.jpg') } );
var sphere = new THREE.Mesh( geometry, material );

//scene.add( sphere );

var geometry = new THREE.SphereGeometry( 5, 300, 300 );
var material =  new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
var sphere_ref = new THREE.Mesh( geometry, material );

group1.add( sphere_ref );

//PIVOT ELEMENT
var pivotgeometry = new THREE.SphereGeometry( 5, 300, 300 );
var pivotmaterial =  new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
var pivot = new THREE.Mesh( pivotgeometry, pivotmaterial );
pivot.translateZ(-50);
pivot.translateX(550);

var panelgrp = new THREE.Group;
// RIGHT SOLAR PANELS
var rectLength = 100, rectWidth = 120;

var panel1grp = new THREE.Group;
var rectGeom = new THREE.BoxGeometry(rectLength, rectWidth, 2);
var rectMesh = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;
panel1grp.add( pivot );
panel1grp.add( rectMesh );
panelgrp.add(panel1grp);

var rectMesh2 = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xffcc33 } ) ) ;
panelgrp.add( rectMesh2 );


var rectMesh3 = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xccff44 } ) ) ;
panelgrp.add( rectMesh3 );

group1.add(panelgrp);

panelgrp.translateZ(-120);
panelgrp.translateX(550);

var panelgrp2 = new THREE.Group;

//LEFT SOLAR PANELS
var rectMesh4 = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;
panelgrp2.add( rectMesh4 );
 rectMesh4.frustumCulled = false;
var rectMesh5 = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xffcc33 } ) ) ;
panelgrp2.add( rectMesh5 );
rectMesh5.frustumCulled = false;
var rectMesh6 = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xccff44 } ) ) ;
panelgrp2.add( rectMesh6 );
rectMesh6.frustumCulled = false

group1.add(panelgrp2);

panelgrp2.translateZ(50);
panelgrp2.translateX(550);



//satcam
var camera = new THREE.PerspectiveCamera(45, width / height, 100, 10000);
camera.position.y = 160;
camera.position.z = 0;
camera.position.x= 1000;


//global cam
var camera2 = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera2.position.y = 160;
camera2.position.z = 500    ;
camera2.position.x= 800;

group1.add(camera);
scene.add(group1);
scene.add(camera2)


var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 0, 1, 50 );
scene.add( directionalLight );

var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

controls = new THREE.OrbitControls( camera, renderer.domElement );

function activateSolarPanel() {
        if(panel1grp.rotation.x > - 1.5){
            panel1grp.rotation.x -= 0.005;
            rectMesh2.rotation.x -= 0.005;
            rectMesh3.rotation.x -= 0.005;
            console.log(rectMesh.rotation.x);
        }else if(rectMesh2.rotation.x < -0.5){
            rectMesh2.rotation.x += 0.005;

        }else if(rectMesh3.rotation.x > -2.5){
            rectMesh3.rotation.x -= 0.005;
        }
}

function activateSolarPanel2() {
        if(rectMesh4.rotation.x <  1.5){
            rectMesh4.rotation.x += 0.005;
            rectMesh5.rotation.x += 0.005;
            rectMesh6.rotation.x += 0.005;
            console.log(rectMesh.rotation.x);
        }else if(rectMesh5.rotation.x > 0.5){
            rectMesh5.rotation.x -= 0.005;

        }else if(rectMesh6.rotation.x < 2.5){
            rectMesh6   .rotation.x += 0.005;
        }
}

function render() {
    var clock = new THREE.Clock;
    //sphere.rotation.y -= 0.001;
    //group1.rotation.y += 0.01;
    //group1.rotation.x += 0.01;
    activateSolarPanel();
    activateSolarPanel2();

    camera.lookAt(cube.position);
    camera2.lookAt(cube.position);

    if(sphereCam == true){
    renderer.render(scene, camera2);
}else if(cubeCam == true){
    renderer.render(scene, camera);
}

    requestAnimationFrame(render);
    //requestAnimationFrame(render2);
}

render();
