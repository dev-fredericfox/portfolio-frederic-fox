import InputNode from '../core/InputNode.js';
import { Color } from '/vendor/three@0.136.0/build/three.module.js';

class ColorNode extends InputNode {

	constructor( value = new Color() ) {

		super( 'color' );

		this.value = value;

	}

}

ColorNode.prototype.isColorNode = true;

export default ColorNode;
