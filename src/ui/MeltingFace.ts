import { Container, Sprite } from 'pixi.js';

/**
 * Class for rendering a PixiJS logo
 */
export class MeltingFace {
    /* The container instance that is the root of all visuals in this class */
    public view = new Container();

    /**
     * @param header The header text to be displayed above the logo
     */
    constructor() {
        // Create the logo sprite from an image
        const logo = Sprite.from('melting-face');

        logo.anchor.set(0.5);
        this.view.addChild(logo);
    }
}
