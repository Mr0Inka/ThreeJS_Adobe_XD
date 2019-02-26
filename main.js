//Include this right before the body closing tag in the exported HTML

//<script> 
//    var modelName = "astro.obj";
//    var textureName = "astro.png";
//
//    var d_width = 435;
//    var d_height = 662;
//    var classN = "pctdetail_772_007_4";
//</script>
//<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/100/three.min.js"></script>
//<script src="./js/OBJLoader.js"></script>
//<script src="./js/OrbitControls.js"></script>
//<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
//<script type="text/javascript" src="./js/main.js"></script>



var address = "http://localhost:8080/";


loadthreed(modelName, textureName);

var oldEle = document.getElementsByClassName(classN)[0];
var newEle = document.createElement("div")
    newEle.id = "threed";
    newEle.className = classN;
var replaced = oldEle.parentNode.replaceChild(newEle, oldEle);


var controls;
var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var object;
var currentModel;


init();
animate();

function init() {

    container = document.getElementById( 'threed' );

    camera = new THREE.PerspectiveCamera( 45, d_width / d_height, 1, 2000 );
    camera.position.z = 250;

    scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );

    var pointLight = new THREE.PointLight( 0xffffff, 1.2 );
    camera.add( pointLight );
    scene.add( camera );

    var gridHelper = new THREE.GridHelper( 100, 100 );
    //scene.add( gridHelper );




    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(1);
    renderer.setSize( d_width, d_height );
    container.appendChild( renderer.domElement );


    controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set(5, 1, 5);
    camera.lookAt(0,0,0)
    //controls.target0.set(0,-95,0)

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.rotateSpeed = 0.075;
    controls.enablePan = false
    controls.enableZoom = true
    controls.zoomSpeed = 1.4;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.staticMoving = false;
    controls.minPolarAngle = 1.0;
    controls.maxPolarAngle = 1.0;
    controls.maxDistance = 10;
    controls.minDistance = 3;

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
   // window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}

function animate() {
    requestAnimationFrame( animate );
    controls.update()
    render();
}

function render() {
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}

function loadthreed(mod, tex){

    function loadModel() {
        object.traverse( function ( child ) {
            if ( child.isMesh ) child.material.map = texture;
        } );
        scene.add( object );
        object.position.set(0,-2.3,0)
        object.scale = 5
        currentModel = object;
    }

    var manager = new THREE.LoadingManager( loadModel );

    var textureLoader = new THREE.TextureLoader( manager );
    var texture = textureLoader.load("model/" + tex);

    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    function onProgress( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    }

    function onError() {}
        var loader = new THREE.OBJLoader( manager );
        loader.load( './model/' + mod, function ( obj ) {
        object = obj;
    }, onProgress, onError );
}
