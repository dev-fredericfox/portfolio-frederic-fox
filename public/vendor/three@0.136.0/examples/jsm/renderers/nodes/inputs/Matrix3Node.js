import InputNode from '../core/InputNode.js';
import { Matrix3 } from '/vendor/three@0.136.0/build/three.module.js';

class Matrix3Node extends InputNode {

	constructor( value = new Matrix3() ) {

		super( 'mat3' );

		this.value = value;

	}

}

Matrix3Node.prototype.isMatrix3Node = true;

export default Matrix3Node;
