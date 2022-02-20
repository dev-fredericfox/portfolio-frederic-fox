import {
	Group,
	Mesh
} from '/vendor/three@0.136.0/build/three.module.js';



function createMeshesFromInstancedMesh( instancedMesh ) {

	const group = new Group();

	const count = instancedMesh.count;
	const geometry = instancedMesh.geometry;
	const material = instancedMesh.material;

	for ( let i = 0; i < count; i ++ ) {

		const mesh = new Mesh( geometry, material );

		instancedMesh.getMatrixAt( i, mesh.matrix );
		mesh.matrix.decompose( mesh.position, mesh.quaternion, mesh.scale );

		group.add( mesh );

	}

	group.copy( instancedMesh );
	group.updateMatrixWorld(); // ensure correct world matrices of meshes

	return group;

}

function createMultiMaterialObject( geometry, materials ) {

	const group = new Group();

	for ( let i = 0, l = materials.length; i < l; i ++ ) {

		group.add( new Mesh( geometry, materials[ i ] ) );

	}

	return group;

}

function detach( child, parent, scene ) {

	console.warn( 'THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead.' );

	scene.attach( child );

}

function attach( child, scene, parent ) {

	console.warn( 'THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead.' );

	parent.attach( child );

}



export {
	createMeshesFromInstancedMesh,
	createMultiMaterialObject,
	detach,
	attach,
};
