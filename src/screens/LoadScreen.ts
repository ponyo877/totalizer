import gsap from 'gsap';
import { Container, Sprite, Texture, Ticker, TilingSprite } from 'pixi.js';

import { designConfig } from '../game/designConfig';

/** The default load screen for the game. */
export class LoadScreen extends Container {
    /** A unique identifier for the screen */
    public static SCREEN_ID = 'loader';
    /** An array of bundle IDs for dynamic asset loading. */
    public static assetBundles = ['images/preload'];

    private readonly _background: TilingSprite;
    private readonly _spinner: Sprite;

    /** An added container to animate the pixi logo off screen. */
    private _bottomContainer = new Container();
    /** A variable used to store the current time state of animation */
    private _tick = 0;

    constructor() {
        super();

        // Create the visual aspects of the load screen
        this._background = new TilingSprite({
            texture: Texture.from('background-tile'),
            width: 64,
            height: 64,
            tileScale: {
                x: designConfig.backgroundTileScale,
                y: designConfig.backgroundTileScale,
            },
        });
        this.addChild(this._background);

        this._spinner = Sprite.from('loading-circle');
        this._spinner.anchor.set(0.5);
        this.addChild(this._spinner);
    }

    /** Called when the screen is being shown. */
    public async show() {
        // Kill tweens of the screen container
        gsap.killTweensOf(this);

        // Reset screen data
        this.alpha = 0;
        this._bottomContainer.y = 0;

        // Tween screen into being visible
        await gsap.to(this, { alpha: 1, duration: 0.2, ease: 'linear' });
    }

    /** Called when the screen is being hidden. */
    public async hide() {
        // Kill tweens of the screen container
        gsap.killTweensOf(this);

        // Hide pixi logo off screen
        await gsap.to(this._bottomContainer, {
            y: 100,
            duration: 0.25,
        });

        // Tween screen into being invisible
        await gsap.to(this, { alpha: 0, delay: 0.1, duration: 0.2, ease: 'linear' });
    }

    /**
     * Called every frame
     * @param time - Ticker object with time related data.
     */
    public update(time: Ticker) {
        const delta = time.deltaTime;

        // Rotate spinner
        this._spinner.rotation -= delta / 60;

        // When tick is zero, randomise aforementioned offset
        if (this._tick <= 0) {
            this._tick = 1;
        } else {
            // Decremented every frame using delta time
            this._tick -= delta / 60;
        }
    }

    /**
     * Gets called every time the screen resizes.
     * @param w - width of the screen.
     * @param h - height of the screen.
     */
    public resize(w: number, h: number) {
        // Fit background to screen
        this._background.width = w;
        this._background.height = h;
    }
}
