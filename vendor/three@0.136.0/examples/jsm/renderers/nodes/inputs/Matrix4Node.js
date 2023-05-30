import InputNode from '../core/InputNode.js';
import { Matrix4 } from '/vendor/three@0.136.0/build/three.module.js';

class Matrix4Node extends InputNode {

	constructor( value = new Matrix4() ) {

		super( 'mat4' );

		this.value = value;

	}

}

Matrix4Node.prototype.isMatrix4Node = true;

export default Matrix4Node;
