import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export default function App(_container){

    let renderer, container, scene, camera;

    renderer = new THREE.WebGLRenderer(  );

    if ( renderer.capabilities.isWebGL2 === false && renderer.extensions.has( 'ANGLE_instanced_arrays' ) === false ) {
        document.getElementById( 'notSupported' ).style.display = '';
        return false;
    }

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight);

    container = _container;
    container.classList.add('container');
    container.appendChild( renderer.domElement );

    init();


    function init(){

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xbfe3dd );

        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
        camera.position.set( 5, 2, 18 );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set( 0, 0, 0 );
        controls.update();
        controls.enablePan = false;
        controls.enableDamping = true;

        let geo = new THREE.SphereGeometry(1,10,10);
        let mat = new THREE.MeshBasicMaterial({color:0xff0000})
        let meshTracker = new THREE.Mesh(geo, mat);
        
        scene.add(meshTracker);

        window.onresize = resize;

        resize();
        animate();

    }

    function resize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {
        
        requestAnimationFrame( animate );

        renderer.render( scene, camera );

    }  

}
